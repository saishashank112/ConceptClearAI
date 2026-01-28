
import React, { useState, useEffect } from 'react';

const LoadingView: React.FC = () => {
  const [messageIndex, setMessageIndex] = useState(0);
  const messages = [
    "Simplifying complex ideas...",
    "Finding the perfect analogy...",
    "Breaking it down step-by-step...",
    "Almost there, logic incoming...",
    "Clearing the fog of confusion..."
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex(prev => (prev + 1) % messages.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [messages.length]);

  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
      <div className="relative mb-8">
        <div className="w-16 h-16 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-2 h-2 bg-indigo-600 rounded-full animate-pulse" />
        </div>
      </div>
      <h3 className="text-xl font-semibold text-slate-800 animate-pulse transition-all duration-500">
        {messages[messageIndex]}
      </h3>
      <p className="text-slate-500 mt-2 max-w-xs mx-auto">
        We're tailoring a unique explanation just for you.
      </p>
    </div>
  );
};

export default LoadingView;
