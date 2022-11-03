import {useState, useEffect} from 'react'
import { RadioGroup } from '@headlessui/react'
import { CheckCircleIcon } from '@heroicons/react/20/solid'
import { useNavigate } from 'react-router-dom'
import { getAuth} from 'firebase/auth'
import { getDoc,doc } from 'firebase/firestore'
import { db } from '../firebase.config'


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
              console.log(docSnap.data())   
              if (docSnap.exists()) {
                setFormData({...formData, firebaseId: auth.currentUser.uid })
              }
            }
            fetchFirebaseId()
          }, [])

    //submit the entire formData to Postgres
    const onSubmit = () => {
        fetch('http://localhost:8080/customers', {
        method: 'POST',
        cache: 'no-cache',
        cors: 'no-cors',
        headers: {
            'Content-Type': 'application/json',
        },
      body: JSON.stringify(formData),
    }).then((response) => response.json())
        .catch((error) => console.log(error))
        navigate('/other-criteria')
    }
 
const dailyStatuses = [
    { id: 1, title: 'I need help', status: 'available'},
    { id: 2, title: 'I can offer help', status: 'required'},
    { id: 3, title: 'I am good', status: 'neither' },
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

  return (
    <>
    
     {/* radio buttons for selecting available/required days */}
    <h1>Tell us your needs and your availability!    </h1>
    <RadioGroup value={selectedDailyStatusMonday} onChange={setDailyStatusInFormMonday} >
      <RadioGroup.Label className="text-base font-medium text-gray-900">Monday</RadioGroup.Label>
      <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-3 sm:gap-x-4">
        {dailyStatuses.map((dailyStatus) => (
          <RadioGroup.Option
            key={dailyStatus.id}
            value={dailyStatus.status}
            className={({ checked, active }) =>
              classNames(
                checked ? 'border-transparent' : 'border-gray-300',
                active ? 'border-indigo-500 ring-2 ring-indigo-500' : '',
                'relative flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm focus:outline-none'
              )
            }
          >
            {({ checked, active }) => (
              <>
                <span className="flex flex-1">
                  <span className="flex flex-col">
                    <RadioGroup.Label as="span" className="block text-sm font-medium text-gray-900">
                      {dailyStatus.title}
                    </RadioGroup.Label>
                  </span>
                </span>
                <CheckCircleIcon
                  className={classNames(!checked ? 'invisible' : '', 'h-5 w-5 text-indigo-600')}
                  aria-hidden="true"
                />
                <span
                  className={classNames(
                    active ? 'border' : 'border-2',
                    checked ? 'border-indigo-500' : 'border-transparent',
                    'pointer-events-none absolute -inset-px rounded-lg'
                  )}
                  aria-hidden="true"
                />
              </>
            )}
          </RadioGroup.Option>
        ))}
      </div>
    </RadioGroup>

    <RadioGroup value={selectedDailyStatusTuesday} onChange={setDailyStatusInFormTuesday} >
      <RadioGroup.Label className="text-base font-medium text-gray-900">Tuesday</RadioGroup.Label>
      <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-3 sm:gap-x-4">
        {dailyStatuses.map((dailyStatus) => (
          <RadioGroup.Option
            key={dailyStatus.id}
            value={dailyStatus.status}
            className={({ checked, active }) =>
              classNames(
                checked ? 'border-transparent' : 'border-gray-300',
                active ? 'border-indigo-500 ring-2 ring-indigo-500' : '',
                'relative flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm focus:outline-none'
              )
            }
          >
            {({ checked, active }) => (
              <>
                <span className="flex flex-1">
                  <span className="flex flex-col">
                    <RadioGroup.Label as="span" className="block text-sm font-medium text-gray-900">
                      {dailyStatus.title}
                    </RadioGroup.Label>
                  </span>
                </span>
                <CheckCircleIcon
                  className={classNames(!checked ? 'invisible' : '', 'h-5 w-5 text-indigo-600')}
                  aria-hidden="true"
                />
                <span
                  className={classNames(
                    active ? 'border' : 'border-2',
                    checked ? 'border-indigo-500' : 'border-transparent',
                    'pointer-events-none absolute -inset-px rounded-lg'
                  )}
                  aria-hidden="true"
                />
              </>
            )}
          </RadioGroup.Option>
        ))}
      </div>
    </RadioGroup>

    <RadioGroup value={selectedDailyStatusWednesday} onChange={setDailyStatusInFormWednesday} >
      <RadioGroup.Label className="text-base font-medium text-gray-900">Wednesday</RadioGroup.Label>
      <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-3 sm:gap-x-4">
        {dailyStatuses.map((dailyStatus) => (
          <RadioGroup.Option
            key={dailyStatus.id}
            value={dailyStatus.status}
            className={({ checked, active }) =>
              classNames(
                checked ? 'border-transparent' : 'border-gray-300',
                active ? 'border-indigo-500 ring-2 ring-indigo-500' : '',
                'relative flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm focus:outline-none'
              )
            }
          >
            {({ checked, active }) => (
              <>
                <span className="flex flex-1">
                  <span className="flex flex-col">
                    <RadioGroup.Label as="span" className="block text-sm font-medium text-gray-900">
                      {dailyStatus.title}
                    </RadioGroup.Label>
                  </span>
                </span>
                <CheckCircleIcon
                  className={classNames(!checked ? 'invisible' : '', 'h-5 w-5 text-indigo-600')}
                  aria-hidden="true"
                />
                <span
                  className={classNames(
                    active ? 'border' : 'border-2',
                    checked ? 'border-indigo-500' : 'border-transparent',
                    'pointer-events-none absolute -inset-px rounded-lg'
                  )}
                  aria-hidden="true"
                />
              </>
            )}
          </RadioGroup.Option>
        ))}
      </div>
    </RadioGroup>

    <RadioGroup value={selectedDailyStatusThursday} onChange={setDailyStatusInFormThursday} >
      <RadioGroup.Label className="text-base font-medium text-gray-900">Thursday</RadioGroup.Label>
      <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-3 sm:gap-x-4">
        {dailyStatuses.map((dailyStatus) => (
          <RadioGroup.Option
            key={dailyStatus.id}
            value={dailyStatus.status}
            className={({ checked, active }) =>
              classNames(
                checked ? 'border-transparent' : 'border-gray-300',
                active ? 'border-indigo-500 ring-2 ring-indigo-500' : '',
                'relative flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm focus:outline-none'
              )
            }
          >
            {({ checked, active }) => (
              <>
                <span className="flex flex-1">
                  <span className="flex flex-col">
                    <RadioGroup.Label as="span" className="block text-sm font-medium text-gray-900">
                      {dailyStatus.title}
                    </RadioGroup.Label>
                  </span>
                </span>
                <CheckCircleIcon
                  className={classNames(!checked ? 'invisible' : '', 'h-5 w-5 text-indigo-600')}
                  aria-hidden="true"
                />
                <span
                  className={classNames(
                    active ? 'border' : 'border-2',
                    checked ? 'border-indigo-500' : 'border-transparent',
                    'pointer-events-none absolute -inset-px rounded-lg'
                  )}
                  aria-hidden="true"
                />
              </>
            )}
          </RadioGroup.Option>
        ))}
      </div>
    </RadioGroup>

    <RadioGroup value={selectedDailyStatusFriday} onChange={setDailyStatusInFormFriday} >
      <RadioGroup.Label className="text-base font-medium text-gray-900">Friday</RadioGroup.Label>
      <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-3 sm:gap-x-4">
        {dailyStatuses.map((dailyStatus) => (
          <RadioGroup.Option
            key={dailyStatus.id}
            value={dailyStatus.status}
            className={({ checked, active }) =>
              classNames(
                checked ? 'border-transparent' : 'border-gray-300',
                active ? 'border-indigo-500 ring-2 ring-indigo-500' : '',
                'relative flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm focus:outline-none'
              )
            }
          >
            {({ checked, active }) => (
              <>
                <span className="flex flex-1">
                  <span className="flex flex-col">
                    <RadioGroup.Label as="span" className="block text-sm font-medium text-gray-900">
                      {dailyStatus.title}
                    </RadioGroup.Label>
                  </span>
                </span>
                <CheckCircleIcon
                  className={classNames(!checked ? 'invisible' : '', 'h-5 w-5 text-indigo-600')}
                  aria-hidden="true"
                />
                <span
                  className={classNames(
                    active ? 'border' : 'border-2',
                    checked ? 'border-indigo-500' : 'border-transparent',
                    'pointer-events-none absolute -inset-px rounded-lg'
                  )}
                  aria-hidden="true"
                />
              </>
            )}
          </RadioGroup.Option>
        ))}
      </div>
    </RadioGroup>

    <RadioGroup value={selectedDailyStatusSaturday} onChange={setDailyStatusInFormSaturday} >
      <RadioGroup.Label className="text-base font-medium text-gray-900">Saturday</RadioGroup.Label>
      <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-3 sm:gap-x-4">
        {dailyStatuses.map((dailyStatus) => (
          <RadioGroup.Option
            key={dailyStatus.id}
            value={dailyStatus.status}
            className={({ checked, active }) =>
              classNames(
                checked ? 'border-transparent' : 'border-gray-300',
                active ? 'border-indigo-500 ring-2 ring-indigo-500' : '',
                'relative flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm focus:outline-none'
              )
            }
          >
            {({ checked, active }) => (
              <>
                <span className="flex flex-1">
                  <span className="flex flex-col">
                    <RadioGroup.Label as="span" className="block text-sm font-medium text-gray-900">
                      {dailyStatus.title}
                    </RadioGroup.Label>
                  </span>
                </span>
                <CheckCircleIcon
                  className={classNames(!checked ? 'invisible' : '', 'h-5 w-5 text-indigo-600')}
                  aria-hidden="true"
                />
                <span
                  className={classNames(
                    active ? 'border' : 'border-2',
                    checked ? 'border-indigo-500' : 'border-transparent',
                    'pointer-events-none absolute -inset-px rounded-lg'
                  )}
                  aria-hidden="true"
                />
              </>
            )}
          </RadioGroup.Option>
        ))}
      </div>
    </RadioGroup>

    <RadioGroup value={selectedDailyStatusSunday} onChange={setDailyStatusInFormSunday} >
      <RadioGroup.Label className="text-base font-medium text-gray-900">Sunday</RadioGroup.Label>
      <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-3 sm:gap-x-4">
        {dailyStatuses.map((dailyStatus) => (
          <RadioGroup.Option
            key={dailyStatus.id}
            value={dailyStatus.status}
            className={({ checked, active }) =>
              classNames(
                checked ? 'border-transparent' : 'border-gray-300',
                active ? 'border-indigo-500 ring-2 ring-indigo-500' : '',
                'relative flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm focus:outline-none'
              )
            }
          >
            {({ checked, active }) => (
              <>
                <span className="flex flex-1">
                  <span className="flex flex-col">
                    <RadioGroup.Label as="span" className="block text-sm font-medium text-gray-900">
                      {dailyStatus.title}
                    </RadioGroup.Label>
                  </span>
                </span>
                <CheckCircleIcon
                  className={classNames(!checked ? 'invisible' : '', 'h-5 w-5 text-indigo-600')}
                  aria-hidden="true"
                />
                <span
                  className={classNames(
                    active ? 'border' : 'border-2',
                    checked ? 'border-indigo-500' : 'border-transparent',
                    'pointer-events-none absolute -inset-px rounded-lg'
                  )}
                  aria-hidden="true"
                />
              </>
            )}
          </RadioGroup.Option>
        ))}
      </div>
    </RadioGroup>

    <br />
    <br />

    <button type="submit" onClick={onSubmit}>
        Next
    </button>

    <br />
    <br />
    
        </>
      )
}

export default SuitabilityForm