"use client";

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AdminRoute from '@/components/AdminRoute';
import StatsCards from '@/components/StatsCards';
import AdminTable from '@/components/AdminTable';
import { useAuth } from '@/context/AuthContext';
import { motion } from 'framer-motion';
import { LayoutDashboard, RefreshCcw, Search } from 'lucide-react';

export default function AdminDashboard() {
  const { user } = useAuth();
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/admin/users');
      const res = await response.json();
      if (res.success) {
        setUsers(res.data);
      }
    } catch (err) {
      console.error("Failed to fetch users:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleUpdatePlan = async (userId: string, plan: string) => {
    setLoadingId(userId);
    try {
      const response = await fetch('/api/admin/update-plan', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, plan })
      });
      const res = await response.json();
      if (res.success) fetchUsers();
    } catch (err) {
      console.error("Failed to update plan:", err);
    } finally {
      setLoadingId(null);
    }
  };

  const handleToggleAdmin = async (userId: string) => {
    setLoadingId(userId);
    try {
      const response = await fetch('/api/admin/toggle-admin', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId })
      });
      const res = await response.json();
      if (res.success) fetchUsers();
    } catch (err) {
      console.error("Failed to toggle admin:", err);
    } finally {
      setLoadingId(null);
    }
  };

  const filteredUsers = users.filter(u => 
    u.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    u.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = {
    totalUsers: users.length,
    proUsers: users.filter(u => u.plan === 'pro').length,
    freeUsers: users.filter(u => u.plan === 'free').length,
    totalRevenue: users.filter(u => u.plan === 'pro').length * 49
  };

  return (
    <AdminRoute>
      <main className="min-h-screen bg-gray-50/50 dark:bg-[#0A192F] transition-colors duration-500">
        <Navbar />
        
        <div className="pt-32 pb-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <header className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
              <div>
                <div className="flex items-center text-primary font-black text-xs uppercase tracking-widest mb-2">
                  <LayoutDashboard className="w-4 h-4 mr-2" /> Administrator Access
                </div>
                <h1 className="text-5xl font-black text-gray-900 dark:text-white tracking-tight">Platform <span className="text-primary italic">Control</span></h1>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="relative w-full md:w-64">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input 
                    type="text" 
                    placeholder="Search users..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-2xl bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 shadow-sm outline-none focus:border-primary/20 transition-all font-medium text-gray-900 dark:text-white"
                  />
                </div>
                <button 
                  onClick={fetchUsers}
                  className="p-3 bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-2xl text-gray-400 hover:text-primary transition-all shadow-sm"
                >
                  <RefreshCcw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
                </button>
              </div>
            </header>

            <StatsCards {...stats} />

            <div className="mb-8 flex items-center justify-between">
              <h2 className="text-2xl font-black text-gray-900 dark:text-white">User Management</h2>
              <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                Real-time Database Sync Active
              </div>
            </div>

            <AdminTable 
              users={filteredUsers} 
              onUpdatePlan={handleUpdatePlan} 
              onToggleAdmin={handleToggleAdmin}
              loadingId={loadingId}
            />
          </div>
        </div>

        <Footer />
      </main>
    </AdminRoute>
  );
}
