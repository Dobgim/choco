import { useEffect, useState } from 'react';
import { getVideoBlob } from '../lib/videoStore.js';

function youtubeId(url) {
  const m = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{11})/
  );
  return m ? m[1] : null;
}

/**
 * Renders a video from DataContext metadata: an uploaded file (blob in
 * IndexedDB), a YouTube link (iframe embed), or a direct video URL.
 */
export default function VideoPlayer({ video }) {
  const [blobUrl, setBlobUrl] = useState(null);
  const [missing, setMissing] = useState(false);

  useEffect(() => {
    if (video.type !== 'file') return undefined;
    let url;
    let cancelled = false;
    getVideoBlob(video.fileId)
      .then((blob) => {
        if (cancelled) return;
        if (!blob) {
          setMissing(true);
          return;
        }
        url = URL.createObjectURL(blob);
        setBlobUrl(url);
      })
      .catch(() => setMissing(true));
    return () => {
      cancelled = true;
      if (url) URL.revokeObjectURL(url);
    };
  }, [video]);

  if (video.type === 'url') {
    const yt = youtubeId(video.url);
    if (yt) {
      return (
        <iframe
          className="video-frame"
          src={`https://www.youtube-nocookie.com/embed/${yt}`}
          title={video.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      );
    }
    return <video className="video-frame" src={video.url} controls preload="metadata" />;
  }

  if (missing) {
    return (
      <div className="video-frame video-frame--missing">
        Video file not available in this browser.
      </div>
    );
  }

  return blobUrl ? (
    <video className="video-frame" src={blobUrl} controls preload="metadata" />
  ) : (
    <div className="video-frame video-frame--missing">Loading video…</div>
  );
}
