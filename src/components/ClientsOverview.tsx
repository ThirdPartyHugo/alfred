import React, { useState, useEffect } from 'react';
import { MoreVertical, TrendingUp, TrendingDown } from 'lucide-react';
import { supabase } from '../lib/supabase'; // Ensure your Supabase client is configured correctly

export default function ClientsOverview() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch clients from Supabase
  useEffect(() => {
    const fetchClients = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('clients')
        .select('*');

      if (error) {
        console.error('Error fetching clients:', error);
      } else {
        setClients(data);
      }
      setLoading(false);
    };

    fetchClients();
  }, []);

  return (
    <div className="bg-white rounded-xl shadow-sm">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Active Clients</h2>
          <button className="text-gray-400 hover:text-gray-600">
            <MoreVertical className="h-5 w-5" />
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
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Balance</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Profit</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Performance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {clients.map((client) => (
                <tr key={client.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <img
                        className="h-10 w-10 rounded-full"
                        src={client.image || 'https://via.placeholder.com/64'}
                        alt="Client logo"
                      />
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{client.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        client.status === 'Active'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {client.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${client.balance.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div
                      className={`flex items-center text-sm ${
                        client.profit >= 0 ? 'text-green-600' : 'text-red-600'
                      }`}
                    >
                      {client.profit >= 0 ? (
                        <TrendingUp className="h-4 w-4 mr-1" />
                      ) : (
                        <TrendingDown className="h-4 w-4 mr-1" />
                      )}
                      ${Math.abs(client.profit).toLocaleString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          client.performance >= 90
                            ? 'bg-green-500'
                            : client.performance >= 70
                            ? 'bg-yellow-500'
                            : 'bg-red-500'
                        }`}
                        style={{ width: `${client.performance}%` }}
                      ></div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="p-6 text-center text-gray-500">No clients found.</div>
        )}
      </div>
    </div>
  );
}
