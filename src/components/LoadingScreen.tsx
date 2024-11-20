import React from 'react';
import { Brain } from 'lucide-react';

export default function LoadingScreen() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
      <div className="animate-bounce">
        <Brain className="h-12 w-12 text-blue-600" />
      </div>
      <h2 className="mt-4 text-lg font-medium text-gray-900">Loading Alfred...</h2>
    </div>
  );
}