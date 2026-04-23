"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock, User, Loader2, ArrowRight } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (user: any) => void;
}

const AuthModal = ({ isOpen, onClose, onSuccess }: AuthModalProps) => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const endpoint = isLogin ? 'login' : 'signup';
      const response = await fetch(`/api/auth/${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const res = await response.json();

      if (res.success) {
        onSuccess(res.data);
        onClose();
      } else {
        setError(res.message || 'Authentication failed');
      }
    } catch (err) {
      setError('Connection to backend failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div 
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="bg-white dark:bg-[#112240] w-full max-w-md rounded-[2.5rem] shadow-2xl relative z-10 overflow-hidden border border-gray-100 dark:border-white/5"
          >
            <button onClick={onClose} className="absolute top-6 right-6 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/5 transition-colors">
              <X className="w-6 h-6 text-gray-400" />
            </button>
            
            <div className="p-10">
              <div className="text-center mb-10">
                <h3 className="text-3xl font-black text-gray-900 dark:text-white mb-2">{isLogin ? 'Welcome Back' : 'Create Account'}</h3>
                <p className="text-gray-500 dark:text-gray-400">{isLogin ? 'Log in to access your pro tools' : 'Start your productivity journey today'}</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {!isLogin && (
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input 
                      type="text" 
                      placeholder="Full Name"
                      className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-gray-100 dark:border-white/10 bg-gray-50 dark:bg-white/5 focus:border-primary/50 focus:ring-4 focus:ring-primary/5 outline-none transition-all text-gray-900 dark:text-white"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      required={!isLogin}
                    />
                  </div>
                )}
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input 
                    type="email" 
                    placeholder="Email Address"
                    className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-gray-100 dark:border-white/10 bg-gray-50 dark:bg-white/5 focus:border-primary/50 focus:ring-4 focus:ring-primary/5 outline-none transition-all text-gray-900 dark:text-white"
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
                    className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-gray-100 dark:border-white/10 bg-gray-50 dark:bg-white/5 focus:border-primary/50 focus:ring-4 focus:ring-primary/5 outline-none transition-all text-gray-900 dark:text-white"
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    required
                  />
                </div>

                {error && <p className="text-red-500 text-sm text-center font-medium">{error}</p>}

                <button 
                  type="submit" 
                  disabled={loading}
                  className="btn-primary w-full py-4 text-lg font-bold flex items-center justify-center shadow-lg shadow-primary/20 bg-primary text-white rounded-2xl hover:bg-primary-dark transition-all"
                >
                  {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : <>{isLogin ? 'Login' : 'Sign Up'} <ArrowRight className="ml-2 w-5 h-5" /></>}
                </button>
              </form>

              <div className="mt-8 text-center">
                <button 
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-gray-500 dark:text-gray-400 text-sm hover:text-primary transition-colors font-medium"
                >
                  {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Log In"}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default AuthModal;
