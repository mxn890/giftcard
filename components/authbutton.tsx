'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { User } from 'lucide-react'

const AuthButtons = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null)

  useEffect(() => {
    const allCookies = document.cookie
    const token = allCookies
      .split('; ')
      .find((row) => row.startsWith('auth_token='))?.split('=')[1]

    setIsLoggedIn(!!token)
  }, [])

  // While loading
  if (isLoggedIn === null) return null

  return (
    <div className="hidden md:flex items-center space-x-2">
      {isLoggedIn ? (
        <Link href="/purchases">
          <Button variant="ghost" size="sm" className="rounded-full p-2 h-9 w-9">
            <User className="h-4 w-4" />
            <span className="sr-only">Account</span>
          </Button>
        </Link>
      ) : (
        <>
          <Link href="/login">
            <Button variant="outline" size="sm">Login</Button>
          </Link>
          <Link href="/create-account">
            <Button className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 shadow-md" size="sm">
              Create Account
            </Button>
          </Link>
        </>
      )}
    </div>
  )
}

export default AuthButtons