"use client";

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { Calendar, User, ArrowRight, Search } from 'lucide-react';

const posts = [
  {
    title: "How to Secure Your PDFs Before Sharing",
    excerpt: "Learn the latest encryption standards and best practices for sensitive document management.",
    category: "Security",
    date: "April 20, 2026",
    author: "Elena Vance",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "The Future of WebAssembly in File Processing",
    excerpt: "Why we're moving FileOra's core engines to WASM for near-native performance in the browser.",
    category: "Engineering",
    date: "April 15, 2026",
    author: "Mark S. Probie",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "10 Productivity Hacks for Remote Creators",
    excerpt: "From deep work blocks to minimal toolsets—how successful creators stay focused in 2026.",
    category: "Productivity",
    date: "April 10, 2026",
    author: "Sarah Jenkins",
    image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&q=80&w=800"
  }
];

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      <div className="pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
            <div className="max-w-2xl">
              <h1 className="text-6xl font-black text-gray-900 mb-6 tracking-tight">The <span className="text-primary italic">Nest</span> Blog.</h1>
              <p className="text-xl text-gray-500 leading-relaxed">
                Insights on productivity, security, and the technology behind FileOra.
              </p>
            </div>
            <div className="relative w-full md:w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search articles..."
                className="w-full pl-12 pr-4 py-4 rounded-2xl bg-gray-50 border border-gray-100 focus:border-primary/20 outline-none transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-24">
            {/* Featured Post */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="lg:col-span-2 group cursor-pointer"
            >
              <div className="relative h-[300px] md:h-[500px] rounded-[3rem] overflow-hidden mb-8">
                <img src={posts[0].image} alt={posts[0].title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-10 left-10 right-10">
                  <span className="bg-primary text-white text-xs font-black px-4 py-2 rounded-full uppercase tracking-widest mb-4 inline-block">{posts[0].category}</span>
                  <h2 className="text-3xl md:text-5xl font-black text-white mb-4 leading-tight">{posts[0].title}</h2>
                  <div className="flex items-center text-white/70 space-x-6 text-sm font-medium">
                    <span className="flex items-center"><User className="w-4 h-4 mr-2" /> {posts[0].author}</span>
                    <span className="flex items-center"><Calendar className="w-4 h-4 mr-2" /> {posts[0].date}</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {posts.slice(1).map((post, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="group cursor-pointer"
              >
                <div className="h-64 rounded-[2.5rem] overflow-hidden mb-6">
                  <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <span className="text-primary font-black text-xs uppercase tracking-widest mb-3 inline-block">{post.category}</span>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-primary transition-colors">{post.title}</h3>
                <p className="text-gray-500 mb-6 leading-relaxed">{post.excerpt}</p>
                <button className="flex items-center text-gray-900 font-bold group-hover:gap-2 transition-all">
                  Read Full Article <ArrowRight className="w-5 h-5 ml-2 text-primary" />
                </button>
              </motion.div>
            ))}
          </div>

          <div className="flex justify-center">
            <button className="btn-primary px-12 py-5 text-lg shadow-xl shadow-primary/20">Load More Articles</button>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
