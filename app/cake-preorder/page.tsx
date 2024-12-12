'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import Link from 'next/link'
import Image from 'next/image'

const cakes = [
  {
    id: 1,
    name: "Apple Oatmeal Quick Bread",
    description: "A hearty and wholesome quick bread made with fresh apples and oatmeal",
    price: 150,
    image: "/muffins/Apple Oatmeal Quick Bread.jpg"
  },
  {
    id: 2,
    name: "Blackberry Corn Muffins",
    description: "Sweet corn muffins studded with juicy blackberries for a delightful twist",
    price: 130,
    image: "/muffins/Blackberry Corn Muffins.jpg"
  },
  {
    id: 3,
    name: "Carrot Cake Breakfast Cookies",
    description: "Healthy breakfast cookies packed with carrots, spices, and wholesome ingredients",
    price: 170,
    image: "/muffins/Carrot Cake Breakfast Cookies.jpg"
  },
  {
    id: 4,
    name: "Banana Chip Muffins",
    description: "Moist banana muffins loaded with chocolate chips, perfect with your morning coffee",
    price: 145,
    image: "/muffins/Banana Chip Muffins.jpg"
  },
  {
    id: 5,
    name: "Blueberry Loaf Cake with Almond Streusel",
    description: "Rich blueberry cake topped with a crunchy almond streusel for extra texture",
    price: 175,
    image: "/muffins/Blueberry Loaf Cake with Almond Streusel.jpg"
  },
  {
    id: 6,
    name: "Dark Chocolate Chunk Raspberry Muffins",
    description: "Decadent dark chocolate muffins filled with frozen raspberries, dark chocolate chunks, and dipped in a rich chocolate ganache topping.",
    price: 165,
    image: "/muffins/Dark Chocolate Chunk Raspberry Muffins.jpg"
  },
  {
    id: 7,
    name: "Easy Blueberry Muffins",
    description: "Classic blueberry muffins bursting with fresh berries in every bite",
    price: 140,
    image: "/muffins/Easy Blueberry Muffins.jpg"
  },
  {
    id: 8,
    name: "Easy Pumpkin Bread",
    description: "Moist and flavorful pumpkin bread with a delightful crumb topping",
    price: 155,
    image: "/muffins/Easy Pumpkin Bread.jpg"
  },
  {
    id: 9,
    name: "Extra Moist Banana Bread",
    description: "Rich and extra moist banana bread perfect for breakfast or snacking",
    price: 160,
    image: "/muffins/Extra Moist Banana Bread.jpg"
  },
  {
    id: 10,
    name: "Pumpkin Chocolate Chip Muffins",
    description: "Pumpkin muffins loaded with chocolate chips and topped with coffee glaze",
    price: 165,
    image: "/muffins/Pumpkin Chocolate Chip Muffins with Coffee Glaze.jpg"
  },
  {
    id: 11,
    name: "Whole Wheat Apple Cinnamon Muffins",
    description: "Healthy whole wheat muffins with fresh apples and warm cinnamon spice",
    price: 145,
    image: "/muffins/Whole Wheat Apple Cinnamon Muffins.jpg"
  }
]

