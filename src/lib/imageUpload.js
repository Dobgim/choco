import { supabase, VIDEO_BUCKET } from './supabase.js';

// Phone photos are often 5–12 MB; resize/compress in the browser so
// uploads are fast and pages load quickly.
function compress(file, maxDim = 1400, quality = 0.85) {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      const scale = Math.min(1, maxDim / Math.max(img.width, img.height));
      const w = Math.round(img.width * scale);
      const h = Math.round(img.height * scale);
      const canvas = document.createElement('canvas');
      canvas.width = w;
      canvas.height = h;
      canvas.getContext('2d').drawImage(img, 0, 0, w, h);
      URL.revokeObjectURL(url);
      canvas.toBlob(
        (blob) => (blob ? resolve(blob) : reject(new Error('Could not process the image.'))),
        'image/jpeg',
        quality
      );
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('Could not read that image file.'));
    };
    img.src = url;
  });
}

/**
 * Uploads a photo and returns a URL usable in kitten `img` fields.
 * With Supabase connected the file is hosted publicly in storage;
 * otherwise it's inlined as a compressed data URL (browser-only mode).
 */
export async function uploadImage(file) {
  if (!file.type.startsWith('image/')) throw new Error('That file is not an image.');
  const blob = await compress(file);

  if (supabase) {
    const path = `images/img-${Date.now().toString(36)}.jpg`;
    const { error } = await supabase.storage
      .from(VIDEO_BUCKET)
      .upload(path, blob, { contentType: 'image/jpeg' });
    if (error) throw error;
    return supabase.storage.from(VIDEO_BUCKET).getPublicUrl(path).data.publicUrl;
  }

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(blob);
  });
}
