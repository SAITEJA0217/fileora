"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Clock, FileText, Download, Trash2, ExternalLink } from 'lucide-react';
import { useFileHistory } from '@/hooks/useFileHistory';

const HistoryPanel = () => {
  const { history, clearHistory } = useFileHistory();

  if (history.length === 0) return null;

  return (
    <div className="mt-20">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center">
          <div className="bg-primary/10 p-2 rounded-xl mr-4 text-primary">
            <Clock className="w-6 h-6" />
          </div>
          <h3 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">Recent Activity</h3>
        </div>
        <button 
          onClick={clearHistory}
          className="text-xs font-black text-gray-400 hover:text-red-500 uppercase tracking-widest flex items-center transition-colors"
        >
          <Trash2 className="w-4 h-4 mr-2" /> Clear History
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {history.map((item, idx) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="glass-card p-6 border-gray-100 dark:border-slate-800 hover:scale-[1.02] transition-all group"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-gray-50 dark:bg-slate-800 rounded-2xl flex items-center justify-center text-gray-400 group-hover:text-primary transition-colors">
                <FileText className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-black text-gray-300 uppercase tracking-tighter">
                {new Date(item.processedAt).toLocaleDateString()}
              </span>
            </div>
            
            <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-1 truncate">{item.name}</h4>
            <p className="text-xs text-primary font-black uppercase tracking-widest mb-4">{item.type}</p>
            
            <div className="flex items-center justify-between pt-4 border-t border-gray-50 dark:border-slate-800">
              <div className="text-[10px] text-gray-400 font-bold uppercase">
                {(item.size / 1024 / 1024).toFixed(2)} MB
              </div>
              <button className="text-primary hover:text-primary-dark transition-colors">
                <Download className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default HistoryPanel;
