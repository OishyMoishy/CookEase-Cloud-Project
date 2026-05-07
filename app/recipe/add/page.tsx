"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/AuthContext';

export default function AddRecipePage() {
  const { user } = useAuth();
  const router = useRouter();
  
  const [recipe, setRecipe] = useState({
    title: '',
    baseServings: 2,
    instructions: '',
    imageUrl: ''
  });

  const [ingredients, setIngredients] = useState([
    { name: '', quantity: 0, unit: '' }
  ]);

  const addIngredientField = () => {
    setIngredients([...ingredients, { name: '', quantity: 0, unit: '' }]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const ngrok_site = "https://radiance-anyway-dumpster.ngrok-free.dev";

    const payload = {
      ...recipe,
      createdBy: user?.id,
      ingredients: ingredients
    };

    try {
      const response = await fetch(`${ngrok_site}/api/recipes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        router.push('/dashboard');
      } else {
        alert("Failed to save recipe.");
      }
    } catch (error) {
      console.error("Error saving recipe:", error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white min-h-screen">
      <h1 className="text-4xl font-black text-zinc-900 mb-8">Add New Recipe</h1>
      
      <form onSubmit={handleSubmit} className="space-y-8">
        <section className="space-y-4">
          <input 
            required
            placeholder="Recipe Title (e.g., Spicy Pasta)"
            className="w-full p-4 border-2 border-zinc-100 rounded-2xl focus:border-orange-500 outline-none transition"
            onChange={(e) => setRecipe({...recipe, title: e.target.value})}
          />
          <div className="flex gap-4">
            <input 
              type="number"
              placeholder="Base Servings"
              className="w-1/3 p-4 border-2 border-zinc-100 rounded-2xl"
              onChange={(e) => setRecipe({...recipe, baseServings: Number(e.target.value)})}
            />
            <input 
              placeholder="Image URL"
              className="flex-1 p-4 border-2 border-zinc-100 rounded-2xl"
              onChange={(e) => setRecipe({...recipe, imageUrl: e.target.value})}
            />
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-4">Ingredients</h2>
          {ingredients.map((ing, i) => (
            <div key={i} className="flex gap-2 mb-2">
              <input 
                placeholder="Name" 
                className="flex-1 p-3 border rounded-xl"
                onChange={(e) => {
                  const newIngs = [...ingredients];
                  newIngs[i].name = e.target.value;
                  setIngredients(newIngs);
                }}
              />
              <input 
                type="number" 
                placeholder="Qty" 
                className="w-20 p-3 border rounded-xl"
                onChange={(e) => {
                  const newIngs = [...ingredients];
                  newIngs[i].quantity = Number(e.target.value);
                  setIngredients(newIngs);
                }}
              />
              <input 
                placeholder="Unit" 
                className="w-24 p-3 border rounded-xl"
                onChange={(e) => {
                  const newIngs = [...ingredients];
                  newIngs[i].unit = e.target.value;
                  setIngredients(newIngs);
                }}
              />
            </div>
          ))}
          <button 
            type="button" 
            onClick={addIngredientField}
            className="text-orange-600 font-bold mt-2"
          >
            + Add Another Ingredient
          </button>
        </section>

        <textarea 
          placeholder="Instructions..."
          rows={5}
          className="w-full p-4 border-2 border-zinc-100 rounded-2xl"
          onChange={(e) => setRecipe({...recipe, instructions: e.target.value})}
        ></textarea>

        <button 
          type="submit"
          className="w-full bg-orange-500 text-white py-4 rounded-2xl font-black text-xl shadow-lg shadow-orange-100"
        >
          Save Recipe to Cloud
        </button>
      </form>
    </div>
  );
}