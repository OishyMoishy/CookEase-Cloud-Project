import "./globals.css";
import Link from "next/link";

// "export default" is the most important part here!
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-white text-zinc-900 antialiased min-h-screen">
        <nav className="p-5 bg-white border-b border-zinc-200 flex justify-between items-center sticky top-0 z-50">
          <Link href="/" className="text-2xl font-bold text-orange-600">
            CookEase
          </Link>
          <div className="space-x-4">
            <Link href="/login" className="text-zinc-600 hover:text-orange-600 font-medium">
              Login
            </Link>
            <Link href="/signup" className="bg-orange-500 text-white px-5 py-2 rounded-lg font-bold hover:bg-orange-600 transition">
              Sign Up
            </Link>
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}