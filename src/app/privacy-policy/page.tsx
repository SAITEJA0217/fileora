"use client";

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { Shield, Lock, Eye, FileText } from 'lucide-react';

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      <div className="pt-32 pb-24">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-16"
          >
            <h1 className="text-5xl font-black text-gray-900 mb-6">Privacy Policy</h1>
            <p className="text-xl text-gray-500 leading-relaxed">
              Your privacy is paramount at FileOra. We believe in total transparency about how we handle your data.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div className="p-8 bg-gray-50 rounded-[2.5rem] border border-gray-100">
              <Shield className="w-10 h-10 text-primary mb-6" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Data Protection</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                We use industry-standard encryption to protect your files and personal information during transit and at rest.
              </p>
            </div>
            <div className="p-8 bg-gray-50 rounded-[2.5rem] border border-gray-100">
              <Eye className="w-10 h-10 text-primary mb-6" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">No File Storage</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Your files are processed and immediately deleted. We do not store, view, or share the content of your documents.
              </p>
            </div>
          </div>

          <div className="prose prose-lg max-w-none text-gray-600 space-y-12">
            <section>
              <h2 className="text-3xl font-black text-gray-900 mb-6 flex items-center">
                <span className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center text-primary text-sm mr-4">01</span>
                Information We Collect
              </h2>
              <p>
                We only collect minimal information necessary to provide our services. This includes your name and email address for account management, and transaction details for Pro subscriptions.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-black text-gray-900 mb-6 flex items-center">
                <span className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center text-primary text-sm mr-4">02</span>
                How We Use Cookies
              </h2>
              <p>
                FileOra uses essential cookies to keep you logged in and remember your preferences. We do not use tracking cookies for advertising purposes.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-black text-gray-900 mb-6 flex items-center">
                <span className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center text-primary text-sm mr-4">03</span>
                Third-Party Services
              </h2>
              <p>
                We use Razorpay for secure payment processing. They maintain their own privacy policies regarding your payment information, which is never stored on FileOra servers.
              </p>
            </section>

            <section className="pt-12 border-t border-gray-100">
              <p className="text-sm text-gray-400">
                Last Updated: April 23, 2026. For questions regarding this policy, contact us at privacy@FileOra.io
              </p>
            </section>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
