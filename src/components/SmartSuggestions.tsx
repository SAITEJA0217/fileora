"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, FileText, FileImage, FileCode } from 'lucide-react';

interface Suggestion {
  id: string;
  label: string;
  icon: any;
  action: string;
}

interface SmartSuggestionsProps {
  file: File;
  onSelect: (action: string) => void;
}

const SmartSuggestions = ({ file, onSelect }: SmartSuggestionsProps) => {
  const getSuggestions = (file: File): Suggestion[] => {
    const type = file.type;
    const name = file.name.toLowerCase();

    if (type === 'application/pdf') {
      return [
        { id: '1', label: 'Convert to Word', icon: FileText, action: 'pdf-to-word' },
        { id: '2', label: 'Extract Images', icon: FileImage, action: 'pdf-to-image' },
        { id: '3', label: 'Compress PDF', icon: Sparkles, action: 'compress-pdf' },
      ];
    } else if (type.startsWith('image/')) {
      return [
        { id: '1', label: 'Convert to PDF', icon: FileText, action: 'image-to-pdf' },
        { id: '2', label: 'Remove Background', icon: Sparkles, action: 'remove-bg' },
        { id: '3', label: 'Upscale Image', icon: Sparkles, action: 'upscale' },
      ];
    } else if (name.endsWith('.docx') || name.endsWith('.doc')) {
      return [
        { id: '1', label: 'Convert to PDF', icon: FileText, action: 'doc-to-pdf' },
        { id: '2', label: 'Extract Text', icon: FileCode, action: 'extract-text' },
      ];
    }
    return [
      { id: '1', label: 'Convert to PDF', icon: FileText, action: 'to-pdf' },
      { id: '2', label: 'Analyze with AI', icon: Sparkles, action: 'ai-chat' },
    ];
  };

  const suggestions = getSuggestions(file);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-6 p-6 bg-primary/5 rounded-3xl border border-primary/10"
    >
      <div className="flex items-center mb-4">
        <Sparkles className="w-5 h-5 text-primary mr-2" />
        <h4 className="font-black text-gray-900 uppercase text-xs tracking-widest">Smart Recommendations</h4>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {suggestions.map((s) => (
          <button
            key={s.id}
            onClick={() => onSelect(s.action)}
            className="flex items-center justify-between p-4 bg-white rounded-2xl border border-gray-100 hover:border-primary hover:shadow-lg transition-all group text-left"
          >
            <div className="flex items-center">
              <div className="p-2 bg-gray-50 rounded-lg group-hover:bg-primary/10 group-hover:text-primary transition-colors mr-3">
                <s.icon className="w-4 h-4" />
              </div>
              <span className="text-sm font-bold text-gray-700">{s.label}</span>
            </div>
            <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-primary transition-colors" />
          </button>
        ))}
      </div>
    </motion.div>
  );
};

export default SmartSuggestions;
