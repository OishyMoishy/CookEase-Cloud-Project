"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function SignupPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const ngrok_site = "https://radiance-anyway-dumpster.ngrok-free.dev";
    
    try {
      // FIX: Use backticks (`) here, not standard quotes
      const response = await fetch(`${ngrok_site}/api/auth/signup`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "true" 
        },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          password: formData.password 
        })
      });

      if (response.ok) {
        alert("Account created! Please log in.");
        router.push('/login');
      } else {
        const errorMsg = await response.text();
        alert(`Signup failed: ${errorMsg}`); // FIX: Also use backticks here
      }
    } catch (err) {
      alert("Connection error. Is your backend running?");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-zinc-50 px-4">
      <div className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-md border border-zinc-100">
        <h2 className="text-3xl font-black text-center text-zinc-900 mb-8">Create Account</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input required type="text" placeholder="Full Name" className="w-full p-3 border-2 border-zinc-100 rounded-xl outline-none focus:border-orange-500 text-black"
            onChange={(e) => setFormData({...formData, fullName: e.target.value})} />
          
          <input required type="email" placeholder="Email Address" className="w-full p-3 border-2 border-zinc-100 rounded-xl outline-none focus:border-orange-500 text-black"
            onChange={(e) => setFormData({...formData, email: e.target.value})} />
          
          <input required type="password" placeholder="Password" className="w-full p-3 border-2 border-zinc-100 rounded-xl outline-none focus:border-orange-500 text-black"
            onChange={(e) => setFormData({...formData, password: e.target.value})} />
          
          <input required type="password" placeholder="Confirm Password" className="w-full p-3 border-2 border-zinc-100 rounded-xl outline-none focus:border-orange-500 text-black"
            onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})} />
          
          <button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-xl font-bold transition-all shadow-lg">
            Create My Account
          </button>
        </form>
        <p className="mt-6 text-center text-zinc-600">
          Already have an account? <Link href="/login" className="text-orange-600 font-bold hover:underline">Log In</Link>
        </p>
      </div>
    </div>
  );
}