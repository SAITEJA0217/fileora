"use client";

import React from 'react';
import { Zap, Shield, Target, Lightbulb } from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
  {
    icon: Zap,
    title: "Fast Processing",
    description: "Get your results in seconds. Our optimized engines ensure lightning-fast conversion.",
    color: "text-yellow-500",
    bg: "bg-yellow-50"
  },
  {
    icon: Shield,
    title: "Secure Files",
    description: "Your privacy is our priority. Files are processed locally and never stored permanently.",
    color: "text-blue-500",
    bg: "bg-blue-50"
  },
  {
    icon: Target,
    title: "No Watermark",
    description: "Professional results every time. No ugly watermarks on your converted documents.",
    color: "text-purple-500",
    bg: "bg-purple-50"
  },
  {
    icon: Lightbulb,
    title: "Free & Easy",
    description: "Simple, clean interface designed for maximum productivity without any cost.",
    color: "text-green-500",
    bg: "bg-green-50"
  }
];

const Features = () => {
  return (
    <section id="how-it-works" className="py-24 bg-gray-50 dark:bg-[#0A192F] transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black text-gray-900 dark:text-white tracking-tight">Unmatched Performance.</h2>
          <p className="text-gray-500 dark:text-gray-400 mt-4 text-xl font-medium">Built for speed. Designed for simplicity. Trusted for performance.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-[#112240] p-8 rounded-[2rem] border border-gray-100 dark:border-white/5 shadow-sm hover:shadow-xl transition-all hover:-translate-y-1"
            >
              <div className={`${feature.bg} dark:bg-opacity-10 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-inner`}>
                <feature.icon className={`w-7 h-7 ${feature.color}`} />
              </div>
              <h3 className="text-xl font-black text-gray-900 dark:text-white mb-3 tracking-tight">{feature.title}</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed font-medium">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
