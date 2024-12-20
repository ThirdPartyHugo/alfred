import React, { useState, useEffect } from 'react';
import { Users, UserPlus, Trash2 } from 'lucide-react';
import { useAuthStore } from '../store/authStore'; // Import the authStore
import { createClient } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';

// Create a Supabase admin client


export default function TeamManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newCompanyName, setNewCompanyName] = useState('');

  const { signUp } = useAuthStore(); // Access signUp from authStore

  // Fetch users from Supabase
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('users')
        .select('id, email, created_at');
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
      // Step 1: Sign up the user using Supabase
      const { error } = await supabase.auth.signUp({
        email: newEmail,
        password: newPassword,
        options: { data: { company_name: newCompanyName } },
      });
  
      if (error) {
        throw new Error(`SignUp Error: ${error.message}`);
      }
  
      console.log('User signed up successfully.');
  
      // Step 2: Reload the users from the database
      const { data, error: fetchError } = await supabase
        .from('users')
        .select('id, email, created_at');
      if (fetchError) {
        throw new Error(`Fetch Users Error: ${fetchError.message}`);
      }
  
      console.log('Fetched updated users:', data);
  
      // Update the state with the new list of users
      setUsers(data);
  
      // Reset modal inputs and close modal
      setNewEmail('');
      setNewPassword('');
      setNewCompanyName('');
      setShowModal(false);
    } catch (error) {
      console.error('Error adding user:', error.message);
    }
  };
  
  // Delete a user using Supabase admin API
  const deleteUser = async (userId: string) => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.admin.deleteUser(userId);
      if (error) {
        throw new Error(error.message);
      }

      // Remove the user from the local state after successful deletion
      setUsers(users.filter((user) => user.id !== userId));
      console.log(`User with ID ${userId} deleted successfully.`);
    } catch (error: any) {
      console.error('Error deleting user:', error.message);
    } finally {
      setLoading(false);
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
            <input
              type="text"
              placeholder="Company Name"
              value={newCompanyName}
              onChange={(e) => setNewCompanyName(e.target.value)}
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
