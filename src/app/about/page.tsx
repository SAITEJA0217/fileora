"use client";

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { Zap, Heart, Users, Target } from 'lucide-react';

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      <div className="pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-24"
          >
            <h1 className="text-6xl font-black text-gray-900 mb-6 tracking-tight">Our Mission is to <span className="text-primary italic">Simplify.</span></h1>
            <p className="text-xl text-gray-500 max-w-3xl mx-auto leading-relaxed">
              FileOra was born out of a simple frustration: file tools shouldn't be complicated, slow, or cluttered with ads. We built a workspace that respects your time and your data.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
            {[
              { icon: Zap, title: "Speed First", desc: "Every microsecond counts. Our engine is optimized for instant results." },
              { icon: Heart, title: "User Centric", desc: "Designed with love for students, creators, and professionals." },
              { icon: Users, title: "Collaborative", desc: "Built to help teams move faster without technical friction." },
              { icon: Target, title: "Zero Ads", desc: "A clean, focused environment. No distractions, just productivity." }
            ].map((item, i) => (
              <div key={i} className="p-8 bg-gray-50 rounded-[2.5rem] border border-gray-100 hover:border-primary/20 transition-colors group">
                <item.icon className="w-10 h-10 text-primary mb-6 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="bg-primary/5 rounded-[3rem] p-12 md:p-24 border border-primary/10 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl font-black text-gray-900 mb-8">The Story of FileOra</h2>
                <div className="space-y-6 text-gray-600 leading-relaxed text-lg">
                  <p>
                    In late 2025, a small team of engineers noticed a recurring problem: students were spending more time fighting with clunky PDF converters than actually studying.
                  </p>
                  <p>
                    FileOra started as a weekend project to create the fastest "Image to PDF" tool in the world. Today, it has grown into a comprehensive suite of utilities used by thousands of creators globally.
                  </p>
                  <p>
                    We remain independent, privacy-focused, and committed to keeping our core tools free forever.
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-8 rounded-3xl shadow-xl flex flex-col items-center">
                  <span className="text-4xl font-black text-primary mb-2">5M+</span>
                  <span className="text-gray-400 font-bold text-xs uppercase tracking-widest">Files Processed</span>
                </div>
                <div className="bg-white p-8 rounded-3xl shadow-xl flex flex-col items-center mt-8">
                  <span className="text-4xl font-black text-primary mb-2">100K</span>
                  <span className="text-gray-400 font-bold text-xs uppercase tracking-widest">Global Users</span>
                </div>
                <div className="bg-white p-8 rounded-3xl shadow-xl flex flex-col items-center -mt-8">
                  <span className="text-4xl font-black text-primary mb-2">99.9%</span>
                  <span className="text-gray-400 font-bold text-xs uppercase tracking-widest">Uptime</span>
                </div>
                <div className="bg-white p-8 rounded-3xl shadow-xl flex flex-col items-center">
                  <span className="text-4xl font-black text-primary mb-2">15+</span>
                  <span className="text-gray-400 font-bold text-xs uppercase tracking-widest">Pro Tools</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
