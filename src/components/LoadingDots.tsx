import React from 'react';
import { Bot } from 'lucide-react';

export function LoadingDots() {
  return (
    <div className="flex items-center space-x-2 text-gray-500">
      <Bot size={20} />
      <div className="flex space-x-1">
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
      </div>
    </div>
  );
}