import React, { useState } from 'react';
import { Send, Mic, Image as ImageIcon, PenTool } from 'lucide-react';
import { DrawingCanvas } from './Canvas/DrawingCanvas';

interface ChatInputProps {
  input: string;
  setInput: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onImageSend: (imageUrl: string) => void;
  isLoading: boolean;
}

export function ChatInput({ input, setInput, onSubmit, onImageSend, isLoading }: ChatInputProps) {
  const [showCanvas, setShowCanvas] = useState(false);

  return (
    <>
      <div className="border-t bg-white p-4">
        <form onSubmit={onSubmit} className="max-w-4xl mx-auto relative">
          <div className="relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="w-full p-4 pr-40 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors"
              disabled={isLoading}
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center space-x-2">
              <button
                type="button"
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                disabled={isLoading}
                onClick={() => setShowCanvas(true)}
              >
                <PenTool size={20} />
              </button>
              <button
                type="button"
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                disabled={isLoading}
              >
                <Mic size={20} />
              </button>
              <button
                type="button"
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                disabled={isLoading}
              >
                <ImageIcon size={20} />
              </button>
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="p-2 text-blue-500 hover:text-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Send size={20} />
              </button>
            </div>
          </div>
          <div className="text-xs text-center text-gray-500 mt-2">
            ChatGPT can make mistakes. Consider checking important information.
          </div>
        </form>
      </div>

      {showCanvas && (
        <DrawingCanvas
          onClose={() => setShowCanvas(false)}
          onSend={onImageSend}
        />
      )}
    </>
  );
}