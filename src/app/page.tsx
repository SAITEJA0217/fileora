"use client";

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import ToolsGrid from '@/components/ToolsGrid';
import Features from '@/components/Features';
import Pricing from '@/components/Pricing';
import Footer from '@/components/Footer';
import ToolWorkspace from '@/components/ToolWorkspace';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import ProtectedRoute from '@/components/ProtectedRoute';
import WhyUs from '@/components/WhyUs';
import HistoryPanel from '@/components/HistoryPanel';

// Tool data for finding selected tool details
const tools = [
  { id: 'pdf-to-word', name: 'PDF to Word' },
  { id: 'word-to-pdf', name: 'Word to PDF' },
  { id: 'pdf-merge', name: 'Merge PDF' },
  { id: 'pdf-split', name: 'Split PDF' },
  { id: 'image-to-pdf', name: 'Image to PDF' },
  { id: 'pdf-to-jpg', name: 'PDF to JPG' },
  { id: 'jpg-to-png', name: 'JPG to PNG' },
  { id: 'compress-pdf', name: 'Compress PDF' },
  { id: 'image-resizer', name: 'Image Resizer' },
  { id: 'text-to-speech', name: 'Text to Speech' },
];

export default function Home() {
  const [selectedToolId, setSelectedToolId] = useState<string | null>(null);
  const { user, refreshUser } = useAuth();

  const selectedTool = tools.find(t => t.id === selectedToolId);

  const handleNavClick = (target?: string) => {
    setSelectedToolId(null);
    if (target) {
      setTimeout(() => {
        const element = document.getElementById(target);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const sectionVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  return (
    <main className="min-h-screen bg-white dark:bg-[#0A192F] selection:bg-primary selection:text-white">
      <Navbar 
        onNavClick={handleNavClick} 
      />
      
      <AnimatePresence mode="wait">
        {!selectedToolId ? (
          <motion.div
            key="homepage"
            initial="hidden"
            animate="visible"
            className="space-y-0"
          >
            <motion.div variants={sectionVariants}><Hero /></motion.div>
            <motion.div variants={sectionVariants} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <ToolsGrid onToolSelect={(id) => setSelectedToolId(id)} />
              <HistoryPanel />
            </motion.div>
            <motion.div variants={sectionVariants}><Features /></motion.div>
            <motion.div variants={sectionVariants}><WhyUs /></motion.div>
            <motion.div variants={sectionVariants}><Pricing /></motion.div>
            
            <motion.section 
              variants={sectionVariants}
              className="py-24 bg-primary text-white text-center relative overflow-hidden"
            >
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent scale-150 animate-pulse" />
              </div>
              <div className="max-w-4xl mx-auto px-4 relative z-10">
                <h2 className="text-5xl font-black mb-6 tracking-tighter">Built for Students. <br/>Loved by Creators.</h2>
                <p className="text-xl text-primary-soft font-medium opacity-90">
                  FileOra is your all-in-one workspace to handle files faster, smarter, and better.
                </p>
                <button 
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="mt-10 px-12 py-5 bg-white text-primary rounded-full font-black uppercase tracking-widest text-sm shadow-2xl hover:scale-105 transition-all"
                >
                  Start Your Journey
                </button>
              </div>
            </motion.section>
          </motion.div>
        ) : (
          <motion.div
            key="workspace"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="pt-24"
          >
            <ToolWorkspace 
              toolId={selectedToolId} 
              toolName={selectedTool?.name || ""} 
              onBack={() => setSelectedToolId(null)}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </main>
  );
}
