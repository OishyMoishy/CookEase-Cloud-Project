import Link from 'next/link';

export default function Dashboard() {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">My Recipes</h1>
        <Link href="/recipe/add" className="bg-green-600 text-white px-4 py-2 rounded-lg">+ Add New</Link>
      </div>
      <div className="bg-white border rounded-xl p-10 text-center text-gray-400">
        You haven't added any recipes yet.
      </div>
    </div>
  );
}