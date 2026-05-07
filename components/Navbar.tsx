"use client";
import Link from 'next/link';
import { useAuth } from './AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="p-5 bg-white border-b border-zinc-200 flex justify-between items-center sticky top-0 z-50">
      <Link href="/" className="text-2xl font-bold text-orange-600">
        CookEase
      </Link>
      
      <div className="flex gap-6 items-center">
        {user ? (
          <>
            <Link href="/dashboard" className="font-medium text-zinc-600">
              My Recipes
            </Link>
            <span className="font-bold text-zinc-900">
              Hi, {user.name}
            </span>
            <button 
              onClick={logout} 
              className="text-red-500 font-medium hover:text-red-700 transition"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link href="/login" className="text-zinc-600 font-medium hover:text-orange-600">
              Login
            </Link>
            <Link 
              href="/signup" 
              className="bg-orange-500 text-white px-5 py-2 rounded-lg font-bold hover:bg-orange-600 transition"
            >
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}