import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col items-center justify-center">
      <h1 className="text-5xl font-bold mb-4">AI SaaS Platform</h1>
      <p className="text-gray-400 mb-8">Generate content instantly with AI</p>
      <div className="space-x-4">
        <Link href="/signup" className="bg-blue-600 px-6 py-2 rounded">
          Get Started
        </Link>
        <Link href="/login" className="bg-gray-800 px-6 py-2 rounded">
          Log In
        </Link>
      </div>
    </div>
  );
}