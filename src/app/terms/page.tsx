"use client";

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { FileText, Gavel, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function TermsOfService() {
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
            <h1 className="text-5xl font-black text-gray-900 mb-6">Terms of Service</h1>
            <p className="text-xl text-gray-500 leading-relaxed">
              By using FileOra, you agree to these terms. Please read them carefully to understand your rights and responsibilities.
            </p>
          </motion.div>

          <div className="prose prose-lg max-w-none text-gray-600 space-y-16">
            <section>
              <h2 className="text-3xl font-black text-gray-900 mb-6 flex items-center">
                <Gavel className="w-8 h-8 text-primary mr-4" /> 1. Acceptance of Terms
              </h2>
              <p>
                By accessing or using the FileOra website and services, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using the site.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-black text-gray-900 mb-6 flex items-center">
                <FileText className="w-8 h-8 text-primary mr-4" /> 2. Use License
              </h2>
              <p>
                Permission is granted to use FileOra for personal or commercial document processing. This is a license, not a transfer of title, and under this license you may not:
              </p>
              <ul className="list-disc pl-6 space-y-4 pt-4">
                <li>Attempt to decompile or reverse engineer any software contained on the FileOra website;</li>
                <li>Use the service for any illegal purposes or to process prohibited content;</li>
                <li>Remove any copyright or other proprietary notations from the materials;</li>
                <li>Bypass usage limits or security measures of the platform.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-3xl font-black text-gray-900 mb-6 flex items-center">
                <CheckCircle2 className="w-8 h-8 text-primary mr-4" /> 3. Subscriptions & Payments
              </h2>
              <p>
                Pro subscriptions provide unlimited access to tools. All payments are processed via Razorpay. Fees are non-refundable except as required by law or specified in the refund policy. Monthly subscriptions auto-renew unless cancelled.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-black text-gray-900 mb-6 flex items-center">
                <AlertCircle className="w-8 h-8 text-primary mr-4" /> 4. Disclaimer & Limitations
              </h2>
              <p>
                FileOra services are provided "as is". While we strive for 100% accuracy, we do not guarantee that file conversions will be error-free. FileOra shall not be held liable for any damages arising out of the use or inability to use the services.
              </p>
            </section>

            <section className="pt-12 border-t border-gray-100">
              <p className="text-sm text-gray-400">
                Current Version: 1.0.0 | Last Revised: April 23, 2026. For legal inquiries, contact legal@FileOra.io
              </p>
            </section>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
