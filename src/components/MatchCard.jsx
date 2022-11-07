import React from 'react'

const MatchCard = ({customer2Id, customer2Lat, customer2Long, distance, myScore, theirScore}) => {
  return (

    {matchesFromCustomer1View.map((match) => (
        <li key={match.customer2.firebaseId} className="sm:py-8">
          <div className="space-y-4 sm:grid sm:grid-cols-3 sm:items-start sm:gap-6 sm:space-y-0">
            <div className="aspect-w-3 aspect-h-2 sm:aspect-w-3 sm:aspect-h-4">
              {/* <img className="rounded-lg object-cover shadow-lg" src={person.imageUrl} alt="" /> */}
            </div>
            <div className="sm:col-span-2">
              <div className="space-y-4">
                <div className="space-y-1 text-lg font-medium leading-6">
                  <h3>
                    You've matched with {match.customer2.firebaseId}!
                  </h3>
                  <br />
                  <h3>How far are they?</h3>
                  <p className="text-indigo-600">
                    {Math.round(match.distance / 1000, 0) / 10} km away
                  </p>
                  <div className="leafletContainer">
                    <MapContainer
                      style={{ height: "100%", width: "100%" }}
                      center={[
                        match.customer2.latitude,
                        match.customer2.longitude,
                      ]}
                      zoom={12}
                      scrollWheelZoom={false}
                    >
                      <TileLayer
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png"
                      />
                      <Marker
                        position={[
                          match.customer2.latitude,
                          match.customer2.longitude,
                        ]}
                      ></Marker>
                    </MapContainer>
                  </div>
                </div>
                <div className="space-y-1 text-lg font-medium leading-6">
                  <h3>How well do they meet your requirements?</h3>
                  <p className="text-indigo-600">
                    {Math.round(match.score, 0)} %
                  </p>
                </div>
                <div className="text-lg">
                  <p className="text-gray-500">
                    {match.customer2.name}
                  </p>
                </div>
                <ul className="flex space-x-5">
                  <li>
                    <a
                      href="/"
                      className="text-gray-400 hover:text-gray-500"
                    >
                      Take a look at their profile
                    </a>
                  </li>
                  <li></li>
                </ul>
              </div>
            </div>
          </div>
        </li>
      ))}
    <div>MatchCard</div>
  )
}

export default MatchCard