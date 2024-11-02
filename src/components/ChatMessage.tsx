import React, { useState } from 'react';
import { Bot, User, Clipboard, Check, Download } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import type { Message } from '../types';

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user';
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(message.content).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
    }).catch(err => {
      console.error('Failed to copy: ', err);
    });
  };

  const exportAsMarkdown = () => {
    const blob = new Blob([message.content], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'response.md';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`flex gap-3 max-w-[80%] ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
          isUser ? 'bg-blue-600' : 'bg-gray-600'
        }`}>
          {isUser ? <User className="w-5 h-5 text-white" /> : <Bot className="w-5 h-5 text-white" />}
        </div>
        <div className={`p-4 rounded-lg ${
          isUser ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-900'
        } relative`}>
          <ReactMarkdown className="whitespace-pre-wrap">{message.content}</ReactMarkdown>
          <div className="absolute top-2 right-2 flex space-x-2">
            <button 
              onClick={copyToClipboard} 
              className="text-gray-500 hover:text-gray-700"
              aria-label="Copy to clipboard"
            >
              {copied ? <Check className="w-4 h-4 text-green-500" /> : <Clipboard className="w-4 h-4" />}
            </button>
            <button 
              onClick={exportAsMarkdown} 
              className="text-gray-500 hover:text-gray-700"
              aria-label="Export as Markdown"
            >
              <Download className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
