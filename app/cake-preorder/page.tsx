'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import Link from 'next/link'
import Image from 'next/image'

const cakes = [
  {
    id: 1,
    name: 'Apple Oatmeal Quick Bread',
    price: 150,
    image: '/muffins/Apple Oatmeal Quick Bread.jpg',
    description: 'A hearty and wholesome quick bread made with fresh apples and nutritious oatmeal'
  },
  {
    id: 2,
    name: 'Blackberry Corn Muffins',
    price: 130,
    image: '/muffins/Blackberry Corn Muffins.jpg',
    description: 'Sweet corn muffins studded with juicy blackberries for a perfect breakfast treat'
  },
  {
    id: 3,
    name: 'Carrot Cake Breakfast Cookies',
    price: 170,
    image: '/muffins/Carrot Cake Breakfast Cookies.jpg',
    description: 'Healthy breakfast cookies packed with carrots, spices, and wholesome ingredients'
  },
  {
    id: 4,
    name: 'Easy Blueberry Muffins',
    price: 160,
    image: '/muffins/Easy Blueberry Muffins.jpg',
    description: 'Classic blueberry muffins bursting with fresh berries in every bite'
  },
  {
    id: 5,
    name: 'Easy Pumpkin Bread',
    price: 140,
    image: '/muffins/Easy Pumpkin Bread.jpg',
    description: 'Moist and flavorful pumpkin bread with warm autumn spices'
  },
  {
    id: 6,
    name: 'Extra Moist Banana Bread',
    price: 155,
    image: '/muffins/Extra Moist Banana Bread.jpg',
    description: 'Super moist banana bread made with ripe bananas for maximum flavor'
  },
  {
    id: 7,
    name: 'Pumpkin Chocolate Chip Muffins',
    price: 180,
    image: '/muffins/Pumpkin Chocolate Chip Muffins with Coffee Glaze.jpg',
    description: 'Pumpkin muffins loaded with chocolate chips and topped with a rich coffee glaze'
  },
  {
    id: 8,
    name: 'Whole Wheat Apple Cinnamon Muffins',
    price: 145,
    image: '/muffins/Whole Wheat Apple Cinnamon Muffins.jpg',
    description: 'Healthy whole wheat muffins with fresh apples and warm cinnamon spice'
  }
]