export default function CakePreorderPage() {
  const [cart, setCart] = useState<{[key: number]: number}>({})
  const [animatingItems, setAnimatingItems] = useState<{ [key: number]: boolean }>({})
  const whatsappNumber = '27684535380' // West Park Services WhatsApp business number

  const addToCart = (id: number) => {
    setCart(prev => ({
      ...prev,
      [id]: (prev[id] || 0) + 1
    }))
    setAnimatingItems(prev => ({
      ...prev,
      [id]: true
    }))
    setTimeout(() => {
      setAnimatingItems(prev => ({
        ...prev,
        [id]: false
      }))
    }, 500)
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

  const getTotalPrice = () => {
    return Object.entries(cart).reduce((sum, [id, count]) => {
      const cake = cakes.find(c => c.id === parseInt(id))
      return sum + (cake?.price || 0) * count
    }, 0)
  }

  const handleWhatsAppOrder = () => {
    const orderSummary = Object.entries(cart)
      .map(([id, count]) => {
        const cake = cakes.find(c => c.id === parseInt(id))
        if (!cake) return ''
        const total = cake.price * count
        return `• ${cake.name} (${count}x) - R${total}`
      })
      .filter(Boolean)
      .join('\n')

    const message = `Hi! I have a question about your bakery products.\n\nMy Order:\n${orderSummary}\n\nTotal: R${getTotalPrice()}`
    const encodedMessage = encodeURIComponent(message)
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`
    window.open(whatsappUrl, '_blank')
  }

  const getTotalItems = () => {
    return Object.values(cart).reduce((sum, count) => sum + count, 0)
  }

  return (
    <div className="min-h-screen bg-gold p-4 sm:p-8 relative overflow-hidden">
      {/* 2D Diamonds Background */}
      <div className="fixed inset-0 -z-10 grid grid-cols-3 gap-4 p-8 opacity-10">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className={`w-full h-32 bg-black transform rotate-45`}
          />
        ))}
      </div>

      {/* Cart Panel - Mobile Optimized */}
      <div className={`fixed bottom-0 left-0 right-0 md:bottom-auto md:left-auto md:top-20 md:right-4 bg-white border-t-4 md:border-4 border-black z-40 transform transition-transform duration-300 rounded-t-lg md:rounded-lg overflow-hidden shadow-[8px_8px_0_0_rgba(0,0,0,1)]`}>
        <div className="w-full md:w-72 flex flex-col">
          <div className="p-2 md:p-4 border-b-2 md:border-b-4 border-black bg-white">
            <h2 className="text-lg md:text-xl font-bold">Your Cart 🛒</h2>
            <span className="text-sm md:text-base">{getTotalItems()} items</span>
          </div>

          {/* Cart Items */}
          <div className="p-2 md:p-4 overflow-y-auto custom-scrollbar h-[100px] md:h-[400px]">
            {Object.keys(cart).length === 0 ? (
              <div className="text-center py-4 md:py-6">
                <p className="text-gray-500">Your cart is empty</p>
                <p className="text-sm text-gray-400 mt-1">Add some treats!</p>
              </div>
            ) : (
              Object.keys(cart).map((id) => {
                const cakeId = parseInt(id)
                const cake = cakes.find(c => c.id === cakeId)
                if (!cake || cart[cakeId] === 0) return null
                return (
                  <div 
                    key={id} 
                    className="mb-2 md:mb-3 p-2 bg-white border-2 border-black transform hover:rotate-1 transition-transform shadow-[2px_2px_0_0_rgba(0,0,0,1)] rounded-lg"
                  >
                    <div className="flex items-start space-x-2">
                      <div className="relative w-10 h-10 md:w-12 md:h-12 flex-shrink-0">
                        <Image
                          src={cake.image}
                          alt={cake.name}
                          fill
                          className="rounded-md object-cover border border-black"
                        />
                      </div>
                      <div className="flex-grow min-w-0">
                        <h3 className="font-bold text-sm truncate">{cake.name}</h3>
                        <div className="flex justify-between items-center mt-1">
                          <p className="text-sm">R{cake.price} × {cart[cakeId]}</p>
                          <button
                            onClick={() => removeFromCart(cakeId)}
                            className="bg-white border-2 border-black w-6 h-6 flex items-center justify-center hover:bg-red-100 transform hover:-rotate-3 transition-all shadow-[1px_1px_0_0_rgba(0,0,0,1)] rounded-md"
                          >
                            −
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })
            )}
          </div>

          {/* Cart Footer */}
          <div className="p-2 md:p-4 border-t-2 md:border-t-4 border-black bg-white">
            <div className="flex justify-between items-center mb-2 md:mb-3">
              <span className="font-bold">Total</span>
              <span className="font-bold">R{getTotalPrice()}</span>
            </div>
            <button
              onClick={handleWhatsAppOrder}
              disabled={Object.keys(cart).length === 0}
              className="w-full bg-white border-2 border-black py-2 px-3 font-bold transform hover:rotate-1 transition-transform shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:shadow-[6px_6px_0_0_rgba(0,0,0,1)] disabled:opacity-50 disabled:cursor-not-allowed rounded-lg text-sm"
            >
              Order via WhatsApp 📱
            </button>
          </div>
        </div>
      </div>

      <main className="pb-48 md:pb-8 md:max-w-[calc(100%-20rem)] md:mr-80 md:ml-8">
        <div className="flex justify-between items-center mb-6 md:mb-8">
          <Link href="/">
            <Button className="bg-purple-500 text-white hover:bg-purple-600 font-bold py-1.5 md:py-2 px-3 md:px-4 text-sm md:text-base rounded">
              ← Back to Home
            </Button>
          </Link>
        </div>

        <h1 className="text-4xl md:text-6xl font-bold mb-6 md:mb-8 text-black transform -rotate-2 bg-white p-3 md:p-4 inline-block shadow-[8px_8px_0_0_rgba(0,0,0,1)]">
          Bakery Pre-orders 🧁
        </h1>
        
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 md:gap-6 px-1 md:px-4 mb-24">
          {cakes.map((cake) => (
            <div key={cake.id} className="bg-white p-2 md:p-6 transform rotate-1 hover:rotate-0 transition-transform shadow-[4px_4px_0_0_rgba(0,0,0,1)] md:shadow-[8px_8px_0_0_rgba(0,0,0,1)] border-2 md:border-4 border-black w-full flex flex-col">
              <div className="relative h-32 md:h-56 mb-2 md:mb-4">
                <Image
                  src={cake.image}
                  alt={cake.name}
                  fill
                  className="object-cover rounded-lg"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <h3 className="text-base md:text-xl font-bold mb-1 md:mb-2">{cake.name}</h3>
              <p className="text-sm md:text-base text-gray-600 mb-2 md:mb-3 flex-grow">{cake.description}</p>
              <div className="flex justify-between items-center mt-auto">
                <span className="text-base md:text-lg font-bold">R{cake.price}</span>
                <div className="flex items-center space-x-2">
                  {cart[cake.id] > 0 && (
                    <span className="font-bold">{cart[cake.id]}</span>
                  )}
                  <Button 
                    onClick={() => addToCart(cake.id)}
                    className="relative btn-gold font-bold py-1 px-3 border-2 md:border-4 border-black"
                  >
                    +
                    {animatingItems[cake.id] && (
                      <svg
                        className="check-mark animate absolute -top-4 -right-4 w-6 md:w-8 h-6 md:h-8"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="black"
                        strokeWidth="3"
                      >
                        <path d="M4 12l5 5L20 7" />
                      </svg>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Add custom scrollbar styles */}
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #000;
          border: 2px solid #fff;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #333;
        }
      `}</style>
    </div>
  )
}