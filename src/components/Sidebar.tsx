import React from 'react';
import { Brain, BarChart3, Users, FileText, Calendar, Settings, HelpCircle } from 'lucide-react';

export default function Sidebar() {
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
            { name: 'Dashboard', icon: BarChart3, current: true },
            { name: 'Clients', icon: Users },
            { name: 'Documents', icon: FileText },
            { name: 'Calendar', icon: Calendar },
          ].map((item) => (
            <a
              key={item.name}
              href="#"
              className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg ${
                item.current
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <item.icon className={`mr-3 h-5 w-5 ${
                item.current ? 'text-blue-600' : 'text-gray-400'
              }`} />
              {item.name}
            </a>
          ))}
        </div>
      </nav>
      
      <div className="px-3 mt-auto">
        <div className="space-y-1">
          {[
            { name: 'Settings', icon: Settings },
            { name: 'Help', icon: HelpCircle },
          ].map((item) => (
            <a
              key={item.name}
              href="#"
              className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-50"
            >
              <item.icon className="mr-3 h-5 w-5 text-gray-400" />
              {item.name}
            </a>
          ))}
        </div>
      </div>
    </aside>
  );
}