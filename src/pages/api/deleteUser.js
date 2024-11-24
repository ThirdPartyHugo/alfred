// server.js
const express = require('express');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Initialize Supabase client with service role key
const supabase = createClient('https://your-project.supabase.co', process.env.SUPABASE_SERVICE_ROLE_KEY);

// Middleware to parse JSON bodies
app.use(express.json());

// Endpoint to delete a user
app.delete('/delete-user', async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    return res.status(400).json({ error: 'User ID is required' });
  }

  try {
    const { error } = await supabase.auth.admin.deleteUser(userId);
    if (error) {
      throw error;
    }
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
