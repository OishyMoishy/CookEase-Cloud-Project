"use client";
import { useState, use } from 'react';

export default function RecipeDetails({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const id = resolvedParams.id;
  const [targetServings, setTargetServings] = useState(2);

  const baseRecipe = {
    title: "Spicy Pasta",
    baseServings: 2,
    ingredients: [
      { name: "Pasta", qty: 200, unit: "g" },
      { name: "Tomato Sauce", qty: 100, unit: "ml" }
    ]
  };

  return (
    <div className="min-h-screen bg-white p-8"> {/* Forced white bg */}
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-black text-zinc-900 mb-8">{baseRecipe.title} (ID: {id})</h1>
        
        {/* The Input Box Section */}
        <div className="bg-orange-50 p-6 rounded-2xl mb-10 border border-orange-100">
          <label className="block mb-3 font-bold text-zinc-800 text-lg">
            How many people are eating?
          </label>
          <input 
            type="number" 
            value={targetServings} 
            onChange={(e) => setTargetServings(Number(e.target.value))}
            className="w-full p-4 border-2 border-orange-200 rounded-xl bg-white text-zinc-900 font-bold text-xl focus:border-orange-500 outline-none transition-all"
          />
        </div>

        <h2 className="text-2xl font-extrabold text-zinc-900 mb-6 pb-2 border-b-2 border-zinc-100">
          Required Ingredients:
        </h2>
        
        <ul className="space-y-4">
          {baseRecipe.ingredients.map((ing, i) => (
            <li key={i} className="flex justify-between items-center py-3 border-b border-zinc-50">
              <span className="text-lg font-medium text-zinc-700">{ing.name}</span>
              <span className="text-xl font-black text-orange-600 bg-orange-50 px-3 py-1 rounded-lg">
                {((ing.qty / baseRecipe.baseServings) * targetServings).toFixed(1)} {ing.unit}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}