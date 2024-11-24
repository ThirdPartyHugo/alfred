import React, { useState, useEffect } from 'react';
import { MoreVertical, TrendingUp, TrendingDown } from 'lucide-react';
import { supabase } from '../lib/supabase'; // Ensure your Supabase client is configured correctly

export default function ClientsOverview() {
  const [clients, setClients] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [newClientName, setNewClientName] = useState('');
  const [newBusinessName, setNewBusinessName] = useState('');
  const [selectedUsers, setSelectedUsers] = useState([]);

  // Fetch clients from Supabase
  useEffect(() => {
    const fetchClients = async () => {
      setLoading(true);
      const { data, error } = await supabase.from('clients').select('*');
      if (error) {
        console.error('Error fetching clients:', error);
      } else {
        setClients(data);
      }
      setLoading(false);
    };

    const fetchUsers = async () => {
      const { data, error } = await supabase.from('users').select('id, email');
      if (error) {
        console.error('Error fetching users:', error);
      } else {
        setUsers(data);
      }
    };

    fetchClients();
    fetchUsers();
  }, []);

  // Handle adding a new client
  const addClient = async () => {
    try {
      const { data: newClient, error } = await supabase
        .from('clients')
        .insert({
          name: newClientName,
          business_name: newBusinessName,
        })
        .select();

      if (error) {
        throw error;
      }

      // Assign selected users to the new client
      const clientId = newClient[0]?.id; // Get the new client ID
      const assignments = selectedUsers.map((userId) => ({
        client_id: clientId,
        user_id: userId,
      }));

      if (assignments.length > 0) {
        const { error: assignmentError } = await supabase
          .from('user_clients')
          .insert(assignments);

        if (assignmentError) {
          throw assignmentError;
        }
      }

      // Fetch updated clients
      const { data: updatedClients } = await supabase.from('clients').select('*');
      setClients(updatedClients);

      // Reset modal state
      setNewClientName('');
      setNewBusinessName('');
      setSelectedUsers([]);
      setShowModal(false);
    } catch (error) {
      console.error('Error adding client:', error.message);
    }
  };

  const toggleUserSelection = (userId) => {
    setSelectedUsers((prevSelected) =>
      prevSelected.includes(userId)
        ? prevSelected.filter((id) => id !== userId)
        : [...prevSelected, userId]
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-sm">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Active Clients</h2>
          <button
            onClick={() => setShowModal(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Add Client
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        {loading ? (
          <div className="p-6 text-center text-gray-500">Loading clients...</div>
        ) : clients.length > 0 ? (
          <table className="w-full">
            <thead>
              <tr className="text-left bg-gray-50">
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Business</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {clients.map((client) => (
                <tr key={client.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{client.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-600">{client.business_name}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="p-6 text-center text-gray-500">No clients found.</div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-lg font-semibold mb-4">Add New Client</h3>
            <input
              type="text"
              placeholder="Client Name"
              value={newClientName}
              onChange={(e) => setNewClientName(e.target.value)}
              className="mb-3 w-full px-4 py-2 border rounded-lg"
            />
            <input
              type="text"
              placeholder="Business Name"
              value={newBusinessName}
              onChange={(e) => setNewBusinessName(e.target.value)}
              className="mb-3 w-full px-4 py-2 border rounded-lg"
            />
            <div className="mb-3">
              <h4 className="text-sm font-semibold mb-2">Assign Users</h4>
              <div className="max-h-40 overflow-y-auto border rounded-lg p-3">
                {users.map((user) => (
                  <div key={user.id} className="flex items-center mb-2">
                    <input
                      type="checkbox"
                      id={`user-${user.id}`}
                      checked={selectedUsers.includes(user.id)}
                      onChange={() => toggleUserSelection(user.id)}
                      className="mr-2"
                    />
                    <label htmlFor={`user-${user.id}`} className="text-sm text-gray-700">
                      {user.email}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={addClient}
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
