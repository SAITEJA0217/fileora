"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Zap, ShieldCheck, Heart, Sparkles, Globe, Download } from 'lucide-react';

const reasons = [
  {
    title: "Zero Watermarks",
    desc: "Your files remain your files. We never watermark your exports.",
    icon: ShieldCheck,
    color: "bg-blue-50 text-blue-600"
  },
  {
    title: "Blazing Speed",
    desc: "Cloud-optimized algorithms for instant file processing.",
    icon: Zap,
    color: "bg-yellow-50 text-yellow-600"
  },
  {
    title: "Free for Life",
    desc: "Beta users keep their status forever with special perks.",
    icon: Heart,
    color: "bg-red-50 text-red-600"
  },
  {
    title: "Privacy First",
    desc: "Files are processed in-memory and deleted immediately.",
    icon: Globe,
    color: "bg-green-50 text-green-600"
  },
  {
    title: "High Fidelity",
    desc: "Preserve every pixel and font during conversion.",
    icon: Sparkles,
    color: "bg-purple-50 text-purple-600"
  },
  {
    title: "Instant Download",
    desc: "No waiting queues. One click and your file is ready.",
    icon: Download,
    color: "bg-gray-50 text-gray-600"
  }
];

const WhyUs = () => {
  return (
    <section className="py-32 bg-gray-50/30 dark:bg-[#0A192F] overflow-hidden transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-24">
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-6 tracking-tight">Why <span className="text-primary italic">FileOra?</span></h2>
          <p className="text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto font-medium leading-relaxed">
            We built FileOra for students and creators who need professional tools without the professional price tag.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-10 bg-white dark:bg-[#112240] rounded-[3rem] border border-gray-100 dark:border-white/5 shadow-xl shadow-gray-200/50 dark:shadow-none hover:shadow-2xl hover:-translate-y-2 transition-all group"
            >
              <div className={`w-16 h-16 rounded-2xl ${reason.color} dark:bg-opacity-10 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform shadow-inner`}>
                <reason.icon className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-4 tracking-tight">{reason.title}</h3>
              <p className="text-gray-500 dark:text-gray-400 font-medium leading-relaxed">{reason.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
