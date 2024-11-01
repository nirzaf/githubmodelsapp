import React, { useState, useEffect } from 'react';
import { X, Key } from 'lucide-react';

interface TokenModalProps {
  isOpen: boolean;
  onSave: (token: string) => void;
}

export function TokenModal({ isOpen, onSave }: TokenModalProps) {
  const [token, setToken] = useState('');

  useEffect(() => {
    if (isOpen) {
      const savedToken = localStorage.getItem('github_token') || '';
      setToken(savedToken);
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('github_token', token.trim());
    onSave(token.trim());
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-2">
            <Key className="w-5 h-5 text-blue-500" />
            <h2 className="text-lg font-semibold">GitHub API Token</h2>
          </div>
          <button
            onClick={() => onSave(token)}
            className="text-gray-400 hover:text-gray-500"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-4">
          <div className="mb-4">
            <label htmlFor="token" className="block text-sm font-medium text-gray-700 mb-1">
              Enter your GitHub API Token
            </label>
            <input
              type="password"
              id="token"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="ghp_xxxxxxxxxxxxxxxx"
              autoComplete="off"
            />
          </div>
          
          <div className="text-sm text-gray-600 mb-4">
            <p>Your token is stored securely in your browser's local storage.</p>
          </div>
          
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={() => onSave(token)}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Save Token
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}