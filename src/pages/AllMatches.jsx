
import {useEffect, useState} from 'react'
import { getAuth} from 'firebase/auth'
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  documentId
} from 'firebase/firestore'
import { db } from '../firebase.config'
import {MapContainer, Marker, TileLayer} from 'react-leaflet'
import { toast } from 'react-toastify'


function AllMatches() {

    const [currentUser, setCurrentUser] = useState(null)
    const [matches, setMatches] = useState([]);
    const [selectedMatch, setSelectedMatch] = useState(null);
    const [firebaseReturn, setFirebaseReturn] = useState(null)
    // const [matchesFromCustomer1View, setMatchesFromCustomer1View] = useState([])


            //get firebaseID
            const auth = getAuth()


        useEffect(() =>  {
          getAllMatches()
          setCurrentUser(auth.currentUser.uid)
          createMatchesUidArray()
          
          const fetchFirebaseMatches = async () => {
            try {
              // get Reference
              const firebaseMatchesRef = collection(db, 'users')
      
              // create a query
              const buildQuery = query(
                firebaseMatchesRef,
                where(documentId(), "in", 
                matchesUids
              ),
                // orderBy('timestamp', 'desc', limit(10))
              )
              // execute query
      
              const querySnap = await getDocs(buildQuery)
      
              const firebaseMatchesTemp = []
      
              querySnap.forEach((doc) => {
                return firebaseMatchesTemp.push({
                  id: doc.id,
                  data: doc.data(),
                })
              })
              setFirebaseReturn(firebaseMatchesTemp)

            } catch (error) {
              toast.error('Could not fetch listings')
            }
          }
          fetchFirebaseMatches()
        }, [])


        const getAllMatches = async () => {
        await fetch(`https://woofingfromhome.herokuapp.com/matches?firebaseId=${auth.currentUser.uid}`)
        .then(res => res.json())
        .then(matches => setMatches(matches))
        // .then(createMatchesUidArray())
        }
        
        const matchesUids = []

        const createMatchesUidArray = () => {
          matches.slice(0, 10).map(match => {
            if (match.customer2.firebaseId !== currentUser.firebaseId){
              matchesUids.push(match.customer2.firebaseId)
            }
          }
          )
        }

        // createMatchesUidArray()
        console.log(matchesUids)

        
        const matchesFromCustomer1View = matches.filter(match =>
        match.customer1.firebaseId == currentUser && match.score > 0)

                    
        // for each customer 2 in matchesFromCustomer1View go to firebase and get the name, about me and image and add to customer 2 object in matchesFromCustomer1View

            // useEffect(() => {
            //   const getFirebaseInfo = () => {
            //     matchesFromCustomer1View.forEach(match => {
            //       const docRef = doc(db, 'users', 'kF1hjQIgdKer8CMqMO1jRAQsiGM2')
            //       const docSnap = getDoc(docRef)
            //       .then(docSnap => 
            //         match.customer2.name = docSnap.data().name)                                
            //       }             
            //   )}
            //   getFirebaseInfo()
            // })

    //access score from other persons perspective

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

    // click on the person
    // filter on all matches and put the selected customer into state
    // pass the customer1 match data and customer 2 match data through as seperate props

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
            {matchesFromCustomer1View.map((match, index) => (
              <li key={index} className="sm:py-8">
                <div className="space-y-4 sm:grid sm:grid-cols-3 sm:items-start sm:gap-6 sm:space-y-0">
                  <div className="aspect-w-3 aspect-h-2 sm:aspect-w-3 sm:aspect-h-4">
                    {/* <img className="rounded-lg object-cover shadow-lg" src={person.imageUrl} alt="" /> */}
                  </div>
                  <div className="sm:col-span-2">
                    <div className="space-y-4">
                      <div className="space-y-1 text-lg font-medium leading-6">
                        <h3>You've matched with {match.customer2.firebaseId}!</h3>
                        <br/>
                        <h3>How far are they?</h3>
                        <p className="text-indigo-600">{Math.round(match.distance / 1000,0)/10} km away</p>
                        <div className="leafletContainer">
                        <MapContainer style={{height: '100%', width: '100%'}}
                                    center={[match.customer2.latitude, match.customer2. longitude]}
                                    zoom={12}
                                    scrollWheelZoom={false}>
                        <TileLayer 
                            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url='https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png'
                            />
                        <Marker position={[match.customer2.latitude, match.customer2.longitude]}>
                        </Marker>
                    </MapContainer>
                    </div>
                      </div>
                      <div className="space-y-1 text-lg font-medium leading-6">
                        <h3>How well do they meet your requirements?</h3>
                        <p className="text-indigo-600">{Math.round(match.score,0)} %</p>
                      </div>
                      <div className="text-lg">
                        <p className="text-gray-500">{match.customer2.name}</p>
                      </div>
                      <ul className="flex space-x-5">
                        <li>
                          <a href='/matches/{match.id}' className="text-gray-400 hover:text-gray-500">
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