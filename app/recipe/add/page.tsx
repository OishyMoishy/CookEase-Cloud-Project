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

    // This will now correctly result in the number 3
    const userId = user?.id ? parseInt(user.id) : 0;
    
    const payload = {
      title: recipe.title,
      baseServings: Number(recipe.baseServings),
      instructions: recipe.instructions,
      imageUrl: recipe.imageUrl || "",
      createdBy: userId, // This matches System.Int32 in .NET
      ingredients: ingredients.map(ing => ({
        name: ing.name,
        quantity: Number(ing.quantity),
        unit: ing.unit
      }))
    };

    

    // Log this to your console so you can see exactly what is being sent
    console.log("Sending Payload:", JSON.stringify(payload));

    try {
      const response = await fetch(`${ngrok_site}/api/recipes`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "true" 
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        router.push('/dashboard');
      } else {
        const errorText = await response.text();
        console.error("Server Error Response:", errorText);
        alert(`Failed to save: ${response.status}. Check console.`);
      }
    } catch (error) {
      console.error("Network Error:", error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white min-h-screen text-zinc-900">
      <h1 className="text-4xl font-black mb-8 text-zinc-900">Add New Recipe</h1>

      <form onSubmit={handleSubmit} className="space-y-8">
        <section className="space-y-4">
          <input
            required
            placeholder="Recipe Title (e.g., Spicy Pasta)"
            className="w-full p-4 border-2 border-zinc-100 rounded-2xl focus:border-orange-500 outline-none text-zinc-900"
            onChange={(e) => setRecipe({...recipe, title: e.target.value})}
          />
          <div className="flex gap-4">
            <input
              type="number"
              placeholder="Base Servings"
              className="w-1/3 p-4 border-2 border-zinc-100 rounded-2xl focus:border-orange-500 outline-none text-zinc-900"
              value={recipe.baseServings}
              onChange={(e) => setRecipe({...recipe, baseServings: parseInt(e.target.value) || 0})}
            />
            <input
              placeholder="Image URL"
              className="flex-1 p-4 border-2 border-zinc-100 rounded-2xl focus:border-orange-500 outline-none text-zinc-900"
              onChange={(e) => setRecipe({...recipe, imageUrl: e.target.value})}
            />
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-4 text-zinc-900">Ingredients</h2>
          {ingredients.map((ing, i) => (
            <div key={i} className="flex gap-2 mb-2">
              <input
                required
                placeholder="Name"
                className="flex-1 p-3 border rounded-xl outline-none focus:border-orange-500 text-zinc-900"
                onChange={(e) => {
                  const newIngs = [...ingredients];
                  newIngs[i].name = e.target.value;
                  setIngredients(newIngs);
                }}
              />
              <input
                required
                type="number"
                placeholder="Qty"
                className="w-20 p-3 border rounded-xl outline-none focus:border-orange-500 text-zinc-900"
                onChange={(e) => {
                  const newIngs = [...ingredients];
                  newIngs[i].quantity = parseFloat(e.target.value) || 0;
                  setIngredients(newIngs);
                }}
              />
              <input
                required
                placeholder="Unit"
                className="w-24 p-3 border rounded-xl outline-none focus:border-orange-500 text-zinc-900"
                onChange={(e) => {
                  const newIngs = [...ingredients];
                  newIngs[i].unit = e.target.value;
                  setIngredients(newIngs);
                }}
              />
            </div>
          ))}
          <button type="button" onClick={addIngredientField} className="text-orange-600 font-bold mt-2 hover:underline">
            + Add Another Ingredient
          </button>
        </section>

        <textarea
          required
          placeholder="Instructions..."
          rows={5}
          className="w-full p-4 border-2 border-zinc-100 rounded-2xl focus:border-orange-500 outline-none text-zinc-900"
          onChange={(e) => setRecipe({...recipe, instructions: e.target.value})}
        ></textarea>

        <button
          type="submit"
          className="w-full bg-orange-500 text-white py-4 rounded-2xl font-black text-xl shadow-lg hover:bg-orange-600 transition-all"
        >
          Save Recipe to Cloud
        </button>
      </form>
    </div>
  );
}