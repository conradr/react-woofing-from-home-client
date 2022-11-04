import {Fragment, useState, useEffect} from 'react'
import { RadioGroup } from '@headlessui/react'
import { CheckCircleIcon } from '@heroicons/react/20/solid'
import { useNavigate } from 'react-router-dom'
import { getAuth} from 'firebase/auth'
import { getDoc,doc } from 'firebase/firestore'
import { db } from '../firebase.config'
import { Disclosure, Menu, Switch, Transition } from '@headlessui/react'
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import {
  Bars3Icon,
  BellIcon,
  CogIcon,
  CreditCardIcon,
  KeyIcon,
  SquaresPlusIcon,
  UserCircleIcon,
  XMarkIcon,
  CalendarDaysIcon
} from '@heroicons/react/24/outline'
const navigation = [
  { name: 'Dashboard', href: '#', current: true },
  { name: 'Jobs', href: '#', current: false },
  { name: 'Applicants', href: '#', current: false },
  { name: 'Company', href: '#', current: false },
]
const subNavigation = [
  { name: 'Profile', href: '#', icon: UserCircleIcon, current: false },
  { name: 'Profile pic', href: '#', icon: CogIcon, current: false },
  { name: 'Upload doggy pics', href: '#', icon: CogIcon, current: false },
  { name: 'Your needs & availability', href: '#', icon: CalendarDaysIcon, current: true },
]
const userNavigation = [
  { name: 'Your Profile', href: '#' },
  { name: 'Settings', href: '#' },
  { name: 'Sign out', href: '#' },
]
const user = {
  name: 'Debbie Lewis',
  handle: 'deblewis',
  email: 'debbielewis@example.com',
  imageUrl:
    'https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=320&h=320&q=80',
}

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
        hasKids: null,
        hasOtherDogs: null,
        hasCats: null,
        exerciseOffered: null,
        dogLeftAlone: null,
        hasAllergies: null,
        dogSizeOffer: null,
        longitude: null,
        latitude: null,
        dogs: []
    })

        //get firebaseID
        const auth = getAuth()
        useEffect(() => {
            const fetchFirebaseId = async () => {
              const docRef = doc(db, 'users', auth.currentUser.uid)
              const docSnap = await getDoc(docRef)
              if (docSnap.exists()) {
                setFormData({...formData, firebaseId: auth.currentUser.uid, longitude: docSnap.data().geolocation.lng, latitude: docSnap.data().geolocation.lat})
              }
            }
            fetchFirebaseId()
          }, [])

    //submit the entire formData to Postgres
    const onSubmit = () => {
        fetch('https://woofingfromhome.herokuapp.com/customers', {
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
        navigate('/other-criteria')
    }
 
const dailyStatuses = [
    { id: 1, title: 'I need help', status: 'available'},
    { id: 2, title: 'I can offer help', status: 'required'},
    { id: 3, title: 'I am good', status: 'neither' },
]

const otherInfoStatuses = [
    { id: 1, title: 'No'},
    { id: 2, title: 'Yes'}
]

const dogSizes = [
    { id: 1, title: 'Small', value : 1},
    { id: 2, title: 'Medium', value : 2},
    { id: 3, title: 'Large', value : 3}
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

    const [selectedDailyStatusMonday, setSelectedDailyStatusMonday] = useState(dailyStatuses[0].status)
    const [selectedDailyStatusTuesday, setSelectedDailyStatusTuesday] = useState(dailyStatuses[0].status)
    const [selectedDailyStatusWednesday, setSelectedDailyStatusWednesday] = useState(dailyStatuses[0].status)
    const [selectedDailyStatusThursday, setSelectedDailyStatusThursday] = useState(dailyStatuses[0].status)
    const [selectedDailyStatusFriday, setSelectedDailyStatusFriday] = useState(dailyStatuses[0].status)
    const [selectedDailyStatusSaturday, setSelectedDailyStatusSaturday] = useState(dailyStatuses[0].status)
    const [selectedDailyStatusSunday, setSelectedDailyStatusSunday] = useState(dailyStatuses[0].status)
    const [selectedCatStatus, setSelectedCatStatus] = useState(otherInfoStatuses[0].title)
    const [selectedKidsStatus, setSelectedKidsStatus] = useState(otherInfoStatuses[0].title)
    const [selectedLeftAloneStatus, setSelectedLeftAloneStatus] = useState(otherInfoStatuses[0].title)
    const [selectedAllergiesStatus, setSelectedAllergiesStatus] = useState(otherInfoStatuses[0].title)
    const [selectedDogSize, setSelectedDogSize] = useState(dogSizes[0].value)

    const setDailyStatusInFormMonday = (selectedDailyStatusMonday) => {

        setSelectedDailyStatusMonday(selectedDailyStatusMonday)

        if(selectedDailyStatusMonday == 'available'){
            setFormData({...formData, 
                availableMonday : true, 
                requireMonday : false})
        }
        else if (selectedDailyStatusMonday == 'required'){
            setFormData({...formData, availableMonday : false,
            requireMonday : true}
            )}
        else
            setFormData({...formData, availableMonday : false,
                requireMonday : false}
            )
        
  }

  const setDailyStatusInFormTuesday = (selectedDailyStatusTuesday) => {

    setSelectedDailyStatusTuesday(selectedDailyStatusTuesday)

    if(selectedDailyStatusTuesday== 'available'){
        setFormData({...formData, 
            availableTuesday : true, 
            requireTuesday : false})
    }
    else if (selectedDailyStatusTuesday == 'required'){
        setFormData({...formData, availableTuesday : false,
        requireTuesday : true}
        )}
    else
        setFormData({...formData, availableTuesday : false,
            requireTuesday : false}
        )
    
}

const setDailyStatusInFormWednesday = (selectedDailyStatusWednesday) => {

    setSelectedDailyStatusWednesday(selectedDailyStatusWednesday)

    if(selectedDailyStatusWednesday== 'available'){
        setFormData({...formData, 
            availableWednesday : true, 
            requireWednesday : false})
    }
    else if (selectedDailyStatusWednesday == 'required'){
        setFormData({...formData, availableWednesday : false,
        requireWednesday : true}
        )}
    else
        setFormData({...formData, availableWednesday : false,
            requireWednesday : false}
        )
}

const setDailyStatusInFormThursday = (selectedDailyStatusThursday) => {

    setSelectedDailyStatusThursday(selectedDailyStatusThursday)

    if(selectedDailyStatusThursday== 'available'){
        setFormData({...formData, 
            availableThursday : true, 
            requireThursday : false})
    }
    else if (selectedDailyStatusThursday == 'required'){
        setFormData({...formData, availableThursday : false,
        requireThursday : true}
        )}
    else
        setFormData({...formData, availableThursday : false,
            requireThursday : false}
        )
}

const setDailyStatusInFormFriday = (selectedDailyStatusFriday) => {

    setSelectedDailyStatusFriday(selectedDailyStatusFriday)

    if(selectedDailyStatusFriday== 'available'){
        setFormData({...formData, 
            availableFriday : true, 
            requireFriday : false})
    }
    else if (selectedDailyStatusFriday == 'required'){
        setFormData({...formData, availableFriday : false,
        requireFriday : true}
        )}
    else
        setFormData({...formData, availableFriday : false,
            requireFriday : false}
        )
}

const setDailyStatusInFormSaturday = (selectedDailyStatusSaturday) => {

    setSelectedDailyStatusSaturday(selectedDailyStatusSaturday)

    if(selectedDailyStatusSaturday== 'available'){
        setFormData({...formData, 
            availableSaturday : true, 
            requireSaturday : false})
    }
    else if (selectedDailyStatusSaturday == 'required'){
        setFormData({...formData, availableSaturday : false,
        requireSaturday : true}
        )}
    else
        setFormData({...formData, availableSaturday : false,
            requireSaturday : false}
        )
}

const setDailyStatusInFormSunday = (selectedDailyStatusSunday) => {

    setSelectedDailyStatusSunday(selectedDailyStatusSunday)

    if(selectedDailyStatusSunday== 'available'){
        setFormData({...formData, 
            availableSunday : true, 
            requireSunday : false})
    }
    else if (selectedDailyStatusSunday == 'required'){
        setFormData({...formData, availableSunday : false,
        requireSunday : true}
        )}
    else
        setFormData({...formData, availableSunday : false,
            requireSunday : false}
        )
}

const setCatStatus = () => {
    setSelectedCatStatus(selectedCatStatus)
    if(selectedCatStatus == 'Yes'){
        setFormData({...formData, 
            hasCats : true
    })}
    else
        setFormData({...formData, hasCats : false}
        )
    }

    const setKidsStatus = () => {
        setSelectedKidsStatus(selectedKidsStatus)
        if(selectedKidsStatus == 'Yes'){
            setFormData({...formData, 
                hasKids : true
        })}
        else
            setFormData({...formData, hasKids : false}
            )
        }

        const setLeftAloneStatus = () => {
            setSelectedLeftAloneStatus(selectedLeftAloneStatus)
            if(selectedLeftAloneStatus == 'Yes'){
                setFormData({...formData, 
                    dogLeftAlone : true
            })}
            else
                setFormData({...formData, dogLeftAlone : false}
                )
            }

            const setAllergiesStatus = () => {
                setSelectedAllergiesStatus(selectedAllergiesStatus)
                if(selectedAllergiesStatus == 'Yes'){
                    setFormData({...formData, 
                        hasAllergies : true
                })}
                else
                    setFormData({...formData, hasAllergies : false}
                    )
                }

                const setDogSize = () => {
                    setSelectedDogSize(selectedDogSize)
                    if(selectedDogSize == 1){
                        setFormData({...formData, 
                        dogSizeOffer : 1})
                    }
                    else if (selectedDogSize == 2){
                        setFormData({...formData, 
                            dogSizeOffer : 2})
                    }
                    else  setFormData({...formData, 
                        dogSizeOffer : 3})
                }
    

  return (
    <>
      <div>
        <Disclosure
          as='div'
          className='relative overflow-hidden bg-sky-700 pb-32'
        >
          {({ open }) => (
            <>
              <nav
                className={classNames(
                  open ? 'bg-sky-900' : 'bg-transparent',
                  'relative z-10 border-b border-teal-500 border-opacity-25 lg:border-none lg:bg-transparent'
                )}
              >
                <div className='mx-auto max-w-7xl px-2 sm:px-4 lg:px-8'>
                  <div className='relative flex h-16 items-center justify-between lg:border-b lg:border-sky-800'>
                    <div className='flex items-center px-2 lg:px-0'>
                      <div className='flex-shrink-0'>
                        <img
                          className='block h-8 w-auto'
                          src='https://tailwindui.com/img/logos/mark.svg?color=teal&shade=400'
                          alt='Your Company'
                        />
                      </div>
                      <div className='hidden lg:ml-6 lg:block lg:space-x-4'>
                        <div className='flex'>
                          {navigation.map((item) => (
                            <a
                              key={item.name}
                              href={item.href}
                              className={classNames(
                                item.current
                                  ? 'bg-black bg-opacity-25'
                                  : 'hover:bg-sky-800',
                                'rounded-md py-2 px-3 text-sm font-medium text-white'
                              )}
                            >
                              {item.name}
                            </a>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className='flex flex-1 justify-center px-2 lg:ml-6 lg:justify-end'>
                      <div className='w-full max-w-lg lg:max-w-xs'>
                        <label htmlFor='search' className='sr-only'>
                          Search
                        </label>
                        <div className='relative text-sky-100 focus-within:text-gray-400'>
                          <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3'>
                            <MagnifyingGlassIcon
                              className='h-5 w-5 flex-shrink-0'
                              aria-hidden='true'
                            />
                          </div>
                          <input
                            id='search'
                            name='search'
                            className='block w-full rounded-md border border-transparent bg-sky-700 bg-opacity-50 py-2 pl-10 pr-3 leading-5 placeholder-sky-100 focus:border-white focus:bg-white focus:text-gray-900 focus:placeholder-gray-500 focus:outline-none focus:ring-white sm:text-sm'
                            placeholder='Search'
                            type='search'
                          />
                        </div>
                      </div>
                    </div>
                    <div className='flex lg:hidden'>
                      {/* Mobile menu button */}
                      <Disclosure.Button className='inline-flex items-center justify-center rounded-md p-2 text-sky-200 hover:bg-sky-800 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'>
                        <span className='sr-only'>Open main menu</span>
                        {open ? (
                          <XMarkIcon
                            className='block h-6 w-6 flex-shrink-0'
                            aria-hidden='true'
                          />
                        ) : (
                          <Bars3Icon
                            className='block h-6 w-6 flex-shrink-0'
                            aria-hidden='true'
                          />
                        )}
                      </Disclosure.Button>
                    </div>
                    <div className='hidden lg:ml-4 lg:block'>
                      <div className='flex items-center'>
                        <button
                          type='button'
                          className='flex-shrink-0 rounded-full p-1 text-sky-200 hover:bg-sky-800 hover:text-white focus:bg-sky-900 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-sky-900'
                        >
                          <span className='sr-only'>View notifications</span>
                          <BellIcon className='h-6 w-6' aria-hidden='true' />
                        </button>

                        {/* Profile dropdown */}
                        <Menu as='div' className='relative ml-4 flex-shrink-0'>
                          <div>
                            <Menu.Button className='flex rounded-full text-sm text-white focus:bg-sky-900 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-sky-900'>
                              <span className='sr-only'>Open user menu</span>
                              <img
                                className='h-8 w-8 rounded-full'
                                src={user.imageUrl}
                                alt=''
                              />
                            </Menu.Button>
                          </div>
                          <Transition
                            as={Fragment}
                            enter='transition ease-out duration-100'
                            enterFrom='transform opacity-0 scale-95'
                            enterTo='transform opacity-100 scale-100'
                            leave='transition ease-in duration-75'
                            leaveFrom='transform opacity-100 scale-100'
                            leaveTo='transform opacity-0 scale-95'
                          >
                            <Menu.Items className='absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
                              {userNavigation.map((item) => (
                                <Menu.Item key={item.name}>
                                  {({ active }) => (
                                    <a
                                      href={item.href}
                                      className={classNames(
                                        active ? 'bg-gray-100' : '',
                                        'block py-2 px-4 text-sm text-gray-700'
                                      )}
                                    >
                                      {item.name}
                                    </a>
                                  )}
                                </Menu.Item>
                              ))}
                            </Menu.Items>
                          </Transition>
                        </Menu>
                      </div>
                    </div>
                  </div>
                </div>

                <Disclosure.Panel className='bg-sky-900 lg:hidden'>
                  <div className='space-y-1 px-2 pt-2 pb-3'>
                    {navigation.map((item) => (
                      <Disclosure.Button
                        key={item.name}
                        as='a'
                        href={item.href}
                        className={classNames(
                          item.current
                            ? 'bg-black bg-opacity-25'
                            : 'hover:bg-sky-800',
                          'block rounded-md py-2 px-3 text-base font-medium text-white'
                        )}
                      >
                        {item.name}
                      </Disclosure.Button>
                    ))}
                  </div>
                  <div className='border-t border-sky-800 pt-4 pb-3'>
                    <div className='flex items-center px-4'>
                      <div className='flex-shrink-0'>
                        <img
                          className='h-10 w-10 rounded-full'
                          src={user.imageUrl}
                          alt=''
                        />
                      </div>
                      <div className='ml-3'>
                        <div className='text-base font-medium text-white'>
                          {user.name}
                        </div>
                        <div className='text-sm font-medium text-sky-200'>
                          {user.email}
                        </div>
                      </div>
                      <button
                        type='button'
                        className='ml-auto flex-shrink-0 rounded-full p-1 text-sky-200 hover:bg-sky-800 hover:text-white focus:bg-sky-900 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-sky-900'
                      >
                        <span className='sr-only'>View notifications</span>
                        <BellIcon className='h-6 w-6' aria-hidden='true' />
                      </button>
                    </div>
                    <div className='mt-3 px-2'>
                      {userNavigation.map((item) => (
                        <Disclosure.Button
                          key={item.name}
                          as='a'
                          href={item.href}
                          className='block rounded-md py-2 px-3 text-base font-medium text-sky-200 hover:bg-sky-800 hover:text-white'
                        >
                          {item.name}
                        </Disclosure.Button>
                      ))}
                    </div>
                  </div>
                </Disclosure.Panel>
              </nav>
              <div
                aria-hidden='true'
                className={classNames(
                  open ? 'bottom-0' : 'inset-y-0',
                  'absolute inset-x-0 left-1/2 w-full -translate-x-1/2 transform overflow-hidden lg:inset-y-0'
                )}
              >
                <div className='absolute inset-0 flex'>
                  <div
                    className='h-full w-1/2'
                    style={{ backgroundColor: '#0a527b' }}
                  />
                  <div
                    className='h-full w-1/2'
                    style={{ backgroundColor: '#065d8c' }}
                  />
                </div>
                <div className='relative flex justify-center'>
                  <svg
                    className='flex-shrink-0'
                    width={1750}
                    height={308}
                    viewBox='0 0 1750 308'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M284.161 308H1465.84L875.001 182.413 284.161 308z'
                      fill='#0369a1'
                    />
                    <path
                      d='M1465.84 308L16.816 0H1750v308h-284.16z'
                      fill='#065d8c'
                    />
                    <path
                      d='M1733.19 0L284.161 308H0V0h1733.19z'
                      fill='#0a527b'
                    />
                    <path
                      d='M875.001 182.413L1733.19 0H16.816l858.185 182.413z'
                      fill='#0a4f76'
                    />
                  </svg>
                </div>
              </div>
              <header className='relative py-10'>
                <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
                  <h1 className='text-3xl font-bold tracking-tight text-white'>
                    Your Availability and Needs
                  </h1>
                </div>
              </header>
            </>
          )}
        </Disclosure>

        <main className='relative -mt-32'>
          <div className='mx-auto max-w-screen-xl px-4 pb-6 sm:px-6 lg:px-8 lg:pb-16'>
            <div className='overflow-hidden rounded-lg bg-white shadow'>
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
                  
                >

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

                        <RadioGroup
                            value={selectedCatStatus}
                            onChange={setCatStatus}
                            >
                            <RadioGroup.Label className='text-base font-medium text-gray-900'>
                                Do you have cats?
                            </RadioGroup.Label>
                            <div className='mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-3 sm:gap-x-4'>
                                {otherInfoStatuses.map((otherInfoStatuses) => (
                                <RadioGroup.Option
                                    key={otherInfoStatuses.id}
                                    value={otherInfoStatuses.title}
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
                                    value={otherInfoStatuses.title}
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
                                Would you need to leave a dog you are sitting alone during your working day?
                            </RadioGroup.Label>
                            <div className='mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-3 sm:gap-x-4'>
                                {otherInfoStatuses.map((otherInfoStatuses) => (
                                <RadioGroup.Option
                                    key={otherInfoStatuses.id}
                                    value={otherInfoStatuses.title}
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
                                Would you only like to look after dogs that are hypoallergenic?
                            </RadioGroup.Label>
                            <div className='mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-3 sm:gap-x-4'>
                                {otherInfoStatuses.map((otherInfoStatuses) => (
                                <RadioGroup.Option
                                    key={otherInfoStatuses.id}
                                    value={otherInfoStatuses.title}
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
                            value={selectedDogSize}
                            onChange={setDogSize}
                            >
                            <RadioGroup.Label className='text-base font-medium text-gray-900 my-2'>
                                What is the maximum dog size you are able or willing to look after?
                            </RadioGroup.Label>
                            <div className='mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-3 sm:gap-x-4'>
                                {dogSizes.map((dogSize) => (
                                <RadioGroup.Option
                                    key={dogSize.id}
                                    value={dogSize.value}
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
          </div>
        </main>
      </div>
    </>
  )
}

export default SuitabilityForm