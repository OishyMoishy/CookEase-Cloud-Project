"use client";
import React, { useState } from 'react';
import { useAuth } from '@/components/AuthContext'; // Using @ alias for root
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const { login } = useAuth();
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      login(email);
      router.push('/dashboard');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-md border border-zinc-100"> 
        <h2 className="text-3xl font-black mb-2 text-center text-zinc-900">Welcome Back</h2>
        <p className="text-zinc-500 text-center mb-8">Sign in to manage your recipes</p>
        
        <div className="space-y-4">
          <input 
            required
            type="email" 
            className="w-full p-4 border-2 border-zinc-100 rounded-xl focus:border-orange-500 outline-none transition text-zinc-900" 
            placeholder="Email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input 
            required
            className="w-full p-4 border-2 border-zinc-100 rounded-xl focus:border-orange-500 outline-none transition text-zinc-900" 
            type="password" 
            placeholder="Password" 
          />
          <button 
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-xl font-bold text-lg transition-all active:scale-95"
          > 
            Sign In
          </button>
        </div>
        <p className="mt-8 text-center text-sm text-zinc-600">
          New here? <Link href="/signup" className="text-orange-600 font-bold hover:underline">Create an account</Link>
        </p>
      </form>
    </div>
  );
}