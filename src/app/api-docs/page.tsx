"use client";

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { Code2, Terminal, Cpu, Database, Copy, Check } from 'lucide-react';

const endpoints = [
  { method: "POST", path: "/api/tools/merge-pdf", desc: "Merge multiple PDF files into one.", auth: true },
  { method: "GET", path: "/api/auth/me", desc: "Retrieve current user profile and plan details.", auth: true },
  { method: "POST", path: "/api/payments/create-order", desc: "Initialize a new Razorpay payment order.", auth: true }
];

export default function APIDocs() {
  const [copied, setCopied] = React.useState(false);

  const copyCode = () => {
    navigator.clipboard.writeText('curl -X POST https://api.FileOra.io/v1/tools/merge-pdf \\ \n -H "Authorization: Bearer YOUR_TOKEN" \\ \n -F "files=@document1.pdf" \\ \n -F "files=@document2.pdf"');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      <div className="pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-16">
            {/* Sidebar Navigation */}
            <aside className="w-full lg:w-64 shrink-0">
              <nav className="sticky top-32 space-y-2">
                <h4 className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 mb-6 px-4">Introduction</h4>
                <a href="#" className="block px-4 py-3 bg-primary/5 text-primary rounded-xl font-bold">Getting Started</a>
                <a href="#" className="block px-4 py-3 text-gray-500 hover:bg-gray-50 rounded-xl font-medium transition-colors">Authentication</a>
                <a href="#" className="block px-4 py-3 text-gray-500 hover:bg-gray-50 rounded-xl font-medium transition-colors">Rate Limits</a>
                
                <h4 className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 mb-6 mt-10 px-4">Endpoints</h4>
                <a href="#" className="block px-4 py-3 text-gray-500 hover:bg-gray-50 rounded-xl font-medium transition-colors">Auth</a>
                <a href="#" className="block px-4 py-3 text-gray-500 hover:bg-gray-50 rounded-xl font-medium transition-colors">Tools</a>
                <a href="#" className="block px-4 py-3 text-gray-500 hover:bg-gray-50 rounded-xl font-medium transition-colors">Billing</a>
              </nav>
            </aside>

            {/* Main Content */}
            <div className="flex-grow max-w-4xl">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-16">
                <h1 className="text-5xl font-black text-gray-900 mb-6 tracking-tight">API Documentation</h1>
                <p className="text-xl text-gray-500 leading-relaxed">
                  Integrate FileOra's powerful file processing engine directly into your own applications and workflows.
                </p>
              </motion.div>

              <div className="prose prose-lg max-w-none text-gray-600 space-y-12 mb-24">
                <section>
                  <h2 className="text-3xl font-black text-gray-900 mb-6 flex items-center">
                    <Terminal className="w-8 h-8 text-primary mr-4" /> Quick Start
                  </h2>
                  <p>
                    All API requests must be made over HTTPS. Our API is RESTful and uses standard HTTP response codes and JSON for responses.
                  </p>
                  <div className="relative mt-8 group">
                    <div className="absolute top-4 right-4 z-10">
                      <button onClick={copyCode} className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors text-white">
                        {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>
                    <pre className="bg-gray-900 p-8 rounded-[2rem] text-sm text-primary-soft overflow-x-auto font-mono leading-relaxed">
                      <code>
                        {`curl -X POST https://api.FileOra.io/v1/tools/merge-pdf \\
  -H "Authorization: Bearer YOUR_TOKEN" \\
  -F "files=@document1.pdf" \\
  -F "files=@document2.pdf"`}
                      </code>
                    </pre>
                  </div>
                </section>

                <section>
                  <h2 className="text-3xl font-black text-gray-900 mb-8 flex items-center">
                    <Cpu className="w-8 h-8 text-primary mr-4" /> Available Endpoints
                  </h2>
                  <div className="space-y-4">
                    {endpoints.map((ep, i) => (
                      <div key={i} className="p-6 bg-gray-50 rounded-2xl border border-gray-100 group hover:border-primary/20 transition-all">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-3">
                            <span className={`text-[10px] font-black px-2 py-1 rounded text-white ${ep.method === 'POST' ? 'bg-primary' : 'bg-green-500'}`}>{ep.method}</span>
                            <code className="text-sm font-bold text-gray-900">{ep.path}</code>
                          </div>
                          {ep.auth && <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest flex items-center"><Database className="w-3 h-3 mr-1" /> Auth Required</span>}
                        </div>
                        <p className="text-gray-500 text-sm">{ep.desc}</p>
                      </div>
                    ))}
                  </div>
                </section>
              </div>

              <div className="bg-primary p-12 rounded-[3rem] text-white">
                <h2 className="text-3xl font-black mb-4">Need an API Key?</h2>
                <p className="text-primary-soft mb-8">Access to the API is currently in beta. Pro users get priority access.</p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button className="bg-white text-primary px-8 py-4 rounded-2xl font-black">Request Access</button>
                  <button className="bg-primary-soft/20 text-white px-8 py-4 rounded-2xl font-black border border-white/20">Read SDK Docs</button>
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
