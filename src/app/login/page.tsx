"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, Loader2, ArrowRight, Layers } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const res = await response.json();
      if (res.success) {
        login(res.data);
      } else {
        setError(res.message || 'Invalid credentials');
      }
    } catch (err) {
      setError('Connection to backend failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-[#0A192F] flex items-center justify-center p-4 transition-colors duration-500">
      <motion.div 
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white dark:bg-[#112240] w-full max-w-md rounded-[2.5rem] shadow-2xl overflow-hidden p-10 border border-gray-100 dark:border-white/5"
      >
        <div className="flex justify-center mb-8">
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 rounded-xl overflow-hidden bg-white flex items-center justify-center p-1.5 shadow-lg shadow-primary/10">
              <img src="/logo.png" alt="FileOra Logo" className="w-full h-full object-contain" />
            </div>
            <span className="text-2xl font-black text-gray-900 tracking-tight">File<span className="text-primary">Ora</span></span>
          </Link>
        </div>

        <div className="text-center mb-10">
          <h1 className="text-3xl font-black text-gray-900 dark:text-white mb-2">Welcome Back</h1>
          <p className="text-gray-500 dark:text-gray-400">Log in to manage your files with pro power</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input 
              type="email" 
              placeholder="Email Address"
              className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-gray-100 dark:border-white/10 bg-white dark:bg-[#0A192F] text-gray-900 dark:text-white focus:border-primary/50 focus:ring-4 focus:ring-primary/5 outline-none transition-all"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              required
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input 
              type="password" 
              placeholder="Password"
              className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-gray-100 focus:border-primary/50 focus:ring-4 focus:ring-primary/5 outline-none transition-all"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              required
            />
          </div>

          {error && <p className="text-red-500 text-sm text-center font-medium">{error}</p>}

          <button 
            type="submit" 
            disabled={loading}
            className="btn-primary w-full py-4 text-lg font-bold flex items-center justify-center shadow-lg shadow-primary/20"
          >
            {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : <>Login <ArrowRight className="ml-2 w-5 h-5" /></>}
          </button>
        </form>

        <div className="mt-8 text-center text-sm">
          <span className="text-gray-500">New to FileOra? </span>
          <Link href="/signup" className="text-primary font-bold hover:underline">
            Create an Account
          </Link>
        </div>
      </motion.div>
    </main>
  );
}
