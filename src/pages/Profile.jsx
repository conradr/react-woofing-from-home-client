import { Fragment, useState, useEffect } from 'react'
import { getAuth, updateEmail, updateProfile } from 'firebase/auth'
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage'
import { db } from '../firebase.config'
import { useNavigate, Link, useParams } from 'react-router-dom'
import { getDoc, updateDoc, doc } from 'firebase/firestore'
import { toast } from 'react-toastify'
import Spinner from '../components/Spinner'

import {
  UserCircleIcon,
  PhotoIcon,
  RectangleGroupIcon,
  CalendarDaysIcon,
  UserPlusIcon,
} from '@heroicons/react/24/outline'

const subNavigation = [
  { name: 'Profile', href: '/profile', icon: UserCircleIcon, current: true },
  {
    name: 'Avatar',
    href: '/upload-profile-image',
    icon: PhotoIcon,
    current: false,
  },
  {
    name: 'Your Dogs',
    href: '/add-dog',
    icon: UserPlusIcon,
    current: false,
  },
  {
    name: 'Doggy Pics',
    href: '/upload-images',
    icon: RectangleGroupIcon,
    current: false,
  },
  { name: 'Availability', href: '/suitability-form', icon: CalendarDaysIcon, current: false },
]
const userNavigation = [
  { name: 'Your Profile', href: '#' },
  { name: 'Settings', href: '#' },
  { name: 'Sign out', href: '#' },
]

const Profile = () => {
  const navigate = useNavigate()
  const params = useParams()
  const auth = getAuth()
  const [changeDetails, setChangeDetails] = useState(false)

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

  const { name, lastName, email, postCode, about } = formData

  const onLogout = () => {
    auth.signOut()
    navigate('/')
  }

  const onSubmit = async () => {
    try {
      auth.currentUser.displayName !== name &&
        // Update display name in fb
        (await updateProfile(auth.currentUser, {
          displayName: name,
        }))

      auth.currentUser.email !== email &&
        (await updateEmail(auth.currentUser, email))

      // Update in firestore
      const userRef = doc(db, 'users', auth.currentUser.uid)
      await updateDoc(userRef, {
        name,
        email,
        about,
        postCode,
        lastName,
      })
      toast.success('Profile updated')
    } catch (error) {
      toast.error('Could not update profile details')
    }
  }

  const storeImage = async (image) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage()
      const fileName = `${auth.currentUser.uid}-${image.name}}`

      const storageRef = ref(storage, 'images/' + fileName)
      const uploadTask = uploadBytesResumable(storageRef, image)

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          console.log('Upload is ' + progress + '% done')
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused')
              break
            case 'running':
              console.log('Upload is running')
              break
            default:
              break
          }
        },
        (error) => {
          reject(error)
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL)
          })
        }
      )
    })
  }

  const onChange = (e) => {
    // Files
    if (e.target.files) {
      setFormData((prevState) => ({
        ...prevState,
        images: e.target.files,
      }))
    }

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
                  This information will be displayed publicly so be careful what
                  you share.
                </p>
              </div>

              <div className='mt-10 divide-y divide-gray-200'>
                <div className='mt-6'>
                  <dl className='divide-y divide-gray-200'>
                    <div className='py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5'>
                      <dt className='text-sm font-medium text-gray-500'>
                        Name
                      </dt>
                      <dd className='mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
                        <input
                          type='text'
                          name='name'
                          id='name'
                          autoComplete='first-name'
                          disabled={!changeDetails}
                          value={name}
                          onChange={onChange}
                          className={
                            !changeDetails
                              ? 'profileName'
                              : '-mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm'
                          }
                        />
                        <span className='ml-4 flex-shrink-0'>
                          <button
                            type='button'
                            onClick={() => {
                              changeDetails && onSubmit()
                              setChangeDetails((prevState) => !prevState)
                            }}
                            className='rounded-md bg-white font-medium text-purple-600 hover:text-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2'
                          >
                            {changeDetails ? 'Done' : 'Update'}
                          </button>
                        </span>
                      </dd>
                    </div>

                    <div className='py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:pt-5'>
                      <dt className='text-sm font-medium text-gray-500'>
                        Email
                      </dt>
                      <dd className='mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
                        <input
                          type='text'
                          name='email'
                          id='email'
                          autoComplete='first-name'
                          disabled={!changeDetails}
                          value={email}
                          onChange={onChange}
                          className={
                            !changeDetails
                              ? 'profileName'
                              : '-mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm'
                          }
                        />
                        <span className='ml-4 flex-shrink-0'>
                          <button
                            type='button'
                            onClick={() => {
                              changeDetails && onSubmit()
                              setChangeDetails((prevState) => !prevState)
                            }}
                            className='rounded-md bg-white font-medium text-purple-600 hover:text-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2'
                          >
                            {changeDetails ? 'Done' : 'Update'}
                          </button>
                        </span>
                      </dd>
                    </div>
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
                          className={
                            !changeDetails
                              ? 'profileName'
                              : '-mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm'
                          }
                        />
                        <span className='ml-4 flex-shrink-0'>
                          <button
                            type='button'
                            onClick={() => {
                              changeDetails && onSubmit()
                              setChangeDetails((prevState) => !prevState)
                            }}
                            className='rounded-md bg-white font-medium text-purple-600 hover:text-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2'
                          >
                            {changeDetails ? 'Done' : 'Update'}
                          </button>
                        </span>
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
                          rows='6'
                          className={
                            !changeDetails
                              ? 'profileName'
                              : '-mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm'
                          }
                        />
                        <span className='ml-4 flex-shrink-0'>
                          <button
                            type='button'
                            onClick={() => {
                              changeDetails && onSubmit()
                              setChangeDetails((prevState) => !prevState)
                            }}
                            className='rounded-md bg-white font-medium text-purple-600 hover:text-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2'
                          >
                            {changeDetails ? 'Done' : 'Update'}
                          </button>
                        </span>
                      </dd>
                    </div>

                    <div className='py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:border-b sm:border-gray-200 sm:py-5'>
                      <dt className='text-sm font-medium text-gray-500'></dt>
                      <dd className='mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0 '>
                        <button
                          type='button'
                          className='bg-purple-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded float-right '
                          onClick={onLogout}
                        >
                          Log Out
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

export default Profile
