import { useRef, useState } from 'react';
import VideoPlayer from '../components/VideoPlayer.jsx';
import { putVideoBlob } from '../lib/videoStore.js';
import { supabase, VIDEO_BUCKET } from '../lib/supabase.js';
import { useData } from '../context/DataContext.jsx';
import ConfirmDelete from './ConfirmDelete.jsx';

const MAX_MB = 200;

export default function AdminVideos() {
  const { videos, addVideo, deleteVideo } = useData();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [url, setUrl] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [ok, setOk] = useState('');
  const fileRef = useRef(null);

  const reset = () => {
    setTitle('');
    setDescription('');
    setUrl('');
    if (fileRef.current) fileRef.current.value = '';
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setOk('');
    const file = fileRef.current?.files?.[0];

    if (!file && !url.trim()) {
      setError('Choose a video file or paste a video/YouTube URL.');
      return;
    }

    try {
      if (file) {
        if (!file.type.startsWith('video/')) {
          setError('That file is not a video.');
          return;
        }
        if (file.size > MAX_MB * 1024 * 1024) {
          setError(`File is too large — keep uploads under ${MAX_MB} MB.`);
          return;
        }
        setBusy(true);
        if (supabase) {
          // Supabase Storage: the video is hosted publicly for all visitors.
          const ext = file.name.split('.').pop()?.toLowerCase() || 'mp4';
          const path = `clip-${Date.now().toString(36)}.${ext}`;
          const { error: upErr } = await supabase.storage
            .from(VIDEO_BUCKET)
            .upload(path, file, { contentType: file.type });
          if (upErr) throw upErr;
          const { data: pub } = supabase.storage.from(VIDEO_BUCKET).getPublicUrl(path);
          addVideo({
            title: title.trim() || file.name,
            description: description.trim(),
            type: 'url',
            url: pub.publicUrl,
            storagePath: path,
            size: file.size,
          });
        } else {
          const fileId = `blob-${Date.now().toString(36)}`;
          await putVideoBlob(fileId, file);
          addVideo({
            title: title.trim() || file.name,
            description: description.trim(),
            type: 'file',
            fileId,
            size: file.size,
          });
        }
        setOk(`Uploaded "${title.trim() || file.name}".`);
      } else {
        addVideo({
          title: title.trim() || 'Untitled video',
          description: description.trim(),
          type: 'url',
          url: url.trim(),
        });
        setOk('Video link added.');
      }
      reset();
    } catch (err) {
      setError(`Upload failed: ${err?.message || 'storage error'}`);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div>
      <header className="admin-head">
        <div>
          <h1>Videos</h1>
          <p>Upload clips or add YouTube links — they appear in the website Gallery.</p>
        </div>
      </header>

      <form className="admin-panel admin-form" onSubmit={onSubmit}>
        <h2>Add a video</h2>
        {error && <p className="admin-login__error" role="alert">{error}</p>}
        {ok && <p className="form__success" role="status">{ok}</p>}
        <div className="admin-form__grid">
          <label>
            Title
            <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Aurora's first pounce" />
          </label>
          <label>
            Upload video file (max {MAX_MB} MB)
            <input ref={fileRef} type="file" accept="video/*" />
          </label>
          <label>
            Or YouTube / video URL
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://youtube.com/watch?v=… or https://…/clip.mp4"
            />
          </label>
        </div>
        <label>
          Description (optional)
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows="2" />
        </label>
        <div>
          <button type="submit" className="btn btn--gold" disabled={busy}>
            {busy ? 'Uploading…' : 'Add Video'}
          </button>
        </div>
      </form>

      {videos.length === 0 ? (
        <div className="admin-panel">
          <p className="admin-empty">No videos yet — upload your first clip above.</p>
        </div>
      ) : (
        <div className="admin-video-grid">
          {videos.map((v) => (
            <article className="admin-panel admin-video" key={v.id}>
              <VideoPlayer video={v} />
              <div className="admin-video__body">
                <div>
                  <b>{v.title}</b>
                  {v.description && <p>{v.description}</p>}
                  <span className="admin-order__date">
                    {new Date(v.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    {v.type === 'file'
                      ? ` · uploaded file (${(v.size / (1024 * 1024)).toFixed(1)} MB)`
                      : ' · linked'}
                  </span>
                </div>
                <ConfirmDelete onConfirm={() => deleteVideo(v.id)} />
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
