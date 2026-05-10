"use client";
import Link from 'next/link';
import { useAuth } from './AuthContext';

export default function RecipeCard({ recipe }: any) {
  const { user } = useAuth();

  const handleBookmark = async (e: React.MouseEvent) => {
    e.preventDefault(); // Stop navigation to the details page [cite: 371]
    if (!user) {
      alert("Please login to bookmark recipes!");
      return;
    }

    const ngrok_site = "https://radiance-anyway-dumpster.ngrok-free.dev";
    try {
      const response = await fetch(`${ngrok_site}/api/bookmarks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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

  return (
    <div className="bg-white border rounded-2xl overflow-hidden hover:shadow-xl transition-all group relative cursor-pointer">
      {/* Bookmark Button Overlay */}
      <button 
        onClick={handleBookmark}
        className="absolute top-3 right-3 z-10 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-md hover:bg-orange-500 hover:text-white transition-all active:scale-90"
        title="Bookmark this recipe"
      >
        🔖
      </button>

      <Link href={`/recipe/${recipe.recipeId || recipe.id}`}>
        <div className="h-48 bg-orange-100 flex items-center justify-center text-4xl group-hover:scale-105 transition-transform">
          {recipe.image || "🥘"}
        </div>
        <div className="p-5">
          <h3 className="font-bold text-xl text-gray-800 group-hover:text-orange-600 transition mb-2">
            {recipe.title}
          </h3>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <span>👤 {recipe.servings || recipe.baseServings} Servings</span>
            <span>🔥 Easy</span>
          </div>
        </div>
      </Link>
    </div>
  );
}