'use client';

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { db, auth } from '@/lib/firebase'
import { collection, addDoc } from 'firebase/firestore'
import { useRouter } from 'next/navigation'

export default function PasswordRecoveryPage() {
  const [phoneModel, setPhoneModel] = useState('')
  const [description, setDescription] = useState('')
  const [email, setEmail] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!auth.currentUser) {
      router.push('/auth')
      return
    }
    try {
      await addDoc(collection(db, 'orders'), {
        service_type: 'Password Recovery',
        description: `Phone Model: ${phoneModel}\n\nDescription: ${description}`,
        userId: auth.currentUser.uid,
        email: email,
        status: 'pending',
        created_at: new Date()
      })
      alert('Password recovery request submitted successfully!')
      router.push('/')
    } catch (error) {
      console.error('Error adding document: ', error)
      alert('Error submitting request. Please try again.')
    }
  }

  return (
    <div className="min-h-screen bg-yellow-300 p-8 font-mono">
      <main className="max-w-4xl mx-auto">
        <h1 className="text-6xl font-bold mb-8 text-black transform -rotate-2 bg-white p-4 inline-block">Password Recovery</h1>
        
        <div className="bg-white p-6 border-4 border-black shadow-[8px_8px_0_0_rgba(0,0,0,1)] mb-8">
          <p className="text-red-500 font-bold mb-4">
            Disclaimer: We only assist with password recovery for devices you own. We will not unlock stolen phones. 
            The email address of the locked phone must match the email address you provide.
          </p>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-lg font-bold mb-2">Email Address:</label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter the email address associated with the locked phone"
                required
                className="w-full p-2 border-4 border-black rounded-md shadow-[4px_4px_0_0_rgba(0,0,0,1)] focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>
            
            <div>
              <label htmlFor="phoneModel" className="block text-lg font-bold mb-2">Phone Model:</label>
              <Input
                id="phoneModel"
                value={phoneModel}
                onChange={(e) => setPhoneModel(e.target.value)}
                placeholder="Enter your phone model (e.g., iPhone 12, Samsung Galaxy S21)"
                required
                className="w-full p-2 border-4 border-black rounded-md shadow-[4px_4px_0_0_rgba(0,0,0,1)] focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>
            
            <div>
              <label htmlFor="description" className="block text-lg font-bold mb-2">Description of the Issue:</label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe the issue you're having with accessing your phone..."
                required
                className="w-full p-2 border-4 border-black rounded-md shadow-[4px_4px_0_0_rgba(0,0,0,1)] focus:outline-none focus:ring-2 focus:ring-yellow-500"
                rows={4}
              />
            </div>
            
            <Button 
              type="submit"
              className="w-full bg-black text-white hover:bg-gray-800 font-bold py-4 px-6 border-4 border-black text-xl transform rotate-2 hover:rotate-0 transition-transform duration-300"
            >
              Submit Request
            </Button>
          </form>
        </div>
      </main>
    </div>
  )
}