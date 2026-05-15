"use client";
import { useState, useMemo, useEffect } from 'react';
import RecipeCard from '@/components/RecipeCard';
import { useAuth } from '@/components/AuthContext';

export default function HomePage() {
  const { user } = useAuth();
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const [allRecipes, setAllRecipes] = useState<any[]>([]); 
  const [videoSuggestion, setVideoSuggestion] = useState<any>(null);

  const ngrok_site = "https://radiance-anyway-dumpster.ngrok-free.dev";

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const res = await fetch(`${ngrok_site}/api/recipes`, {
          headers: { "ngrok-skip-browser-warning": "true" }
        });
        if (res.ok) {
          const data = await res.json();
          setAllRecipes(Array.isArray(data) ? data : []);
        }
      } catch (error) {
        console.error("Failed to load recipes:", error);
      }
    };
    fetchRecipes();
  }, []);

  useEffect(() => {
    if (ingredients.length > 0) {
      const fetchVideo = async () => {
        try {
          const res = await fetch(`${ngrok_site}/api/youtube/suggest?query=${ingredients[0]}`, {
            headers: { "ngrok-skip-browser-warning": "true" }
          });
          if (res.ok) {
            const data = await res.json();
            setVideoSuggestion(data);
          }
        } catch (error) {
          console.error("YouTube fetch error:", error);
        }
      };
      fetchVideo();
    } else {
      setVideoSuggestion(null);
    }
  }, [ingredients]);

  const addIngredient = () => {
    const val = input.trim().toLowerCase();
    if (val && !ingredients.includes(val)) {
      setIngredients(prev => [...prev, val]);
      setInput("");
    }
  };

  const removeIngredient = (index: number) => {
    setIngredients(prev => prev.filter((_, i) => i !== index));
  };

  const filteredRecipes = useMemo(() => {
    if (!allRecipes || allRecipes.length === 0) return [];
    if (ingredients.length === 0) return allRecipes;

    return allRecipes.filter(recipe => 
      ingredients.every(searchIng => 
        recipe.title?.toLowerCase().includes(searchIng) || 
        recipe.ingredients?.some((ing: any) => ing.name?.toLowerCase().includes(searchIng)) ||
        recipe.publisherName?.toLowerCase().includes(searchIng)
      )
    );
  }, [ingredients, allRecipes]);

  return (
    <main className="min-h-screen bg-zinc-50 text-zinc-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto p-6 md:p-8 space-y-10">
        {/* Decorative Search Header Context */}
        <header className="text-center max-w-2xl mx-auto space-y-4 py-8">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-zinc-800">
            Find Recipes by Ingredients
          </h1>
          <p className="text-zinc-500 font-medium text-sm md:text-base">
            Type your ingredients to discover tailored community dishes instantly.
          </p>
          
          {/* Main Input Component */}
          <div className="flex gap-3 max-w-md mx-auto pt-2">
            <input 
              className="flex-1 p-4 bg-white border border-zinc-200 rounded-2xl outline-none shadow-sm focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 transition-all text-zinc-800 font-medium" 
              placeholder="Ex: Pasta, Chicken..." 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addIngredient()}
            />
            <button 
              onClick={addIngredient} 
              className="bg-zinc-900 text-white px-7 rounded-2xl font-semibold hover:bg-zinc-800 active:scale-98 shadow-md transition-all duration-200"
            >
              Add
            </button>
          </div>

          {/* Active Tag Pills */}
          <div className="flex flex-wrap justify-center gap-2 pt-2">
            {ingredients.map((ing, i) => (
              <button 
                key={`${ing}-${i}`} 
                onClick={() => removeIngredient(i)} 
                className="bg-orange-50/80 text-orange-700 px-3.5 py-1.5 rounded-full text-xs font-bold border border-orange-100/60 flex items-center gap-2 hover:bg-orange-100/80 transition-colors group"
              >
                {ing} <span className="text-orange-400 group-hover:text-orange-600 transition-colors">×</span>
              </button>
            ))}
          </div>
        </header>

        {/* Content Layout Split */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Main Grid View */}
          <section className="flex-1 w-full grid grid-cols-1 sm:grid-cols-2 gap-6">
            {filteredRecipes.length > 0 ? (
              filteredRecipes.map(recipe => (
                <RecipeCard key={recipe.recipeId || recipe.id} recipe={recipe} />
              ))
            ) : (
              <div className="col-span-full bg-white border border-zinc-200/60 rounded-3xl py-24 text-center px-4 shadow-sm">
                <p className="text-zinc-400 font-medium text-lg">
                  {allRecipes.length > 0 ? "No recipes match your chosen ingredients." : "Assembling kitchen pipeline..."}
                </p>
              </div>
            )}
          </section>

          {/* Sticky Video Sidebar Section */}
          <aside className="w-full lg:w-80 shrink-0 lg:sticky lg:top-24">
            <div className="bg-white p-6 rounded-3xl border border-zinc-200/60 shadow-sm space-y-4">
              <h2 className="text-base font-bold text-zinc-800 flex items-center gap-2">
                <span className="text-red-500 text-xs">▶</span> Video Assistant
              </h2>
              
              {videoSuggestion ? (
                <div className="space-y-3">
                  <div className="aspect-video bg-zinc-100 border border-zinc-100 rounded-xl overflow-hidden shadow-inner">
                     <iframe width="100%" height="100%" src={`https://www.youtube.com/embed/${videoSuggestion.videoId}`} title="YouTube video player" frameBorder="0" allowFullScreen></iframe>
                  </div>
                  <h3 className="font-semibold text-sm leading-snug text-zinc-800 line-clamp-2">{videoSuggestion.title}</h3>
                </div>
              ) : (
                <div className="bg-zinc-50 border border-dashed border-zinc-200 rounded-2xl p-6 text-center">
                  <p className="text-xs text-zinc-400 font-medium italic">Add an ingredient tag to lock down a dynamic video guide.</p>
                </div>
              )}
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}