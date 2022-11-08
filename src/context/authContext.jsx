import { createContext, useEffect, useState } from 'react'
import { onAuthStateChanged, getAuth } from 'firebase/auth'

export const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {
  const auth = getAuth()
  const [currentUser, setCurrentUser] = useState({})
  const [profileImage, setprofileImage] = useState()


  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user)
      setprofileImage(user.photoURL)
     
    })
   
    return () => {
      unsub()
    }
  }, [])

  return (
    <AuthContext.Provider value={{ currentUser, profileImage }}>
      {children}
    </AuthContext.Provider>
  )
}
