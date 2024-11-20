import React from 'react';
import { Bell, Search, Settings, LogOut } from 'lucide-react';
import { supabase } from '../lib/supabase'; // Adjust the path to your Supabase client
import { useNavigate } from 'react-router-dom'; // If you're using react-router-dom for navigation

export default function Header() {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('Error signing out:', error.message);
        return;
      }
      // Redirect to login or home page after sign out
      navigate('/login');
    } catch (err) {
      console.error('Unexpected error signing out:', err);
    }
  };

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center flex-1">
          <div className="relative w-96">
            <input
              type="text"
              placeholder="Search clients, campaigns, or analytics..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <button className="relative p-2 text-gray-400 hover:text-gray-600 focus:outline-none">
            <Bell className="h-6 w-6" />
            <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
          </button>
          <button className="p-2 text-gray-400 hover:text-gray-600 focus:outline-none">
            <Settings className="h-6 w-6" />
          </button>
          <div className="flex items-center space-x-3">
            <img
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt="Profile"
              className="h-8 w-8 rounded-full"
            />
            <div className="hidden md:block">
              <p className="text-sm font-medium">John Doe</p>
              <p className="text-xs text-gray-500">Agency Owner</p>
            </div>
          </div>
          <button
            onClick={handleSignOut}
            className="flex items-center p-2 text-gray-400 hover:text-red-500 focus:outline-none"
          >
            <LogOut className="h-6 w-6" />
            <span className="ml-2 hidden md:block text-sm font-medium">Sign Out</span>
          </button>
        </div>
      </div>
    </header>
  );
}
