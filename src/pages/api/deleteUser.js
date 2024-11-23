// pages/api/deleteUser.js

import supabaseAdmin from '../../lib/supabaseAdmin';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { userId } = req.body;
    console.log(userId);

    // Delete user from auth.users using the service role key
    const { data, error } = await supabaseAdmin.auth.admin.deleteUser(userId);

    if (error) {
      console.error('Error deleting user:', error);
      return res.status(400).json({ error: error.message });
    }

    // Optionally, delete the user from your 'users' table
    const { error: deleteError } = await supabaseAdmin
      .from('users')
      .delete()
      .eq('id', userId);

    if (deleteError) {
      console.error('Error deleting user from users table:', deleteError);
      return res.status(400).json({ error: deleteError.message });
    }

    return res.status(200).json({ message: 'User deleted successfully' });
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
