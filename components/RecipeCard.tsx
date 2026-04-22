import Link from 'next/link';

export default function RecipeCard({ recipe }: any) {
  return (
    <Link href={`/recipe/${recipe.id}`}>
      <div className="bg-white border rounded-2xl overflow-hidden hover:shadow-xl transition-all group cursor-pointer">
        {/* Placeholder for Recipe Image */}
        <div className="h-48 bg-orange-100 flex items-center justify-center text-4xl group-hover:scale-110 transition-transform">
          {recipe.image || "🥘"}
        </div>
        
        <div className="p-5">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-bold text-xl text-gray-800 group-hover:text-orange-600 transition">
              {recipe.title}
            </h3>
          </div>
          
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <span>👤 {recipe.servings} Servings</span>
            <span>🔥 Easy</span>
          </div>
        </div>
      </div>
    </Link>
  );
}