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
  const ngrok_site="https://radiance-anyway-dumpster.ngrok-free.dev"
  const response = await fetch(ngrok_site+"/api/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      fullName: formData.fullName,
      email: formData.email,
      passwordHash: formData.password // Password should be hashed before sending or on backend
    })
  });

  if (response.ok) {
    router.push('/login');
  } else {
    alert("Signup failed!");
  }
};

  return (
    <div className="flex flex-col items-center justify-center min-h-[90vh] px-4">
      <div className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-md border border-zinc-100">
        <h2 className="text-3xl font-black text-center text-zinc-900 mb-8">Create Account</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <input 
            required
            type="text"
            placeholder="Full Name"
            className="w-full p-3 border-2 border-zinc-50 rounded-xl focus:border-orange-500 outline-none text-zinc-900"
            onChange={(e) => setFormData({...formData, fullName: e.target.value})}
          />
          <input 
            required
            type="email"
            placeholder="Email Address"
            className="w-full p-3 border-2 border-zinc-50 rounded-xl focus:border-orange-500 outline-none text-zinc-900"
            onChange={(e) => setFormData({...formData, email: e.target.value})}
          />
          <input 
            required
            type="password"
            placeholder="Password"
            className="w-full p-3 border-2 border-zinc-50 rounded-xl focus:border-orange-500 outline-none text-zinc-900"
            onChange={(e) => setFormData({...formData, password: e.target.value})}
          />
          <input 
            required
            type="password"
            placeholder="Confirm Password"
            className="w-full p-3 border-2 border-zinc-50 rounded-xl focus:border-orange-500 outline-none text-zinc-900"
            onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
          />
          <button 
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-xl font-bold shadow-lg"
          >
            Create My Account
          </button>
        </form>
        <div className="mt-8 text-center text-sm text-zinc-600">
          Already have an account? <Link href="/login" className="text-orange-600 font-bold">Log In</Link>
        </div>
      </div>
    </div>
  );
}