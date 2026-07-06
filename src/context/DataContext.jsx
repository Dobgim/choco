import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { kittens as seedKittens } from '../data/kittens.js';
import { deleteVideoBlob } from '../lib/videoStore.js';
import { supabase, VIDEO_BUCKET } from '../lib/supabase.js';

const DataContext = createContext(null);
const TABLES = ['kittens', 'orders', 'inquiries', 'videos'];

/* ================= Supabase mode =================
   Tables use an `id text primary key` + `data jsonb` shape (see
   supabase/schema.sql). Realtime changes trigger a refetch of the
   affected table so every open browser stays in sync. */
function SupabaseData({ children }) {
  const [state, setState] = useState({ kittens: [], orders: [], inquiries: [], videos: [] });

  const fetchTable = useCallback(async (table) => {
    if (!TABLES.includes(table)) return;
    const { data, error } = await supabase
      .from(table)
      .select('id, data, created_at')
      .order('created_at', { ascending: table === 'kittens' });
    if (error) {
      console.error(`Supabase fetch ${table}:`, error.message);
      return;
    }
    setState((s) => ({ ...s, [table]: data.map((r) => ({ id: r.id, ...r.data })) }));
  }, []);

  useEffect(() => {
    (async () => {
      await Promise.all(TABLES.map(fetchTable));
      // First run against an empty project: seed the starter kittens.
      const { count, error } = await supabase
        .from('kittens')
        .select('id', { count: 'exact', head: true });
      if (!error && count === 0) {
        await supabase
          .from('kittens')
          .insert(seedKittens.map(({ id, ...data }) => ({ id, data })));
        fetchTable('kittens');
      }
    })();

    const channel = supabase
      .channel('public-db-changes')
      .on('postgres_changes', { event: '*', schema: 'public' }, (payload) =>
        fetchTable(payload.table)
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchTable]);

  const value = useMemo(() => {
    const optimistic = (table, updater) =>
      setState((s) => ({ ...s, [table]: updater(s[table]) }));

    const insertRow = (table, id, data, { prepend = true } = {}) => {
      optimistic(table, (list) => (prepend ? [{ id, ...data }, ...list] : [...list, { id, ...data }]));
      supabase
        .from(table)
        .insert({ id, data })
        .then(({ error }) => {
          if (error) console.error(`Supabase insert ${table}:`, error.message);
          fetchTable(table);
        });
    };

    const updateRow = (table, id, patch) => {
      const current = state[table].find((r) => r.id === id);
      if (!current) return;
      const { id: _omit, ...data } = { ...current, ...patch };
      optimistic(table, (list) => list.map((r) => (r.id === id ? { id, ...data } : r)));
      supabase
        .from(table)
        .update({ data })
        .eq('id', id)
        .then(({ error }) => {
          if (error) console.error(`Supabase update ${table}:`, error.message);
        });
    };

    const deleteRow = (table, id) => {
      optimistic(table, (list) => list.filter((r) => r.id !== id));
      supabase
        .from(table)
        .delete()
        .eq('id', id)
        .then(({ error }) => {
          if (error) console.error(`Supabase delete ${table}:`, error.message);
        });
    };

    return {
      ...state,
      backend: 'supabase',

      addKitten: (k) => {
        const id = `${k.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${Date.now().toString(36)}`;
        insertRow('kittens', id, k, { prepend: false });
        return id;
      },
      updateKitten: (id, patch) => updateRow('kittens', id, patch),
      deleteKitten: (id) => deleteRow('kittens', id),

      addOrder: (order) => {
        const id = `VC-${Date.now().toString().slice(-6)}`;
        insertRow('orders', id, { ...order, status: 'New', date: new Date().toISOString() });
        return id;
      },
      updateOrder: (id, patch) => updateRow('orders', id, patch),
      deleteOrder: (id) => deleteRow('orders', id),

      addInquiry: (inq) =>
        insertRow('inquiries', `INQ-${Date.now().toString(36)}`, {
          ...inq,
          handled: false,
          date: new Date().toISOString(),
        }),
      updateInquiry: (id, patch) => updateRow('inquiries', id, patch),
      deleteInquiry: (id) => deleteRow('inquiries', id),

      addVideo: (video) => {
        const id = `VID-${Date.now().toString(36)}`;
        insertRow('videos', id, { ...video, date: new Date().toISOString() });
        return id;
      },
      updateVideo: (id, patch) => updateRow('videos', id, patch),
      deleteVideo: (id) => {
        const target = state.videos.find((v) => v.id === id);
        if (target?.storagePath) {
          supabase.storage.from(VIDEO_BUCKET).remove([target.storagePath]).catch(() => {});
        }
        deleteRow('videos', id);
      },
    };
  }, [state, fetchTable]);

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

/* ================= Local fallback mode ================= */
function usePersistent(key, initial) {
  const [value, setValue] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(key));
      return saved === null || saved === undefined ? initial : saved;
    } catch {
      return initial;
    }
  });
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);
  return [value, setValue];
}

function LocalData({ children }) {
  const [kittens, setKittens] = usePersistent('vc-kittens', seedKittens);
  const [orders, setOrders] = usePersistent('vc-orders', []);
  const [inquiries, setInquiries] = usePersistent('vc-inquiries', []);
  const [videos, setVideos] = usePersistent('vc-videos', []);

  const value = useMemo(
    () => ({
      kittens,
      orders,
      inquiries,
      videos,
      backend: 'local',

      addKitten: (k) => {
        const id = `${k.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${Date.now().toString(36)}`;
        setKittens((prev) => [...prev, { ...k, id }]);
        return id;
      },
      updateKitten: (id, patch) =>
        setKittens((prev) => prev.map((k) => (k.id === id ? { ...k, ...patch } : k))),
      deleteKitten: (id) => setKittens((prev) => prev.filter((k) => k.id !== id)),

      addOrder: (order) => {
        const id = `VC-${Date.now().toString().slice(-6)}`;
        setOrders((prev) => [
          { ...order, id, status: 'New', date: new Date().toISOString() },
          ...prev,
        ]);
        return id;
      },
      updateOrder: (id, patch) =>
        setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, ...patch } : o))),
      deleteOrder: (id) => setOrders((prev) => prev.filter((o) => o.id !== id)),

      addInquiry: (inq) =>
        setInquiries((prev) => [
          { ...inq, id: `INQ-${Date.now().toString(36)}`, handled: false, date: new Date().toISOString() },
          ...prev,
        ]),
      updateInquiry: (id, patch) =>
        setInquiries((prev) => prev.map((q) => (q.id === id ? { ...q, ...patch } : q))),
      deleteInquiry: (id) => setInquiries((prev) => prev.filter((q) => q.id !== id)),

      addVideo: (video) => {
        const id = `VID-${Date.now().toString(36)}`;
        setVideos((prev) => [{ ...video, id, date: new Date().toISOString() }, ...prev]);
        return id;
      },
      updateVideo: (id, patch) =>
        setVideos((prev) => prev.map((v) => (v.id === id ? { ...v, ...patch } : v))),
      deleteVideo: (id) => {
        setVideos((prev) => {
          const target = prev.find((v) => v.id === id);
          if (target?.type === 'file' && target.fileId) {
            deleteVideoBlob(target.fileId).catch(() => {});
          }
          return prev.filter((v) => v.id !== id);
        });
      },
    }),
    [kittens, orders, inquiries, videos]
  );

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export function DataProvider({ children }) {
  return supabase ? <SupabaseData>{children}</SupabaseData> : <LocalData>{children}</LocalData>;
}

export function useData() {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error('useData must be used within DataProvider');
  return ctx;
}
