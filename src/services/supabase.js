import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
export const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

// // Persistent client (default behavior)
const supabase = createClient(supabaseUrl, supabaseKey);

// Temporary client (session-based)
export const supabaseSession = createClient(supabaseUrl, supabaseKey, {
  auth: { storage: sessionStorage },
});

export default supabase;
