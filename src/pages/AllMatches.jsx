import { getAuth } from "firebase/auth";
import {
  collection, documentId, getDocs,
  query,
  where
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import MatchCard from "../components/MatchCard";
import { db } from "../firebase.config";

function AllMatches() {
  const [currentUser, setCurrentUser] = useState(null);
  const [matches, setMatches] = useState([]);
  const [matchCards, setMatchCards] = useState([]);


  //get firebaseID
  const auth = getAuth();

  useEffect(() => {
    getAllMatches();
    setCurrentUser(auth.currentUser.uid);
  }, []);

  useEffect(() => {

    const tempMatchCards = []
    matches.forEach((match) => {
      
      const customer2Id = match.customer2.firebaseId;
      const customer2Lat = match.customer2.latitude;
      const customer2Long = match.customer2.longitude;
      const distance = match.distance;
      const myScore = match.score;
      const matchID= match.id

     
      if (match.customer1.firebaseId === currentUser) {
        const oppositeMatch = matches.find(
          (match) =>
            match.customer2.firebaseId === currentUser &&
            match.customer1.firebaseId === customer2Id
        );

        fetchFirebaseMatches(customer2Id).then((doc) => {
          const matchCard = (
            <MatchCard
              customer2Id={customer2Id}
              customer2Lat={customer2Lat}
              customer2Long={customer2Long}
              distance={distance}
              myScore={myScore}
              theirScore={oppositeMatch.score}
              matchID={matchID}
              theirName={doc.docs[0]["_document"]["data"]["value"]["mapValue"]["fields"]["name"]["stringValue"]}
              theirPhotoURL={doc.docs[0]["_document"]["data"]["value"]["mapValue"]["fields"]["photoURL"]["stringValue"]}
            />
          );
          tempMatchCards.push(matchCard);
          setMatchCards(tempMatchCards)
        });
      }
    });

    
  }, [matches]);

  const getAllMatches = async () => {
    await fetch(
      `https://woofingfromhome.herokuapp.com/matches?firebaseId=${auth.currentUser.uid}`
    )
      .then((res) => res.json())
      .then((matches) => setMatches(matches));
  };

  const fetchFirebaseMatches = async (customer2Id) => {
    try {
      // get Reference
      const firebaseMatchesRef = collection(db, "users");

      // create a query
      const buildQuery = query(
        firebaseMatchesRef,
        where(documentId(), "==", customer2Id)
        // orderBy('timestamp', 'desc', limit(10))
      );
      // execute query

      const querySnap = await getDocs(buildQuery);
      return querySnap;
      // const firebaseMatchesTemp = [];

      // querySnap.forEach((doc) => {
      //   firebaseMatchesTemp.push({
      //     id: doc.id,
      //     name: doc.data().name,
      //     photoURL: doc.data().photoURL,
      //   });
      // });
      // return firebaseMatchesTemp;
    } catch (error) {
      toast.error("Could not fetch matches");
    }
  };

  // const matchesFromCustomer1View = matches.filter(
  //   (match) => match.customer1.firebaseId == currentUser && match.score > 0
  // );

  // for each customer 2 in matchesFromCustomer1View go to firebase and get the name, about me and image and add to customer 2 object in matchesFromCustomer1View

  // useEffect(() => {
  //   const getFirebaseInfo = () => {
  //     matchesFromCustomer1View.forEach((match) => {
  //       const docRef = doc(db, "users", "kF1hjQIgdKer8CMqMO1jRAQsiGM2");
  //       const docSnap = getDoc(docRef).then(
  //         (docSnap) => (match.customer2.name = docSnap.data().name)
  //       );
  //     });
  //   };
  //   getFirebaseInfo();
  // });

  const createMatchCards = () => {
    const tempMatchCards = []
    matches.forEach((match) => {
      
      const customer2Id = match.customer2.firebaseId;
      const customer2Lat = match.customer2.latitude;
      const customer2Long = match.customer2.longitude;
      const distance = match.distance;
      const myScore = match.score;

     
      if (match.customer1.firebaseId === currentUser) {
        const oppositeMatch = matches.find(
          (match) =>
            match.customer2.firebaseId === currentUser &&
            match.customer1.firebaseId === customer2Id
        );

        fetchFirebaseMatches(customer2Id).then((doc) => {
          const matchCard = (
            <MatchCard
              customer2Id={customer2Id}
              customer2Lat={customer2Lat}
              customer2Long={customer2Long}
              distance={distance}
              myScore={myScore}
              theirScore={oppositeMatch.score}
              theirName={"hello"}
            />
          );
          tempMatchCards.push(matchCard);
        });
      }
    });
    return tempMatchCards;
  };

  return (
    <>
      <div className='bg-white'>
        {/* Header */}
        <div className='relative pb-20'>
          <div className='absolute inset-0'>
            <img
              className='h-full w-full object-cover'
              src='https://firebasestorage.googleapis.com/v0/b/woofing-from-home.appspot.com/o/images%2Fmatches-cover.png?alt=media&token=0f8c8f87-f156-45aa-a00a-d4a291cd6247'
              alt=''
            />
            <div
              className='absolute inset-0 bg-gray-600 mix-blend-multiply'
              aria-hidden='true'
            />
          </div>
          <div className='relative mx-auto max-w-7xl py-24 px-4 sm:py-32 sm:px-6 lg:px-8'>
            <h1 className='text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl'>
              Your Matches
            </h1>
            <p className='mt-6 max-w-3xl text-xl text-gray-300'>
              We think these people and their dogs <br /> will be great to speak to
            </p>
          </div>
        </div>

        {/* Overlapping cards */}
        <section
          className='relative z-10 mx-auto -mt-32 max-w-7xl px-4 pb-32 sm:px-6 lg:px-8'
          aria-labelledby='contact-heading'
        >
          <h2 className='sr-only' id='contact-heading'>
            Contact us
          </h2>
          <div className='grid grid-cols-1 gap-y-20 lg:grid-cols-3 lg:gap-y-0 lg:gap-x-8'>
            {matchCards}
          </div>
        </section>
      </div>
    </>
  )
}

export default AllMatches;
