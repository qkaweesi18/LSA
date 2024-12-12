'use client'

import { useState, useCallback } from 'react'
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api'
import { Location } from './page'

interface MapComponentProps {
  onLocationSelect: (location: Location) => void;
}

const containerStyle = {
  width: '100%',
  height: '400px'
}

const westParkCoords = { lat: -25.7558, lng: 28.1269 } // West Park coordinates

export default function MapComponent({ onLocationSelect }: MapComponentProps) {
  const [marker, setMarker] = useState<google.maps.LatLngLiteral | null>(null)

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''
  })

  const onLoad = useCallback((map: google.maps.Map) => {
    const bounds = new window.google.maps.LatLngBounds(westParkCoords)
    map.fitBounds(bounds)
  }, [])

  const onUnmount = useCallback(() => {
    // Cleanup if needed
  }, [])

  const reverseGeocode = useCallback(async (latlng: google.maps.LatLngLiteral) => {
    const geocoder = new window.google.maps.Geocoder()
    geocoder.geocode({ location: latlng }, (results, status) => {
      if (status === "OK" && results && results[0]) {
        const address = results[0].formatted_address
        onLocationSelect({
          address,
          lat: latlng.lat,
          lng: latlng.lng
        })
      }
    })
  }, [onLocationSelect])

  const onClick = useCallback((e: google.maps.MapMouseEvent) => {
    if (e.latLng) {
      const lat = e.latLng.lat()
      const lng = e.latLng.lng()
      setMarker({ lat, lng })
      reverseGeocode({ lat, lng })
    }
  }, [reverseGeocode])

  if (!isLoaded) return <div>Loading...</div>

  return (
    <div>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={westParkCoords}
        zoom={14}
        onLoad={onLoad}
        onUnmount={onUnmount}
        onClick={onClick}
      >
        {marker && <Marker position={marker} />}
      </GoogleMap>
    </div>
  )
}