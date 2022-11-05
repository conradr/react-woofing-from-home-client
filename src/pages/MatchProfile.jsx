import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

import Spinner from '../components/Spinner'
import { getDoc, doc } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { db } from '../firebase.config'

import {
  CheckCircleIcon,
  ChevronRightIcon,
  EnvelopeIcon,
  XCircleIcon,
} from '@heroicons/react/20/solid'

const profile = {
  name: 'Ricardo Cooper',
  email: 'ricardo.cooper@example.com',
  avatar:
    'https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80',
  backgroundImage:
    'https://images.unsplash.com/photo-1444628838545-ac4016a5418a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
  fields: [
    ['Phone', '(555) 123-4567'],
    ['Email', 'ricardocooper@example.com'],
    ['Title', 'Senior Front-End Developer'],
    ['Team', 'Product Development'],
    ['Location', 'San Francisco'],
    ['Sits', 'Oasis, 4th floor'],
    ['Salary', '$145,000'],
    ['Birthday', 'June 8, 1990'],
  ],
}

const applications = [
  {
    applicant: {
      name: 'Good with Cats',
      email: 'ricardo.cooper@example.com',
      imageUrl:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    date: '2020-01-07',
    dateFull: 'January 7, 2020',
    stage: 'This is a kitty free home',
    href: '#',
  },
  {
    applicant: {
      name: 'Good with kids',
      email: 'kristen.ramos@example.com',
      imageUrl:
        'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    date: '2020-01-07',
    dateFull: 'January 7, 2020',
    stage: 'No kids around to terrorise Teddy',
    href: '#',
  },
  {
    applicant: {
      name: 'Allergies',
      email: 'ted.fox@example.com',
      imageUrl:
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    date: '2020-01-07',
    dateFull: 'January 7, 2020',
    stage: "Ricardo isn't allergic - wahey",
    href: '#',
  },
]

const schedule = [
  {
    applicant: {
      name: 'Monday',
      imageUrl:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      yourRequirement: true,
      theirAvailability: true,
    },
  },
  {
    applicant: {
      name: 'Tuesday',
      email: 'kristen.ramos@example.com',
      imageUrl:
        'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      yourRequirement: false,
      theirAvailability: false,
    },
  },
  {
    applicant: {
      name: 'Wednesday',
      email: 'ted.fox@example.com',
      imageUrl:
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      yourRequirement: true,
      theirAvailability: true,
    },
  },
  {
    applicant: {
      name: 'Thursday',
      email: 'ted.fox@example.com',
      imageUrl:
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      yourRequirement: false,
      theirAvailability: false,
    },
  },
  {
    applicant: {
      name: 'Friday',
      email: 'ted.fox@example.com',
      imageUrl:
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      yourRequirement: false,
      theirAvailability: true,
    },
  },
  {
    applicant: {
      name: 'Saturday',
      email: 'ted.fox@example.com',
      imageUrl:
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      yourRequirement: true,
      theirAvailability: false,
    },
  },
  {
    applicant: {
      name: 'Sunday',
      email: 'ted.fox@example.com',
      imageUrl:
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      yourRequirement: true,
      theirAvailability: false,
    },
  },
]

const product = {
  images: [
    {
      src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-secondary-product-shot.jpg',
      alt: 'Two each of gray, white, and black shirts laying flat.',
    },
    {
      src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-01.jpg',
      alt: 'Model wearing plain black basic tee.',
    },
    {
      src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-02.jpg',
      alt: 'Model wearing plain gray basic tee.',
    },
    {
      src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-featured-product-shot.jpg',
      alt: 'Model wearing plain white basic tee.',
    },
  ],
}

const MatchProfile = () => {
  const [loading, setLoading] = useState(true)
  const [match, setMatch] = useState(null)
  const [matches, setMatches] = useState(null)

  const navigate = useNavigate()
  const params = useParams()
  const auth = getAuth()

  useEffect(() => {
    const fetchMatch = async () => {
      const docRef = doc(db, 'users', params.matchID)
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        setMatch(docSnap.data())
        setLoading(false)
      }
    }

    fetchMatch()
    //getAllMatches()
  }, [navigate, params.listingId])

  const getAllMatches = async () => {
    await fetch(
      `https://woofingfromhome.herokuapp.com/matches?firebaseId=${auth.currentUser.uid}`
    )
      .then((res) => res.json())
      .then((matches) => setMatches(matches))
  }

  if (loading) {
    return <Spinner />
  }

  return (
    <>
      <div>
        <div>
          <img
            className='h-32 w-full object-cover lg:h-48'
            src={profile.backgroundImage}
            alt=''
          />
        </div>
        <div className='mx-auto max-w-5xl px-4 sm:px-6 lg:px-8'>
          <div className='-mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5'>
            <div className='flex'>
              <img
                className='h-24 w-24 rounded-full ring-4 ring-white sm:h-32 sm:w-32'
                src={match.photoURL}
                alt=''
              />
            </div>
            <div className='mt-6 sm:flex sm:min-w-0 sm:flex-1 sm:items-center sm:justify-end sm:space-x-6 sm:pb-1'>
              <div className='mt-6 min-w-0 flex-1 sm:hidden md:block'>
                <h1 className='truncate text-2xl font-bold text-gray-900'>
                  {match.name}
                </h1>
              </div>
              <div className='justify-stretch mt-6 flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4'>
                <button
                  type='button'
                  className='inline-flex justify-center rounded-md border border-gray-400 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2'
                >
                  <EnvelopeIcon
                    className='-ml-1 mr-2 h-5 w-5 text-gray-400'
                    aria-hidden='true'
                  />
                  <span>Message</span>
                </button>
              </div>
            </div>
          </div>
          <div className='mt-6 hidden min-w-0 flex-1 sm:block md:hidden'>
            <h1 className='truncate text-2xl font-bold text-gray-900'>
              {match.name}
            </h1>
          </div>
        </div>
      </div>

      <div className=''>
        <p className='mx-auto mt-4 max-w-3xl text-center text-m text-gray-500'>
          {match.about}
        </p>
      </div>
      {/* Image gallery */}
      <div className='mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8'>
        <div className='aspect-w-3 aspect-h-4 hidden overflow-hidden rounded-lg lg:block'>
          <img
            src={match.imgUrls[0]}
            alt={product.images[0].alt}
            className='h-full w-full object-cover object-center'
          />
        </div>
        <div className='hidden lg:grid lg:grid-cols-1 lg:gap-y-8'>
          <div className='aspect-w-3 aspect-h-2 overflow-hidden rounded-lg'>
            <img
              src={match.imgUrls[1]}
              alt={product.images[1].alt}
              className='h-full w-full object-cover object-center'
            />
          </div>
          <div className='aspect-w-3 aspect-h-2 overflow-hidden rounded-lg'>
            <img
              src={match.imgUrls[2]}
              alt={product.images[2].alt}
              className='h-full w-full object-cover object-center'
            />
          </div>
        </div>
        <div className='aspect-w-4 aspect-h-5 sm:overflow-hidden sm:rounded-lg lg:aspect-w-3 lg:aspect-h-4'>
          <img
            src={match.imgUrls[3]}
            alt={product.images[3].alt}
            className='h-full w-full object-cover object-center'
          />
        </div>
      </div>

      <div className='relative'>
        <div className='absolute inset-0 flex items-center' aria-hidden='true'>
          <div className='w-full border-t border-gray-300' />
        </div>
        <div className='relative flex justify-center'>
          <span className='bg-white px-2 text-xl text-gray-500 py-8'>
            How settled Teddy will be
          </span>
        </div>
      </div>
      <div className='overflow-hidden bg-white shadow sm:rounded-md'>
        <ul role='list' className='divide-y divide-gray-200'>
          {applications.map((application) => (
            <li key={application.applicant.email}>
              <div className='flex items-center px-4 py-4 sm:px-6'>
                <div className='flex min-w-0 flex-1 items-center'>
                  <div className='flex-shrink-0'>
                    <img
                      className='h-12 w-12 rounded-full'
                      src={application.applicant.imageUrl}
                      alt=''
                    />
                  </div>
                  <div className='min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4'>
                    <div>
                      <p className='truncate text-sm font-medium text-indigo-600'>
                        {application.applicant.name}
                      </p>
                    </div>
                    <div className='md:block'>
                      <div>
                        <p className='mt-2 flex items-center text-sm text-gray-500'>
                          <CheckCircleIcon
                            className='mr-1.5 h-5 w-5 flex-shrink-0 text-green-400'
                            aria-hidden='true'
                          />
                          {application.stage}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className='relative py-2'>
        <div className='absolute inset-0 flex items-center' aria-hidden='true'>
          <div className='w-full border-t border-gray-300' />
        </div>
        <div className='relative flex justify-center'>
          <span className='bg-white px-2 text-xl text-gray-500 py-8'>
            How your schedules compare
          </span>
        </div>
      </div>
      <div className='overflow-hidden bg-white shadow sm:rounded-md'>
        <ul role='list' className='divide-y divide-gray-200'>
          {schedule.map((dayOfTheWeek) => (
            <li key={dayOfTheWeek.applicant.email}>
              <div className='flex items-center px-4 py-4 sm:px-6'>
                <div className='flex min-w-0 flex-1 items-center'>
                  <div className='flex-shrink-0'>
                    <img
                      className='h-12 w-12 rounded-full'
                      src={dayOfTheWeek.applicant.imageUrl}
                      alt=''
                    />
                  </div>
                  <div className='min-w-0 flex-1 px-4 md:grid md:grid-cols-3 md:gap-4'>
                    <div>
                      <p className='truncate text-sm font-medium text-indigo-600'>
                        {dayOfTheWeek.applicant.name}
                      </p>
                    </div>
                    <div className='md:block'>
                      <div>
                        <p className='mt-2 flex items-center text-sm text-gray-500'>
                          {dayOfTheWeek.applicant.yourRequirement ? (
                            <>
                              <CheckCircleIcon
                                className='mr-1.5 h-5 w-5 flex-shrink-0 text-green-400'
                                aria-hidden='true'
                              />
                              You need help
                            </>
                          ) : (
                            <>
                              <XCircleIcon
                                className='mr-1.5 h-5 w-5 flex-shrink-0 text-gray-500'
                                aria-hidden='true'
                              />{' '}
                              you're good
                            </>
                          )}
                        </p>
                      </div>
                    </div>
                    <div className='md:block'>
                      <div>
                        <p className='mt-2 flex items-center text-sm text-gray-500'>
                          {dayOfTheWeek.applicant.theirAvailability ? (
                            <>
                              <CheckCircleIcon
                                className='mr-1.5 h-5 w-5 flex-shrink-0 text-green-400'
                                aria-hidden='true'
                              />{' '}
                              they can help
                            </>
                          ) : (
                            <>
                              <XCircleIcon
                                className='mr-1.5 h-5 w-5 flex-shrink-0 text-gray-500'
                                aria-hidden='true'
                              />{' '}
                              they cant help
                            </>
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default MatchProfile
