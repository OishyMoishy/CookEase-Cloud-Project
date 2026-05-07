"use client";
import { useState } from 'react';
import RecipeCard from '@/components/RecipeCard';

export default function HomePage() {
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [input, setInput] = useState("");

  const recipes = [
    { id: 1, title: "Spicy Pasta", servings: 2, image: "🍝" },
    { id: 2, title: "Chicken Salad", servings: 1, image: "🥗" },
    { id: 3, title: "Beef Burger", servings: 1, image: "🍔" },
  ];

  const addIngredient = () => {
    if (input.trim()) {
      setIngredients([...ingredients, input.trim()]);
      setInput("");
    }
  };

  return (
    <main className="min-h-screen bg-white p-8 max-w-6xl mx-auto">
      <header className="text-center py-12">
        <h1 className="text-5xl font-black text-zinc-900 mb-6 tracking-tight">Find Recipes by Ingredients</h1>
        <div className="flex gap-3 max-w-md mx-auto">
          <input 
            className="flex-1 p-4 border-2 border-zinc-100 rounded-2xl bg-white text-zinc-900 focus:border-orange-500 outline-none transition" 
            placeholder="Ex: Chicken, Garlic..." 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addIngredient()}
          />
          <button 
            onClick={addIngredient}
            className="bg-zinc-900 text-white px-8 rounded-2xl font-bold hover:bg-zinc-800 transition shadow-lg shadow-zinc-200"
          >
            Add
          </button>
        </div>
        
        <div className="flex flex-wrap justify-center gap-2 mt-6">
          {ingredients.map((ing, i) => (
            <span key={i} className="bg-orange-50 text-orange-700 px-4 py-1.5 rounded-full text-sm font-bold border border-orange-100">
              {ing}
            </span>
          ))}
        </div>
      </header>

      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-4">
        {recipes.map(recipe => (
          <RecipeCard key={recipe.id} recipe={recipe} /> 
        ))}
      </section>
    </main>
  );
}