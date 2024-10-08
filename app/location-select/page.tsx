'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { Button } from "@/components/ui/button"
import { createClient } from '@supabase/supabase-js'
import { env } from 'process'

const MapComponent = dynamic(() => import('./MapComponent'), {
  loading: () => <p>Loading map...</p>,
  ssr: false
})

// Initialize Supabase client
const YOUR_SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const YOUR_SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(YOUR_SUPABASE_URL, YOUR_SUPABASE_ANON_KEY)

export default function LocationSelect() {
  const [selectedLocation, setSelectedLocation] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleLocationSelect = (location) => {
    setSelectedLocation(location)
  }

  const handleSubmit = async () => {
    if (selectedLocation) {
      setIsLoading(true)
      try {
        const { data, error } = await supabase
          .from('locations')
          .insert([
            { 
              street: selectedLocation.street,
              city: selectedLocation.city,
              lat: selectedLocation.lat,
              lng: selectedLocation.lng
            }
          ])
        
        if (error) throw error
        
        console.log('Location saved successfully:', data)
        alert('Location confirmed and saved!')
      } catch (error) {
        console.error('Error saving location:', error)
        alert('Failed to save location. Please try again.')
      } finally {
        setIsLoading(false)
      }
    } else {
      alert('Please select a location on the map')
    }
  }

  return (
    <div className="min-h-screen bg-yellow-300 p-8 font-mono">
      <main className="max-w-4xl mx-auto">
        <h1 className="text-6xl font-bold mb-8 text-black transform -rotate-2 bg-white p-4 inline-block">Select Location</h1>
        
        <div className="bg-white p-6 border-4 border-black shadow-[8px_8px_0_0_rgba(0,0,0,1)] mb-8">
          <MapComponent onLocationSelect={handleLocationSelect} />
        </div>

        <div className="bg-white p-6 border-4 border-black shadow-[8px_8px_0_0_rgba(0,0,0,1)] mb-8">
          <h2 className="text-2xl font-bold mb-4">Selected Location</h2>
          {selectedLocation ? (
            <p>{selectedLocation.housenumber ? selectedLocation.housenumber : 'No house number'}, {selectedLocation.street}, {selectedLocation.city}</p>
          ) : (
            <p>Click on the map to select a location</p>
          )}
        </div>

        <Button 
          onClick={handleSubmit}
          disabled={isLoading}
          className="w-full bg-black text-white hover:bg-gray-800 font-bold py-4 px-6 border-4 border-black text-xl transform rotate-2 hover:rotate-0 transition-transform duration-300"
        >
          {isLoading ? 'Saving...' : 'Confirm Location'}
        </Button>
      </main>
    </div>
  )
}