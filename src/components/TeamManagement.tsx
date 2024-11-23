import React, { useState, useEffect } from 'react';
import { Users, UserPlus, MoreVertical, Trash2 } from 'lucide-react';
import { supabase } from '../lib/supabase.ts';

export default function TeamManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');

  // Fetch users from Supabase
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      const { data, error } = await supabase.from('users').select('id, email, created_at');
      if (error) {
        console.error('Error fetching users:', error);
      } else {
        setUsers(data);
      }
      setLoading(false);
    };
    fetchUsers();
  }, []);

  // Add a new user
  const addUser = async () => {
    try {
      const { user, error } = await supabase.auth.signUp({
        email: newEmail,
        password: newPassword,
      });

      if (error) throw error;

      // Add user to public.users
      await supabase.from('users').insert({
        id: user.id,
        email: newEmail,
        created_at: new Date().toISOString(),
      });

      setUsers((prev) => [...prev, { id: user.id, email: newEmail, created_at: new Date() }]);
      setNewEmail('');
      setNewPassword('');
      setShowModal(false);
    } catch (error) {
      console.error('Error adding user:', error.message);
    }
  };

  // Delete a user
  const deleteUser = async (userId) => {
    try {
      const { error: authError } = await supabase.auth.admin.deleteUser(userId);
      if (authError) throw authError;
  
      // Delete from public.users
      const { error: publicError } = await supabase.from('users').delete().eq('id', userId);
      if (publicError) throw publicError;
  
      setUsers((prev) => prev.filter((user) => user.id !== userId));
    } catch (error) {
      console.error('Error deleting user:', error.message);
    }
  };
  

  return (
    <div className="bg-white rounded-xl shadow-sm">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Users className="h-6 w-6 text-blue-600" />
            <h2 className="text-lg font-semibold text-gray-900">Team Management</h2>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <UserPlus className="h-4 w-4" />
            <span className="text-sm font-medium">Add Team Member</span>
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        {loading ? (
          <div className="p-6 text-center text-gray-500">Loading users...</div>
        ) : users.length > 0 ? (
          <table className="w-full">
            <thead>
              <tr className="text-left bg-gray-50">
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date Created
                </th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{user.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-600">
                      {new Date(user.created_at).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => deleteUser(user.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="p-6 text-center text-gray-500">No users found.</div>
        )}
      </div>

      {/* Add User Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Add Team Member</h3>
            <input
              type="email"
              placeholder="Email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              className="mb-3 w-full px-4 py-2 border rounded-lg"
            />
            <input
              type="password"
              placeholder="Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="mb-3 w-full px-4 py-2 border rounded-lg"
            />
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={addUser}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}