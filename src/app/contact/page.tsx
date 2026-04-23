"use client";

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { Send, Mail, MapPin, MessageSquare, Globe, MessageCircle } from 'lucide-react';

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      <div className="pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start mb-24">
            <div>
              <h1 className="text-6xl font-black text-gray-900 mb-6 tracking-tight">Let's <span className="text-primary">Talk.</span></h1>
              <p className="text-xl text-gray-500 leading-relaxed mb-12">
                Have a feature request, a bug report, or just want to say hi? We'd love to hear from you.
              </p>

              <div className="space-y-8 mb-12">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mr-6 shrink-0">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">Email Us</h4>
                    <p className="text-gray-500">hello@FileOra.io</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mr-6 shrink-0">
                    <MessageSquare className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">Live Chat</h4>
                    <p className="text-gray-500">Available Mon-Fri, 9am - 6pm EST</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mr-6 shrink-0">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">Headquarters</h4>
                    <p className="text-gray-500">Distributed Team, Global HQ in Bengaluru, India</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <button className="p-4 bg-gray-50 rounded-2xl text-gray-400 hover:text-primary transition-colors"><Globe className="w-6 h-6" /></button>
                <button className="p-4 bg-gray-50 rounded-2xl text-gray-400 hover:text-primary transition-colors"><MessageCircle className="w-6 h-6" /></button>
              </div>
            </div>

            <div className="bg-gray-50 rounded-[3rem] p-10 md:p-16 border border-gray-100 shadow-2xl shadow-primary/5">
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 ml-2">Name</label>
                    <input type="text" placeholder="Your name" className="w-full p-4 rounded-2xl bg-white border border-gray-100 focus:border-primary/30 outline-none transition-all" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 ml-2">Email</label>
                    <input type="email" placeholder="Your email" className="w-full p-4 rounded-2xl bg-white border border-gray-100 focus:border-primary/30 outline-none transition-all" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 ml-2">Subject</label>
                  <select className="w-full p-4 rounded-2xl bg-white border border-gray-100 focus:border-primary/30 outline-none transition-all appearance-none cursor-pointer">
                    <option>General Inquiry</option>
                    <option>Bug Report</option>
                    <option>Feature Request</option>
                    <option>Billing Question</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 ml-2">Message</label>
                  <textarea rows={6} placeholder="Tell us more about your inquiry..." className="w-full p-4 rounded-2xl bg-white border border-gray-100 focus:border-primary/30 outline-none transition-all resize-none" />
                </div>
                <button type="submit" className="btn-primary w-full py-5 text-xl font-black flex items-center justify-center shadow-xl shadow-primary/20">
                  Send Message <Send className="w-5 h-5 ml-3" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
