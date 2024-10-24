import React from 'react';
import { Trash2, Plus, History, Settings, Bot } from 'lucide-react';

interface SidebarProps {
  onClearChat: () => void;
  visible: boolean;
}

export function Sidebar({ onClearChat, visible }: SidebarProps) {
  const conversations = [
    { id: 1, title: "Previous Chat 1", date: "2024-03-10" },
    { id: 2, title: "Previous Chat 2", date: "2024-03-09" },
  ];

  return (
    <div className={`fixed inset-y-0 left-0 transform ${visible ? 'translate-x-0' : '-translate-x-full'} lg:relative lg:translate-x-0 transition duration-200 ease-in-out z-30 w-64 bg-gray-900 text-white p-6 flex flex-col`}>
      <div className="flex items-center space-x-3 mb-8">
        <Bot className="text-blue-400" size={24} />
        <h1 className="text-xl font-bold">ChatGPT Clone</h1>
      </div>

      <button className="flex items-center space-x-2 w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors mb-6">
        <Plus size={16} />
        <span>New Chat</span>
      </button>

      <div className="flex-1 overflow-y-auto">
        <div className="space-y-2">
          {conversations.map((chat) => (
            <button
              key={chat.id}
              className="flex items-center space-x-3 w-full px-4 py-3 hover:bg-gray-800 rounded-lg transition-colors text-left"
            >
              <History size={16} />
              <div className="flex-1 truncate">
                <div className="text-sm truncate">{chat.title}</div>
                <div className="text-xs text-gray-400">{chat.date}</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="border-t border-gray-700 pt-4 space-y-2">
        <button
          onClick={onClearChat}
          className="flex items-center space-x-2 w-full px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
        >
          <Trash2 size={16} />
          <span>Clear conversations</span>
        </button>
        <button className="flex items-center space-x-2 w-full px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors">
          <Settings size={16} />
          <span>Settings</span>
        </button>
      </div>
    </div>
  );
}