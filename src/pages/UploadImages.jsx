import { Fragment, useState, useEffect } from 'react'
import { getAuth, updateEmail, updateProfile } from 'firebase/auth'
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage'
import { db } from '../firebase.config'
import { useNavigate, useParams } from 'react-router-dom'
import { getDoc, updateDoc, doc } from 'firebase/firestore'
import { toast } from 'react-toastify'
import Spinner from '../components/Spinner'
import { v4 as uuidv4 } from 'uuid'
import {
  UserCircleIcon,
  PhotoIcon,
  RectangleGroupIcon,
  CalendarDaysIcon,
  UserPlusIcon,
} from '@heroicons/react/24/outline'

const subNavigation = [
  { name: 'Profile', href: '/profile', icon: UserCircleIcon, current: false },
  {
    name: 'Avatar',
    href: '/upload-profile-image',
    icon: PhotoIcon,
    current: false,
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
    current: true,
  },
]

const UploadImages = () => {
  const navigate = useNavigate()
  const params = useParams()
  const auth = getAuth()
  const [changeDetails, setChangeDetails] = useState(true)

  const [formData, setFormData] = useState({
    images: {},
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

  const { images } = formData

  const onSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    if (images.length > 6) {
      setLoading(false)
      toast.error('Max 6 images')
      return
    }

    // store image in firebase
    const storeImage = async (image) => {
      return new Promise((resolve, reject) => {
        const storage = getStorage()
        const fileName = `${auth.currentUser.uid}-${image.name}-${uuidv4()}`

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
    console.log(images)

    const imgUrls = await Promise.all(
      [...images].map((image) => storeImage(image))
    ).catch(() => {
      setLoading(false)
      toast.error('Images not uploaded')
      return
    })

    const formDataCopy = {
      ...formData,
      imgUrls,
    }

    delete formDataCopy.images

    const userRef = doc(db, 'users', auth.currentUser.uid)

    await updateDoc(userRef, formDataCopy)

    setLoading(false)
    toast.success('Photos Saved')
    navigate(`/matches`)
  }

  const onChange = (e) => {
    // Files
    if (e.target.files) {
      setFormData((prevState) => ({
        ...prevState,
        images: e.target.files,
      }))
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
            onSubmit={onSubmit}
          >
            {/* Profile section */}

            <div className='py-6 px-4 sm:p-6 lg:pb-8'>
              <div>
                <h2 className='text-lg font-medium leading-6 text-gray-900'>
                  Let's see some amazing pics of your dogs
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
                          name='images'
                          id='images'
                          max='6'
                          accept='.jpg,.png,.jpeg'
                          multiple
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
                          type='submit'
                          className='inline-flex  rounded-md border border-transparent bg-cyan-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2'
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

export default UploadImages
