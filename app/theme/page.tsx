'use client';

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";

const predefinedThemes = [
  {
    name: "Sunset Gold",
    background: "linear-gradient(135deg, #ff4e00, #ec9f05)",
    button: "linear-gradient(45deg, #FFD700, #DAA520)"
  },
  {
    name: "Ocean Blue",
    background: "linear-gradient(135deg, #2193b0, #6dd5ed)",
    button: "linear-gradient(45deg, #4facfe, #00f2fe)"
  },
  {
    name: "Forest Green",
    background: "linear-gradient(135deg, #56ab2f, #a8e063)",
    button: "linear-gradient(45deg, #76b852, #8DC26F)"
  },
  {
    name: "Royal Purple",
    background: "linear-gradient(135deg, #834d9b, #d04ed6)",
    button: "linear-gradient(45deg, #a044ff, #6a3093)"
  },
  {
    name: "Crimson Fire",
    background: "linear-gradient(135deg, #cb2d3e, #ef473a)",
    button: "linear-gradient(45deg, #ff416c, #ff4b2b)"
  },
  {
    name: "Midnight Blue",
    background: "linear-gradient(135deg, #1e3c72, #2a5298)",
    button: "linear-gradient(45deg, #2b5876, #4e4376)"
  },
  {
    name: "Emerald Dream",
    background: "linear-gradient(135deg, #134E5E, #71B280)",
    button: "linear-gradient(45deg, #2ecc71, #27ae60)"
  },
  {
    name: "Cherry Blossom",
    background: "linear-gradient(135deg, #FBD3E9, #BB377D)",
    button: "linear-gradient(45deg, #ee9ca7, #ffdde1)"
  },
  {
    name: "Cyber Punk",
    background: "linear-gradient(135deg, #3a1c71, #d76d77)",
    button: "linear-gradient(45deg, #ffaf7b, #d76d77)"
  },
  {
    name: "Northern Lights",
    background: "linear-gradient(135deg, #43cea2, #185a9d)",
    button: "linear-gradient(45deg, #42b883, #42b3a2)"
  },
  {
    name: "Desert Sand",
    background: "linear-gradient(135deg, #c79081, #dfa579)",
    button: "linear-gradient(45deg, #e6b980, #eacda3)"
  },
  {
    name: "Neon Dreams",
    background: "linear-gradient(135deg, #fc00ff, #00dbde)",
    button: "linear-gradient(45deg, #00c3ff, #00ff9d)"
  }
];

const backgroundPatterns = [
  {
    name: "Diamonds",
    pattern: "diamonds",
    description: "Floating diamond shapes"
  },
  {
    name: "Dots",
    pattern: "dots",
    description: "Scattered dots pattern"
  },
  {
    name: "Circuit",
    pattern: "circuit",
    description: "Tech-inspired circuit pattern"
  },
  {
    name: "Hexagons",
    pattern: "hexagons",
    description: "Modern hexagon grid"
  },
  {
    name: "Waves",
    pattern: "waves",
    description: "Flowing wave pattern"
  }
];

