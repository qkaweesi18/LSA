'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function ThemeCustomizer() {
  const [primaryColor, setPrimaryColor] = useState('#ff4e00')  // Original gradient start
  const [gradientEnd, setGradientEnd] = useState('#ec9f05')   // Original gradient end
  const [buttonGradientStart, setButtonGradientStart] = useState('#FFD700')  // Original button gradient start
  const [buttonGradientEnd, setButtonGradientEnd] = useState('#DAA520')      // Original button gradient end

  useEffect(() => {
    document.documentElement.style.setProperty('--primary-color', primaryColor);
    document.documentElement.style.setProperty('--gradient-start', primaryColor);
    document.documentElement.style.setProperty('--gradient-end', gradientEnd);
    document.documentElement.style.setProperty('--button-gradient-start', buttonGradientStart);
    document.documentElement.style.setProperty('--button-gradient-end', buttonGradientEnd);
  }, [primaryColor, gradientEnd, buttonGradientStart, buttonGradientEnd]);

  const handlePrimaryColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const color = e.target.value
    setPrimaryColor(color)
    document.documentElement.style.setProperty('--gradient-gold', `linear-gradient(135deg, ${color}, ${gradientEnd})`)
  }

  const handleGradientEndChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const color = e.target.value
    setGradientEnd(color)
    document.documentElement.style.setProperty('--gradient-gold', `linear-gradient(135deg, ${primaryColor}, ${color})`)
  }

  const handleButtonGradientStartChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const color = e.target.value
    setButtonGradientStart(color)
    document.documentElement.style.setProperty('--gradient-button', `linear-gradient(45deg, ${color}, ${buttonGradientEnd})`)
  }

  const handleButtonGradientEndChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const color = e.target.value
    setButtonGradientEnd(color)
    document.documentElement.style.setProperty('--gradient-button', `linear-gradient(45deg, ${buttonGradientStart}, ${color})`)
  }

  const resetColors = () => {
    setPrimaryColor('#ff4e00')
    setGradientEnd('#ec9f05')
    setButtonGradientStart('#FFD700')
    setButtonGradientEnd('#DAA520')
    document.documentElement.style.setProperty('--gradient-gold', 'linear-gradient(135deg, #ff4e00, #ec9f05)')
    document.documentElement.style.setProperty('--gradient-button', 'linear-gradient(45deg, #FFD700, #DAA520)')
  }

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

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-6xl font-bold text-black transform -rotate-2 bg-white p-4 inline-block border-4 border-black shadow-brutal">
            Customize Theme
          </h1>
          <Link href="/" className="btn-gold font-bold py-2 px-4 border-4 border-black transform rotate-2 shadow-brutal hover:shadow-brutal-hover transition-transform hover:-translate-y-1">
            Back to Home
          </Link>
        </div>

        <div className="bg-white border-4 border-black p-8 shadow-brutal transform rotate-1 mb-8">
          <div className="space-y-8 transform -rotate-1">
            <div>
              <label className="block text-2xl font-bold mb-4 transform -rotate-2">
                Background Gradient Start
              </label>
              <div className="flex items-center gap-4 bg-gray-100 p-4 border-2 border-black">
                <input
                  type="color"
                  value={primaryColor}
                  onChange={handlePrimaryColorChange}
                  className="w-20 h-20 border-4 border-black cursor-pointer"
                />
                <span className="font-mono">{primaryColor}</span>
              </div>
            </div>

            <div>
              <label className="block text-2xl font-bold mb-4 transform rotate-1">
                Background Gradient End
              </label>
              <div className="flex items-center gap-4 bg-gray-100 p-4 border-2 border-black">
                <input
                  type="color"
                  value={gradientEnd}
                  onChange={handleGradientEndChange}
                  className="w-20 h-20 border-4 border-black cursor-pointer"
                />
                <span className="font-mono">{gradientEnd}</span>
              </div>
            </div>

            <div>
              <label className="block text-2xl font-bold mb-4 transform -rotate-1">
                Button Gradient Start
              </label>
              <div className="flex items-center gap-4 bg-gray-100 p-4 border-2 border-black">
                <input
                  type="color"
                  value={buttonGradientStart}
                  onChange={handleButtonGradientStartChange}
                  className="w-20 h-20 border-4 border-black cursor-pointer"
                />
                <span className="font-mono">{buttonGradientStart}</span>
              </div>
            </div>

            <div>
              <label className="block text-2xl font-bold mb-4 transform rotate-1">
                Button Gradient End
              </label>
              <div className="flex items-center gap-4 bg-gray-100 p-4 border-2 border-black">
                <input
                  type="color"
                  value={buttonGradientEnd}
                  onChange={handleButtonGradientEndChange}
                  className="w-20 h-20 border-4 border-black cursor-pointer"
                />
                <span className="font-mono">{buttonGradientEnd}</span>
              </div>
            </div>

            <button
              onClick={resetColors}
              className="btn-gold w-full py-4 px-6 font-bold text-xl border-4 border-black transform -rotate-1 shadow-brutal hover:shadow-brutal-hover transition-transform hover:-translate-y-1"
            >
              Reset to Default Colors
            </button>
          </div>
        </div>

        <div className="bg-white border-4 border-black p-8 shadow-brutal transform -rotate-2">
          <h2 className="text-4xl font-bold mb-6 transform rotate-2">Preview</h2>
          <div className="space-y-6 transform rotate-2">
            <button className="btn-gold w-full py-4 font-bold text-xl border-4 border-black shadow-brutal hover:shadow-brutal-hover transition-transform hover:-translate-y-1">
              Sample Button
            </button>
            <div className="p-6 bg-gold border-4 border-black">
              <p className="text-xl font-bold">Sample accent background area</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
