'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Home() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth <= 768);
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="min-h-screen bg-gold p-8 font-sans relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Reduced number of diamonds for mobile */}
        {[...Array(isMobile ? 3 : 6)].map((_, i) => (
          <div
            key={`large-${i}`}
            className="diamond w-16 h-16 diamond-float"
            style={{
              position: 'fixed',
              left: `${(i * 30) + 5}%`,
              top: `${10 + (i * 5)}%`,
              opacity: 0.1,
              transform: 'rotate(45deg)',
            }}
          />
        ))}
        
        {!isMobile && [...Array(8)].map((_, i) => (
          <div
            key={`medium-${i}`}
            className="diamond w-12 h-12 diamond-float-reverse"
            style={{
              position: 'fixed',
              left: `${(i * 15) + 2}%`,
              top: `${40 + (i * 3)}%`,
              opacity: 0.1,
              transform: 'rotate(45deg)',
            }}
          />
        ))}
        
        {!isMobile && [...Array(12)].map((_, i) => (
          <div
            key={`small-${i}`}
            className="diamond w-8 h-8"
            style={{
              position: 'fixed',
              left: `${(i * 10) + 8}%`,
              top: `${70 + (i * 2)}%`,
              opacity: 0.1,
              transform: 'rotate(45deg)',
            }}
          />
        ))}
      </div>
      <main className="max-w-4xl mx-auto relative z-10">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-6xl font-bold text-black transform -rotate-2 bg-white p-4 inline-block shadow-[8px_8px_0_0_rgba(0,0,0,1)]">
            LSA
          </h1>
          <div className="space-x-4">
            <Link href="/theme" passHref>
              <button className="btn-gold font-bold py-2 px-4 border-4 border-black transform rotate-2 shadow-[4px_4px_0_0_rgba(0,0,0,1)]">
                Customize Theme
              </button>
            </Link>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <ServiceCard
            title="Package Delivery & Collection 🚐"
            description="We deliver and collect packages in the West Park area."
            buttonText="Coming Soon"
            href="#"
            className="max-w-[110%]"
            comingSoon
          />
          <ServiceCard
            title="Cake Pre-orders 🧁"
            description="Order cakes, bread, and other baked goods in advance! The orders will become available for delivery when 12 pre-orders are reached."
            buttonText="Preorder Now"
            href="/cake-preorder"
          />
          <ServiceCard
            title="Tech Wizard Services 🪄"
            description="Your one-stop solution for all tech problems! From password recovery to device optimization, we handle computers, phones, tablets, and more. Starting from R100. Prices are negotiable!"
            buttonText="Get Tech Support"
            href="/computer-services"
          />
          <div className="bg-white p-6 transform rotate-3 hover:rotate-0 transition-transform duration-300 shadow-[8px_8px_0_0_rgba(0,0,0,1)] border-4 border-black">
            <h2 className="text-2xl font-bold mb-4">Contact Us 📞</h2>
            <Link 
              href={`https://wa.me/27684535380?text=${encodeURIComponent('Hello, I have a question about the services you offer')}`}
              target="_blank"
              rel="noopener noreferrer"
              passHref
            >
              <button className="w-full btn-gold hover:bg-blue-100 font-bold py-2 px-4 border-4 border-black">
                Contact Me
              </button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

interface ServiceCardProps {
  title: string;
  description: string;
  buttonText: string;
  href: string;
  className?: string;
  comingSoon?: boolean;
}

function ServiceCard({ title, description, buttonText, href, className = '', comingSoon = false }: ServiceCardProps) {
  return (
    <div className={`service-card bg-white p-6 transform -rotate-2 hover:rotate-0 transition-transform duration-300 shadow-[8px_8px_0_0_rgba(0,0,0,1)] border-4 border-black relative ${className}`}>
      {comingSoon && (
        <div className="absolute -top-3 -right-3 bg-yellow-400 text-black py-1 px-3 transform rotate-12 font-bold border-2 border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)]">
          Coming Soon!
        </div>
      )}
      <div className="card-content">
        <h2 className={`text-2xl font-bold mb-4 whitespace-pre-wrap`}>{title}</h2>
        <p className="mb-6">{description}</p>
        <Link href={href} passHref>
          <button 
            className={`w-full btn-gold font-bold py-2 px-4 border-4 border-black ${comingSoon ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={comingSoon ? (e) => e.preventDefault() : undefined}
          >
            {buttonText}
          </button>
        </Link>
      </div>
    </div>
  );
}
