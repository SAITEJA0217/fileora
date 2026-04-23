"use client";

import React from 'react';
import { Users, CreditCard, UserCheck, TrendingUp } from 'lucide-react';

interface StatsProps {
  totalUsers: number;
  proUsers: number;
  freeUsers: number;
  totalRevenue: number;
}

const StatsCards = ({ totalUsers, proUsers, freeUsers, totalRevenue }: StatsProps) => {
  const stats = [
    { title: "Total Users", value: totalUsers, icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
    { title: "Pro Members", value: proUsers, icon: UserCheck, color: "text-purple-600", bg: "bg-purple-50" },
    { title: "Free Users", value: freeUsers, icon: CreditCard, color: "text-gray-600", bg: "bg-gray-50" },
    { title: "Estimated Revenue", value: `₹${totalRevenue}`, icon: TrendingUp, color: "text-green-600", bg: "bg-green-50" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
      {stats.map((stat, i) => (
        <div key={i} className="glass-card p-8 border border-white hover:border-primary/20 transition-all group">
          <div className="flex items-center justify-between mb-4">
            <div className={`p-3 rounded-2xl ${stat.bg} ${stat.color} group-hover:scale-110 transition-transform`}>
              <stat.icon className="w-6 h-6" />
            </div>
          </div>
          <p className="text-gray-500 font-bold text-xs uppercase tracking-widest mb-1">{stat.title}</p>
          <h3 className="text-3xl font-black text-gray-900">{stat.value}</h3>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;
