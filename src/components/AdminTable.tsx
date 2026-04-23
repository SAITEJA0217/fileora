"use client";

import React from 'react';
import { Shield, ShieldAlert, UserPlus, UserMinus, Loader2 } from 'lucide-react';

interface User {
  _id: string;
  name: string;
  email: string;
  plan: string;
  usageCount: number;
  isAdmin: boolean;
}

interface AdminTableProps {
  users: User[];
  onUpdatePlan: (userId: string, plan: string) => void;
  onToggleAdmin: (userId: string) => void;
  loadingId: string | null;
}

const AdminTable = ({ users, onUpdatePlan, onToggleAdmin, loadingId }: AdminTableProps) => {
  return (
    <div className="glass-card overflow-hidden border border-gray-100 shadow-2xl">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/50 border-b border-gray-100">
              <th className="px-6 py-5 text-sm font-black text-gray-900 uppercase tracking-widest">User</th>
              <th className="px-6 py-5 text-sm font-black text-gray-900 uppercase tracking-widest">Plan</th>
              <th className="px-6 py-5 text-sm font-black text-gray-900 uppercase tracking-widest">Usage</th>
              <th className="px-6 py-5 text-sm font-black text-gray-900 uppercase tracking-widest">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {users.map((user) => (
              <tr key={user._id} className="hover:bg-gray-50/30 transition-colors group">
                <td className="px-6 py-6">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-bold mr-4">
                      {user.name?.charAt(0) || 'U'}
                    </div>
                    <div>
                      <div className="font-bold text-gray-900 flex items-center">
                        {user.name}
                        {user.isAdmin && <Shield className="w-3 h-3 text-primary ml-2" />}
                      </div>
                      <div className="text-xs text-gray-400">{user.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-6 font-medium">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter ${
                    user.plan === 'pro' ? 'bg-purple-100 text-purple-600' : 'bg-gray-100 text-gray-500'
                  }`}>
                    {user.plan}
                  </span>
                </td>
                <td className="px-6 py-6">
                  <span className="text-sm font-bold text-gray-700">{user.usageCount} <span className="text-gray-300 font-medium">hits</span></span>
                </td>
                <td className="px-6 py-6">
                  <div className="flex items-center space-x-2">
                    {loadingId === user._id ? (
                      <Loader2 className="w-5 h-5 text-primary animate-spin" />
                    ) : (
                      <>
                        <button 
                          onClick={() => onUpdatePlan(user._id, user.plan === 'pro' ? 'free' : 'pro')}
                          className={`p-2 rounded-xl transition-all shadow-sm ${
                            user.plan === 'pro' ? 'bg-red-50 text-red-500 hover:bg-red-500 hover:text-white' : 'bg-green-50 text-green-600 hover:bg-green-600 hover:text-white'
                          }`}
                          title={user.plan === 'pro' ? "Downgrade" : "Upgrade to Pro"}
                        >
                          {user.plan === 'pro' ? <UserMinus className="w-4 h-4" /> : <UserPlus className="w-4 h-4" />}
                        </button>
                        <button 
                          onClick={() => onToggleAdmin(user._id)}
                          className={`p-2 rounded-xl transition-all shadow-sm ${
                            user.isAdmin ? 'bg-primary text-white' : 'bg-gray-50 text-gray-400 hover:bg-primary hover:text-white'
                          }`}
                          title="Toggle Admin"
                        >
                          <ShieldAlert className="w-4 h-4" />
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminTable;
