"use client";
import { useState, useEffect, use } from 'react';

export default function RecipeDetails({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const id = resolvedParams.id;
  
  const [recipe, setRecipe] = useState<any>(null);
  const [targetServings, setTargetServings] = useState(2);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      const ngrok_site = "https://radiance-anyway-dumpster.ngrok-free.dev";
      try {
        const res = await fetch(`${ngrok_site}/api/recipes/${id}`, {
          headers: { "ngrok-skip-browser-warning": "true" }
        });
        if (res.ok) {
          const data = await res.json();
          setRecipe(data);
          setTargetServings(data.baseServings || 2);
        }
      } catch (error) {
        console.error("Error fetching recipe details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRecipeDetails();
  }, [id]);

  if (loading) return <div className="p-8 text-center text-zinc-500">Loading recipe...</div>;
  if (!recipe) return <div className="p-8 text-center text-zinc-500">Recipe not found.</div>;

  return (
    <div className="min-h-screen bg-white p-8 text-zinc-900">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-black mb-8">{recipe.title}</h1>
        <div className="bg-orange-50 p-6 rounded-2xl mb-10 border border-orange-100">
          <label className="block mb-3 font-bold text-lg text-zinc-800">Servings Adjuster</label>
          <input
            type="number"
            value={targetServings}
            onChange={(e) => setTargetServings(Number(e.target.value))}
            className="w-full p-4 border-2 border-orange-200 rounded-xl bg-white font-bold"
          />
        </div>

        <h2 className="text-2xl font-extrabold mb-6 pb-2 border-b-2 border-zinc-100">Ingredients:</h2>
        <ul className="space-y-4">
          {recipe.ingredients && recipe.ingredients.map((ing: any, i: number) => (
            <li key={i} className="flex justify-between items-center py-3 border-b border-zinc-50">
              <span className="text-lg font-medium text-zinc-700">{ing.name}</span>
              <span className="text-xl font-black text-orange-600">
                {((ing.quantity / recipe.baseServings) * targetServings).toFixed(1)} {ing.unit}
              </span>
            </li>
          ))}
        </ul>

        {recipe.instructions && (
          <div className="mt-10">
            <h2 className="text-2xl font-extrabold mb-4">Instructions</h2>
            <p className="text-zinc-700 whitespace-pre-wrap leading-relaxed">{recipe.instructions}</p>
          </div>
        )}
      </div>
    </div>
  );
}