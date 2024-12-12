'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

const DiamondBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    // Scene setup
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ alpha: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    containerRef.current.appendChild(renderer.domElement)

    // Diamond geometry
    const diamondGeometry = new THREE.OctahedronGeometry(1, 0)
    const diamondMaterial = new THREE.MeshPhongMaterial({
      color: 0x9333ea, // Purple color
      specular: 0xffffff,
      shininess: 100,
      transparent: true,
      opacity: 0.8,
      side: THREE.DoubleSide
    })

    // Create multiple diamonds
    const diamonds: THREE.Mesh[] = []
    const numDiamonds = 12

    for (let i = 0; i < numDiamonds; i++) {
      const diamond = new THREE.Mesh(diamondGeometry, diamondMaterial)
      
      // Random position
      diamond.position.x = (Math.random() - 0.5) * 20
      diamond.position.y = (Math.random() - 0.5) * 20
      diamond.position.z = (Math.random() - 0.5) * 20

      // Random rotation
      diamond.rotation.x = Math.random() * Math.PI
      diamond.rotation.y = Math.random() * Math.PI
      
      diamonds.push(diamond)
      scene.add(diamond)
    }

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
    scene.add(ambientLight)

    const pointLight = new THREE.PointLight(0xffffff, 1)
    pointLight.position.set(10, 10, 10)
    scene.add(pointLight)

    camera.position.z = 15

    // Animation
    const animate = () => {
      requestAnimationFrame(animate)

      diamonds.forEach((diamond, index) => {
        // Rotation
        diamond.rotation.x += 0.01
        diamond.rotation.y += 0.01

        // Floating motion
        const time = Date.now() * 0.001
        diamond.position.y += Math.sin(time + index) * 0.01
      })

      renderer.render(scene, camera)
    }

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }

    window.addEventListener('resize', handleResize)
    animate()

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize)
      containerRef.current?.removeChild(renderer.domElement)
      diamonds.forEach(diamond => {
        diamond.geometry.dispose()
        if (Array.isArray(diamond.material)) {
          diamond.material.forEach(material => material.dispose())
        } else {
          diamond.material.dispose()
        }
      })
    }
  }, [])

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  )
}

export default DiamondBackground
