import React from 'react';
import { Layers, Globe, GitBranch, Share2 } from 'lucide-react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-[#0A192F] border-t border-gray-100 dark:border-white/5 pt-20 pb-10 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center space-x-2 group mb-6">
              <div className="w-8 h-8 rounded-lg overflow-hidden bg-white flex items-center justify-center p-1 shadow-sm">
                <img src="/logo.png" alt="FileOra Logo" className="w-full h-full object-contain" />
              </div>
              <span className="text-xl font-black text-gray-900 dark:text-white tracking-tight">File<span className="text-primary">Ora</span></span>
            </Link>
            <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-6 font-medium">
              The all-in-one platform for students and creators to manage, convert, and edit files for free.
            </p>
            <div className="flex space-x-4">
              <Globe className="w-5 h-5 text-gray-400 hover:text-primary cursor-pointer transition-colors" />
              <GitBranch className="w-5 h-5 text-gray-400 hover:text-primary cursor-pointer transition-colors" />
              <Share2 className="w-5 h-5 text-gray-400 hover:text-primary cursor-pointer transition-colors" />
            </div>
          </div>

          <div>
            <h4 className="font-black text-gray-900 dark:text-white mb-6 uppercase tracking-widest text-xs">Tools</h4>
            <ul className="space-y-4 text-gray-500 dark:text-gray-400 text-sm font-medium">
              <li><button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:text-primary transition-colors" suppressHydrationWarning>PDF to Word</button></li>
              <li><button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:text-primary transition-colors" suppressHydrationWarning>Merge PDF</button></li>
              <li><button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:text-primary transition-colors" suppressHydrationWarning>Image to PDF</button></li>
              <li><button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:text-primary transition-colors" suppressHydrationWarning>Compress PDF</button></li>
            </ul>
          </div>

          <div>
            <h4 className="font-black text-gray-900 dark:text-white mb-6 uppercase tracking-widest text-xs">Company</h4>
            <ul className="space-y-4 text-gray-500 dark:text-gray-400 text-sm font-medium">
              <li><Link href="/privacy-policy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link></li>
              <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="/blog" className="hover:text-primary transition-colors">Blog</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-black text-gray-900 dark:text-white mb-6 uppercase tracking-widest text-xs">Support</h4>
            <ul className="space-y-4 text-gray-500 dark:text-gray-400 text-sm font-medium">
              <li><Link href="/help-center" className="hover:text-primary transition-colors">Help Center</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors">Contact Us</Link></li>
              <li><Link href="/api-docs" className="hover:text-primary transition-colors">API Docs</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-100 dark:border-white/5 pt-10 text-center">
          <p className="text-gray-400 text-sm font-medium">
            © 2026 FileOra. Crafted for speed ⚡
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