export default function ThemePage() {
  const [selectedTheme, setSelectedTheme] = useState(predefinedThemes[0]);
  const [customBackground, setCustomBackground] = useState("#ff4e00");
  const [customBackgroundEnd, setCustomBackgroundEnd] = useState("#ec9f05");
  const [selectedPattern, setSelectedPattern] = useState(backgroundPatterns[0]);
  const [patternOpacity, setPatternOpacity] = useState(0.1);
  const [patternSize, setPatternSize] = useState(50);
  const [patternCount, setPatternCount] = useState(100);
  const [bgStartColor, setBgStartColor] = useState("#ff4e00");
  const [bgEndColor, setBgEndColor] = useState("#ec9f05");
  const [btnStartColor, setBtnStartColor] = useState("#FFD700");
  const [btnEndColor, setBtnEndColor] = useState("#DAA520");

  const applyTheme = (theme: typeof predefinedThemes[0]) => {
    setSelectedTheme(theme);
    setBgStartColor(theme.background.match(/#[a-f0-9]{6}/gi)?.[0] || "#ff4e00");
    setBgEndColor(theme.background.match(/#[a-f0-9]{6}/gi)?.[1] || "#ec9f05");
    setBtnStartColor(theme.button.match(/#[a-f0-9]{6}/gi)?.[0] || "#FFD700");
    setBtnEndColor(theme.button.match(/#[a-f0-9]{6}/gi)?.[1] || "#DAA520");
    document.documentElement.style.setProperty('--gradient-gold', theme.background);
    document.documentElement.style.setProperty('--gradient-button', theme.button);
  };

  const updateBackground = (startColor: string, endColor: string) => {
    const newGradient = `linear-gradient(135deg, ${startColor}, ${endColor})`;
    document.documentElement.style.setProperty('--gradient-gold', newGradient);
  };

  const updateButton = (startColor: string, endColor: string) => {
    const newGradient = `linear-gradient(45deg, ${startColor}, ${endColor})`;
    document.documentElement.style.setProperty('--gradient-button', newGradient);
  };

  const updateCustomColors = (startColor: string, endColor: string, type: 'background' | 'button') => {
    const gradient = type === 'background' 
      ? `linear-gradient(135deg, ${startColor}, ${endColor})`
      : `linear-gradient(45deg, ${startColor}, ${endColor})`;
    
    document.documentElement.style.setProperty(
      type === 'background' ? '--gradient-gold' : '--gradient-button',
      gradient
    );
  };

  return (
    <div className="min-h-screen bg-gold p-8 font-sans relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(patternCount)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-${patternSize} h-${patternSize} bg-black transform ${
              selectedPattern.pattern === 'diamonds' ? 'rotate-45' : 
              selectedPattern.pattern === 'hexagons' ? 'rotate-30' :
              selectedPattern.pattern === 'waves' ? 'rotate-0' : ''
            }`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: patternOpacity,
              animation: `${
                selectedPattern.pattern === 'waves' ? 'float' :
                selectedPattern.pattern === 'circuit' ? 'pulse' :
                'shine'
              } ${Math.random() * 5 + 2}s linear infinite`,
            }}
          ></div>
        ))}
      </div>
      
      <main className="max-w-6xl mx-auto relative z-10">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-6xl font-bold text-black transform -rotate-2 bg-white p-4 inline-block animate-slide-in">
            Theme Customization
          </h1>
          <Link href="/" passHref>
            <Button className="btn-gold font-bold py-2 px-4 border-4 border-black transform rotate-2">
              Back to Home
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {predefinedThemes.map((theme, index) => (
            <div
              key={theme.name}
              className="theme-card bg-white p-6 transform -rotate-2 hover:rotate-0 transition-transform duration-300 shadow-[8px_8px_0_0_rgba(0,0,0,1)] border-4 border-black"
              onClick={() => applyTheme(theme)}
              style={{
                animationDelay: `${index * 0.1}s`
              }}
            >
              <div className="card-content">
                <h2 className="text-2xl font-bold mb-4">{theme.name}</h2>
                <div 
                  className="h-20 rounded-lg mb-4 transform hover:scale-105 transition-transform"
                  style={{ background: theme.background }}
                ></div>
                <Button 
                  className="w-full border-4 border-black transform hover:rotate-1 transition-transform animate-bounce"
                  style={{ background: theme.button }}
                >
                  Preview Button
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white p-8 transform -rotate-1 shadow-[8px_8px_0_0_rgba(0,0,0,1)] border-4 border-black animate-slide-in">
          <h2 className="text-3xl font-bold mb-6">Color Customization</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Background Colors */}
            <div className="space-y-4">
              <h3 className="text-2xl font-bold">Background Colors</h3>
              <div>
                <label className="block text-lg font-bold mb-2">Start Color</label>
                <input
                  type="color"
                  value={bgStartColor}
                  onChange={(e) => {
                    setBgStartColor(e.target.value);
                    updateBackground(e.target.value, bgEndColor);
                  }}
                  className="w-full h-12 border-4 border-black"
                />
              </div>
              <div>
                <label className="block text-lg font-bold mb-2">End Color</label>
                <input
                  type="color"
                  value={bgEndColor}
                  onChange={(e) => {
                    setBgEndColor(e.target.value);
                    updateBackground(bgStartColor, e.target.value);
                  }}
                  className="w-full h-12 border-4 border-black"
                />
              </div>
              <div className="h-20 rounded-lg border-4 border-black"
                style={{ background: `linear-gradient(135deg, ${bgStartColor}, ${bgEndColor})` }}
              />
            </div>

            {/* Button Colors */}
            <div className="space-y-4">
              <h3 className="text-2xl font-bold">Button Colors</h3>
              <div>
                <label className="block text-lg font-bold mb-2">Start Color</label>
                <input
                  type="color"
                  value={btnStartColor}
                  onChange={(e) => {
                    setBtnStartColor(e.target.value);
                    updateButton(e.target.value, btnEndColor);
                  }}
                  className="w-full h-12 border-4 border-black"
                />
              </div>
              <div>
                <label className="block text-lg font-bold mb-2">End Color</label>
                <input
                  type="color"
                  value={btnEndColor}
                  onChange={(e) => {
                    setBtnEndColor(e.target.value);
                    updateButton(btnStartColor, e.target.value);
                  }}
                  className="w-full h-12 border-4 border-black"
                />
              </div>
              <Button 
                className="w-full border-4 border-black transform hover:rotate-1 transition-transform animate-bounce"
                style={{ background: `linear-gradient(45deg, ${btnStartColor}, ${btnEndColor})` }}
              >
                Preview Button
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold">Background Pattern</h3>
            <div className="grid grid-cols-2 gap-4">
              {backgroundPatterns.map((pattern) => (
                <div
                  key={pattern.name}
                  className={`p-4 border-4 border-black cursor-pointer transform hover:scale-105 transition-transform ${
                    selectedPattern.name === pattern.name ? 'bg-blue-100' : 'bg-white'
                  }`}
                  onClick={() => setSelectedPattern(pattern)}
                >
                  <h4 className="font-bold">{pattern.name}</h4>
                  <p className="text-sm">{pattern.description}</p>
                </div>
              ))}
            </div>
            
            <div className="space-y-4 mt-4">
              <div>
                <label className="block text-lg font-bold mb-2">Pattern Opacity</label>
                <input
                  type="range"
                  min="0"
                  max="0.3"
                  step="0.01"
                  value={patternOpacity}
                  onChange={(e) => setPatternOpacity(parseFloat(e.target.value))}
                  className="w-full"
                />
              </div>
              <div>
                <label className="block text-lg font-bold mb-2">Pattern Size</label>
                <input
                  type="range"
                  min="20"
                  max="100"
                  value={patternSize}
                  onChange={(e) => setPatternSize(parseInt(e.target.value))}
                  className="w-full"
                />
              </div>
              <div>
                <label className="block text-lg font-bold mb-2">Pattern Density</label>
                <input
                  type="range"
                  min="50"
                  max="200"
                  value={patternCount}
                  onChange={(e) => setPatternCount(parseInt(e.target.value))}
                  className="w-full"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-8 transform -rotate-1 shadow-[8px_8px_0_0_rgba(0,0,0,1)] border-4 border-black animate-slide-in mt-8">
          <h2 className="text-3xl font-bold mb-6">Custom Colors</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Background Colors */}
            <div className="space-y-4">
              <h3 className="text-2xl font-bold">Background Colors</h3>
              <div>
                <label className="block text-lg font-bold mb-2">Start Color</label>
                <input
                  type="color"
                  value={bgStartColor}
                  onChange={(e) => {
                    setBgStartColor(e.target.value);
                    updateCustomColors(e.target.value, bgEndColor, 'background');
                  }}
                  className="w-full h-12 border-4 border-black"
                />
              </div>
              <div>
                <label className="block text-lg font-bold mb-2">End Color</label>
                <input
                  type="color"
                  value={bgEndColor}
                  onChange={(e) => {
                    setBgEndColor(e.target.value);
                    updateCustomColors(bgStartColor, e.target.value, 'background');
                  }}
                  className="w-full h-12 border-4 border-black"
                />
              </div>
              <div className="h-20 rounded-lg border-4 border-black"
                style={{ background: `linear-gradient(135deg, ${bgStartColor}, ${bgEndColor})` }}
              />
            </div>

            {/* Button Colors */}
            <div className="space-y-4">
              <h3 className="text-2xl font-bold">Button Colors</h3>
              <div>
                <label className="block text-lg font-bold mb-2">Start Color</label>
                <input
                  type="color"
                  value={btnStartColor}
                  onChange={(e) => {
                    setBtnStartColor(e.target.value);
                    updateCustomColors(e.target.value, btnEndColor, 'button');
                  }}
                  className="w-full h-12 border-4 border-black"
                />
              </div>
              <div>
                <label className="block text-lg font-bold mb-2">End Color</label>
                <input
                  type="color"
                  value={btnEndColor}
                  onChange={(e) => {
                    setBtnEndColor(e.target.value);
                    updateCustomColors(btnStartColor, e.target.value, 'button');
                  }}
                  className="w-full h-12 border-4 border-black"
                />
              </div>
              <Button 
                className="w-full border-4 border-black transform hover:rotate-1 transition-transform animate-bounce"
                style={{ background: `linear-gradient(45deg, ${btnStartColor}, ${btnEndColor})` }}
              >
                Preview Button
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
