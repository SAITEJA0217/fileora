"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, Merge, Scissors, Image as ImageIcon, 
  FileSearch, Download, Share2, Type, ArrowRight
} from 'lucide-react';

export const tools = [
  {
    id: "pdf-to-word",
    name: "PDF to Word",
    description: "Convert PDF documents to editable Word files with high accuracy.",
    icon: FileText,
    color: "bg-blue-500",
  },
  {
    id: "word-to-pdf",
    name: "Word to PDF",
    description: "Convert Word documents to high-quality PDF files instantly.",
    icon: FileText,
    color: "bg-indigo-500",
  },
  {
    id: "pdf-merge",
    name: "PDF Merge",
    description: "Combine multiple PDF files into one single document.",
    icon: Merge,
    color: "bg-purple-500",
  },
  {
    id: "pdf-split",
    name: "PDF Split",
    description: "Extract pages from your PDF or save each page as a separate PDF.",
    icon: Scissors,
    color: "bg-pink-500",
  },
  {
    id: "image-to-pdf",
    name: "Image to PDF",
    description: "Convert JPG, PNG, and other images to professional PDFs.",
    icon: ImageIcon,
    color: "bg-orange-500",
  },
  {
    id: "pdf-to-jpg",
    name: "PDF to JPG",
    description: "Extract all images from a PDF or convert each page to a JPG.",
    icon: ImageIcon,
    color: "bg-red-500",
  },
  {
    id: "jpg-to-png",
    name: "JPG to PNG",
    description: "Convert JPG images to PNG with transparent backgrounds.",
    icon: Share2,
    color: "bg-teal-500",
  },
  {
    id: "compress-pdf",
    name: "Compress PDF",
    description: "Reduce the file size of your PDF while keeping best quality.",
    icon: FileSearch,
    color: "bg-green-500",
  },
  {
    id: "image-resizer",
    name: "Image Resizer",
    description: "Resize images to specific dimensions for social media or web.",
    icon: ImageIcon,
    color: "bg-yellow-500",
  },
  {
    id: "text-to-speech",
    name: "Text to Speech",
    description: "Transform your written text into professional voiceovers.",
    icon: Type,
    color: "bg-violet-500",
  },
];

interface ToolCardProps {
  tool: typeof tools[0];
  onClick: (id: string) => void;
}

const ToolCard = ({ tool, onClick }: ToolCardProps) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      onClick={() => onClick(tool.id)}
      className="glass-card p-8 cursor-pointer group transition-all hover:bg-white dark:hover:bg-[#1A365D] hover:shadow-2xl border-gray-100 dark:border-white/5"
    >
      <div className={`${tool.color} w-16 h-16 rounded-2xl flex items-center justify-center mb-6 text-white shadow-lg group-hover:scale-110 transition-transform`}>
        <tool.icon className="w-9 h-9" />
      </div>
      <h3 className="text-xl font-black text-gray-900 dark:text-white mb-3 tracking-tight">{tool.name}</h3>
      <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-6 font-medium">
        {tool.description}
      </p>
      <div className="flex items-center text-primary font-black uppercase tracking-widest text-[10px] group-hover:gap-2 transition-all">
        Launch Tool <ArrowRight className="w-4 h-4 ml-1" />
      </div>
    </motion.div>
  );
};

interface ToolsGridProps {
  onToolSelect: (id: string) => void;
}

const ToolsGrid = ({ onToolSelect }: ToolsGridProps) => {
  return (
    <section id="tools-grid" className="py-24 bg-white dark:bg-[#0A192F] transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black text-gray-900 dark:text-white mb-4 tracking-tighter">Everything You Need. <span className="text-primary italic">Nothing You Don’t.</span></h2>
          <p className="text-lg text-gray-500 dark:text-gray-400 font-medium">A clean, distraction-free workspace designed for productivity.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {tools.map((tool) => (
            <ToolCard key={tool.name} tool={tool} onClick={onToolSelect} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ToolsGrid;
