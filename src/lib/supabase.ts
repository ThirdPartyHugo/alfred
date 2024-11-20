import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://xtjlzfxvqpfxkqxrqwzr.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndkaWpxZ3dsdWVuaGV0ZmJnbnp2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzIxMzAwMDQsImV4cCI6MjA0NzcwNjAwNH0.3HXqU5rV6fP51mDcgoAidmdM6rFfb8CX0kXsakz6hbo';

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