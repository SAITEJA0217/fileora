"use client";

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { Search, Book, MessageCircle, HelpCircle, FileText, ChevronRight } from 'lucide-react';

const categories = [
  { icon: FileText, title: "Getting Started", count: 12, desc: "New to FileOra? Start here for the basics." },
  { icon: HelpCircle, title: "Troubleshooting", count: 8, desc: "Solutions for common tool errors and issues." },
  { icon: Book, title: "Pro Subscription", count: 5, desc: "Billing, plans, and pro feature guides." },
  { icon: MessageCircle, title: "API & Integration", count: 15, desc: "Documentation for technical users and teams." }
];

export default function HelpCenter() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      <div className="pt-32 pb-24">
        <div className="bg-primary/5 py-24 mb-24">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h1 className="text-5xl font-black text-gray-900 mb-8 tracking-tight">How can we help?</h1>
            <div className="relative">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search for articles, guides, or tutorials..."
                className="w-full pl-16 pr-8 py-6 rounded-[2rem] bg-white shadow-2xl shadow-primary/10 border-none focus:ring-4 focus:ring-primary/5 outline-none transition-all text-lg"
              />
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
            {categories.map((cat, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -5 }}
                className="p-8 bg-white rounded-[2.5rem] border border-gray-100 hover:shadow-xl transition-all cursor-pointer group"
              >
                <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                  <cat.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{cat.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-6">{cat.desc}</p>
                <span className="text-primary font-bold text-xs uppercase tracking-widest">{cat.count} Articles</span>
              </motion.div>
            ))}
          </div>

          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-black text-gray-900 mb-8 text-center">Popular Questions</h2>
            <div className="space-y-4">
              {[
                "How do I upgrade to Pro plan?",
                "Are my files secure on FileOra?",
                "What is the maximum file size for free users?",
                "How can I cancel my subscription?",
                "Does FileOra store my processed files?"
              ].map((query, i) => (
                <div key={i} className="p-6 bg-gray-50 rounded-2xl flex items-center justify-between group cursor-pointer hover:bg-white hover:shadow-md border border-transparent hover:border-gray-100 transition-all">
                  <span className="font-bold text-gray-700">{query}</span>
                  <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-primary transition-colors" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
