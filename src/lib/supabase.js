import { createClient } from '@supabase/supabase-js';

// Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env (local) and in
// Vercel → Project Settings → Environment Variables (production).
// When they're missing, the site falls back to browser-only storage.
const url = import.meta.env.VITE_SUPABASE_URL;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = url && anonKey ? createClient(url, anonKey) : null;
export const VIDEO_BUCKET = 'videos';
