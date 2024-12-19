'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function ComputerServices() {
  const [description, setDescription] = useState('');
  const [serviceType, setServiceType] = useState('password');

  const services = {
    password: {
      title: 'Password Recovery',
      price: 'R250',
      description: 'Recover forgotten passwords from your devices'
    },
    computerRepair: {
      title: 'Computer Repairs',
      price: 'Starting from R500',
      description: 'Hardware and software repairs for Windows and Mac computers'
    },
    phoneOptimization: {
      title: 'Phone Optimization',
      price: 'R200',
      description: 'Make your Android or iOS device run faster and smoother'
    },
    deviceMaintenance: {
      title: 'Device Maintenance',
      price: 'R150',
      description: 'Tips and services for maintaining your devices in top condition'
    },
    bluetoothAudio: {
      title: 'Bluetooth & Audio Issues',
      price: 'R100',
      description: 'Fix issues with headphones, speakers, and other audio devices'
    },
    chargingIssues: {
      title: 'Charging Solutions',
      price: 'R150',
      description: 'Fix charging issues for phones, laptops, and other devices'
    }
  };

  const handleSubmit = () => {
    const selectedService = services[serviceType as keyof typeof services];
    const message = description.trim() 
      ? `Hello, I need help with ${selectedService.title}.\n\nMy problem: ${description}`
      : `Hello, I'm interested in your ${selectedService.title} service. Can you tell me more about it?`;
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
          
          <h1 className="text-4xl font-bold mb-6">Tech Wizard Services 🪄</h1>
          
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Our Services & Pricing:</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {Object.entries(services).map(([key, service]) => (
                <div 
                  key={key}
                  className="p-4 border-2 border-black bg-white transform hover:-rotate-1 transition-transform duration-200"
                >
                  <h3 className="font-bold text-lg">{service.title}</h3>
                  <p className="text-gray-700 mb-2">{service.description}</p>
                  <p className="font-bold text-black">{service.price}</p>
                </div>
              ))}
            </div>
            <div className="bg-yellow-100 p-4 border-2 border-black transform rotate-1">
              <h3 className="font-bold text-lg mb-2">💡 Did You Know?</h3>
              <ul className="list-disc list-inside space-y-2">
                <li>All prices are negotiable based on your specific needs</li>
                <li>Get personalized device care tips with every service</li>
                <li>Free basic tech advice included with any service</li>
                <li>Remote assistance available when possible</li>
              </ul>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-lg font-bold mb-2">Select Service Type:</label>
              <select 
                value={serviceType}
                onChange={(e) => setServiceType(e.target.value)}
                className="w-full p-3 border-2 border-black rounded bg-white transform hover:-rotate-1 transition-transform duration-200"
              >
                {Object.entries(services).map(([key, service]) => (
                  <option key={key} value={key}>{service.title}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-lg font-bold mb-2">Describe Your Problem:</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full h-40 p-3 border-2 border-black rounded bg-white resize-none transform hover:-rotate-1 transition-transform duration-200"
                placeholder="Please describe your issue in detail. Include your device type, model, and any specific problems you're experiencing..."
              />
            </div>

            <button
              onClick={handleSubmit}
              className="w-full btn-gold font-bold py-3 px-6 border-4 border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:shadow-[8px_8px_0_0_rgba(0,0,0,1)] transition-all transform hover:rotate-1"
            >
              Get Tech Support Now
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
