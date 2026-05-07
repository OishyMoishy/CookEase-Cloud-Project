"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/components/AuthContext';
import RecipeCard from '@/components/RecipeCard';

export default function Dashboard() {
  const { user } = useAuth();
  const [myRecipes, setMyRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Only fetch if the user is logged in
    if (user) {
      const fetchRecipes = async () => {
        const ngrok_site = "https://radiance-anyway-dumpster.ngrok-free.dev";
        try {
          // Fetching recipes created by this specific user [cite: 130-141]
          const res = await fetch(`${ngrok_site}/api/recipes/user/${user.id}`);
          if (res.ok) {
            const data = await res.json();
            setMyRecipes(data);
          }
        } catch (error) {
          console.error("Error fetching dashboard recipes:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchRecipes();
    }
  }, [user]);

  return (
    <div className="p-8 max-w-6xl mx-auto min-h-screen bg-white">
      <div className="flex justify-between items-end mb-10">
        <div>
          <h1 className="text-4xl font-black text-zinc-900 tracking-tight">My Kitchen</h1> [cite: 7]
          <p className="text-zinc-500 font-medium mt-1">Manage and view your personal recipes</p>
        </div>
        <Link 
          href="/recipe/add" 
          className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-2xl font-bold shadow-lg shadow-orange-100 transition-all active:scale-95 flex items-center gap-2"
        > [cite: 8]
          <span className="text-xl">+</span> Add New Recipe
        </Link>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
        </div>
      ) : myRecipes.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {myRecipes.map((recipe: any) => (
            <RecipeCard key={recipe.recipeId} recipe={recipe} />
          ))}
        </div>
      ) : (
        /* Empty State when no recipes are found [cite: 10-12] */
        <div className="bg-orange-50 border-2 border-dashed border-orange-200 rounded-3xl p-20 text-center">
          <div className="text-5xl mb-4">🍳</div>
          <h2 className="text-xl font-bold text-orange-900 mb-2">You haven't added any recipes yet</h2> [cite: 11]
          <p className="text-orange-700 max-w-xs mx-auto mb-8">
            Click the "Add New Recipe" button to start building your digital cookbook.
          </p>
          <Link href="/recipe/add" className="text-orange-600 font-bold hover:underline">
            Create your first recipe →
          </Link>
        </div>
      )}
    </div>
  );
}