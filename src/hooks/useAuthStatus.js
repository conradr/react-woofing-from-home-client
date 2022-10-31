import { useEffect, useRef, useState } from 'react'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

export const useAuthStatus = () => {
  const [loggedIn, setLoggedIn] = useState(false)
  const [checkingStatus, setCheckingStatus] = useState(true)
  const isMounted = useRef(true)

  useEffect(() => {
    const auth = getAuth()
    // FIX: use the unsubscribe returned from onAuthStateChanged for cleanup
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoggedIn(true)
      }
      setCheckingStatus(false)
    })

    return unsubscribe
  }, [])

  return { loggedIn, checkingStatus }
}
