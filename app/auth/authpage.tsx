
'use client'

import { useState } from 'react'
import { auth } from '@/lib/firebase'
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signInWithPopup, 
  GoogleAuthProvider, 
  FacebookAuthProvider,
} from 'firebase/auth'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from 'next/link'
import { FaGoogle, FaFacebook, FaArrowLeft } from 'react-icons/fa'
import { useRouter } from 'next/navigation'

export default function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(true)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (isSignUp && password !== confirmPassword) {
      setError("Passwords don't match")
      return
    }

    try {
      if (isSignUp) {
        await createUserWithEmailAndPassword(auth, email, password)
      } else {
        await signInWithEmailAndPassword(auth, email, password)
      }
      router.push('/')
    } catch (error) {
      setError(error.message)
    }
  }

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider()
    try {
      await signInWithPopup(auth, provider)
      router.push('/')
    } catch (error) {
      setError(error.message)
    }
  }

  const handleFacebookSignIn = async () => {
    const provider = new FacebookAuthProvider()
    try {
      await signInWithPopup(auth, provider)
      router.push('/')
    } catch (error) {
      setError(error.message)
    }
  }

  return (
    <div className="p-8">
      <Button
        onClick={() => router.back()}
        className="mb-4 bg-orange-500 text-white hover:bg-orange-600 font-bold py-2 px-4 rounded flex items-center"
      >
        <FaArrowLeft className="mr-2" /> Back
      </Button>
      <main className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md relative z-10">
        <h1 className="text-3xl font-bold mb-6 text-center text-orange-600">
          {isSignUp ? 'Create Account' : 'Sign In'}
        </h1>
        
        <form onSubmit={handleEmailAuth} className="space-y-4">
          {isSignUp && (
            <Input
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
          )}
          <Input
            type="email"
            placeholder="Mobile number or email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
            className="w-full p-2 border border-gray-300 rounded"
          />
          {isSignUp && (
            <Input
              type="password"
              placeholder="Re-enter password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              minLength={6}
              className="w-full p-2 border border-gray-300 rounded"
            />
          )}
          <Button 
            type="submit"
            className="w-full bg-orange-500 text-white hover:bg-orange-600 font-bold py-2 px-4 rounded"
          >
            {isSignUp ? 'Create your West Park account' : 'Sign In'}
          </Button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            {isSignUp ? 'Already have an account?' : "Don't have an account?"}
            <button 
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-orange-600 hover:underline ml-1"
            >
              {isSignUp ? 'Sign In' : 'Create one'}
            </button>
          </p>
        </div>

        <div className="mt-6">
          <p className="text-center text-gray-600 mb-4">Or sign in with:</p>
          <div className="flex justify-center space-x-4">
            <Button
              onClick={handleGoogleSignIn}
              className="bg-red-500 text-white hover:bg-red-600 font-bold py-2 px-4 rounded flex items-center"
            >
              <FaGoogle className="mr-2" /> Google
            </Button>
            <Button
              onClick={handleFacebookSignIn}
              className="bg-blue-600 text-white hover:bg-blue-700 font-bold py-2 px-4 rounded flex items-center"
            >
              <FaFacebook className="mr-2" /> Facebook
            </Button>
          </div>
        </div>

        {error && <p className="mt-4 text-red-500 text-center">{error}</p>}

        <div className="mt-6 text-center text-sm text-gray-600">
          <p>
            By creating an account, you agree to West Park's{' '}
            <Link href="/conditions" className="text-orange-600 hover:underline">
              Conditions of Use
            </Link>{' '}
            and{' '}
            <Link href="/privacy" className="text-orange-600 hover:underline">
              Privacy Notice
            </Link>
            .
          </p>
        </div>
      </main>
    </div>
  )
}