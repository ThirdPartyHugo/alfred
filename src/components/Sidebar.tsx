import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Brain, BarChart3, Users, FileText, Calendar, Settings, HelpCircle } from 'lucide-react';

export default function Sidebar() {
  const navigate = useNavigate(); // Initialize the navigate function

  return (
    <aside className="w-64 bg-white border-r border-gray-200 py-6 flex flex-col">
      <div className="px-6 mb-8">
        <div className="flex items-center space-x-3">
          <Brain className="h-8 w-8 text-blue-600" />
          <span className="text-2xl font-bold text-gray-900">Alfred</span>
        </div>
      </div>

      <nav className="flex-1 px-3">
        <div className="space-y-1">
          {[
            { name: 'Dashboard', icon: BarChart3, route: '/dashboard' },
            { name: 'Clients', icon: Users, route: '/clients' },
            { name: 'Documents', icon: FileText, route: '/documents' },
            { name: 'Calendar', icon: Calendar, route: '/calendar' },
          ].map((item) => (
            <button
              key={item.name}
              onClick={() => navigate(item.route)} // Use navigate for routing
              className="flex items-center w-full px-3 py-2 text-sm font-medium rounded-lg text-gray-700 hover:bg-gray-50"
            >
              <item.icon className="mr-3 h-5 w-5 text-gray-400" />
              {item.name}
            </button>
          ))}
        </div>
      </nav>

      <div className="px-3 mt-auto">
        <div className="space-y-1">
          {[
            { name: 'Settings', icon: Settings, route: '/settings' },
            { name: 'Help', icon: HelpCircle, route: '/help' },
          ].map((item) => (
            <button
              key={item.name}
              onClick={() => navigate(item.route)} // Use navigate for routing
              className="flex items-center w-full px-3 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-50"
            >
              <item.icon className="mr-3 h-5 w-5 text-gray-400" />
              {item.name}
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}
