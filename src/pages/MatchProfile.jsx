import { useEffect, useState, useContext} from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

import Spinner from '../components/Spinner'
import { getAuth } from 'firebase/auth'
import { db } from '../firebase.config'
import catIcon from '../assets/svg/cat.svg'
import kidIcon from '../assets/svg/kids.svg'
import dogIcon from '../assets/svg/dog.svg'

import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  doc,
  updateDoc,
  serverTimestamp,
  getDoc,
} from "firebase/firestore";


import {
  CheckCircleIcon,
  CalendarDaysIcon,
  EnvelopeIcon,
  XCircleIcon,
} from '@heroicons/react/20/solid'

import { AuthContext } from "../context/authContext";


const homeSetUp = [
  {
    name: 'Good with Cats',
    imageUrl:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    stage: true,
  },
  {
    name: 'Good with Kids',
    imageUrl:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    stage: false,
  },
  {
    name: 'Allergies',
    imageUrl:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    stage: 'Not allergic',
  },
]


const schedule = [
  {
    name: 'Monday',
    imageUrl:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    yourRequirement: true,
    theirAvailability: true,
  },
  {
    name: 'Tuesday',
    imageUrl:
      'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    yourRequirement: false,
    theirAvailability: false,
  },
  {
    name: 'Wednesday',
    imageUrl:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    yourRequirement: true,
    theirAvailability: true,
  },
  {
    name: 'Thursday',
    imageUrl:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    yourRequirement: false,
    theirAvailability: false,
  },
  {
    name: 'Friday',
    imageUrl:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    yourRequirement: false,
    theirAvailability: true,
  },
  {
    name: 'Saturday',
    imageUrl:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    yourRequirement: true,
    theirAvailability: false,
  },
  {
    name: 'Sunday',
    imageUrl:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    yourRequirement: true,
    theirAvailability: false,
  },
]


