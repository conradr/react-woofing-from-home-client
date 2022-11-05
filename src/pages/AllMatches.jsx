import React from 'react'
import {useEffect, useState} from 'react'
import { getAuth} from 'firebase/auth'
import { getDoc,doc } from 'firebase/firestore'
import { db } from '../firebase.config'
import { connectStorageEmulator } from 'firebase/storage'




function AllMatches() {

    const [currentUser, setCurrentUser] = useState(null)
    const [matches, setMatches] = useState([]);
    const [selectedMatch, setSelectedMatch] = useState(null);


        //get firebaseID
        const auth = getAuth()

        useEffect(() => {
            getAllMatches()
            setCurrentUser(auth.currentUser.uid)}, 
            [])

        const getAllMatches = async () => {
        await fetch(`https://woofingfromhome.herokuapp.com/matches?firebaseId=${auth.currentUser.uid}`)
        .then(res => res.json())
        .then(matches => setMatches(matches))  
        }
        
        const matchesFromCustomer1View = matches.filter(match =>
          match.customer1.firebaseId == currentUser && match.score > 0) 

            // useEffect(() => {
            //   const fetchMatch = async () => {
            //     const docRef = doc(db, 'users', params.matchID)
            //     const docSnap = await getDoc(docRef)
          
            //     if (docSnap.exists()) {
            //       setMatch(docSnap.data())
            //       setLoading(false)
            //     }
            //   }

    // const addFirebaseFields = () => {
    //   matchesFromCustomer1View.forEach(match => {
    //       const docRef = doc(db, 'users', 'kF1hjQIgdKer8CMqMO1jRAQsiGM2')         
    //       const docSnap = getDoc(docRef)
    //       console.log(docSnap.data())
    //       // if (docSnap.exists()) { 
    //       //   match.customer2.name = docSnap.doc().name
    //       //   console.log(matchesFromCustomer1View)}
            
    //         // match.customer2.image = docSnap.doc().photoUrl,
    //         // match.customer2.about = docSnap.doc().about}
    //       })}
        
        
        // for each customer 2 in matchesFromCustomer1View go to firebase and get the name and image and append to customer 2 object in matchesFromCustomer1View

    // const newArrayOfOppositeScores = 
    //       matches.filter(match =>
    //         match.customer2.firebaseId == currentUser
    //     )

    // const benArray = newArrayOfOppositeScores.find(matches => matches.firebaseId = "Ben")
    // console.log(benArray)

    // const scoreFromBen = benArray.score
    // console.log(scoreFromBen)

    // const scoreForBen = newArrayOfOppositeScores.forEach(match => console.log(match.score))
    // console.log(scoreForBen)

    


    // map through sortMatches
    // for customer2 uid make a call from 

    // click on the person
    // filter on all matches and put the selected customer into state
    // pass the customer1 match data and customer 2 match data through as seperate props


    // 

    //add in the location of the match on leaflet







  return (
    
    <div className="bg-white">
    <div className="mx-auto max-w-7xl py-12 px-4 sm:px-6 lg:px-8 lg:py-24">
      <div className="space-y-12 lg:grid lg:grid-cols-3 lg:gap-8 lg:space-y-0">
        <div className="space-y-5 sm:space-y-4">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Your Matches</h2>
          <p className="text-xl text-gray-500">
            Here are some of the matches we think meet your requirements:
          </p>
        </div>
        <div className="lg:col-span-2">
          <ul
            className="space-y-12 sm:-mt-8 sm:space-y-0 sm:divide-y sm:divide-gray-200 lg:gap-x-8 lg:space-y-0"
          >
            {matchesFromCustomer1View.map((match) => (
              <li key={match.firebaseId} className="sm:py-8">
                <div className="space-y-4 sm:grid sm:grid-cols-3 sm:items-start sm:gap-6 sm:space-y-0">
                  <div className="aspect-w-3 aspect-h-2 sm:aspect-w-3 sm:aspect-h-4">
                    {/* <img className="rounded-lg object-cover shadow-lg" src={person.imageUrl} alt="" /> */}
                  </div>
                  <div className="sm:col-span-2">
                    <div className="space-y-4">
                      <div className="space-y-1 text-lg font-medium leading-6">
                        <h3>How far are they from you?</h3>
                        <p className="text-indigo-600">{Math.round(match.distance / 1000,0)/10} km away</p>
                      </div>
                      <div className="space-y-1 text-lg font-medium leading-6">
                        <h3>How well do they meet your requirements?</h3>
                        <p className="text-indigo-600">{Math.round(match.score,0)} %</p>
                      </div>
                      <div className="text-lg">
                        <p className="text-gray-500">Insert the about me from firebase</p>
                      </div>
                      <ul className="flex space-x-5">
                        <li>
                          <a href='/' className="text-gray-400 hover:text-gray-500">
                            Take a look at their profile</a>
                        </li>
                        <li>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div> 
  </div>

  )
}

export default AllMatches