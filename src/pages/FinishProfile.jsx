import { useState, useEffect } from 'react'
import { getAuth, updateEmail, updateProfile } from 'firebase/auth'
import { db } from '../firebase.config'
import { useNavigate,  useParams } from 'react-router-dom'
import { getDoc, updateDoc, doc } from 'firebase/firestore'
import { toast } from 'react-toastify'
import Spinner from '../components/Spinner'

import arrowRight from '../assets/svg/keyboardArrowRightIcon.svg'
import homeIcon from '../assets/svg/homeIcon.svg'
import { Disclosure, Menu, Switch, Transition } from '@headlessui/react'
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import {
  Bars3Icon,
  BellIcon,
  UserCircleIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'

const user = {
  name: 'Debbie Lewis',
  handle: 'deblewis',
  email: 'debbielewis@example.com',
  imageUrl:
    'https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=320&h=320&q=80',
}
const navigation = [
  { name: 'Dashboard', href: '#', current: true },
  { name: 'Jobs', href: '#', current: false },
  { name: 'Applicants', href: '#', current: false },
  { name: 'Company', href: '#', current: false },
]
const subNavigation = [
  { name: 'Profile', href: '#', icon: UserCircleIcon, current: true },
  
]
const userNavigation = [
  { name: 'Your Profile', href: '#' },
  { name: 'Settings', href: '#' },
  { name: 'Sign out', href: '#' },
]

const FinishProfile = () => {

  const navigate = useNavigate()
  const params = useParams()
  const auth = getAuth()
  const [changeDetails, setChangeDetails] = useState(true)

  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    lastName: '',
    email: auth.currentUser.email,
    about: '',
    photoURL: '',
    postCode: '',
  })

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchListing = async () => {
      const docRef = doc(db, 'users', auth.currentUser.uid)
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        setFormData(docSnap.data())
        setLoading(false)
      }
    }


    fetchListing()
  }, [navigate])

  const { name, email,  postCode, about } = formData

  const onLogout = () => {
    auth.signOut()
    navigate('/')
  }

  const onSubmit = async () => {
    if (!postCode) {
      toast.error('Please enter a postcode')
      setChangeDetails((prevState) => !prevState)
      return 
    }
    
    let geolocation = {}
    let location

    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${postCode}&key=AIzaSyCcj_-O1o-muXov_vmnbMZqkQiQiPzgizM`
    )

    const data = await response.json()

    console.log(data)
    
    geolocation.lat = data.results[0]?.geometry.location.lat ?? 0
    geolocation.lng = data.results[0]?.geometry.location.lng ?? 0
    
    location =
      data.status === 'ZERO_RESULTS'
        ? undefined
        : data.results[0]?.formatted_address

    if (location === undefined || location.includes('undefined')) {
      setLoading(false)
      toast.error('Please enter a correct postcode')
      return
    }

     // geolocation.lat = latitude
     // geolocation.lng = longitude

    try {
      auth.currentUser.displayName !== name &&
        // Update display name in fb
        (await updateProfile(auth.currentUser, {
          displayName: name,
        }))

      auth.currentUser.email !== email &&
        (await updateEmail(auth.currentUser, email))
      console.log(auth.currentUser)
      // Update in firestore
      const userRef = doc(db, 'users', auth.currentUser.uid)
      console.log(auth.currentUser.uid)
      await updateDoc(userRef, {
        about,
        postCode,
        geolocation,
      })
      toast.success('Profile updated')

      navigate('/upload-images')

    } catch (error) {
      toast.error('Could not update profile details')
    }
  }


  const onChange = (e) => {

    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }))
  }

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

  if (loading) {
    return <Spinner />
  }

  return (
    <>
      <div>

              <div className='divide-y divide-gray-200 lg:grid lg:grid-cols-12 lg:divide-y-0 lg:divide-x'>
                <aside className='py-6 lg:col-span-3'>
                  <nav className='space-y-1'>
                    {subNavigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.current
                            ? 'bg-teal-50 border-teal-500 text-teal-700 hover:bg-teal-50 hover:text-teal-700'
                            : 'border-transparent text-gray-900 hover:bg-gray-50 hover:text-gray-900',
                          'group border-l-4 px-3 py-2 flex items-center text-sm font-medium'
                        )}
                        aria-current={item.current ? 'page' : undefined}
                      >
                        <item.icon
                          className={classNames(
                            item.current
                              ? 'text-teal-500 group-hover:text-teal-500'
                              : 'text-gray-400 group-hover:text-gray-500',
                            'flex-shrink-0 -ml-1 mr-3 h-6 w-6'
                          )}
                          aria-hidden='true'
                        />
                        <span className='truncate'>{item.name}</span>
                      </a>
                    ))}
                  </nav>
                </aside>

                <form className='divide-y divide-gray-200 lg:col-span-9'>
                  {/* Profile section */}

                  <div className='py-6 px-4 sm:p-6 lg:pb-8'>
                    <div>
                      <h2 className='text-lg font-medium leading-6 text-gray-900'>
                        Profile
                      </h2>
                      <p className='mt-1 text-sm text-gray-500'>
                        This information will be displayed publicly so be
                        careful what you share.
                      </p>
                    </div>

                    <div className='mt-10 divide-y divide-gray-200'>
                      <div className='mt-6'>
                        <dl className='divide-y divide-gray-200'>
                          <div className='py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:border-b sm:border-gray-200 sm:py-5'>
                            <dt className='text-sm font-medium text-gray-500'>
                              PostCode
                            </dt>
                            <dd className='mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
                              <input
                                type='text'
                                name='postCode'
                                id='postCode'
                                autoComplete='first-name'
                                disabled={!changeDetails}
                                value={postCode}
                                onChange={onChange}
                                required
                                className={
                                  !changeDetails
                                    ? 'profileName'
                                    : '-mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm'
                                }
                              />
                            </dd>
                          </div>
                          <div className='py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:border-b sm:border-gray-200 sm:py-5'>
                            <dt className='text-sm font-medium text-gray-500'>
                              About me
                            </dt>
                            <dd className='mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
                              <textarea
                                name='about'
                                id='about'
                                autoComplete='About me'
                                disabled={!changeDetails}
                                value={about}
                                onChange={onChange}
                                className={
                                  !changeDetails
                                    ? 'profileName'
                                    : '-mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm'
                                }
                              />
                            </dd>
                          </div>

                          <div className='py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 float-right'>
                            <dt className='text-sm font-medium text-gray-500'></dt>
                            <dd className='mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
                              <button
                                type='button'
                                onClick={() => {
                                  changeDetails && onSubmit()
                                  setChangeDetails((prevState) => !prevState)
                                }}
                                className='inline-flex  rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
                              >
                                {changeDetails ? 'done' : 'update'}
                              </button>
                            </dd>
                          </div>
                        </dl>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
    </>
  )
}

export default FinishProfile
