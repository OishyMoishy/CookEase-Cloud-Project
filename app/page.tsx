"use client";
import { useState, useMemo, useEffect } from 'react';
import RecipeCard from '@/components/RecipeCard';
import { useAuth } from '@/components/AuthContext';

export default function HomePage() {
  const { user } = useAuth(); // Monitor user state [cite: 401, 403]
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const [videoSuggestion, setVideoSuggestion] = useState<any>(null);

  // 1. FIX: Reset local state when the user logs out 
  useEffect(() => {
    if (!user) {
      setIngredients([]);
      setVideoSuggestion(null);
      setInput("");
    }
  }, [user]);

  const allRecipes = [
    { id: 1, title: "Spicy Pasta", servings: 2, image: "🍝", tags: ["pasta", "tomato", "spicy"] },
    { id: 2, title: "Chicken Salad", servings: 1, image: "🥗", tags: ["chicken", "lettuce", "salad"] },
    { id: 3, title: "Beef Burger", servings: 1, image: "🍔", tags: ["beef", "bread", "burger"] },
  ];

  // Logic for YouTube fetch [cite: 172-173]
  useEffect(() => {
    if (ingredients.length > 0) {
      const fetchVideo = async () => {
        const ngrok_site = "https://radiance-anyway-dumpster.ngrok-free.dev";
        try {
          const res = await fetch(`${ngrok_site}/api/youtube/suggest?query=${ingredients[0]}`);
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
      setIngredients(prev => [...prev, val]); // Ensure state updates correctly [cite: 292-298]
      setInput("");
    }
  };

  const removeIngredient = (index: number) => {
    setIngredients(prev => prev.filter((_, i) => i !== index)); // Use prev state for safety [cite: 302-304]
  };

  const filteredRecipes = useMemo(() => {
    if (ingredients.length === 0) return allRecipes;
    return allRecipes.filter(recipe => 
      ingredients.every(searchIng => 
        recipe.title.toLowerCase().includes(searchIng) || 
        recipe.tags.some(tag => tag.toLowerCase().includes(searchIng))
      )
    );
  }, [ingredients]);

  return (
    <main className="min-h-screen bg-white p-8 max-w-7xl mx-auto">
      <header className="text-center py-12">
        <h1 className="text-5xl font-black text-zinc-900 mb-6 tracking-tight">CookEase Search</h1>
        <div className="flex gap-3 max-w-md mx-auto">
          <input 
            className="flex-1 p-4 border-2 border-zinc-100 rounded-2xl text-zinc-900 outline-none focus:border-orange-500" 
            placeholder="Search ingredients..." 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addIngredient()}
          />
          <button onClick={addIngredient} className="bg-orange-500 text-white px-8 rounded-2xl font-bold">Add</button>
        </div>

        {/* 2. FIX: Chip display logic - Ensure mapping works on current state [cite: 339-350] */}
        <div className="flex flex-wrap justify-center gap-2 mt-6">
          {ingredients.map((ing, i) => (
            <button 
              key={`${ing}-${i}`} 
              onClick={() => removeIngredient(i)}
              className="bg-orange-50 text-orange-700 px-4 py-1.5 rounded-full text-sm font-bold border border-orange-100 flex items-center gap-2 hover:bg-orange-100 transition"
            >
              {ing} <span className="text-orange-300">×</span>
            </button>
          ))}
        </div>
      </header>

      <div className="flex flex-col lg:flex-row gap-8">
        <section className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredRecipes.map(recipe => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </section>

        <aside className="w-full lg:w-80 space-y-6">
          <div className="bg-zinc-50 p-6 rounded-3xl border border-zinc-100 sticky top-24">
            <h2 className="text-xl font-black text-zinc-900 mb-4 flex items-center gap-2">
              <span className="text-red-600">▶</span> Video Suggestion
            </h2>
            {videoSuggestion ? (
              <div className="space-y-3">
                <div className="aspect-video bg-zinc-200 rounded-xl overflow-hidden">
                   <iframe
                    width="100%" height="100%"
                    src={`https://www.youtube.com/embed/${videoSuggestion.videoId}`}
                    title="YouTube video player" frameBorder="0"
                    allowFullScreen
                  ></iframe>
                </div>
                <h3 className="font-bold text-zinc-800 leading-tight">{videoSuggestion.title}</h3>
              </div>
            ) : (
              <p className="text-sm text-zinc-400 italic">Add an ingredient to see a tutorial.</p>
            )}
          </div>
        </aside>
      </div>
    </main>
  );
}