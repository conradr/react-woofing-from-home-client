import React from 'react'
import {useEffect, useState} from 'react'
import { getAuth} from 'firebase/auth'
import { getDoc,doc } from 'firebase/firestore'
import { db } from '../firebase.config'




function AllMatches() {

    const [currentUser, setCurrentUser] = useState(null)
    const [matches, setMatches] = useState([]);
    const [selectedMatch, setSelectedMatch] = useState(null);


        //get firebaseID
        const auth = getAuth()
        useEffect(() => {
            getAllMatches()}, [])

        const getAllMatches = async () => {
        await fetch(`https://woofingfromhome.herokuapp.com/matches?firebaseId=${auth.currentUser.uid}`)
        .then(res => res.json())
        .then(matches => setMatches(matches))  
    }








  return (
    
    <>
        Hello
    </>

  )
}

export default AllMatches