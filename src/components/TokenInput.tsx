import React, { useState, useEffect } from 'react';
import { Key } from 'lucide-react';

interface TokenInputProps {
  onTokenSave: () => void;
}

export function TokenInput({ onTokenSave }: TokenInputProps) {
  const [token, setToken] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const savedToken = localStorage.getItem('github_token');
    if (savedToken) {
      setToken(savedToken);
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem('github_token', token);
    onTokenSave();
  };

  return (
    <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
      <div className="flex items-center gap-2 mb-4">
        <Key className="w-5 h-5 text-blue-600" />
        <h2 className="text-xl font-semibold">API Token Setup</h2>
      </div>
      <div className="space-y-4">
        <div className="relative">
          <input
            type={isVisible ? 'text' : 'password'}
            value={token}
            onChange={(e) => setToken(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter your GitHub API token"
          />
          <button
            onClick={() => setIsVisible(!isVisible)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            {isVisible ? 'Hide' : 'Show'}
          </button>
        </div>
        <button
          onClick={handleSave}
          className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
        >
          Save Token
        </button>
      </div>
    </div>
  );
}