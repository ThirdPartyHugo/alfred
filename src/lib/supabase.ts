import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://xtjlzfxvqpfxkqxrqwzr.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh0amx6Znh2cXBmeGtxeHJxd3pyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDk4NjQwMDAsImV4cCI6MjAyNTQ0MDAwMH0.H6FKZtZXq9XqHm3PjL_bXAkRB_7RXwFq-qJYZ9nqAXM';

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase configuration');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
});