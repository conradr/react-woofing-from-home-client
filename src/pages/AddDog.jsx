import {Fragment, useState, useEffect} from 'react'
import { RadioGroup } from '@headlessui/react'
import { CameraIcon, CheckCircleIcon, InformationCircleIcon } from '@heroicons/react/20/solid'
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
  { name: 'Profile', href: '/finish-profile', icon: UserCircleIcon, current: false },
  { name: 'Profile pic', href: '/upload-profile-image', icon: CameraIcon, current: false },
  { name: 'Upload doggy pics', href: '/upload-images', icon: CameraIcon, current: false },
  { name: 'Your needs & availability', href: '/suitability-form', icon: CalendarDaysIcon, current: false },
  { name: 'Add your dogs', href: '#', icon: InformationCircleIcon, current: true },
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

function AddDog() {
    
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        name: null,
        dob: null,
        breed: null,
        size: 1,
        exerciseRequired: 1,
        hypoallergenic: false, 
        canBeLeft: false, 
        okWithKids: false, 
        okWithCats: false,
        okWithDogs: false,
        customer: {firebaseId : null}
    })

        //get firebaseID
        const auth = getAuth()
        useEffect(() => {
            const fetchFirebaseId = async () => {
              const docRef = doc(db, 'users', auth.currentUser.uid)
              const docSnap = await getDoc(docRef)
              if (docSnap.exists()) {
                setFormData({...formData, customer: {firebaseId: auth.currentUser.uid}})
              }
            }
            fetchFirebaseId()
          }, [])

    //submit the entire formData to Postgres
    const onSubmit = async () => {
        await fetch('https://woofingfromhome.herokuapp.com/dogs', {
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
        navigate('/matches')
        // spinner to be entered here for calculating matches
    }
 
const otherInfoStatuses = [
    { id: 1, title: 'No', status: false},
    { id: 2, title: 'Yes', status : true}
]

const dogSizes = [
    { id: 1, title: 'Small', status : 1},
    { id: 2, title: 'Medium', status : 2},
    { id: 3, title: 'Large', status : 3}
]

const activityLevels = [
    { id: 1, title: 'Low', description: "e.g. a couple of 15 min walks", status : 1},
    { id: 2, title: 'Medium', description: "e.g. a couple of 30 min walks", status : 2},
    { id: 3, title: 'High', description: "e.g. one or more walks of more than 1 hour", status : 3}
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

    const [selectedName, setSelectedName] = useState()
    const [selectedDob, setSelectedDob] = useState()
    const [selectedBreed, setSelectedBreed] = useState()
    const [selectedDogSize, setSelectedDogSize] = useState(dogSizes[0].status)
    const [selectedActivityLevel, setSelectedActivityLevel] = useState(activityLevels[0].status)
    const [selectedHypoallergenic, setSelectedHypoallergenic] = useState(otherInfoStatuses[0].status)
    const [selectedCanBeLeftAone, setSelectedCanBeLeftAlone] = useState(otherInfoStatuses[0].status)
    const [selectedOkayWithCats, setSelectedOkayWithCats] = useState(otherInfoStatuses[0].status)
    const [selectedOkayWithKids, setSelectedOkayWithKids] = useState(otherInfoStatuses[0].status)
    const [selectedOkayWithDogs, setSelectedOkayWithDogs] = useState(otherInfoStatuses[0].status)


const setCatStatus = (selectedOkayWithCats) => {
  setSelectedOkayWithCats(selectedOkayWithCats)
    if(selectedOkayWithCats){
        setFormData({...formData, 
            okWithCats : true
    })}
    else
        setFormData({...formData, 
            okWithCats : false}
        )
    }

    const setKidsStatus = (selectedOkayWithKids) => {
        setSelectedOkayWithKids(selectedOkayWithKids)
        if(selectedOkayWithKids){
            setFormData({...formData, 
                okWithKids : true
        })}
        else
            setFormData({...formData, 
                okWithKids : false}
            )
        }

        const setLeftAloneStatus = (selectedCanBeLeftAone) => {
          setSelectedCanBeLeftAlone(selectedCanBeLeftAone)
            if(selectedCanBeLeftAone){
                setFormData({...formData, 
                    canBeLeft : true
            })}
            else
                setFormData({...formData, canBeLeft : false}
                )
            }

            const setAllergiesStatus = (selectedHypoallergenic) => {
              setSelectedHypoallergenic(selectedHypoallergenic)
                if(selectedHypoallergenic){
                    setFormData({...formData, 
                      hypoallergenic : true
                })}
                else
                    setFormData({...formData, hypoallergenic : false}
                    )
                }

                const setDogSize = (selectedDogSize) => {
                    setSelectedDogSize(selectedDogSize)
                    if(selectedDogSize == 1){
                        setFormData({...formData, 
                          size : 1})
                    }
                    else if (selectedDogSize == 2){
                        setFormData({...formData, 
                          size : 2})
                    }
                    else  setFormData({...formData, 
                          size : 3})
                }

                const setActivityLevel = (selectedActivityLevel) => {
                    setSelectedActivityLevel(selectedActivityLevel)
                    if(selectedActivityLevel == 1){
                        setFormData({...formData, 
                          exerciseRequired : 1})
                    }
                    else if (selectedActivityLevel == 2){
                        setFormData({...formData, 
                          exerciseRequired : 2})
                    }
                    else  setFormData({...formData, 
                      exerciseRequired : 3})
                }

                const setOkayWithOtherDogs = (selectedOkayWithDogs) => {
                  setSelectedOkayWithDogs(selectedOkayWithDogs)
                    if(selectedOkayWithDogs){
                        setFormData({...formData, 
                            okWithDogs : true
                    })}
                    else
                        setFormData({...formData, okWithDogs : false}
                        )
                    }
        

                  const onChange = (e) => {
                    setFormData((prevState) => ({
                      ...prevState,
                      [e.target.id]: e.target.value,
                    }))
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
                    
                    >

                    <div className='py-6 px-4 sm:p-6 lg:pb-8'>
                        <div>
                        <h2 className='text-lg font-medium leading-6 text-gray-900'>
                            Tell us all about you dog!
                        </h2>
                        <p className='mt-1 text-sm text-gray-500'>
                            This will be used to find you suitable matches
                        </p>
                        </div>

                        <div className='mt-10 divide-y divide-gray-200'>
                        <div className='mt-6'>

                        <div>
      <label htmlFor="name" className="ml-px block pl-4 text-sm font-medium text-gray-700">
        Dogs Name
      </label>
      <div className="mt-1">
        <input
          type="text"
          name="name"
          id="name"
          className="block w-full rounded-full border-gray-300 px-4 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          placeholder="Enter your dogs name"
          onChange={onChange}
        />
      </div>
    </div>

<div>
    <label htmlFor="dob" className="ml-px block pl-4 text-sm font-medium text-gray-700">
        Dogs Date of Birth
      </label>
      <div className="mt-1">
        <input
          type="date"
          name="dob"
          id="dob"
          className="block w-full rounded-full border-gray-300 px-4 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          placeholder="01/01/2022"
          onChange={onChange}
        />
      </div>
    </div>

<div>
    <label htmlFor="breed" className="ml-px block pl-4 text-sm font-medium text-gray-700">
        Dogs Breed
      </label>
      <div className="mt-1">
        <input
          type="text"
          name="breed"
          id="breed"
          className="block w-full rounded-full border-gray-300 px-4 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          placeholder="Enter your dogs breed"
          onChange={onChange}
        />
      </div>
    </div>


    <RadioGroup
                            value={selectedOkayWithDogs}                           
                            onChange={setOkayWithOtherDogs}
                            >
                            <RadioGroup.Label className='text-base font-medium text-gray-900'>
                                Is your dog good with other dogs?
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
                            value={selectedOkayWithCats}                           
                            onChange={setCatStatus}
                            >
                            <RadioGroup.Label className='text-base font-medium text-gray-900'>
                                Is your dog good with cats?
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
                            value={selectedOkayWithKids}
                            onChange={setKidsStatus}
                            >
                            <RadioGroup.Label className='text-base font-medium text-gray-900 my-2'>
                                Is your dog good with kids?
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
                            value={selectedCanBeLeftAone}
                            onChange={setLeftAloneStatus}
                            >
                            <RadioGroup.Label className='text-base font-medium text-gray-900 my-2'>
                                Can your dog be left alone for short periods of time?
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
                            value={selectedHypoallergenic}
                            onChange={setAllergiesStatus}
                            >
                            <RadioGroup.Label className='text-base font-medium text-gray-900 my-2'>
                                Is your dog hypoallergenic?
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
                            value={selectedDogSize}
                            onChange={setDogSize}
                            >
                            <RadioGroup.Label className='text-base font-medium text-gray-900 my-2'>
                                What is the size of your dog?
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
                                What level of activity does your dog require?
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
                                            {activityLevel.title} <br/><br/>
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

export default AddDog