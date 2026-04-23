"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FileText, Image as ImageIcon, Zap, Shield, Target, ArrowRight, Sparkles } from 'lucide-react';

const ScrambleText = ({ text }: { text: string }) => {
  const [displayText, setDisplayText] = useState(text);
  const chars = "!<>-_\\/[]{}—=+*^?#________";

  useEffect(() => {
    let frame = 0;
    const totalFrames = 30;
    const interval = setInterval(() => {
      setDisplayText(prev =>
        text.split('').map((char, i) => {
          if (char === ' ') return ' ';
          if (frame > (totalFrames / text.length) * i) return char;
          return chars[Math.floor(Math.random() * chars.length)];
        }).join('')
      );
      if (frame >= totalFrames) clearInterval(interval);
      frame++;
    }, 40);
    return () => clearInterval(interval);
  }, [text]);

  return <span>{displayText}</span>;
};

const Hero = () => {
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-hero-gradient dark:bg-hero-gradient-dark">
      {/* Ambient Shapes */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute top-[10%] left-[5%] w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-ambient" />
        <div className="absolute bottom-[10%] right-[5%] w-96 h-96 bg-secondary/5 rounded-full blur-3xl animate-ambient delay-1000" />
      </div>

      {/* Floating Elements (Decorative) */}
      <div className="absolute top-20 left-10 animate-float opacity-30">
        <div className="w-20 h-20 bg-white p-3 rounded-3xl shadow-2xl overflow-hidden border border-gray-100 flex items-center justify-center">
          <img src="/logo.png" alt="FileOra" className="w-full h-full object-contain" />
        </div>
      </div>
      <div className="absolute bottom-20 right-10 animate-float-delayed opacity-20 hidden lg:block">
        <div className="bg-secondary-soft p-6 rounded-3xl shadow-xl">
          <ImageIcon className="w-16 h-16 text-secondary" />
        </div>
      </div>
      <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-secondary/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium bg-primary-soft text-primary mb-6">
              Trusted by Students & Creators Worldwide
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl lg:text-8xl font-black text-gray-900 dark:text-white mb-8 leading-[0.9] tracking-tighter"
          >
            <ScrambleText text="All Your Tools." /> <br />
            <span className="text-primary italic">One Powerful Platform.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-gray-600 dark:text-gray-400 mb-10 leading-relaxed font-medium"
          >
            Convert, edit, compress, and manage files in seconds. <br />
            No clutter. Just speed, simplicity, and precision.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <button
              onClick={() => document.getElementById('tools-grid')?.scrollIntoView({ behavior: 'smooth' })}
              className="btn-primary px-10 py-5 text-lg rounded-full w-full sm:w-auto"
            >
              Explore Tools
            </button>
            <button
              onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
              className="btn-secondary px-10 py-5 text-lg rounded-full w-full sm:w-auto dark:bg-white/5 dark:text-white dark:border-white/10"
            >
              See How It Works
            </button>
          </motion.div>

          {/* Live Stats */}

        </div>
      </div>
    </section>
  );
};

export default Hero;
