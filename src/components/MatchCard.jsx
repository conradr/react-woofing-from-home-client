import React from "react";
import { Circle, MapContainer, Marker, TileLayer } from "react-leaflet";
import { Link } from "react-router-dom";


const MatchCard = ({
  customer2Id,
  customer2Lat,
  customer2Long,
  distance,
  myScore,
  theirScore,
  theirName,
  theirPhotoURL,
  matchID
}) => {

  
  return (
    
    <li key={customer2Id} className="sm:py-8">
      <div className="space-y-4 sm:grid sm:grid-cols-3 sm:items-start sm:gap-6 sm:space-y-0">
        <div className="aspect-w-3 aspect-h-2 sm:aspect-w-3 sm:aspect-h-4">
          <img className="rounded-lg object-cover shadow-lg" src={theirPhotoURL} alt="" />
        </div>
        <div className="sm:col-span-2">
          <div className="space-y-4">
            <div className="space-y-1 text-lg font-medium leading-6">
              <h3>You've matched with {theirName}!</h3>
              <br />
              <h3>How far are they?</h3>
              <p className="text-indigo-600">
                {Math.round(distance / 1000, 0) / 10} km away
              </p>
              <div className="leafletContainer">
                <MapContainer
                  style={{ height: "100%", width: "100%" }}
                  center={[customer2Lat, customer2Long]}
                  zoom={12}
                  scrollWheelZoom={false}
                >
                  <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png"
                  />
                  <Circle center={[customer2Lat-0.004, customer2Long]} radius={1200}></Circle>
                </MapContainer>
              </div>
            </div>
            <div className="space-y-1 text-lg font-medium leading-6">
              <h3>How well do they meet your requirements?</h3>
              <p className="text-indigo-600">{Math.round(myScore, 0)} %</p>
            </div>
            <div className="space-y-1 text-lg font-medium leading-6">
              <h3>How well do they meet their requirements?</h3>
              <p className="text-indigo-600">{Math.round(theirScore, 0)} %</p>
            </div>

            <ul className="flex space-x-5">
              <li>
                <Link to={`/matches/${matchID}/${customer2Id}`} className="text-gray-400 hover:text-gray-500">
                  Take a look at their profile
                </Link>
              </li>
              <li></li>
            </ul>
          </div>
        </div>
      </div>
    </li>
  );
};

export default MatchCard;
