'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"

const cakes = [
  { id: 1, name: 'Chocolate', price: 150 },
  { id: 2, name: 'Vanilla', price: 130 },
  { id: 3, name: 'Red Velvet', price: 170 },
  { id: 4, name: 'Carrot', price: 160 },
]

export default function CakePreorderPage() {
  const [availableCakes, setAvailableCakes] = useState(12)

  const handlePreorder = () => {
    if (availableCakes > 0) {
      setAvailableCakes(availableCakes - 1)
      // Here you would typically also update this in a database
      alert('Cake pre-ordered successfully!')
    }
  }

  return (
    <div className="min-h-screen bg-yellow-300 p-8 font-mono">
      <main className="max-w-4xl mx-auto">
        <h1 className="text-6xl font-bold mb-8 text-black transform -rotate-2 bg-white p-4 inline-block">Cake Pre-orders</h1>
        
        <div className="bg-white p-6 border-4 border-black shadow-[8px_8px_0_0_rgba(0,0,0,1)] mb-8">
          <h2 className="text-2xl font-bold mb-4">Available Cakes: {availableCakes}</h2>
          <div className="grid grid-cols-2 gap-4">
            {cakes.map((cake) => (
              <div key={cake.id} className="p-4 border-2 border-black">
                <h3 className="text-xl font-bold">{cake.name}</h3>
                <p>R{cake.price}</p>
                <Button 
                  onClick={handlePreorder}
                  className="w-full mt-2 bg-black text-white hover:bg-gray-800 font-bold py-2 px-4 border-2 border-black"
                >
                  Preorder
                </Button>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}