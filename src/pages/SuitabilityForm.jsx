import { Fragment, useState, useEffect } from 'react'
import { RadioGroup } from '@headlessui/react'
import { CheckCircleIcon } from '@heroicons/react/20/solid'
import { useNavigate } from 'react-router-dom'
import { getAuth } from 'firebase/auth'
import { getDoc, doc } from 'firebase/firestore'
import { db } from '../firebase.config'
import { Disclosure, Menu, Switch, Transition } from '@headlessui/react'
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid'
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
  // {
  //   name: 'Your Dogs',
  //   href: '/add-dog',
  //   icon: UserPlusIcon,
  //   current: false,
  // },
  {
    name: 'Doggy Pics',
    href: '/upload-images',
    icon: RectangleGroupIcon,
    current: false,
  },
  {
    name: 'Availability',
    href: '/suitability-form',
    icon: CalendarDaysIcon,
    current: true,
  },
]

function SuitabilityForm() {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    firebaseId: null,
    availableMonday: true,
    availableTuesday: true,
    availableWednesday: true,
    availableThursday: true,
    availableFriday: true,
    availableSaturday: true,
    availableSunday: true,
    requireMonday: false,
    requireTuesday: false,
    requireWednesday: false,
    requireThursday: false,
    requireFriday: false,
    requireSaturday: false,
    requireSunday: false,
    hasKids: false,
    hasOtherDogs: false,
    hasCats: false,
    exerciseOffered: false,
    dogLeftAlone: false,
    hasAllergies: false,
    dogSizeOffer: 1,
    longitude: null,
    latitude: null,
    dogs: [],
  })

  //get firebaseID
  const auth = getAuth()
  useEffect(() => {
    const fetchFirebaseId = async () => {
      const docRef = doc(db, 'users', auth.currentUser.uid)
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        setFormData({
          ...formData,
          firebaseId: auth.currentUser.uid,
          longitude: docSnap.data().geolocation.lng,
          latitude: docSnap.data().geolocation.lat,
        })
      }
    }
    fetchFirebaseId()
  }, [])

  //submit the entire formData to Postgres
  const onSubmit = async () => {
    await fetch('https://woofingfromhome.herokuapp.com/customers', {
      method: 'POST',
      cache: 'no-cache',
      cors: 'no-cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .catch((error) => console.log(error))
    navigate('/add-dog')
  }

  const dailyStatuses = [
    { id: 1, title: 'I need help', status: 'available' },
    { id: 2, title: 'I can offer help', status: 'required' },
    { id: 3, title: 'I am good', status: 'neither' },
  ]

  const otherInfoStatuses = [
    { id: 1, title: 'No', status: false },
    { id: 2, title: 'Yes', status: true },
  ]

  const dogSizes = [
    { id: 1, title: 'Small', status: 1 },
    { id: 2, title: 'Medium', status: 2 },
    { id: 3, title: 'Large', status: 3 },
  ]

  const activityLevels = [
    {
      id: 1,
      title: 'Low',
      description: 'e.g. a couple of 15 min walks',
      status: 1,
    },
    {
      id: 2,
      title: 'Medium',
      description: 'e.g. a couple of 30 min walks',
      status: 2,
    },
    {
      id: 3,
      title: 'High',
      description: 'e.g. one or more walks of more than 1 hour',
      status: 3,
    },
  ]

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

  const [selectedDailyStatusMonday, setSelectedDailyStatusMonday] = useState(
    dailyStatuses[0].status
  )
  const [selectedDailyStatusTuesday, setSelectedDailyStatusTuesday] = useState(
    dailyStatuses[0].status
  )
  const [selectedDailyStatusWednesday, setSelectedDailyStatusWednesday] =
    useState(dailyStatuses[0].status)
  const [selectedDailyStatusThursday, setSelectedDailyStatusThursday] =
    useState(dailyStatuses[0].status)
  const [selectedDailyStatusFriday, setSelectedDailyStatusFriday] = useState(
    dailyStatuses[0].status
  )
  const [selectedDailyStatusSaturday, setSelectedDailyStatusSaturday] =
    useState(dailyStatuses[0].status)
  const [selectedDailyStatusSunday, setSelectedDailyStatusSunday] = useState(
    dailyStatuses[0].status
  )
  const [selectedCatStatus, setSelectedCatStatus] = useState(
    otherInfoStatuses[0].status
  )
  const [selectedKidsStatus, setSelectedKidsStatus] = useState(
    otherInfoStatuses[0].status
  )
  const [selectedLeftAloneStatus, setSelectedLeftAloneStatus] = useState(
    otherInfoStatuses[0].status
  )
  const [selectedAllergiesStatus, setSelectedAllergiesStatus] = useState(
    otherInfoStatuses[0].status
  )
  const [selectedDogSize, setSelectedDogSize] = useState(dogSizes[0].status)
  const [selectedActivityLevel, setSelectedActivityLevel] = useState(
    activityLevels[0].status
  )

  const setDailyStatusInFormMonday = (selectedDailyStatusMonday) => {
    setSelectedDailyStatusMonday(selectedDailyStatusMonday)

    if (selectedDailyStatusMonday == 'available') {
      setFormData({ ...formData, availableMonday: true, requireMonday: false })
    } else if (selectedDailyStatusMonday == 'required') {
      setFormData({ ...formData, availableMonday: false, requireMonday: true })
    } else
      setFormData({ ...formData, availableMonday: false, requireMonday: false })
  }

  const setDailyStatusInFormTuesday = (selectedDailyStatusTuesday) => {
    setSelectedDailyStatusTuesday(selectedDailyStatusTuesday)

    if (selectedDailyStatusTuesday == 'available') {
      setFormData({
        ...formData,
        availableTuesday: true,
        requireTuesday: false,
      })
    } else if (selectedDailyStatusTuesday == 'required') {
      setFormData({
        ...formData,
        availableTuesday: false,
        requireTuesday: true,
      })
    } else
      setFormData({
        ...formData,
        availableTuesday: false,
        requireTuesday: false,
      })
  }

  const setDailyStatusInFormWednesday = (selectedDailyStatusWednesday) => {
    setSelectedDailyStatusWednesday(selectedDailyStatusWednesday)

    if (selectedDailyStatusWednesday == 'available') {
      setFormData({
        ...formData,
        availableWednesday: true,
        requireWednesday: false,
      })
    } else if (selectedDailyStatusWednesday == 'required') {
      setFormData({
        ...formData,
        availableWednesday: false,
        requireWednesday: true,
      })
    } else
      setFormData({
        ...formData,
        availableWednesday: false,
        requireWednesday: false,
      })
  }

  const setDailyStatusInFormThursday = (selectedDailyStatusThursday) => {
    setSelectedDailyStatusThursday(selectedDailyStatusThursday)

    if (selectedDailyStatusThursday == 'available') {
      setFormData({
        ...formData,
        availableThursday: true,
        requireThursday: false,
      })
    } else if (selectedDailyStatusThursday == 'required') {
      setFormData({
        ...formData,
        availableThursday: false,
        requireThursday: true,
      })
    } else
      setFormData({
        ...formData,
        availableThursday: false,
        requireThursday: false,
      })
  }

  const setDailyStatusInFormFriday = (selectedDailyStatusFriday) => {
    setSelectedDailyStatusFriday(selectedDailyStatusFriday)

    if (selectedDailyStatusFriday == 'available') {
      setFormData({ ...formData, availableFriday: true, requireFriday: false })
    } else if (selectedDailyStatusFriday == 'required') {
      setFormData({ ...formData, availableFriday: false, requireFriday: true })
    } else
      setFormData({ ...formData, availableFriday: false, requireFriday: false })
  }

  const setDailyStatusInFormSaturday = (selectedDailyStatusSaturday) => {
    setSelectedDailyStatusSaturday(selectedDailyStatusSaturday)

    if (selectedDailyStatusSaturday == 'available') {
      setFormData({
        ...formData,
        availableSaturday: true,
        requireSaturday: false,
      })
    } else if (selectedDailyStatusSaturday == 'required') {
      setFormData({
        ...formData,
        availableSaturday: false,
        requireSaturday: true,
      })
    } else
      setFormData({
        ...formData,
        availableSaturday: false,
        requireSaturday: false,
      })
  }

  const setDailyStatusInFormSunday = (selectedDailyStatusSunday) => {
    setSelectedDailyStatusSunday(selectedDailyStatusSunday)

    if (selectedDailyStatusSunday == 'available') {
      setFormData({ ...formData, availableSunday: true, requireSunday: false })
    } else if (selectedDailyStatusSunday == 'required') {
      setFormData({ ...formData, availableSunday: false, requireSunday: true })
    } else
      setFormData({ ...formData, availableSunday: false, requireSunday: false })
  }

  const setCatStatus = (selectedCatStatus) => {
    setSelectedCatStatus(selectedCatStatus)
    if (selectedCatStatus) {
      setFormData({ ...formData, hasCats: true })
    } else setFormData({ ...formData, hasCats: false })
  }

  const setKidsStatus = (selectedKidsStatus) => {
    setSelectedKidsStatus(selectedKidsStatus)
    if (selectedKidsStatus) {
      setFormData({ ...formData, hasKids: true })
    } else setFormData({ ...formData, hasKids: false })
  }

  const setLeftAloneStatus = (selectedLeftAloneStatus) => {
    setSelectedLeftAloneStatus(selectedLeftAloneStatus)
    if (selectedLeftAloneStatus) {
      setFormData({ ...formData, dogLeftAlone: true })
    } else setFormData({ ...formData, dogLeftAlone: false })
  }

  const setAllergiesStatus = (selectedAllergiesStatus) => {
    setSelectedAllergiesStatus(selectedAllergiesStatus)
    if (selectedAllergiesStatus) {
      setFormData({ ...formData, hasAllergies: true })
    } else setFormData({ ...formData, hasAllergies: false })
  }

  const setDogSize = (selectedDogSize) => {
    setSelectedDogSize(selectedDogSize)
    if (selectedDogSize == 1) {
      setFormData({ ...formData, dogSizeOffer: 1 })
    } else if (selectedDogSize == 2) {
      setFormData({ ...formData, dogSizeOffer: 2 })
    } else setFormData({ ...formData, dogSizeOffer: 3 })
  }

  const setActivityLevel = (selectedActivityLevel) => {
    setSelectedActivityLevel(selectedActivityLevel)
    if (selectedActivityLevel == 1) {
      setFormData({ ...formData, exerciseOffered: 1 })
    } else if (selectedActivityLevel == 2) {
      setFormData({ ...formData, exerciseOffered: 2 })
    } else setFormData({ ...formData, exerciseOffered: 3 })
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
            <div className='py-6 px-4 sm:p-6 lg:pb-8'>
              <div>
                <h2 className='text-lg font-medium leading-6 text-gray-900'>
                  Tell us your availability and dog care needs!
                </h2>
                <p className='mt-1 text-sm text-gray-500'>
                  This will be used to find you suitable matches
                </p>
              </div>

              <div className='mt-10 divide-y divide-gray-200'>
                <div className='mt-6'>
                  <RadioGroup
                    value={selectedDailyStatusMonday}
                    onChange={setDailyStatusInFormMonday}
                  >
                    <RadioGroup.Label className='text-base font-medium text-gray-900'>
                      Monday
                    </RadioGroup.Label>
                    <div className='mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-3 sm:gap-x-4'>
                      {dailyStatuses.map((dailyStatus) => (
                        <RadioGroup.Option
                          key={dailyStatus.id}
                          value={dailyStatus.status}
                          className={({ checked, active }) =>
                            classNames(
                              checked
                                ? 'border-transparent'
                                : 'border-gray-300',
                              active
                                ? 'border-indigo-500 ring-2 ring-indigo-500'
                                : '',
                              'relative flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm focus:outline-none'
                            )
                          }
                        >
                          {({ checked, active }) => (
                            <>
                              <span className='flex flex-1'>
                                <span className='flex flex-col'>
                                  <RadioGroup.Label
                                    as='span'
                                    className='block text-sm font-medium text-gray-900'
                                  >
                                    {dailyStatus.title}
                                  </RadioGroup.Label>
                                </span>
                              </span>
                              <CheckCircleIcon
                                className={classNames(
                                  !checked ? 'invisible' : '',
                                  'h-5 w-5 text-indigo-600'
                                )}
                                aria-hidden='true'
                              />
                              <span
                                className={classNames(
                                  active ? 'border' : 'border-2',
                                  checked
                                    ? 'border-indigo-500'
                                    : 'border-transparent',
                                  'pointer-events-none absolute -inset-px rounded-lg'
                                )}
                                aria-hidden='true'
                              />
                            </>
                          )}
                        </RadioGroup.Option>
                      ))}
                    </div>
                  </RadioGroup>

                  <RadioGroup
                    value={selectedDailyStatusTuesday}
                    onChange={setDailyStatusInFormTuesday}
                  >
                    <RadioGroup.Label className='text-base font-medium text-gray-900'>
                      Tuesday
                    </RadioGroup.Label>
                    <div className='mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-3 sm:gap-x-4'>
                      {dailyStatuses.map((dailyStatus) => (
                        <RadioGroup.Option
                          key={dailyStatus.id}
                          value={dailyStatus.status}
                          className={({ checked, active }) =>
                            classNames(
                              checked
                                ? 'border-transparent'
                                : 'border-gray-300',
                              active
                                ? 'border-indigo-500 ring-2 ring-indigo-500'
                                : '',
                              'relative flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm focus:outline-none'
                            )
                          }
                        >
                          {({ checked, active }) => (
                            <>
                              <span className='flex flex-1'>
                                <span className='flex flex-col'>
                                  <RadioGroup.Label
                                    as='span'
                                    className='block text-sm font-medium text-gray-900'
                                  >
                                    {dailyStatus.title}
                                  </RadioGroup.Label>
                                </span>
                              </span>
                              <CheckCircleIcon
                                className={classNames(
                                  !checked ? 'invisible' : '',
                                  'h-5 w-5 text-indigo-600'
                                )}
                                aria-hidden='true'
                              />
                              <span
                                className={classNames(
                                  active ? 'border' : 'border-2',
                                  checked
                                    ? 'border-indigo-500'
                                    : 'border-transparent',
                                  'pointer-events-none absolute -inset-px rounded-lg'
                                )}
                                aria-hidden='true'
                              />
                            </>
                          )}
                        </RadioGroup.Option>
                      ))}
                    </div>
                  </RadioGroup>

                  <RadioGroup
                    value={selectedDailyStatusWednesday}
                    onChange={setDailyStatusInFormWednesday}
                  >
                    <RadioGroup.Label className='text-base font-medium text-gray-900'>
                      Wednesday
                    </RadioGroup.Label>
                    <div className='mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-3 sm:gap-x-4'>
                      {dailyStatuses.map((dailyStatus) => (
                        <RadioGroup.Option
                          key={dailyStatus.id}
                          value={dailyStatus.status}
                          className={({ checked, active }) =>
                            classNames(
                              checked
                                ? 'border-transparent'
                                : 'border-gray-300',
                              active
                                ? 'border-indigo-500 ring-2 ring-indigo-500'
                                : '',
                              'relative flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm focus:outline-none'
                            )
                          }
                        >
                          {({ checked, active }) => (
                            <>
                              <span className='flex flex-1'>
                                <span className='flex flex-col'>
                                  <RadioGroup.Label
                                    as='span'
                                    className='block text-sm font-medium text-gray-900'
                                  >
                                    {dailyStatus.title}
                                  </RadioGroup.Label>
                                </span>
                              </span>
                              <CheckCircleIcon
                                className={classNames(
                                  !checked ? 'invisible' : '',
                                  'h-5 w-5 text-indigo-600'
                                )}
                                aria-hidden='true'
                              />
                              <span
                                className={classNames(
                                  active ? 'border' : 'border-2',
                                  checked
                                    ? 'border-indigo-500'
                                    : 'border-transparent',
                                  'pointer-events-none absolute -inset-px rounded-lg'
                                )}
                                aria-hidden='true'
                              />
                            </>
                          )}
                        </RadioGroup.Option>
                      ))}
                    </div>
                  </RadioGroup>

                  <RadioGroup
                    value={selectedDailyStatusThursday}
                    onChange={setDailyStatusInFormThursday}
                  >
                    <RadioGroup.Label className='text-base font-medium text-gray-900'>
                      Thursday
                    </RadioGroup.Label>
                    <div className='mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-3 sm:gap-x-4'>
                      {dailyStatuses.map((dailyStatus) => (
                        <RadioGroup.Option
                          key={dailyStatus.id}
                          value={dailyStatus.status}
                          className={({ checked, active }) =>
                            classNames(
                              checked
                                ? 'border-transparent'
                                : 'border-gray-300',
                              active
                                ? 'border-indigo-500 ring-2 ring-indigo-500'
                                : '',
                              'relative flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm focus:outline-none'
                            )
                          }
                        >
                          {({ checked, active }) => (
                            <>
                              <span className='flex flex-1'>
                                <span className='flex flex-col'>
                                  <RadioGroup.Label
                                    as='span'
                                    className='block text-sm font-medium text-gray-900'
                                  >
                                    {dailyStatus.title}
                                  </RadioGroup.Label>
                                </span>
                              </span>
                              <CheckCircleIcon
                                className={classNames(
                                  !checked ? 'invisible' : '',
                                  'h-5 w-5 text-indigo-600'
                                )}
                                aria-hidden='true'
                              />
                              <span
                                className={classNames(
                                  active ? 'border' : 'border-2',
                                  checked
                                    ? 'border-indigo-500'
                                    : 'border-transparent',
                                  'pointer-events-none absolute -inset-px rounded-lg'
                                )}
                                aria-hidden='true'
                              />
                            </>
                          )}
                        </RadioGroup.Option>
                      ))}
                    </div>
                  </RadioGroup>

                  <RadioGroup
                    value={selectedDailyStatusFriday}
                    onChange={setDailyStatusInFormFriday}
                  >
                    <RadioGroup.Label className='text-base font-medium text-gray-900'>
                      Friday
                    </RadioGroup.Label>
                    <div className='mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-3 sm:gap-x-4'>
                      {dailyStatuses.map((dailyStatus) => (
                        <RadioGroup.Option
                          key={dailyStatus.id}
                          value={dailyStatus.status}
                          className={({ checked, active }) =>
                            classNames(
                              checked
                                ? 'border-transparent'
                                : 'border-gray-300',
                              active
                                ? 'border-indigo-500 ring-2 ring-indigo-500'
                                : '',
                              'relative flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm focus:outline-none'
                            )
                          }
                        >
                          {({ checked, active }) => (
                            <>
                              <span className='flex flex-1'>
                                <span className='flex flex-col'>
                                  <RadioGroup.Label
                                    as='span'
                                    className='block text-sm font-medium text-gray-900'
                                  >
                                    {dailyStatus.title}
                                  </RadioGroup.Label>
                                </span>
                              </span>
                              <CheckCircleIcon
                                className={classNames(
                                  !checked ? 'invisible' : '',
                                  'h-5 w-5 text-indigo-600'
                                )}
                                aria-hidden='true'
                              />
                              <span
                                className={classNames(
                                  active ? 'border' : 'border-2',
                                  checked
                                    ? 'border-indigo-500'
                                    : 'border-transparent',
                                  'pointer-events-none absolute -inset-px rounded-lg'
                                )}
                                aria-hidden='true'
                              />
                            </>
                          )}
                        </RadioGroup.Option>
                      ))}
                    </div>
                  </RadioGroup>

                  <RadioGroup
                    value={selectedDailyStatusSaturday}
                    onChange={setDailyStatusInFormSaturday}
                  >
                    <RadioGroup.Label className='text-base font-medium text-gray-900'>
                      Saturday
                    </RadioGroup.Label>
                    <div className='mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-3 sm:gap-x-4'>
                      {dailyStatuses.map((dailyStatus) => (
                        <RadioGroup.Option
                          key={dailyStatus.id}
                          value={dailyStatus.status}
                          className={({ checked, active }) =>
                            classNames(
                              checked
                                ? 'border-transparent'
                                : 'border-gray-300',
                              active
                                ? 'border-indigo-500 ring-2 ring-indigo-500'
                                : '',
                              'relative flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm focus:outline-none'
                            )
                          }
                        >
                          {({ checked, active }) => (
                            <>
                              <span className='flex flex-1'>
                                <span className='flex flex-col'>
                                  <RadioGroup.Label
                                    as='span'
                                    className='block text-sm font-medium text-gray-900'
                                  >
                                    {dailyStatus.title}
                                  </RadioGroup.Label>
                                </span>
                              </span>
                              <CheckCircleIcon
                                className={classNames(
                                  !checked ? 'invisible' : '',
                                  'h-5 w-5 text-indigo-600'
                                )}
                                aria-hidden='true'
                              />
                              <span
                                className={classNames(
                                  active ? 'border' : 'border-2',
                                  checked
                                    ? 'border-indigo-500'
                                    : 'border-transparent',
                                  'pointer-events-none absolute -inset-px rounded-lg'
                                )}
                                aria-hidden='true'
                              />
                            </>
                          )}
                        </RadioGroup.Option>
                      ))}
                    </div>
                  </RadioGroup>

                  <RadioGroup
                    value={selectedDailyStatusSunday}
                    onChange={setDailyStatusInFormSunday}
                  >
                    <RadioGroup.Label className='text-base font-medium text-gray-900'>
                      Sunday
                    </RadioGroup.Label>
                    <div className='mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-3 sm:gap-x-4'>
                      {dailyStatuses.map((dailyStatus) => (
                        <RadioGroup.Option
                          key={dailyStatus.id}
                          value={dailyStatus.status}
                          className={({ checked, active }) =>
                            classNames(
                              checked
                                ? 'border-transparent'
                                : 'border-gray-300',
                              active
                                ? 'border-indigo-500 ring-2 ring-indigo-500'
                                : '',
                              'relative flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm focus:outline-none'
                            )
                          }
                        >
                          {({ checked, active }) => (
                            <>
                              <span className='flex flex-1'>
                                <span className='flex flex-col'>
                                  <RadioGroup.Label
                                    as='span'
                                    className='block text-sm font-medium text-gray-900'
                                  >
                                    {dailyStatus.title}
                                  </RadioGroup.Label>
                                </span>
                              </span>
                              <CheckCircleIcon
                                className={classNames(
                                  !checked ? 'invisible' : '',
                                  'h-5 w-5 text-indigo-600'
                                )}
                                aria-hidden='true'
                              />
                              <span
                                className={classNames(
                                  active ? 'border' : 'border-2',
                                  checked
                                    ? 'border-indigo-500'
                                    : 'border-transparent',
                                  'pointer-events-none absolute -inset-px rounded-lg'
                                )}
                                aria-hidden='true'
                              />
                            </>
                          )}
                        </RadioGroup.Option>
                      ))}
                    </div>
                  </RadioGroup>

                  <RadioGroup value={selectedCatStatus} onChange={setCatStatus}>
                    <RadioGroup.Label className='text-base font-medium text-gray-900'>
                      Do you have cats?
                    </RadioGroup.Label>
                    <div className='mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-3 sm:gap-x-4'>
                      {otherInfoStatuses.map((otherInfoStatuses) => (
                        <RadioGroup.Option
                          key={otherInfoStatuses.id}
                          value={otherInfoStatuses.status}
                          className={({ checked, active }) =>
                            classNames(
                              checked
                                ? 'border-transparent'
                                : 'border-gray-300',
                              active
                                ? 'border-indigo-500 ring-2 ring-indigo-500'
                                : '',
                              'relative flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm focus:outline-none'
                            )
                          }
                        >
                          {({ checked, active }) => (
                            <>
                              <span className='flex flex-1'>
                                <span className='flex flex-col'>
                                  <RadioGroup.Label
                                    as='span'
                                    className='block text-sm font-medium text-gray-900'
                                  >
                                    {otherInfoStatuses.title}
                                  </RadioGroup.Label>
                                </span>
                              </span>
                              <CheckCircleIcon
                                className={classNames(
                                  !checked ? 'invisible' : '',
                                  'h-5 w-5 text-indigo-600'
                                )}
                                aria-hidden='true'
                              />
                              <span
                                className={classNames(
                                  active ? 'border' : 'border-2',
                                  checked
                                    ? 'border-indigo-500'
                                    : 'border-transparent',
                                  'pointer-events-none absolute -inset-px rounded-lg'
                                )}
                                aria-hidden='true'
                              />
                            </>
                          )}
                        </RadioGroup.Option>
                      ))}
                    </div>
                  </RadioGroup>

                  <RadioGroup
                    value={selectedKidsStatus}
                    onChange={setKidsStatus}
                  >
                    <RadioGroup.Label className='text-base font-medium text-gray-900 my-2'>
                      Do you have children?
                    </RadioGroup.Label>
                    <div className='mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-3 sm:gap-x-4'>
                      {otherInfoStatuses.map((otherInfoStatuses) => (
                        <RadioGroup.Option
                          key={otherInfoStatuses.id}
                          value={otherInfoStatuses.status}
                          className={({ checked, active }) =>
                            classNames(
                              checked
                                ? 'border-transparent'
                                : 'border-gray-300',
                              active
                                ? 'border-indigo-500 ring-2 ring-indigo-500'
                                : '',
                              'relative flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm focus:outline-none'
                            )
                          }
                        >
                          {({ checked, active }) => (
                            <>
                              <span className='flex flex-1'>
                                <span className='flex flex-col'>
                                  <RadioGroup.Label
                                    as='span'
                                    className='block text-sm font-medium text-gray-900'
                                  >
                                    {otherInfoStatuses.title}
                                  </RadioGroup.Label>
                                </span>
                              </span>
                              <CheckCircleIcon
                                className={classNames(
                                  !checked ? 'invisible' : '',
                                  'h-5 w-5 text-indigo-600'
                                )}
                                aria-hidden='true'
                              />
                              <span
                                className={classNames(
                                  active ? 'border' : 'border-2',
                                  checked
                                    ? 'border-indigo-500'
                                    : 'border-transparent',
                                  'pointer-events-none absolute -inset-px rounded-lg'
                                )}
                                aria-hidden='true'
                              />
                            </>
                          )}
                        </RadioGroup.Option>
                      ))}
                    </div>
                  </RadioGroup>

                  <RadioGroup
                    value={selectedLeftAloneStatus}
                    onChange={setLeftAloneStatus}
                  >
                    <RadioGroup.Label className='text-base font-medium text-gray-900 my-2'>
                      Would you need to leave a dog you are sitting alone during
                      your working day?
                    </RadioGroup.Label>
                    <div className='mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-3 sm:gap-x-4'>
                      {otherInfoStatuses.map((otherInfoStatuses) => (
                        <RadioGroup.Option
                          key={otherInfoStatuses.id}
                          value={otherInfoStatuses.status}
                          className={({ checked, active }) =>
                            classNames(
                              checked
                                ? 'border-transparent'
                                : 'border-gray-300',
                              active
                                ? 'border-indigo-500 ring-2 ring-indigo-500'
                                : '',
                              'relative flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm focus:outline-none'
                            )
                          }
                        >
                          {({ checked, active }) => (
                            <>
                              <span className='flex flex-1'>
                                <span className='flex flex-col'>
                                  <RadioGroup.Label
                                    as='span'
                                    className='block text-sm font-medium text-gray-900'
                                  >
                                    {otherInfoStatuses.title}
                                  </RadioGroup.Label>
                                </span>
                              </span>
                              <CheckCircleIcon
                                className={classNames(
                                  !checked ? 'invisible' : '',
                                  'h-5 w-5 text-indigo-600'
                                )}
                                aria-hidden='true'
                              />
                              <span
                                className={classNames(
                                  active ? 'border' : 'border-2',
                                  checked
                                    ? 'border-indigo-500'
                                    : 'border-transparent',
                                  'pointer-events-none absolute -inset-px rounded-lg'
                                )}
                                aria-hidden='true'
                              />
                            </>
                          )}
                        </RadioGroup.Option>
                      ))}
                    </div>
                  </RadioGroup>

                  <RadioGroup
                    value={selectedAllergiesStatus}
                    onChange={setAllergiesStatus}
                  >
                    <RadioGroup.Label className='text-base font-medium text-gray-900 my-2'>
                      Would you only like to look after dogs that are
                      hypoallergenic?
                    </RadioGroup.Label>
                    <div className='mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-3 sm:gap-x-4'>
                      {otherInfoStatuses.map((otherInfoStatuses) => (
                        <RadioGroup.Option
                          key={otherInfoStatuses.id}
                          value={otherInfoStatuses.status}
                          className={({ checked, active }) =>
                            classNames(
                              checked
                                ? 'border-transparent'
                                : 'border-gray-300',
                              active
                                ? 'border-indigo-500 ring-2 ring-indigo-500'
                                : '',
                              'relative flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm focus:outline-none'
                            )
                          }
                        >
                          {({ checked, active }) => (
                            <>
                              <span className='flex flex-1'>
                                <span className='flex flex-col'>
                                  <RadioGroup.Label
                                    as='span'
                                    className='block text-sm font-medium text-gray-900'
                                  >
                                    {otherInfoStatuses.title}
                                  </RadioGroup.Label>
                                </span>
                              </span>
                              <CheckCircleIcon
                                className={classNames(
                                  !checked ? 'invisible' : '',
                                  'h-5 w-5 text-indigo-600'
                                )}
                                aria-hidden='true'
                              />
                              <span
                                className={classNames(
                                  active ? 'border' : 'border-2',
                                  checked
                                    ? 'border-indigo-500'
                                    : 'border-transparent',
                                  'pointer-events-none absolute -inset-px rounded-lg'
                                )}
                                aria-hidden='true'
                              />
                            </>
                          )}
                        </RadioGroup.Option>
                      ))}
                    </div>
                  </RadioGroup>

                  <RadioGroup value={selectedDogSize} onChange={setDogSize}>
                    <RadioGroup.Label className='text-base font-medium text-gray-900 my-2'>
                      What is the maximum dog size you are able or willing to
                      look after?
                    </RadioGroup.Label>
                    <div className='mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-3 sm:gap-x-4'>
                      {dogSizes.map((dogSize) => (
                        <RadioGroup.Option
                          key={dogSize.id}
                          value={dogSize.status}
                          className={({ checked, active }) =>
                            classNames(
                              checked
                                ? 'border-transparent'
                                : 'border-gray-300',
                              active
                                ? 'border-indigo-500 ring-2 ring-indigo-500'
                                : '',
                              'relative flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm focus:outline-none'
                            )
                          }
                        >
                          {({ checked, active }) => (
                            <>
                              <span className='flex flex-1'>
                                <span className='flex flex-col'>
                                  <RadioGroup.Label
                                    as='span'
                                    className='block text-sm font-medium text-gray-900'
                                  >
                                    {dogSize.title}
                                  </RadioGroup.Label>
                                </span>
                              </span>
                              <CheckCircleIcon
                                className={classNames(
                                  !checked ? 'invisible' : '',
                                  'h-5 w-5 text-indigo-600'
                                )}
                                aria-hidden='true'
                              />
                              <span
                                className={classNames(
                                  active ? 'border' : 'border-2',
                                  checked
                                    ? 'border-indigo-500'
                                    : 'border-transparent',
                                  'pointer-events-none absolute -inset-px rounded-lg'
                                )}
                                aria-hidden='true'
                              />
                            </>
                          )}
                        </RadioGroup.Option>
                      ))}
                    </div>
                  </RadioGroup>

                  <RadioGroup
                    value={selectedActivityLevel}
                    onChange={setActivityLevel}
                  >
                    <RadioGroup.Label className='text-base font-medium text-gray-900 my-2'>
                      What level of activity could you offer a dog you are
                      sitting?
                    </RadioGroup.Label>
                    <div className='mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-3 sm:gap-x-4'>
                      {activityLevels.map((activityLevel) => (
                        <RadioGroup.Option
                          key={activityLevel.id}
                          value={activityLevel.status}
                          className={({ checked, active }) =>
                            classNames(
                              checked
                                ? 'border-transparent'
                                : 'border-gray-300',
                              active
                                ? 'border-indigo-500 ring-2 ring-indigo-500'
                                : '',
                              'relative flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm focus:outline-none'
                            )
                          }
                        >
                          {({ checked, active }) => (
                            <>
                              <span className='flex flex-1'>
                                <span className='flex flex-col'>
                                  <RadioGroup.Label
                                    as='span'
                                    className='block text-sm font-medium text-gray-900'
                                  >
                                    {activityLevel.title} <br />
                                    <br />
                                    {activityLevel.description}
                                  </RadioGroup.Label>
                                </span>
                              </span>
                              <CheckCircleIcon
                                className={classNames(
                                  !checked ? 'invisible' : '',
                                  'h-5 w-5 text-indigo-600'
                                )}
                                aria-hidden='true'
                              />
                              <span
                                className={classNames(
                                  active ? 'border' : 'border-2',
                                  checked
                                    ? 'border-indigo-500'
                                    : 'border-transparent',
                                  'pointer-events-none absolute -inset-px rounded-lg'
                                )}
                                aria-hidden='true'
                              />
                            </>
                          )}
                        </RadioGroup.Option>
                      ))}
                    </div>
                  </RadioGroup>
                </div>
              </div>
            </div>
            <div className='py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 float-right'>
              <button
                type='button'
                className='inline-flex  rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
                onClick={onSubmit}
              >
                Next
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default SuitabilityForm
