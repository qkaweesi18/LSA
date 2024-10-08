'use client'

import { useState, useCallback } from 'react'
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api'

const containerStyle = {
  width: '100%',
  height: '400px'
}

const westParkCoords = { lat: -25.7558, lng: 28.1269 } // West Park coordinates

export default function MapComponent({ onLocationSelect }) {
  const [map, setMap] = useState(null)
  const [marker, setMarker] = useState(null)

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
  })

  const onLoad = useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(westParkCoords);
    map.fitBounds(bounds);
    setMap(map)
  }, [])

  const onUnmount = useCallback(function callback(map) {
    setMap(null)
  }, [])

  const onClick = useCallback((e) => {
    const lat = e.latLng.lat()
    const lng = e.latLng.lng()
    setMarker({ lat, lng })
    reverseGeocode({ lat, lng })
  }, [])

  const reverseGeocode = async (latlng) => {
    const geocoder = new window.google.maps.Geocoder()
    geocoder.geocode({ location: latlng }, (results, status) => {
      if (status === "OK") {
        if (results[0]) {
          const addressComponents = results[0].address_components
          const houseNumber = addressComponents.find(component => component.types.includes("street_number"))?.long_name || ''
          const street = addressComponents.find(component => component.types.includes("route"))?.long_name || 'Unknown street'
          const city = addressComponents.find(component => component.types.includes("locality"))?.long_name || 'Unknown city'

          onLocationSelect({
            housenumber: houseNumber,
            street,
            city,
            lat: latlng.lat,
            lng: latlng.lng,
          })
        }
      } else {
        console.error("Geocoder failed due to: " + status)
      }
    })
  }

  return isLoaded ? (
    <div>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={westParkCoords}
        zoom={13}
        onLoad={onLoad}
        onUnmount={onUnmount}
        onClick={onClick}
      >
        {marker && <Marker position={marker} />}
      </GoogleMap>

      {/* Description Input */}
      <div className="mt-4">
        <label htmlFor="description" className="block text-lg font-bold mb-2">Description:</label>
        <textarea
          id="description"
          placeholder="Enter a description of your order or service request..."
          className="w-full p-2 border-4 border-black rounded-md shadow-[4px_4px_0_0_rgba(0,0,0,1)] focus:outline-none focus:ring-2 focus:ring-yellow-500"
          rows={3}
        ></textarea>
      </div>
    </div>
  ) : <></>
}