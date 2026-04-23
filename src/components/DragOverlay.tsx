"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, Sparkles, FileUp } from 'lucide-react';

const DragOverlay = () => {
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const handleDragOver = (e: DragEvent) => {
      e.preventDefault();
      setIsDragging(true);
    };

    const handleDragLeave = (e: DragEvent) => {
      e.preventDefault();
      // Only set to false if we leave the window entirely or it's a specific container
      if (e.relatedTarget === null) {
        setIsDragging(false);
      }
    };

    const handleDrop = (e: DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      // We don't handle file processing here, 
      // but we could dispatch a custom event if needed.
    };

    window.addEventListener('dragover', handleDragOver);
    window.addEventListener('dragleave', handleDragLeave);
    window.addEventListener('drop', handleDrop);

    return () => {
      window.removeEventListener('dragover', handleDragOver);
      window.removeEventListener('dragleave', handleDragLeave);
      window.removeEventListener('drop', handleDrop);
    };
  }, []);

  return (
    <AnimatePresence>
      {isDragging && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-primary/20 backdrop-blur-2xl pointer-events-none"
        >
          <motion.div
            initial={{ scale: 0.8, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            className="glass-card bg-white/90 dark:bg-slate-900/90 p-16 flex flex-col items-center border-4 border-dashed border-primary/30"
          >
            <div className="w-32 h-32 bg-primary rounded-[2.5rem] flex items-center justify-center mb-8 shadow-2xl shadow-primary/30 animate-bounce">
              <FileUp className="w-16 h-16 text-white" />
            </div>
            <h2 className="text-4xl font-black text-gray-900 dark:text-white mb-4 tracking-tighter">Release to Start Magic</h2>
            <div className="flex items-center text-primary font-black uppercase tracking-widest text-sm">
              <Sparkles className="w-5 h-5 mr-3" /> FileOra Intelligence Active
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DragOverlay;
