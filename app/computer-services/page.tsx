'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function ComputerServices() {
  const [description, setDescription] = useState('');
  const [serviceType, setServiceType] = useState('password');

  const handleSubmit = () => {
    const message = `Hello, I need help with ${serviceType === 'password' ? 'password recovery' : 'computer repairs'}.\n\nMy problem: ${description}`;
    window.open(`https://wa.me/27684535380?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-gold p-8 font-sans">
      <main className="max-w-4xl mx-auto">
        <div className="bg-white p-8 border-4 border-black shadow-[8px_8px_0_0_rgba(0,0,0,1)] transform -rotate-1">
          <Link href="/" className="inline-block mb-8">
            <button className="btn-gold font-bold py-2 px-4 border-4 border-black transform rotate-1 shadow-[4px_4px_0_0_rgba(0,0,0,1)]">
              ← Back to Home
            </button>
          </Link>
          
          <h1 className="text-4xl font-bold mb-6">Computer Services 🖥️</h1>
          
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Our Pricing:</h2>
            <ul className="list-disc list-inside space-y-2 mb-4">
              <li>Password Recovery: <span className="font-bold">R250</span></li>
              <li>Computer Repairs: Starting from <span className="font-bold">R500</span></li>
            </ul>
            <p className="text-gray-700 italic">* Prices are negotiable. We can discuss and come to an agreement based on your specific needs.</p>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-lg font-bold mb-2">Service Type:</label>
              <select 
                value={serviceType}
                onChange={(e) => setServiceType(e.target.value)}
                className="w-full p-3 border-2 border-black rounded bg-white"
              >
                <option value="password">Password Recovery</option>
                <option value="repairs">Computer Repairs</option>
              </select>
            </div>

            <div>
              <label className="block text-lg font-bold mb-2">Describe Your Problem:</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full h-40 p-3 border-2 border-black rounded bg-white resize-none"
                placeholder="Please describe your issue in detail..."
              />
            </div>

            <button
              onClick={handleSubmit}
              className="w-full btn-gold font-bold py-3 px-6 border-4 border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:shadow-[8px_8px_0_0_rgba(0,0,0,1)] transition-all"
            >
              Contact Us About Your Problem
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