export default function CakePreorderPage() {
  const [cart, setCart] = useState<{[key: number]: number}>({})
  const [isCartVisible, setIsCartVisible] = useState(true)
  const whatsappNumber = '27684535380' // West Park Services WhatsApp business number

  const addToCart = (id: number) => {
    setCart(prev => ({
      ...prev,
      [id]: (prev[id] || 0) + 1
    }))
  }

  const removeFromCart = (id: number) => {
    setCart(prev => {
      const newCart = { ...prev }
      if (newCart[id] > 0) {
        newCart[id] -= 1
        if (newCart[id] === 0) {
          delete newCart[id]
        }
      }
      return newCart
    })
  }

  const getTotalItems = () => {
    return Object.values(cart).reduce((sum, count) => sum + count, 0)
  }

  const getTotalPrice = () => {
    return Object.entries(cart).reduce((sum, [id, count]) => {
      const cake = cakes.find(c => c.id === parseInt(id))
      return sum + (cake?.price || 0) * count
    }, 0)
  }

  const handleWhatsAppOrder = () => {
    if (getTotalItems() === 0) {
      alert('Please add items to your cart first')
      return
    }

    const orderMessage = `Hi! I would like to place the following order:\n\n${
      Object.entries(cart)
        .map(([id, count]) => {
          const cake = cakes.find(c => c.id === parseInt(id))
          return `${count}x ${cake?.name} (R${(cake?.price || 0) * count})`
        })
        .join('\n')
    }\n\nTotal: R${getTotalPrice()}`

    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(orderMessage)}`
    window.open(whatsappUrl, '_blank')
  }

  return (
    <div className="min-h-screen bg-gold p-8 font-sans relative overflow-hidden">
      {/* 2D Diamonds Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(80)].map((_, i) => (
          <div
            key={i}
            className="absolute diamond"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              opacity: 0.6,
              transform: `rotate(45deg) scale(${0.5 + Math.random() * 0.5})`,
              zIndex: Math.floor(Math.random() * 3)
            }}
          />
        ))}
      </div>

      <div className="flex justify-between items-center mb-8 relative z-10">
        <Link href="/" className="inline-block">
          <Button className="bg-orange-500 text-white hover:bg-orange-600 font-bold py-2 px-4 rounded">
            ← Back to Home
          </Button>
        </Link>
        <Link 
          href="https://wa.me/27684535380?text=Hi!%20I%20have%20a%20question%20about%20your%20bakery%20products."
          target="_blank"
          className="inline-block"
        >
          <Button className="bg-purple-500 text-white hover:bg-purple-600 font-bold py-2 px-4 rounded">
            Contact Us 💬
          </Button>
        </Link>
      </div>

      {/* Cart Toggle Button - Fixed */}
      <button
        onClick={() => setIsCartVisible(!isCartVisible)}
        className="fixed bottom-4 right-4 z-50 bg-white p-3 border-4 border-black rounded-full shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:shadow-[2px_2px_0_0_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-200"
      >
        {isCartVisible ? '🛒 ✕' : '🛒'}
      </button>

      {/* Cart Summary - Fixed position */}
      <div className={`fixed bottom-20 right-4 bg-white p-4 border-4 border-black shadow-[8px_8px_0_0_rgba(0,0,0,1)] rounded-lg z-50 transition-all duration-300 ${
        isCartVisible 
          ? 'translate-x-0 opacity-100' 
          : 'translate-x-[150%] opacity-0'
      }`}>
        <h3 className="text-xl font-bold mb-2">Cart Summary 🛒</h3>
        
        {getTotalItems() === 0 ? (
          <p className="text-gray-500 italic mb-3">Your cart is empty</p>
        ) : (
          <div className="mb-3">
            <div className="max-h-48 overflow-y-auto mb-3">
              {Object.entries(cart).map(([id, count]) => {
                const cake = cakes.find(c => c.id === parseInt(id))
                if (!cake) return null
                return (
                  <div key={id} className="flex justify-between items-center mb-2 border-b border-gray-200 pb-2">
                    <div>
                      <p className="font-medium">{cake.name}</p>
                      <p className="text-sm text-gray-500">Quantity: {count}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">R{(cake.price || 0) * count}</p>
                      <p className="text-sm text-gray-500">R{cake.price || 0} each</p>
                    </div>
                  </div>
                )
              })}
            </div>
            <div className="border-t border-black pt-2">
              <div className="flex justify-between items-center mb-1">
                <span className="font-medium">Subtotal:</span>
                <span className="font-bold">R{getTotalPrice()}</span>
              </div>
              <div className="flex justify-between items-center mb-3">
                <span className="font-medium">Total Items:</span>
                <span className="font-bold">{getTotalItems()}</span>
              </div>
            </div>
          </div>
        )}
        
        <Button 
          onClick={handleWhatsAppOrder}
          className="w-full bg-green-500 text-white hover:bg-green-600 font-bold py-2 px-4 rounded"
          disabled={getTotalItems() === 0}
        >
          Order on WhatsApp 📱
        </Button>
      </div>

      <main className="max-w-6xl mx-auto relative z-10">
        <h1 className="text-6xl font-bold mb-8 text-black transform -rotate-2 bg-white p-4 inline-block shadow-[8px_8px_0_0_rgba(0,0,0,1)]">
          Bakery Pre-orders 🧁
        </h1>
        
        <div className="bg-white p-6 border-4 border-black shadow-[8px_8px_0_0_rgba(0,0,0,1)] mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cakes.map((cake) => (
              <div key={cake.id} className="p-4 border-2 border-black rounded-lg hover:shadow-lg transition-shadow">
                <div className="relative w-full h-48 mb-4">
                  <Image
                    src={cake.image}
                    alt={cake.name}
                    fill
                    style={{ objectFit: 'cover' }}
                    className="rounded-lg"
                  />
                </div>
                <h3 className="text-xl font-bold mb-2">{cake.name}</h3>
                <p className="text-gray-600 mb-2 h-20">{cake.description}</p>
                <p className="text-lg font-bold mb-3">R{cake.price}</p>
                
                {/* Item Counter */}
                <div className="flex items-center justify-between mb-3">
                  <Button 
                    onClick={() => removeFromCart(cake.id)}
                    className="bg-orange-500 text-white hover:bg-orange-600 font-bold px-3 py-1 rounded"
                    disabled={!cart[cake.id]}
                  >
                    -
                  </Button>
                  <span className="font-bold">{cart[cake.id] || 0}</span>
                  <Button 
                    onClick={() => addToCart(cake.id)}
                    className="bg-orange-500 text-white hover:bg-orange-600 font-bold px-3 py-1 rounded"
                  >
                    +
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}