import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: 'AIzaSyD58WHFk0B2-xvV5TcB7hgRCIEpiiidpKc',
  authDomain: 'woofing-from-home.firebaseapp.com',
  projectId: 'woofing-from-home',
  storageBucket: 'woofing-from-home.appspot.com',
  messagingSenderId: '515949179498',
  appId: '1:515949179498:web:8ccb41a3eef5a2cfbe5013',
  measurementId: 'G-VZ4FG3Y6NC',
}

initializeApp(firebaseConfig)

export const db = getFirestore()
export const storage = getStorage();