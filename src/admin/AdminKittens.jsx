import { useState } from 'react';
import CatArt from '../components/CatArt.jsx';
import { useData } from '../context/DataContext.jsx';

const photoOptions = [
  'silver.jpg', 'tabby-cujo.jpg', 'white.jpg', 'atticus.jpg', 'bluesmoke.jpg',
  'redkitten.jpg', 'karin.jpg', 'balder.jpg', 'fig.jpg', 'hero.jpg',
  'classic.jpg', 'mitts.jpg', 'home.jpg', 'kittens-group.jpg', 'kittens-mixed.jpg',
  'kitten-blue.jpg', 'meowing.jpg', 'profile.jpg', 'young.jpg', 'garfield.jpg',
];

const emptyForm = {
  name: '', sex: 'Female', color: '', age: '', price: 2500, status: 'Available',
  img: photoOptions[0], temperament: '', parents: '', ready: 'Ready to go home at 12 weeks',
};

export default function AdminKittens() {
  const { kittens, addKitten, updateKitten, deleteKitten } = useData();
  const [editingId, setEditingId] = useState(null); // null = closed, 'new' = adding
  const [form, setForm] = useState(emptyForm);
  const [customUrl, setCustomUrl] = useState('');

  const openNew = () => {
    setForm(emptyForm);
    setCustomUrl('');
    setEditingId('new');
  };
  const openEdit = (k) => {
    setForm({ ...emptyForm, ...k });
    setCustomUrl(/^https?:\/\//.test(k.img) ? k.img : '');
    setEditingId(k.id);
  };
  const close = () => setEditingId(null);
  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const onSubmit = (e) => {
    e.preventDefault();
    const img = customUrl.trim() || form.img;
    const payload = { ...form, img, price: Number(form.price) || 0 };
    if (editingId === 'new') addKitten(payload);
    else updateKitten(editingId, payload);
    close();
  };

  const onDelete = (k) => {
    if (window.confirm(`Delete ${k.name}? This cannot be undone.`)) deleteKitten(k.id);
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
              Photo
              <select value={form.img} onChange={set('img')} disabled={!!customUrl.trim()}>
                {photoOptions.map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </label>
            <label>
              Or photo URL (overrides)
              <input
                value={customUrl}
                onChange={(e) => setCustomUrl(e.target.value)}
                placeholder="https://…"
                type="url"
              />
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
          <div className="admin-form__preview">
            <span>Photo preview:</span>
            <div className="admin-form__thumb">
              <CatArt img={customUrl.trim() || form.img} label="Preview" />
            </div>
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
            <button type="submit" className="btn btn--gold">
              {editingId === 'new' ? 'Add Kitten' : 'Save Changes'}
            </button>
            <button type="button" className="btn btn--outline" onClick={close}>
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
                    <button className="admin-link admin-link--danger" onClick={() => onDelete(k)}>Delete</button>
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
