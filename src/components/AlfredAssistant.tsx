import React, { useState } from 'react';
import { Send, Brain } from 'lucide-react';

export default function AlfredAssistant() {
  const [message, setMessage] = useState('');

  return (
    <div className="bg-white rounded-xl shadow-sm h-[600px] flex flex-col">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <Brain className="h-6 w-6 text-blue-600" />
          <h2 className="text-lg font-semibold text-gray-900">Alfred Assistant</h2>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0">
            <Brain className="h-8 w-8 text-blue-600" />
          </div>
          <div className="bg-gray-100 rounded-lg p-4 max-w-[80%]">
            <p className="text-sm text-gray-800">
              Hello! I'm Alfred, your AI business assistant. How can I help you manage your agency today?
            </p>
          </div>
        </div>
      </div>
      
      <div className="p-4 border-t border-gray-200">
        <div className="relative">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Ask Alfred anything..."
            className="w-full pl-4 pr-12 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button className="absolute right-2 top-2 p-2 text-blue-600 hover:text-blue-700">
            <Send className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}