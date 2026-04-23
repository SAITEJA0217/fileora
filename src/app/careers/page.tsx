"use client";

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { Briefcase, MapPin, Clock, ArrowRight } from 'lucide-react';

const positions = [
  { title: "Senior Backend Engineer", dept: "Engineering", type: "Remote / Full-time", location: "Global" },
  { title: "Product Designer", dept: "Design", type: "Remote / Full-time", location: "Europe/India" },
  { title: "Growth Marketing Manager", dept: "Marketing", type: "Remote / Contract", location: "US/Global" },
  { title: "Customer Success Lead", dept: "Support", type: "Remote / Full-time", location: "Global" }
];

export default function CareersPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      <div className="pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-24"
          >
            <h1 className="text-6xl font-black text-gray-900 mb-6 tracking-tight">Build the Future of <span className="text-primary">Work.</span></h1>
            <p className="text-xl text-gray-500 max-w-3xl mx-auto leading-relaxed">
              We are a fully remote, distributed team of creators building the tools we want to use. Join us in making the web faster and more accessible.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-24">
            <div className="lg:col-span-1 space-y-8">
              <h2 className="text-3xl font-black text-gray-900">Why FileOra?</h2>
              {[
                { title: "Remote Forever", desc: "Work from anywhere in the world. We value output over office hours." },
                { title: "Direct Impact", desc: "Your code and designs reach millions of users within hours of deployment." },
                { title: "Continuous Growth", desc: "Generous learning budget for books, courses, and conferences." }
              ].map((benefit, i) => (
                <div key={i} className="space-y-2">
                  <h3 className="text-lg font-bold text-gray-900">{benefit.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{benefit.desc}</p>
                </div>
              ))}
            </div>

            <div className="lg:col-span-2 space-y-6">
              <h2 className="text-3xl font-black text-gray-900 mb-8">Open Positions</h2>
              {positions.map((job, i) => (
                <motion.div 
                  key={i}
                  whileHover={{ x: 10 }}
                  className="p-8 bg-gray-50 rounded-[2.5rem] border border-gray-100 flex flex-col md:flex-row md:items-center justify-between group cursor-pointer hover:border-primary/20 transition-all"
                >
                  <div className="mb-4 md:mb-0">
                    <div className="text-primary font-bold text-xs uppercase tracking-widest mb-1">{job.dept}</div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">{job.title}</h3>
                    <div className="flex items-center space-x-6 text-gray-400 text-sm">
                      <span className="flex items-center"><Clock className="w-4 h-4 mr-2" /> {job.type}</span>
                      <span className="flex items-center"><MapPin className="w-4 h-4 mr-2" /> {job.location}</span>
                    </div>
                  </div>
                  <button className="bg-white p-4 rounded-2xl shadow-sm text-primary group-hover:bg-primary group-hover:text-white transition-all">
                    <ArrowRight className="w-6 h-6" />
                  </button>
                </motion.div>
              ))}
              
              <div className="p-8 bg-primary text-white rounded-[2.5rem] text-center mt-12">
                <h3 className="text-2xl font-black mb-2">Don't see a fit?</h3>
                <p className="text-primary-soft mb-6">We're always looking for talented misfits. Send your portfolio to careers@FileOra.io</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
