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

  return (
    <main className="min-h-screen bg-white p-8 max-w-6xl mx-auto">
      <header className="text-center py-12">
        <h1 className="text-5xl font-black text-zinc-900 mb-6">Find Recipes by Ingredients</h1>
        <div className="flex gap-3 max-w-md mx-auto">
          <input 
            className="flex-1 p-4 border-2 border-gray-200 rounded-xl bg-white text-zinc-900 focus:border-orange-500 outline-none" 
            placeholder="Ex: Chicken, Garlic..." 
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button 
            onClick={() => {if(input) setIngredients([...ingredients, input]); setInput("")}}
            className="bg-zinc-900 text-white px-8 rounded-xl font-bold hover:bg-zinc-800 transition"
          >Add</button>
        </div>
        
        {/* Ingredient Chips */}
        <div className="flex flex-wrap justify-center gap-2 mt-6">
          {ingredients.map((ing, i) => (
            <span key={i} className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm font-bold border border-orange-200">
              {ing}
            </span>
          ))}
        </div>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-4">
        {recipes.map(recipe => (
          <RecipeCard key={recipe.id} recipe={recipe} /> 
        ))}
      </section>
    </main>
  );
}