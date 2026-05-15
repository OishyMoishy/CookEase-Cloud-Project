"use client";
import React from 'react';
import Link from 'next/link';
import { useAuth } from './AuthContext';

export default function RecipeCard({ recipe }: any) {
  const { user } = useAuth();

  const handleBookmark = async (e: React.MouseEvent) => {
    e.preventDefault(); 
    if (!user) {
      alert("Please login to bookmark recipes!");
      return;
    }

    const ngrok_site = "https://radiance-anyway-dumpster.ngrok-free.dev";
    
    try {
      const response = await fetch(`${ngrok_site}/api/bookmarks`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "true" 
        },
        body: JSON.stringify({ 
          userId: parseInt(user.id), 
          recipeId: recipe.recipeId || recipe.id 
        })
      });

      if (response.ok) {
        alert("Recipe added to your library!");
      } else {
        alert("Already in your library or server error.");
      }
    } catch (error) {
      console.error("Bookmark error:", error);
    }
  };

  const currentId = recipe.recipeId || recipe.id;

  return (
    <div className="group relative bg-white border border-zinc-200/60 rounded-2xl overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full cursor-pointer">
      {/* Floating Bookmark Button with Glassmorphism */}
      <button 
        onClick={handleBookmark}
        className="absolute top-3 right-3 z-10 bg-white/80 backdrop-blur-md text-zinc-700 p-2.5 rounded-full shadow-sm hover:bg-orange-500 hover:text-white transition-all duration-200 active:scale-90"
        title="Bookmark this recipe"
      >
        🔖
      </button>

      <Link href={`/recipe/${currentId}`} className="flex flex-col h-full">
        {/* Card Image Wrapper */}
        <div className="aspect-[16/10] w-full bg-gradient-to-br from-orange-50/60 to-amber-50/40 border-b border-zinc-100 flex items-center justify-center text-5xl group-hover:scale-102 transition-transform duration-300">
          {recipe.image || recipe.imageUrl || "🥘"}
        </div>
        
        {/* Content Body */}
        <div className="p-5 flex flex-col flex-1 justify-between">
          <div>
            <h3 className="font-semibold text-lg text-zinc-800 group-hover:text-orange-600 transition-colors duration-200 mb-3 line-clamp-2">
              {recipe.title}
            </h3>
          </div>
          
          {/* Metadata Badges */}
          <div className="flex items-center justify-between gap-2 mt-auto pt-2 border-t border-zinc-100/80">
            <span className="bg-zinc-100 text-zinc-600 px-2.5 py-1 rounded-md flex items-center gap-1.5 text-xs font-semibold">
              👤 {recipe.baseServings || 2} Servings
            </span>
            <span className="bg-orange-50 text-orange-700 px-2.5 py-1 rounded-md flex items-center gap-1.5 text-xs font-semibold">
              👨‍🍳 {recipe.publisherName || "Community Chef"}
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}