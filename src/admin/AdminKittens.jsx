import { useEffect, useRef, useState } from 'react';
import CatArt from '../components/CatArt.jsx';
import { uploadImage } from '../lib/imageUpload.js';
import { useData } from '../context/DataContext.jsx';

const emptyForm = {
  name: '', sex: 'Female', color: '', age: '', price: 2500, status: 'Available',
  img: 'hero.jpg', temperament: '', parents: '', ready: 'Ready to go home at 12 weeks',
};

export default function AdminKittens() {
  const { kittens, addKitten, updateKitten, deleteKitten } = useData();
  const [editingId, setEditingId] = useState(null); // null = closed, 'new' = adding
  const [form, setForm] = useState(emptyForm);
  const [photoFile, setPhotoFile] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const fileRef = useRef(null);

  useEffect(() => {
    // Free the temporary preview URL when it's replaced or unmounted.
    return () => {
      if (photoPreview) URL.revokeObjectURL(photoPreview);
    };
  }, [photoPreview]);

  const resetPhoto = () => {
    setPhotoFile(null);
    setPhotoPreview(null);
    if (fileRef.current) fileRef.current.value = '';
  };
  const openNew = () => {
    setForm(emptyForm);
    resetPhoto();
    setError('');
    setEditingId('new');
  };
  const openEdit = (k) => {
    setForm({ ...emptyForm, ...k });
    resetPhoto();
    setError('');
    setEditingId(k.id);
  };
  const close = () => {
    resetPhoto();
    setEditingId(null);
  };
  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const onPickPhoto = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPhotoFile(file);
    setPhotoPreview(URL.createObjectURL(file));
    setError('');
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      let img = form.img;
      if (photoFile) {
        setBusy(true);
        img = await uploadImage(photoFile);
      }
      const payload = { ...form, img, price: Number(form.price) || 0 };
      if (editingId === 'new') addKitten(payload);
      else updateKitten(editingId, payload);
      close();
    } catch (err) {
      setError(`Photo upload failed: ${err?.message || 'unknown error'}`);
    } finally {
      setBusy(false);
    }
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
          <div className="admin-form__preview admin-photo-picker">
            <div className="admin-form__thumb admin-photo-picker__thumb">
              {photoPreview ? (
                <img src={photoPreview} alt="New photo preview" />
              ) : (
                <CatArt img={form.img} label="Current photo" />
              )}
            </div>
            <div className="admin-photo-picker__controls">
              <span>{photoPreview ? 'New photo selected' : editingId === 'new' ? 'Add a photo' : 'Current photo'}</span>
              <input
                ref={fileRef}
                id="kitten-photo-input"
                type="file"
                accept="image/*"
                onChange={onPickPhoto}
                hidden
              />
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                <button
                  type="button"
                  className="btn btn--outline"
                  style={{ padding: '10px 20px', fontSize: '0.76rem' }}
                  onClick={() => fileRef.current?.click()}
                >
                  {photoPreview ? 'Choose a Different Photo' : 'Upload Photo'}
                </button>
                {photoPreview && (
                  <button
                    type="button"
                    className="btn btn--outline"
                    style={{ padding: '10px 20px', fontSize: '0.76rem' }}
                    onClick={resetPhoto}
                  >
                    Keep Previous Photo
                  </button>
                )}
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
            <button type="submit" className="btn btn--gold" disabled={busy}>
              {busy ? 'Uploading photo…' : editingId === 'new' ? 'Add Kitten' : 'Save Changes'}
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
