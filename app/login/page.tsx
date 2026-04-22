export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh]">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md border">
        <h2 className="text-2xl font-bold mb-6">Welcome Back</h2>
        <input className="w-full p-3 border rounded-lg mb-4" placeholder="Email" />
        <input className="w-full p-3 border rounded-lg mb-6" type="password" placeholder="Password" />
        <button className="w-full bg-orange-500 text-white py-3 rounded-lg font-bold">Login</button>
      </div>
    </div>
  );
}