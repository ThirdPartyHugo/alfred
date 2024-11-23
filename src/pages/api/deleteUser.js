// pages/api/deleteUser.js

import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client with service role key
const supabaseAdmin = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_ANON_KEY
);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { userId } = req.body;

    // Delete user from auth.users using admin client
    const { error } = await supabaseAdmin.auth.admin.deleteUser(userId);

    if (error) {
      console.error('Error deleting user from auth:', error);
      return res.status(400).json({ error: error.message });
    }

    // Delete the user from your 'users' table
    const { error: deleteError } = await supabaseAdmin
      .from('users')
      .delete()
      .eq('auth_user_id', userId);

    if (deleteError) {
      console.error('Error deleting user from users table:', deleteError);
      return res.status(400).json({ error: deleteError.message });
    }

    return res.status(200).json({ message: 'User deleted successfully' });
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).json({ error: 'Method not allowed' });
  }
}
