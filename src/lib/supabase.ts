import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://wdijqgwluenhetfbgnzv.supabase.co';
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

// /api/deleteUser.js (Node.js serverless API or Next.js API route)
// Initialize Supabase Admin client
const supabaseAdmin = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_ANON_KEY // Ensure this key is stored securely
);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { userId } = req.body;

  try {
    // Delete the user from auth.users
    const { error: deleteAuthError } = await supabaseAdmin.auth.admin.deleteUser(userId);
    if (deleteAuthError) {
      return res.status(400).json({ error: deleteAuthError.message });
    }

    // Delete the user from public.users table
    const { error: deletePublicError } = await supabaseAdmin
      .from('users')
      .delete()
      .eq('id', userId);

    if (deletePublicError) {
      return res.status(400).json({ error: deletePublicError.message });
    }

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
