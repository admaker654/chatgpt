import React from 'react';
import { Bot, User } from 'lucide-react';
import { Message } from '../types';

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  return (
    <div
      className={`flex items-start space-x-4 ${
        message.sender === 'user' ? 'justify-end' : ''
      }`}
    >
      {message.sender === 'bot' && (
        <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
          <Bot size={20} className="text-white" />
        </div>
      )}
      <div
        className={`max-w-[80%] rounded-2xl p-4 ${
          message.sender === 'user'
            ? 'bg-blue-500 text-white'
            : 'bg-gray-100 text-gray-800'
        }`}
      >
        {message.image ? (
          <img
            src={message.image}
            alt="User drawing"
            className="max-w-full rounded-lg mb-2"
          />
        ) : (
          <p className="text-sm whitespace-pre-wrap">{message.text}</p>
        )}
        <span className="text-xs opacity-70 mt-2 block">
          {message.timestamp.toLocaleTimeString()}
        </span>
      </div>
      {message.sender === 'user' && (
        <div className="w-8 h-8 rounded-full bg-gray-500 flex items-center justify-center flex-shrink-0">
          <User size={20} className="text-white" />
        </div>
      )}
    </div>
  );
}