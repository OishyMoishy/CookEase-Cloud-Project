"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/components/AuthContext';
import RecipeCard from '@/components/RecipeCard';

export default function Dashboard() {
  const { user } = useAuth();
  const [library, setLibrary] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'my-recipes' | 'bookmarks'>('my-recipes');

  useEffect(() => {
    if (user) {
      const fetchLibrary = async () => {
        const ngrok_site = "https://radiance-anyway-dumpster.ngrok-free.dev";
        try {
          const res = await fetch(`${ngrok_site}/api/bookmarks/library/${user.id}`, {
            headers: { "ngrok-skip-browser-warning": "true" }
          });
          if (res.ok) {
            const data = await res.json();
            setLibrary(data);
          }
        } catch (error) {
          console.error("Failed to fetch library:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchLibrary();
    }
  }, [user]);

  const myRecipes = library.filter(recipe => String(recipe.createdBy) === String(user?.id));
  const bookmarkedRecipes = library.filter(recipe => String(recipe.createdBy) !== String(user?.id));

  const displayList = activeTab === 'my-recipes' ? myRecipes : bookmarkedRecipes;

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900">
      <div className="max-w-6xl mx-auto p-6 md:p-8 space-y-8">
        
        {/* Header Action Row */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-zinc-200/60">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-zinc-800">Dashboard</h1>
            <p className="text-zinc-500 text-sm font-medium mt-1">Manage your unique culinary creations and saved discoveries.</p>
          </div>
          <Link 
            href="/recipe/add" 
            className="inline-flex items-center justify-center bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-semibold text-sm transition-all shadow-md shadow-orange-500/10 hover:shadow-orange-500/20 active:scale-98 shrink-0 self-start sm:self-auto"
          >
            + Add New Recipe
          </Link>
        </div>

        {/* Premium Pill-Style Tab Toggle Navigation Container */}
        <div className="bg-zinc-200/50 p-1.5 rounded-xl inline-flex gap-1 border border-zinc-200/40">
          <button 
            onClick={() => setActiveTab('my-recipes')}
            className={`px-4 py-2 text-sm font-bold rounded-lg transition-all duration-200 ${activeTab === 'my-recipes' ? 'bg-white text-orange-600 shadow-sm' : 'text-zinc-500 hover:text-zinc-800'}`}
          >
            My Recipes ({myRecipes.length})
          </button>
          <button 
            onClick={() => setActiveTab('bookmarks')}
            className={`px-4 py-2 text-sm font-bold rounded-lg transition-all duration-200 ${activeTab === 'bookmarks' ? 'bg-white text-orange-600 shadow-sm' : 'text-zinc-500 hover:text-zinc-800'}`}
          >
            Bookmarks ({bookmarkedRecipes.length})
          </button>
        </div>

        {/* Execution Content Section */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 space-y-3">
            <div className="animate-spin rounded-full h-10 w-10 border-2 border-orange-500 border-t-transparent"></div>
            <p className="text-sm text-zinc-400 font-medium animate-pulse">Syncing library assets...</p>
          </div>
        ) : displayList.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {displayList.map((recipe: any) => (
              <RecipeCard key={recipe.recipeId || recipe.id} recipe={recipe} />
            ))}
          </div>
        ) : (
          <div className="bg-white border border-dashed border-zinc-300/80 rounded-3xl p-16 md:p-24 text-center max-w-xl mx-auto shadow-sm">
            <p className="text-zinc-500 font-semibold text-lg mb-2">
              No {activeTab === 'my-recipes' ? 'created recipes' : 'bookmarked items'} found.
            </p>
            <p className="text-zinc-400 text-sm mb-6">Start populating your workspace catalog directly.</p>
            <Link href="/" className="inline-flex text-orange-600 font-bold hover:text-orange-700 underline text-sm transition-colors">
              Explore Main Hub Network →
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}