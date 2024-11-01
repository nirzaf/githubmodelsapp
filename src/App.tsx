import React, { useState, useRef, useEffect } from 'react';
import { TokenInput } from './components/TokenInput';
import { ChatMessage } from './components/ChatMessage';
import { ChatInput } from './components/ChatInput';
import { sendMessage } from './api';
import type { Message, ChatState } from './types';

function App() {
  const [hasToken, setHasToken] = useState(false);
  const [state, setState] = useState<ChatState>({
    messages: [],
    isLoading: false,
    error: null
  });
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const token = localStorage.getItem('github_token');
    setHasToken(!!token);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [state.messages]);

  const handleSend = async (content: string) => {
    const userMessage: Message = { role: 'user', content };
    
    setState(prev => ({
      ...prev,
      messages: [...prev.messages, userMessage],
      isLoading: true,
      error: null
    }));

    try {
      const response = await sendMessage([...state.messages, userMessage]);
      const assistantMessage: Message = { role: 'assistant', content: response };
      
      setState(prev => ({
        ...prev,
        messages: [...prev.messages, assistantMessage],
        isLoading: false
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'An error occurred'
      }));
    }
  };

  if (!hasToken) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <TokenInput onTokenSave={() => setHasToken(true)} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="flex-1 container mx-auto max-w-4xl p-4 flex flex-col">
        <div className="flex-1 overflow-y-auto space-y-4 mb-4">
          {state.messages.map((message, index) => (
            <ChatMessage key={index} message={message} />
          ))}
          {state.isLoading && (
            <div className="text-center text-gray-500">
              <div className="animate-pulse">Thinking...</div>
            </div>
          )}
          {state.error && (
            <div className="p-4 bg-red-100 text-red-700 rounded-lg">
              {state.error}
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        <div className="sticky bottom-0 bg-gray-50 pt-4">
          <ChatInput onSend={handleSend} disabled={state.isLoading} />
        </div>
      </div>
    </div>
  );
}

export default App;