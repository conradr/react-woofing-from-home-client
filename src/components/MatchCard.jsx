import React from 'react'
import { Circle, MapContainer, TileLayer } from 'react-leaflet'
import { Link } from 'react-router-dom'

const MatchCard = ({
  customer2Id,
  customer2Lat,
  customer2Long,
  distance,
  myScore,
  theirScore,
  theirName,
  theirPhotoURL,
  matchID,
}) => {
  return (
    <div className='flex flex-col rounded-2xl bg-white shadow-xl mt-14'>
      <div className='relative flex-1 px-6 pt-16 pb-8 md:px-8'>
        <div className='absolute top-0 inline-block -translate-y-1/2 transform shadow-lg rounded-full '>
          <img
            className='h-24 w-24 rounded-full text-white'
            src={theirPhotoURL}
            alt=''
          />
        </div>
        <h3 className='text-xl font-medium text-gray-900'>{theirName}</h3>
        <div className='flex flex-col pt-6'>
          <h3>
            They meet{' '}
            <span className='text-cyan-600 '>{Math.round(myScore, 0)} % </span>
            of your needs
          </h3>
          <h3>
            You meet{' '}
            <span className='text-cyan-600'>
              {Math.round(theirScore, 0)} %{' '}
            </span>
            of their needs
          </h3>
        </div>
        <div className='leafletContainer pt-6'>
          <h3>How far away are they?</h3>
          <p className='mt-4 text-base text-gray-500'>
            {Math.round(distance / 1000, 0) / 10} km away
          </p>
          <MapContainer
            style={{ height: '100%', width: '100%' }}
            center={[customer2Lat, customer2Long]}
            zoom={12}
            scrollWheelZoom={false}
          >
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url='https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png'
            />
            <Circle
              center={[customer2Lat - 0.004, customer2Long]}
              radius={1200}
            ></Circle>
          </MapContainer>
        </div>
      </div>
      <div className='rounded-bl-2xl rounded-br-2xl bg-gray-50 p-6 md:px-8'>
        <a
          href={`/matches/${matchID}/${customer2Id}`}
          className='text-base font-medium text-cyan-700 hover:text-cyan-600'
        >
          See this match<span aria-hidden='true'> &rarr;</span>
        </a>
      </div>
    </div>
  )
}

export default MatchCard
