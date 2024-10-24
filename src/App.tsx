import React, { useState, useRef, useEffect } from 'react';
import { Menu } from 'lucide-react';
import { Sidebar } from './components/Sidebar';
import { ChatMessage } from './components/ChatMessage';
import { ChatInput } from './components/ChatInput';
import { LoadingDots } from './components/LoadingDots';
import { ErrorMessage } from './components/ErrorMessage';
import { Message } from './types';
import { generateAIResponse, analyzeImage, AIError } from './services/ai';

function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showSidebar, setShowSidebar] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const clearError = () => {
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now(),
      text: input.trim(),
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    clearError();

    try {
      const response = await generateAIResponse([...messages, userMessage]);
      const botMessage: Message = {
        id: Date.now() + 1,
        text: response,
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      const errorMessage = error instanceof AIError 
        ? error.message 
        : 'An unexpected error occurred. Please try again.';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageSend = async (imageUrl: string) => {
    if (isLoading) return;

    const imageMessage: Message = {
      id: Date.now(),
      text: '',
      sender: 'user',
      timestamp: new Date(),
      image: imageUrl,
    };

    setMessages(prev => [...prev, imageMessage]);
    setIsLoading(true);
    clearError();

    try {
      const response = await analyzeImage(imageUrl, 'Please describe what you see in this image.');
      const botMessage: Message = {
        id: Date.now() + 1,
        text: response,
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      const errorMessage = error instanceof AIError 
        ? error.message 
        : 'An unexpected error occurred while analyzing the image. Please try again.';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([]);
    clearError();
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar onClearChat={clearChat} visible={showSidebar} />

      <div className="flex-1 flex flex-col h-screen">
        <div className="lg:hidden bg-white border-b p-4">
          <button
            onClick={() => setShowSidebar(!showSidebar)}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <Menu size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto bg-white p-4 space-y-6">
          {error && <ErrorMessage message={error} />}
          
          {messages.length === 0 && !error && (
            <div className="text-center text-gray-500 mt-8">
              <p className="text-xl font-semibold mb-2">Welcome to ChatGPT Clone</p>
              <p className="text-sm">Start a conversation or try the drawing tool!</p>
            </div>
          )}
          
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
          
          {isLoading && <LoadingDots />}
          <div ref={messagesEndRef} />
        </div>

        <ChatInput
          input={input}
          setInput={setInput}
          onSubmit={handleSubmit}
          onImageSend={handleImageSend}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}

export default App;