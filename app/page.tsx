'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gold p-8 font-sans relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-4 h-4 bg-black opacity-10 transform rotate-45 animate-shine-${i % 3}`}
            style={{
              left: `${(i % 6) * 20}%`,
              top: `${Math.floor(i / 6) * 20}%`,
            }}
          ></div>
        ))}
      </div>
      <main className="max-w-4xl mx-auto relative z-10">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-6xl font-bold text-black transform -rotate-2 bg-white p-4 inline-block animate-slide-in">
            West Park Services
          </h1>
          <div className="space-x-4">
            <Link href="/theme" passHref>
              <button className="btn-gold font-bold py-2 px-4 border-4 border-black transform rotate-2">
                Customize Theme
              </button>
            </Link>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <ServiceCard
            title="Package Delivery & Collection 🚐"
            description="We deliver and collect packages in the West Park area."
            buttonText="Order"
            href="/location-select"
          />
          <ServiceCard
            title="Cake Pre-orders 🧁"
            description="Order cakes! Available when 12 pre-orders are reached."
            buttonText="Preorder Now"
            href="/cake-preorder"
          />
          <ServiceCard
            title="Password Recovery 🔒"
            description="We help you recover forgotten passwords on Android."
            buttonText="Learn More"
            href="/password-recovery"
          />
          <div className="bg-white p-6 transform rotate-3 hover:rotate-0 transition-transform duration-300 shadow-[8px_8px_0_0_rgba(0,0,0,1)] border-4 border-black">
            <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
            <Link href="/contact" passHref>
              <button className="w-full btn-gold hover:bg-blue-100 font-bold py-2 px-4 border-4 border-black">
                Get in Touch
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
}

function ServiceCard({ title, description, buttonText, href }: ServiceCardProps) {
  return (
    <div className="service-card bg-white p-6 transform -rotate-2 hover:rotate-0 transition-transform duration-300 shadow-[8px_8px_0_0_rgba(0,0,0,1)] border-4 border-black">
      <div className="card-content">
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        <p className="mb-6">{description}</p>
        <Link href={href} passHref>
          <button 
            className="w-full btn-gold font-bold py-2 px-4 border-4 border-black"
          >
            {buttonText}
          </button>
        </Link>
      </div>
    </div>
  );
}
