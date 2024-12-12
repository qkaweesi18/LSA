'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { Button } from "@/components/ui/button"

export interface Location {
  address: string;
  lat: number;
  lng: number;
}

const MapComponent = dynamic(() => import('./MapComponent'), {
  loading: () => <p>Loading map...</p>,
  ssr: false
})

export default function LocationSelect() {
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null)

  const handleLocationSelect = (location: Location): void => {
    setSelectedLocation(location)
    console.log('Selected location:', location)
  }

  const handleConfirm = (): void => {
    if (selectedLocation) {
      console.log('Confirmed location:', selectedLocation)
      // Add your confirmation logic here
    }
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-8">Select Your Location</h1>
      
      <div className="mb-8">
        <MapComponent onLocationSelect={handleLocationSelect} />
      </div>

      <div className="bg-white p-6 border-4 border-black shadow-[8px_8px_0_0_rgba(0,0,0,1)] mb-8">
        <h2 className="text-2xl font-bold mb-4">Selected Location</h2>
        {selectedLocation ? (
          <div>
            <p>Address: {selectedLocation.address}</p>
            <p>Coordinates: {selectedLocation.lat}, {selectedLocation.lng}</p>
          </div>
        ) : (
          <p> Click on the map to select a location </p>
        )}
      </div>

      <Button 
        onClick={handleConfirm}
        disabled={!selectedLocation}
        className="w-full"
      >
        Confirm Location
      </Button>
    </div>
  )
}