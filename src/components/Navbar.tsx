"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Layers, LogOut, Moon, Sun, ChevronRight } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';
import { motion, useScroll, useSpring } from 'framer-motion';

interface NavbarProps {
  onNavClick?: (target?: string) => void;
}

const Navbar = ({ onNavClick }: NavbarProps) => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleNav = (target?: string) => {
    if (pathname === '/' && onNavClick) {
      onNavClick(target);
    } else {
      router.push(`/${target ? `#${target}` : ''}`);
    }
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-primary origin-left z-[70]"
        style={{ scaleX }}
      />
      <div className="bg-primary text-white py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-center shadow-lg relative z-[60]">
        🚀 FileOra is now LIVE – All tools FREE for early users!
      </div>
      <nav className="bg-white/70 backdrop-blur-lg border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link 
              href="/" 
              onClick={(e) => { e.preventDefault(); handleNav(); }}
              className="flex items-center space-x-2 group shrink-0"
            >
              <div className="w-10 h-10 rounded-xl group-hover:rotate-12 transition-transform overflow-hidden shadow-lg shadow-primary/20 bg-white flex items-center justify-center p-1.5">
                <img src="/logo.png" alt="FileOra Logo" className="w-full h-full object-contain" />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-gray-900 tracking-tight leading-none">File<span className="text-primary">Ora</span></span>
                {mounted && user?.plan === 'pro' && (
                  <span className="text-[10px] bg-gradient-to-r from-primary to-purple-600 text-white font-black px-1.5 py-0.5 rounded mt-1 uppercase tracking-tighter w-fit">
                    PRO Member
                  </span>
                )}
              </div>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <Link 
                href="/" 
                onClick={(e) => { e.preventDefault(); handleNav(); }}
                className="text-gray-600 hover:text-primary transition-colors font-medium"
              >
                Home
              </Link>
              <button 
                onClick={() => handleNav('tools-grid')}
                className="text-gray-600 hover:text-primary transition-colors font-medium"
                suppressHydrationWarning
              >
                Tools
              </button>
              <button 
                onClick={() => handleNav('pricing')}
                className="text-gray-600 hover:text-primary transition-colors font-medium"
                suppressHydrationWarning
              >
                Pricing
              </button>
              
              {mounted && user?.isAdmin && (
                <Link 
                  href="/admin" 
                  className="text-primary hover:text-primary/80 transition-colors font-black text-xs uppercase tracking-widest border-2 border-primary/20 px-4 py-2 rounded-xl bg-primary/5"
                >
                  Admin Dashboard
                </Link>
              )}
              
              <button 
                onClick={toggleTheme}
                className="p-3 bg-gray-50 dark:bg-white/5 text-gray-500 dark:text-gray-400 rounded-xl hover:scale-110 active:scale-95 transition-all border border-gray-100 dark:border-white/10 shadow-sm"
                title={mounted ? (theme === 'light' ? 'Dark Mode' : 'Light Mode') : 'Loading...'}
              >
                {mounted ? (
                  theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />
                ) : (
                  <div className="w-5 h-5" />
                )}
              </button>

              {mounted && user ? (
                <div className="flex items-center space-x-4 pl-4 border-l border-gray-100 dark:border-white/10">
                  <div className="flex items-center space-x-3 bg-gray-50 dark:bg-white/5 px-4 py-2 rounded-2xl border border-gray-100 dark:border-white/10">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">
                      {user.name?.charAt(0) || 'U'}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-gray-900 dark:text-white font-bold text-sm leading-none">{user.name}</span>
                      <span className="text-[10px] text-gray-400 font-medium">Free Launch Access</span>
                    </div>
                  </div>
                  <button 
                    onClick={logout}
                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl transition-all"
                    title="Logout"
                  >
                    <LogOut className="w-5 h-5" />
                  </button>
                </div>
              ) : mounted ? (
                <div className="flex items-center space-x-4">
                  <Link href="/login" className="text-gray-600 dark:text-gray-400 hover:text-primary font-bold transition-colors">
                    Login
                  </Link>
                  <Link href="/signup" className="btn-primary">
                    Sign Up Free
                  </Link>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
