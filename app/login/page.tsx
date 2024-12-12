'use client';

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // TODO: Add actual authentication logic here
    if (email && password) {
      // For now, just redirect to home page
      router.push('/');
    }
  };

  return (
    <div className="min-h-screen bg-gold p-8 font-sans relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(100)].map((_, i) => (
          <div
            key={i}
            className="absolute w-4 h-4 bg-black opacity-10 transform rotate-45"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `shine ${Math.random() * 5 + 2}s linear infinite`,
            }}
          ></div>
        ))}
      </div>
      
      <main className="max-w-md mx-auto relative z-10 mt-20">
        <div className="bg-white p-8 transform -rotate-1 shadow-[8px_8px_0_0_rgba(0,0,0,1)] border-4 border-black">
          <h1 className="text-4xl font-bold mb-8 text-black transform rotate-1">
            Welcome Back!
          </h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-lg font-bold transform rotate-1 inline-block">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border-4 border-black focus:outline-none focus:ring-2 focus:ring-blue-500 transform hover:rotate-1 transition-transform"
                placeholder="your@email.com"
                required
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-lg font-bold transform -rotate-1 inline-block">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border-4 border-black focus:outline-none focus:ring-2 focus:ring-blue-500 transform hover:-rotate-1 transition-transform"
                placeholder="••••••••"
                required
              />
            </div>
            
            <Button 
              type="submit"
              className="w-full bg-blue-500 text-white hover:bg-blue-600 font-bold py-3 border-4 border-black transform hover:rotate-1 transition-transform"
            >
              Log In
            </Button>
          </form>
          
          <div className="mt-6 text-center text-sm text-gray-600">
            Don't have an account? Contact us to get started!
          </div>

          <div className="mt-4 text-center">
            <Link 
              href="/"
              className="text-blue-500 hover:text-blue-700 font-bold transform inline-block hover:rotate-2 transition-transform"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
