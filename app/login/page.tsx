"use client";
import React, { useState } from 'react';
import { useAuth } from '@/components/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const ngrok_site = "https://radiance-anyway-dumpster.ngrok-free.dev";

    try {
      const res = await fetch(`${ngrok_site}/api/auth/login`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "true" 
        },
        body: JSON.stringify({ 
          email: email, 
          password: password // Plain text password
        })
      });

      if (res.ok) {
        const userData = await res.json(); 
        login(userData); 
        router.push('/dashboard');
      } else {
        alert("Invalid credentials! Please check your email and password.");
      }
    } catch (error) {
      alert("Connection error. Ensure the backend and ngrok are active.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 bg-white">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-md border border-zinc-100">
        <h2 className="text-3xl font-black mb-2 text-center text-zinc-900">Welcome Back</h2>
        <p className="text-zinc-500 text-center mb-8 text-sm">Log in with your plain text password</p>

        <div className="space-y-4">
          <input
            required
            type="email"
            className="w-full p-4 border-2 border-zinc-100 rounded-xl focus:border-orange-500 outline-none text-zinc-900"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            required
            type="password"
            className="w-full p-4 border-2 border-zinc-100 rounded-xl focus:border-orange-500 outline-none text-zinc-900"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-orange-100">
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