"use client";

import { useState, useEffect } from 'react';

export interface HistoryItem {
  id: string;
  name: string;
  type: string;
  size: number;
  processedAt: string;
  outputs: string[];
}

export const useFileHistory = () => {
  const [history, setHistory] = useState<HistoryItem[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('fileora-history');
    if (saved) {
      setHistory(JSON.parse(saved));
    }
  }, []);

  const addToHistory = (item: Omit<HistoryItem, 'processedAt'>) => {
    const newItem = { ...item, processedAt: new Date().toISOString() };
    const updated = [newItem, ...history].slice(0, 10); // Keep last 10
    setHistory(updated);
    localStorage.setItem('fileora-history', JSON.stringify(updated));
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem('fileora-history');
  };

  return { history, addToHistory, clearHistory };
};
