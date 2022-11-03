import {useState} from 'react'
import { RadioGroup } from '@headlessui/react'
import { CheckCircleIcon } from '@heroicons/react/20/solid'


function SuitabilityForm() {

    const [formData, setFormData] = useState({
        firebaseId: "newPerson4",
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
    })

    //submit the entire formData to Postgres
    const onSubmit = () => {
        console.log("Form submit button")
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
    // onst [selectedDailyStatusWednesday, setSelectedDailyStatusTuesday] = useState(dailyStatuses[0].status)
    // onst [selectedDailyStatusThursday, setSelectedDailyStatusTuesday] = useState(dailyStatuses[0].status)
    // onst [selectedDailyStatusFriday, setSelectedDailyStatusTuesday] = useState(dailyStatuses[0].status)
    // onst [selectedDailyStatusSaturday, setSelectedDailyStatusTuesday] = useState(dailyStatuses[0].status)
    // onst [selectedDailyStatusTuesday, setSelectedDailyStatusTuesday] = useState(dailyStatuses[0].status)

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

  return (
    <>
    <form onSubmit={onSubmit}>
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


       
        </form>
        </>
      )
}

export default SuitabilityForm