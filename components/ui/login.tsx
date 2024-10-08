import { useState } from 'react';
import { auth } from '@/lib/firebase';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { Button } from "@/components/ui/button"

export default function Login() {
  const [error, setError] = useState(null);

  async function signInWithGoogle() {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <div>
      <Button
        onClick={signInWithGoogle}
        className="bg-white text-black hover:bg-gray-100 font-bold py-2 px-4 border-2 border-black"
      >
        Sign in with Google
      </Button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
}