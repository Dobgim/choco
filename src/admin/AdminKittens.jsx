import { useEffect, useRef, useState } from 'react';
import CatArt from '../components/CatArt.jsx';
import { uploadImage, uploadVideoFile } from '../lib/imageUpload.js';
import { useData } from '../context/DataContext.jsx';
import ConfirmDelete from './ConfirmDelete.jsx';

const emptyForm = {
  name: '', sex: 'Female', color: '', age: '', price: 2500, status: 'Available',
  img: 'hero.jpg', photos: [], video: null,
  temperament: '', parents: '', ready: 'Ready to go home at 12 weeks',
};

export default function AdminKittens() {
  const { kittens, addKitten, updateKitten, deleteKitten } = useData();
  const [editingId, setEditingId] = useState(null); // null = closed, 'new' = adding
  const [form, setForm] = useState(emptyForm);
  const [pending, setPending] = useState([]); // new photos: [{ file, preview }]
  const [videoFile, setVideoFile] = useState(null);
  const [removeVideo, setRemoveVideo] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const fileRef = useRef(null);
  const videoRef = useRef(null);

  // Revoke leftover preview URLs when the page unmounts.
  const pendingRef = useRef(pending);
  pendingRef.current = pending;
  useEffect(
    () => () => pendingRef.current.forEach((p) => URL.revokeObjectURL(p.preview)),
    []
  );

  const resetMedia = () => {
    setPending((prev) => {
      prev.forEach((p) => URL.revokeObjectURL(p.preview));
      return [];
    });
    setVideoFile(null);
    setRemoveVideo(false);
    if (fileRef.current) fileRef.current.value = '';
    if (videoRef.current) videoRef.current.value = '';
  };
  const openNew = () => {
    setForm(emptyForm);
    resetMedia();
    setError('');
    setEditingId('new');
  };
  const openEdit = (k) => {
    // Older records only have a cover `img`; surface it in the photo grid.
    const photos = k.photos?.length ? k.photos : k.img ? [k.img] : [];
    setForm({ ...emptyForm, ...k, photos });
    resetMedia();
    setError('');
    setEditingId(k.id);
  };
  const close = () => {
    resetMedia();
    setEditingId(null);
  };
  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const onPickPhotos = (e) => {
    const files = Array.from(e.target.files || []).filter((f) => f.type.startsWith('image/'));
    if (files.length) {
      setPending((prev) => [
        ...prev,
        ...files.map((file) => ({ file, preview: URL.createObjectURL(file) })),
      ]);
      setError('');
    }
    e.target.value = '';
  };
  const removePendingPhoto = (i) =>
    setPending((prev) => {
      URL.revokeObjectURL(prev[i].preview);
      return prev.filter((_, x) => x !== i);
    });
  const removeExistingPhoto = (url) =>
    setForm((f) => ({ ...f, photos: (f.photos || []).filter((p) => p !== url) }));

  const onPickVideo = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('video/')) {
      setError('That file is not a video.');
      return;
    }
    setVideoFile(file);
    setRemoveVideo(false);
    setError('');
  };
  const clearVideo = () => {
    setVideoFile(null);
    setRemoveVideo(true);
    if (videoRef.current) videoRef.current.value = '';
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setBusy(true);
    try {
      const uploaded = [];
      for (const p of pending) uploaded.push(await uploadImage(p.file));
      const photos = [...(form.photos || []), ...uploaded];
      const img = photos[0] || form.img;

      let video = removeVideo ? null : form.video || null;
      if (videoFile) video = await uploadVideoFile(videoFile);

      const payload = { ...form, photos, img, video, price: Number(form.price) || 0 };
      if (editingId === 'new') addKitten(payload);
      else updateKitten(editingId, payload);
      close();
    } catch (err) {
      setError(`Upload failed: ${err?.message || 'unknown error'}`);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div>
      <header className="admin-head">
        <div>
          <h1>Kittens</h1>
          <p>Add, edit, or remove listings — changes appear on the website instantly.</p>
        </div>
        <button className="btn btn--gold" onClick={openNew}>+ Add Kitten</button>
      </header>

      {editingId !== null && (
        <form className="admin-panel admin-form" onSubmit={onSubmit}>
          <h2>{editingId === 'new' ? 'New kitten' : `Editing ${form.name}`}</h2>
          <div className="admin-form__grid">
            <label>
              Name
              <input value={form.name} onChange={set('name')} required />
            </label>
            <label>
              Sex
              <select value={form.sex} onChange={set('sex')}>
                <option>Female</option>
                <option>Male</option>
              </select>
            </label>
            <label>
              Color
              <input value={form.color} onChange={set('color')} required placeholder="e.g. Silver Tabby" />
            </label>
            <label>
              Age
              <input value={form.age} onChange={set('age')} required placeholder="e.g. 10 weeks" />
            </label>
            <label>
              Price (USD)
              <input type="number" min="0" step="50" value={form.price} onChange={set('price')} required />
            </label>
            <label>
              Status
              <select value={form.status} onChange={set('status')}>
                <option>Available</option>
                <option>Reserved</option>
                <option>Sold</option>
              </select>
            </label>
            <label>
              Parents
              <input value={form.parents} onChange={set('parents')} placeholder="Sire × Dam" />
            </label>
            <label>
              Go-home note
              <input value={form.ready} onChange={set('ready')} />
            </label>
          </div>
          <label>
            Temperament / description
            <textarea value={form.temperament} onChange={set('temperament')} rows="3" />
          </label>
          {error && <p className="admin-login__error" role="alert">{error}</p>}

          <div className="admin-media">
            <span className="admin-media__label">Photos — the first one is the cover</span>
            <div className="admin-photo-grid">
              {(form.photos || []).map((url) => (
                <div className="admin-photo-grid__item" key={url}>
                  <CatArt img={url} label="Kitten photo" />
                  <button type="button" aria-label="Remove photo" onClick={() => removeExistingPhoto(url)}>
                    ×
                  </button>
                </div>
              ))}
              {pending.map((p, i) => (
                <div className="admin-photo-grid__item admin-photo-grid__item--new" key={p.preview}>
                  <img src={p.preview} alt="New photo preview" />
                  <button type="button" aria-label="Remove photo" onClick={() => removePendingPhoto(i)}>
                    ×
                  </button>
                </div>
              ))}
              <button
                type="button"
                className="admin-photo-grid__add"
                onClick={() => fileRef.current?.click()}
              >
                + Add Photos
              </button>
            </div>
            <input ref={fileRef} type="file" accept="image/*" multiple hidden onChange={onPickPhotos} />

            <span className="admin-media__label">Video (optional)</span>
            <div className="admin-media__video">
              <span className="admin-media__file">
                {videoFile
                  ? `New video: ${videoFile.name}`
                  : form.video && !removeVideo
                    ? 'Video attached'
                    : 'No video'}
              </span>
              <button
                type="button"
                className="btn btn--outline"
                style={{ padding: '9px 18px', fontSize: '0.74rem' }}
                onClick={() => videoRef.current?.click()}
              >
                {videoFile || (form.video && !removeVideo) ? 'Replace Video' : 'Upload Video'}
              </button>
              {(videoFile || (form.video && !removeVideo)) && (
                <button
                  type="button"
                  className="btn btn--outline"
                  style={{ padding: '9px 18px', fontSize: '0.74rem' }}
                  onClick={clearVideo}
                >
                  Remove Video
                </button>
              )}
            </div>
            <input ref={videoRef} type="file" accept="video/*" hidden onChange={onPickVideo} />
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
            <button type="submit" className="btn btn--gold" disabled={busy}>
              {busy ? 'Uploading…' : editingId === 'new' ? 'Add Kitten' : 'Save Changes'}
            </button>
            <button type="button" className="btn btn--outline" onClick={close} disabled={busy}>
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="admin-table-wrap admin-panel">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Photo</th>
              <th>Name</th>
              <th>Sex</th>
              <th>Color</th>
              <th>Age</th>
              <th>Price</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {kittens.map((k) => (
              <tr key={k.id}>
                <td>
                  <div className="admin-thumb">
                    <CatArt img={k.img} palette={k.palette} label={k.name} />
                  </div>
                </td>
                <td><b>{k.name}</b></td>
                <td>{k.sex}</td>
                <td>{k.color}</td>
                <td>{k.age}</td>
                <td>${Number(k.price).toLocaleString()}</td>
                <td>
                  <span className={`admin-badge admin-badge--${k.status === 'Available' ? 'completed' : 'new'}`}>
                    {k.status}
                  </span>
                </td>
                <td>
                  <div className="admin-actions">
                    <button className="admin-link" onClick={() => openEdit(k)}>Edit</button>
                    <ConfirmDelete onConfirm={() => deleteKitten(k.id)} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {kittens.length === 0 && <p className="admin-empty">No kittens yet — add your first listing.</p>}
      </div>
    </div>
  );
}
