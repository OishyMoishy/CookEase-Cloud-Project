"use client";
import Link from 'next/link';
import { useAuth } from './AuthContext';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout(); // Clear session [cite: 495]
    router.push('/'); // Safely redirect to the homepage
  };

  return (
    <nav className="p-5 bg-white/80 backdrop-blur-md border-b border-zinc-200/60 flex justify-between items-center sticky top-0 z-50 shadow-sm transition-all">
      <Link href="/" className="text-2xl font-black text-orange-600 tracking-tight hover:opacity-90 transition-opacity">
        CookEase
      </Link>

      <div className="flex gap-6 items-center">
        {user ? (
          <>
            <Link href="/dashboard" className="font-semibold text-sm text-zinc-600 hover:text-zinc-900 transition-colors">
              My Recipes
            </Link>
            <span className="font-bold text-sm text-zinc-800 bg-zinc-100 px-3 py-1.5 rounded-xl">
              Hi, {user.name}
            </span>
            <button
              onClick={handleLogout}
              className="text-sm font-semibold text-red-500 hover:text-red-600 active:scale-95 transition-all"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link href="/login" className="text-sm text-zinc-600 font-semibold hover:text-orange-600 transition-colors">
              Login
            </Link>
            <Link
              href="/signup"
              className="bg-orange-500 text-white text-sm px-5 py-2.5 rounded-xl font-bold hover:bg-orange-600 transition-all shadow-sm shadow-orange-500/10 active:scale-95"
            >
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}