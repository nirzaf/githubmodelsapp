import React from 'react';

export function LoadingIndicator() {
  return (
    <div className="flex items-center justify-center p-4">
      <div className="flex gap-2">
        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
      </div>
    </div>
  );
}