const MatchProfile = () => {
  const [loading, setLoading] = useState(true)
  const [match, setMatch] = useState(null)
  const [matches, setMatches] = useState(null)

  const { currentUser } = useContext(AuthContext);


  const navigate = useNavigate()
  const params = useParams()
  const auth = getAuth()

  useEffect(() => {
    const fetchMatch = async () => {
      const docRef = doc(db, 'users', params.customer2Id)
      const docSnap = await getDoc(docRef)

       if (docSnap.exists()) {
        setMatch(docSnap.data())
        setLoading(false)
      }
    }
    fetchMatch()
    getAllMatches()

  }, [navigate, params.listingId])

  

  const getAllMatches = async () => {
    await fetch(
      `https://woofingfromhome.herokuapp.com/matches/${params.matchID}`
    )
      .then((res) => res.json())
      .then((matches) => setMatches(matches))
  }


  if (loading) {
    return <Spinner />
  }

  const handleClick = (e) => {
    e.preventDefault()
    // handleSearch()
    handleSelect()
    navigate("/chat")
  }


  // const handleSearch = async () => {
  //   const q = query(
  //     collection(db, "users"),
  //     where("name", "==", match.name)
  //   );

  //   try {
  //     const querySnapshot = await getDocs(q);
  //     querySnapshot.forEach((doc) => {
  //       setUser(doc.data());
  //     });
  //   } catch (err) {
  //   }
  // };


  const handleSelect = async () => {

    //check whether the group(chats in firestore) exists, if not create
    const combinedId =
      currentUser.uid > match.uid
        ? currentUser.uid + match.uid
        : match.uid + currentUser.uid;
    try {
      const res = await getDoc(doc(db, "chats", combinedId));

      if (!res.exists()) {
        //create a chat in chats collection
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        //create user chats
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: match.uid,
            displayName: match.name,
            photoURL: match.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", match.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
    } catch (err) {console.log(err)}
  };



  return (
    <>
      <div>
        <div>
          <img
            className='h-32 w-full object-cover lg:h-48'
            src="https://firebasestorage.googleapis.com/v0/b/woofing-from-home.appspot.com/o/images%2Fcover-image.png?alt=media&token=5fd70878-8af7-4288-909c-3341127a11de"
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
                  className='inline-flex justify-center rounded-md border border-gray-800 bg-slate-300 px-4 py-2 text-m font-medium text-gray-700 shadow-sm hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2'
                onClick={handleClick}
                value={match.name}
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
        <p className='mx-auto mt-4 max-w-3xl text-center text-xl text-gray-500'>
          {match.about}
        </p>
      </div>
      {/* Image gallery */}
      <div className='mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8'>
        <div className='aspect-w-3 aspect-h-4 hidden overflow-hidden rounded-lg lg:block'>
          <img
            src={match.imgUrls[0]}
            alt=''
            className='h-full w-full object-cover object-center'
          />
        </div>
        <div className='hidden lg:grid lg:grid-cols-1 lg:gap-y-8'>
          <div className='aspect-w-3 aspect-h-2 overflow-hidden rounded-lg'>
            <img
              src={match.imgUrls[1]}
              alt=''
              className='h-full w-full object-cover object-center'
            />
          </div>
          <div className='aspect-w-3 aspect-h-2 overflow-hidden rounded-lg'>
            <img
              src={match.imgUrls[2]}
              alt=''
              className='h-full w-full object-cover object-center'
            />
          </div>
        </div>
        <div className='aspect-w-4 aspect-h-5 sm:overflow-hidden sm:rounded-lg lg:aspect-w-3 lg:aspect-h-4'>
          <img
            src={match.imgUrls[3]}
            alt=''
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
            How settled your dogs will be
          </span>
        </div>
      </div>
      <div className='overflow-hidden bg-white shadow sm:rounded-md'>
        <ul role='list' className='divide-y divide-gray-200'>
          <li>
            <div className='flex items-center px-4 py-4 sm:px-6'>
              <div className='flex min-w-0 flex-1 items-center'>
                <div className='flex-shrink-0'>
                  <img
                    className='h-12 w-12 rounded-full'
                    src={catIcon}
                    alt=''
                  />
                </div>
                <div className='min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4'>
                  <div>
                    <p className='truncate text-m font-medium text-indigo-600'>
                      Do cats live here?
                    </p>
                  </div>
                  <div className='md:block'>
                    <div>
                      <p className='mt-2 flex items-center text-m text-gray-500'>
                        {matches.customer2.hasCats ? (
                          <>
                            <CheckCircleIcon
                              className='mr-1.5 h-5 w-5 flex-shrink-0 text-green-400'
                              aria-hidden='true'
                            />
                            There's a cat
                          </>
                        ) : (
                          <>
                            <XCircleIcon
                              className='mr-1.5 h-5 w-5 flex-shrink-0 text-gray-500'
                              aria-hidden='true'
                            />{' '}
                            There's no cat
                          </>
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </li>
          <li>
            <div className='flex items-center px-4 py-4 sm:px-6'>
              <div className='flex min-w-0 flex-1 items-center'>
                <div className='flex-shrink-0'>
                  <img
                    className='h-12 w-12 rounded-full'
                    src={kidIcon}
                    alt=''
                  />
                </div>
                <div className='min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4'>
                  <div>
                    <p className='truncate text-m font-medium text-indigo-600'>
                      Are there kids in the home?
                    </p>
                  </div>
                  <div className='md:block'>
                    <div>
                      <p className='mt-2 flex items-center text-m text-gray-500'>
                        {matches.customer2.hasKids ? (
                          <>
                            <CheckCircleIcon
                              className='mr-1.5 h-5 w-5 flex-shrink-0 text-green-400'
                              aria-hidden='true'
                            />
                            Kids live here
                          </>
                        ) : (
                          <>
                            <XCircleIcon
                              className='mr-1.5 h-5 w-5 flex-shrink-0 text-gray-500'
                              aria-hidden='true'
                            />{' '}
                            There are no kids here
                          </>
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </li>
          <li>
            <div className='flex items-center px-4 py-4 sm:px-6'>
              <div className='flex min-w-0 flex-1 items-center'>
                <div className='flex-shrink-0'>
                  <img
                    className='h-12 w-12 rounded-full'
                    src={dogIcon}
                    alt=''
                  />
                </div>
                <div className='min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4'>
                  <div>
                    <p className='truncate text-m font-medium text-indigo-600'>
                      Are there other dogs?
                    </p>
                  </div>
                  <div className='md:block'>
                    <div>
                      <p className='mt-2 flex items-center text-m text-gray-500'>
                        {matches.customer2.hasOtherDogs ? (
                          <>
                            <CheckCircleIcon
                              className='mr-1.5 h-5 w-5 flex-shrink-0 text-green-400'
                              aria-hidden='true'
                            />
                            There are other dogs in this home
                          </>
                        ) : (
                          <>
                            <XCircleIcon
                              className='mr-1.5 h-5 w-5 flex-shrink-0 text-gray-500'
                              aria-hidden='true'
                            />{' '}
                            There are no other dogs
                          </>
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </li>
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
          <li>
            <div className='flex items-center px-4 py-4 sm:px-6'>
              <div className='flex min-w-0 flex-1 items-center'>
                <div className='flex-shrink-0'>
                  <CalendarDaysIcon className='text-slate-700 h-12 w-12 rounded-full' />
                </div>
                <div className='min-w-0 flex-1 px-4 md:grid md:grid-cols-3 md:gap-4'>
                  <div>
                    <p className='truncate text-m font-medium text-indigo-600'>
                      Monday
                    </p>
                  </div>
                  <div className='md:block'>
                    <div>
                      <p className='mt-2 flex items-center text-m text-gray-500'>
                        {matches.customer1.requireMonday ? (
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
                            You're good
                          </>
                        )}
                      </p>
                    </div>
                  </div>
                  <div className='md:block'>
                    <div>
                      <p className='mt-2 flex items-center text-m text-gray-500'>
                        {matches.customer2.availableMonday ? (
                          <>
                            <CheckCircleIcon
                              className='mr-1.5 h-5 w-5 flex-shrink-0 text-green-400'
                              aria-hidden='true'
                            />{' '}
                            They can help
                          </>
                        ) : (
                          <>
                            <XCircleIcon
                              className='mr-1.5 h-5 w-5 flex-shrink-0 text-gray-500'
                              aria-hidden='true'
                            />{' '}
                            They can't help
                          </>
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </li>
          <li>
            <div className='flex items-center px-4 py-4 sm:px-6'>
              <div className='flex min-w-0 flex-1 items-center'>
                <div className='flex-shrink-0'>
                  <CalendarDaysIcon className='text-slate-700 h-12 w-12 rounded-full' />
                </div>
                <div className='min-w-0 flex-1 px-4 md:grid md:grid-cols-3 md:gap-4'>
                  <div>
                    <p className='truncate text-m font-medium text-indigo-600'>
                      Tuesday
                    </p>
                  </div>
                  <div className='md:block'>
                    <div>
                      <p className='mt-2 flex items-center text-m text-gray-500'>
                        {matches.customer1.requireTuesday ? (
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
                            You're good
                          </>
                        )}
                      </p>
                    </div>
                  </div>
                  <div className='md:block'>
                    <div>
                      <p className='mt-2 flex items-center text-m text-gray-500'>
                        {matches.customer2.availableTuesday ? (
                          <>
                            <CheckCircleIcon
                              className='mr-1.5 h-5 w-5 flex-shrink-0 text-green-400'
                              aria-hidden='true'
                            />{' '}
                            They can help
                          </>
                        ) : (
                          <>
                            <XCircleIcon
                              className='mr-1.5 h-5 w-5 flex-shrink-0 text-gray-500'
                              aria-hidden='true'
                            />{' '}
                            They can't help
                          </>
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </li>
          <li>
            <div className='flex items-center px-4 py-4 sm:px-6'>
              <div className='flex min-w-0 flex-1 items-center'>
                <div className='flex-shrink-0'>
                  <CalendarDaysIcon className='text-slate-700 h-12 w-12 rounded-full' />
                </div>
                <div className='min-w-0 flex-1 px-4 md:grid md:grid-cols-3 md:gap-4'>
                  <div>
                    <p className='truncate text-m font-medium text-indigo-600'>
                      Wednesday
                    </p>
                  </div>
                  <div className='md:block'>
                    <div>
                      <p className='mt-2 flex items-center text-m text-gray-500'>
                        {matches.customer1.requireWednesday ? (
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
                            You're good
                          </>
                        )}
                      </p>
                    </div>
                  </div>
                  <div className='md:block'>
                    <div>
                      <p className='mt-2 flex items-center text-m text-gray-500'>
                        {matches.customer2.availableWednesday ? (
                          <>
                            <CheckCircleIcon
                              className='mr-1.5 h-5 w-5 flex-shrink-0 text-green-400'
                              aria-hidden='true'
                            />{' '}
                            They can help
                          </>
                        ) : (
                          <>
                            <XCircleIcon
                              className='mr-1.5 h-5 w-5 flex-shrink-0 text-gray-500'
                              aria-hidden='true'
                            />{' '}
                            They can't help
                          </>
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </li>
          <li>
            <div className='flex items-center px-4 py-4 sm:px-6'>
              <div className='flex min-w-0 flex-1 items-center'>
                <div className='flex-shrink-0'>
                  <CalendarDaysIcon className='text-slate-700 h-12 w-12 rounded-full' />
                </div>
                <div className='min-w-0 flex-1 px-4 md:grid md:grid-cols-3 md:gap-4'>
                  <div>
                    <p className='truncate text-m font-medium text-indigo-600'>
                      Thursday
                    </p>
                  </div>
                  <div className='md:block'>
                    <div>
                      <p className='mt-2 flex items-center text-m text-gray-500'>
                        {matches.customer1.requireThursday ? (
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
                            You're good
                          </>
                        )}
                      </p>
                    </div>
                  </div>
                  <div className='md:block'>
                    <div>
                      <p className='mt-2 flex items-center text-m text-gray-500'>
                        {matches.customer2.availableThursday ? (
                          <>
                            <CheckCircleIcon
                              className='mr-1.5 h-5 w-5 flex-shrink-0 text-green-400'
                              aria-hidden='true'
                            />{' '}
                            They can help
                          </>
                        ) : (
                          <>
                            <XCircleIcon
                              className='mr-1.5 h-5 w-5 flex-shrink-0 text-gray-500'
                              aria-hidden='true'
                            />{' '}
                            They can't help
                          </>
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </li>
          <li>
            <div className='flex items-center px-4 py-4 sm:px-6'>
              <div className='flex min-w-0 flex-1 items-center'>
                <div className='flex-shrink-0'>
                  <CalendarDaysIcon className='text-slate-700 h-12 w-12 rounded-full' />
                </div>
                <div className='min-w-0 flex-1 px-4 md:grid md:grid-cols-3 md:gap-4'>
                  <div>
                    <p className='truncate text-m font-medium text-indigo-600'>
                      Friday
                    </p>
                  </div>
                  <div className='md:block'>
                    <div>
                      <p className='mt-2 flex items-center text-m text-gray-500'>
                        {matches.customer1.requireFriday ? (
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
                            You're good
                          </>
                        )}
                      </p>
                    </div>
                  </div>
                  <div className='md:block'>
                    <div>
                      <p className='mt-2 flex items-center text-m text-gray-500'>
                        {matches.customer2.availableFriday ? (
                          <>
                            <CheckCircleIcon
                              className='mr-1.5 h-5 w-5 flex-shrink-0 text-green-400'
                              aria-hidden='true'
                            />{' '}
                            They can help
                          </>
                        ) : (
                          <>
                            <XCircleIcon
                              className='mr-1.5 h-5 w-5 flex-shrink-0 text-gray-500'
                              aria-hidden='true'
                            />{' '}
                            They can't help
                          </>
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </li>
          <li>
            <div className='flex items-center px-4 py-4 sm:px-6'>
              <div className='flex min-w-0 flex-1 items-center'>
                <div className='flex-shrink-0'>
                  <CalendarDaysIcon className='text-slate-700 h-12 w-12 rounded-full' />
                </div>
                <div className='min-w-0 flex-1 px-4 md:grid md:grid-cols-3 md:gap-4'>
                  <div>
                    <p className='truncate text-m font-medium text-indigo-600'>
                      Saturday
                    </p>
                  </div>
                  <div className='md:block'>
                    <div>
                      <p className='mt-2 flex items-center text-m text-gray-500'>
                        {matches.customer1.requireSaturday ? (
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
                            You're good
                          </>
                        )}
                      </p>
                    </div>
                  </div>
                  <div className='md:block'>
                    <div>
                      <p className='mt-2 flex items-center text-m text-gray-500'>
                        {matches.customer2.availableSaturday ? (
                          <>
                            <CheckCircleIcon
                              className='mr-1.5 h-5 w-5 flex-shrink-0 text-green-400'
                              aria-hidden='true'
                            />{' '}
                            They can help
                          </>
                        ) : (
                          <>
                            <XCircleIcon
                              className='mr-1.5 h-5 w-5 flex-shrink-0 text-gray-500'
                              aria-hidden='true'
                            />{' '}
                            They can't help
                          </>
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </li>
          <li>
            <div className='flex items-center px-4 py-4 sm:px-6'>
              <div className='flex min-w-0 flex-1 items-center'>
                <div className='flex-shrink-0'>
                  <CalendarDaysIcon className='text-slate-700 h-12 w-12 rounded-full' />
                </div>
                <div className='min-w-0 flex-1 px-4 md:grid md:grid-cols-3 md:gap-4'>
                  <div>
                    <p className='truncate text-m font-medium text-indigo-600'>
                      Sunday
                    </p>
                  </div>
                  <div className='md:block'>
                    <div>
                      <p className='mt-2 flex items-center text-m text-gray-500'>
                        {matches.customer1.requireSunday ? (
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
                            You're good
                          </>
                        )}
                      </p>
                    </div>
                  </div>
                  <div className='md:block'>
                    <div>
                      <p className='mt-2 flex items-center text-m text-gray-500'>
                        {matches.customer2.availableSunday ? (
                          <>
                            <CheckCircleIcon
                              className='mr-1.5 h-5 w-5 flex-shrink-0 text-green-400'
                              aria-hidden='true'
                            />{' '}
                            They can help
                          </>
                        ) : (
                          <>
                            <XCircleIcon
                              className='mr-1.5 h-5 w-5 flex-shrink-0 text-gray-500'
                              aria-hidden='true'
                            />{' '}
                            They can't help
                          </>
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>
        
      </div>
    </>
  )
}

export default MatchProfile
