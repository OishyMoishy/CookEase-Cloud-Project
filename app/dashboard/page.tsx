"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/components/AuthContext';
import RecipeCard from '@/components/RecipeCard';

export default function Dashboard() {
  const { user } = useAuth();
  const [library, setLibrary] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      const fetchLibrary = async () => {
        const ngrok_site = "https://radiance-anyway-dumpster.ngrok-free.dev";
        try {
          // Fetch combined library (Created + Bookmarked)
          const res = await fetch(`${ngrok_site}/api/bookmarks/library/${user.id}`);
          if (res.ok) {
            const data = await res.json();
            setLibrary(data);
          }
        } catch (error) {
          console.error("Failed to fetch library", error);
        } finally {
          setLoading(false);
        }
      };
      fetchLibrary();
    }
  }, [user]);

  return (
    <div className="p-8 max-w-6xl mx-auto min-h-screen bg-white">
      <div className="flex justify-between items-end mb-10">
        <div>
          <h1 className="text-4xl font-black text-zinc-900">My Library</h1>
          <p className="text-zinc-500 font-medium mt-1">Your created and bookmarked recipes</p>
        </div>
        <Link href="/recipe/add" className="bg-orange-500 text-white px-6 py-3 rounded-2xl font-bold hover:bg-orange-600 transition">
          + Add New Recipe
        </Link>
      </div>

      {loading ? (
        <p>Loading your kitchen...</p>
      ) : library.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {library.map((recipe: any) => (
            <RecipeCard key={recipe.recipeId || recipe.id} recipe={recipe} />
          ))}
        </div>
      ) : (
        <div className="bg-orange-50 border-2 border-dashed border-orange-200 rounded-3xl p-20 text-center">
          <p className="text-orange-700 font-bold">Your library is empty. Start exploring or create your own!</p>
        </div>
      )}
    </div>
  );
}