"use client";

import React, { useState } from 'react';
import { Check, ShieldCheck, Loader2, Send, Rocket, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';

const Pricing = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { user } = useAuth();

  const handleJoinEarlyAccess = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    try {
      const response = await fetch('/api/leads/join', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      const res = await response.json();
      if (res.success) {
        setSuccess(true);
        setEmail('');
      } else {
        alert(res.message || "Something went wrong");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to join. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="pricing" className="py-32 bg-white dark:bg-[#0A192F] relative overflow-hidden transition-colors duration-500">
      {/* Launch Banner */}
      <div className="absolute top-0 left-0 right-0 py-3 bg-gradient-to-r from-primary to-purple-600 text-white text-center text-xs font-black uppercase tracking-[0.2em] z-10 shadow-lg">
        🚀 LAUNCH OFFER: All tools are 100% FREE for a limited time!
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative pt-10">
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary text-xs font-black uppercase tracking-widest mb-6"
          >
            <Sparkles className="w-4 h-4 mr-2" /> Early Bird Special
          </motion.div>
          <h2 className="text-5xl md:text-6xl font-black text-gray-900 dark:text-white mb-6 tracking-tighter">
            Powerful for Everyone. <br /><span className="text-primary italic font-serif">Free for Life.</span>
          </h2>
          <p className="text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
            FileOra is currently in Open Beta. Enjoy all premium tools with no daily limits or credit cards required.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto items-stretch">
          {/* Currently Free Plan */}
          <div className="glass-card p-12 border-primary/20 bg-primary/5 dark:bg-primary/10 shadow-2xl flex flex-col relative overflow-hidden group">
            <div className="absolute -top-4 -right-12 bg-primary text-white text-[10px] font-black px-12 py-6 rotate-45 uppercase tracking-widest shadow-lg">Limited Offer</div>
            
            <div className="mb-8">
              <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-2 tracking-tight">Launch Early Access</h3>
              <p className="text-primary font-bold">Free Forever for Beta users</p>
            </div>

            <div className="flex items-baseline mb-10">
              <span className="text-6xl font-black text-gray-900 dark:text-white leading-none">₹0</span>
              <span className="text-gray-400 ml-3 text-lg font-medium italic">forever</span>
            </div>

            <ul className="space-y-5 mb-12 flex-grow">
              {['Unlimited tool usage', 'No Watermarks', 'Highest processing speed'].map((item) => (
                <li key={item} className="flex items-center text-gray-900 dark:text-gray-100 font-bold text-lg">
                  <div className="w-6 h-6 bg-primary/20 rounded-lg flex items-center justify-center mr-4 shrink-0">
                    <Check className="w-4 h-4 text-primary" />
                  </div>
                  {item}
                </li>
              ))}
              <li className="flex items-center text-gray-900 dark:text-gray-400 font-bold text-lg italic opacity-60">
                <div className="w-6 h-6 bg-gray-200 dark:bg-slate-800 rounded-lg flex items-center justify-center mr-4 shrink-0">
                  <Check className="w-4 h-4 text-gray-400" />
                </div>
                Priority Cloud Sync (Soon)
              </li>
            </ul>

            <button className="btn-primary w-full py-5 text-xl font-black shadow-xl shadow-primary/20 group-hover:scale-105 transition-all" suppressHydrationWarning>
              Start Using Now
            </button>
          </div>

          {/* Pro "Coming Soon" Plan */}
          <div className="glass-card p-12 bg-white dark:bg-[#112240] border-gray-100 dark:border-white/5 flex flex-col justify-center">
            <div className="mb-12">
              <h3 className="text-3xl font-black text-gray-900 dark:text-white mb-4 tracking-tight">Pro Mastery <span className="text-xs bg-gray-100 dark:bg-slate-800 text-gray-400 px-3 py-1 rounded-full uppercase tracking-widest ml-3">Coming Soon</span></h3>
              <p className="text-gray-500 dark:text-gray-400 leading-relaxed font-medium">
                We're building advanced features like API access, custom batch processing, and dedicated cloud storage.
              </p>
            </div>

            {!success ? (
              <form onSubmit={handleJoinEarlyAccess} className="space-y-4">
                <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Be the first to know</p>
                <div className="relative group">
                  <input 
                    type="email" 
                    required
                    placeholder="Enter your email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-6 py-5 rounded-[2rem] bg-gray-50 dark:bg-[#0A192F] border-2 border-transparent focus:border-primary/20 outline-none transition-all font-bold text-gray-900 dark:text-white" 
                    suppressHydrationWarning
                  />
                  <button 
                    disabled={loading}
                    className="absolute right-2 top-2 bottom-2 aspect-square bg-primary text-white rounded-full flex items-center justify-center hover:scale-110 active:scale-95 transition-all shadow-lg shadow-primary/20 disabled:opacity-50"
                    suppressHydrationWarning
                  >
                    {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5 ml-0.5" />}
                  </button>
                </div>
                <p className="text-[10px] text-gray-400 text-center uppercase tracking-widest">Join 1,200+ users in early access queue</p>
              </form>
            ) : (
              <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="p-8 bg-green-50 dark:bg-green-900/10 border border-green-100 dark:border-green-500/20 rounded-[2.5rem] text-center">
                <div className="w-16 h-16 bg-white dark:bg-slate-800 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl shadow-green-500/10">
                  <Rocket className="w-8 h-8 text-green-500" />
                </div>
                <h4 className="text-xl font-black text-green-800 dark:text-green-400 mb-1">Check your inbox!</h4>
                <p className="text-green-600 dark:text-green-500/80 text-sm font-medium">You've secured your spot in the early access nest.</p>
              </motion.div>
            )}

            <div className="mt-12 pt-12 border-t border-gray-50 dark:border-white/5">
              <div className="flex items-center text-gray-400 text-xs font-black tracking-widest uppercase">
                <ShieldCheck className="w-4 h-4 mr-2" /> Verified Beta Access
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
