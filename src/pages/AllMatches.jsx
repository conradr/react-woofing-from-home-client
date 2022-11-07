import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../firebase.config";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import MatchCard from "../components/MatchCard";

function AllMatches() {
  const [currentUser, setCurrentUser] = useState(null);
  const [matches, setMatches] = useState([]);
  const [selectedMatch, setSelectedMatch] = useState(null);
  // const [matchesFromCustomer1View, setMatchesFromCustomer1View] = useState([])

  //get firebaseID
  const auth = getAuth();
  let matchCards;

  useEffect(() => {
    getAllMatches();
    setCurrentUser(auth.currentUser.uid);    
  }, []);

  useEffect(() => {
    matchCards = createMatchCards()
  }, [matches])

  const getAllMatches = async () => {
    await fetch(
      `https://woofingfromhome.herokuapp.com/matches?firebaseId=${auth.currentUser.uid}`
    )
      .then((res) => res.json())
      .then((matches) => setMatches(matches));
  };

  const matchesFromCustomer1View = matches.filter(
    (match) => match.customer1.firebaseId == currentUser && match.score > 0
  );

  // for each customer 2 in matchesFromCustomer1View go to firebase and get the name, about me and image and add to customer 2 object in matchesFromCustomer1View

  useEffect(() => {
    const getFirebaseInfo = () => {
      matchesFromCustomer1View.forEach((match) => {
        const docRef = doc(db, "users", "kF1hjQIgdKer8CMqMO1jRAQsiGM2");
        const docSnap = getDoc(docRef).then(
          (docSnap) => (match.customer2.name = docSnap.data().name)
        );
      });
    };
    getFirebaseInfo();
  });

  const createMatchCards = () => {
    const matchCards = [];

    matches.forEach((match) => {
      const customer2Id = match.customer2.firebaseId;
      const customer2Lat = match.customer2.latitude;
      const customer2Long = match.customer2.longitude;
      const distance = match.distance;
      const myScore = match.score;

      if (match.customer1.firebaseId == currentUser) {
        const oppositeMatch = matches.find(
          (match) =>
            match.customer2.firebaseId == currentUser &&
            match.customer1.firebaseId == customer2.firebaseId
        );

        const matchCard = (
          <MatchCard
            customer2Id={customer2Id}
            customer2Lat={customer2Lat}
            customer2Long={customer2Long}
            distance={distance}
            myScore={myScore}
            theirScore={oppositeMatch.score}
          />
        );

        matchCards.push(matchCard);
      }
    });
    return matchCards;
  };

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl py-12 px-4 sm:px-6 lg:px-8 lg:py-24">
        <div className="space-y-12 lg:grid lg:grid-cols-3 lg:gap-8 lg:space-y-0">
          <div className="space-y-5 sm:space-y-4">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Your Matches
            </h2>
            <p className="text-xl text-gray-500">
              Here are some of the matches we think meet your requirements:
            </p>
          </div>
          <div className="lg:col-span-2">
            <ul className="space-y-12 sm:-mt-8 sm:space-y-0 sm:divide-y sm:divide-gray-200 lg:gap-x-8 lg:space-y-0">
            {matchCards}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AllMatches;
