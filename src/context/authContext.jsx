import { createContext, useEffect, useState } from 'react'
import { onAuthStateChanged, getAuth } from 'firebase/auth'

export const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {
  const auth = getAuth()
  const [currentUser, setCurrentUser] = useState({})
  // const [profileImage, setprofileImage] = useState("https://firebasestorage.googleapis.com/v0/b/woofing-from-home.appspot.com/o/images%2Fprofile-default.png?alt=media&token=b393541c-8ad8-4b57-a70f-f2b4d236fa1f")


  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user)
      // setprofileImage(user.photoURL)
     
    })
   
    return () => {
      unsub()
    }
  }, [])

  return (
    <AuthContext.Provider value={{ currentUser}}>
      {children}
    </AuthContext.Provider>
  )
}
