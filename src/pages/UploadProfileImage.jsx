import {
  CalendarDaysIcon, PhotoIcon,
  RectangleGroupIcon, UserCircleIcon, UserPlusIcon
} from '@heroicons/react/24/outline'
import { getAuth, updateProfile } from 'firebase/auth'
import { doc, updateDoc } from 'firebase/firestore'
import {
  getDownloadURL, getStorage,
  ref,
  uploadBytesResumable
} from 'firebase/storage'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import Spinner from '../components/Spinner'
import { db } from '../firebase.config'

const subNavigation = [
  { name: 'Profile', href: '/profile', icon: UserCircleIcon, current: false },
  {
    name: 'Avatar',
    href: '/upload-profile-image',
    icon: PhotoIcon,
    current: true,
  },
  {
    name: 'Availability',
    href: '/suitability-form',
    icon: CalendarDaysIcon,
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
]

const UploadProfileImage = () => {
  const navigate = useNavigate()
  const params = useParams()
  const auth = getAuth()
  const user = auth.currentUser
  const storage = getStorage()

  const [changeDetails, setChangeDetails] = useState(true)
  const [err, setErr] = useState(false)
  const [downloadURL, setDownloadUrl] = useState('')
  const [formData, setFormData] = useState({
    images: {},
  })

  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    setLoading(true)
    e.preventDefault()
    const displayName = e.target[0].value
    const file = e.target[0].files[0]

    try {
      //Create a unique image name
      const date = new Date().getTime()
      const storageRef = ref(storage, `${displayName + date}`)

      await uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            //Update profile
            await updateProfile(user, {
              photoURL: downloadURL,
            })
            const userRef = doc(db, 'users', auth.currentUser.uid)
            await updateDoc(userRef, 
              {photoURL: downloadURL,}
     )
            navigate(`/suitability-form`)
            toast.success('Photos Saved')

            //create empty user chats on firestore
            //await setDoc(doc(db, 'userChats', user.uid), {})
          } catch (err) {
            setErr(true)
            setLoading(false)
          }
        })
      })
    } catch (err) {
      setErr(true)
      setLoading(false)
    }
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

          <form
            className='divide-y divide-gray-200 lg:col-span-9'
            onSubmit={handleSubmit}
          >
            {/* Profile section */}

            <div className='py-6 px-4 sm:p-6 lg:pb-8'>
              <div>
                <h2 className='text-lg font-medium leading-6 text-gray-900'>
                  Let's see a profile pic
                </h2>
                <p className='mt-1 text-sm text-gray-500'>
                  This information will be displayed publicly so be careful what
                  you share.
                </p>
              </div>

              <div className='mt-10 divide-y divide-gray-200'>
                <div className='mt-6'>
                  <dl className='divide-y divide-gray-200'>
                    <div className='py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:border-b sm:border-gray-200 sm:py-5'>
                      <dt className='text-sm font-medium text-gray-500'>
                        Upload images
                      </dt>
                      <dd className='mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
                        <input
                          type='file'
                          name='file'
                          id='file'
                          max='1'
                          accept='.jpg,.png,.jpeg'
                          multiple
                          required
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
                          type='submit'
                          className='inline-flex  rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
                        >
                          Submit
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

export default UploadProfileImage
