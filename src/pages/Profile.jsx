import { Fragment, useState, useEffect } from 'react'

import { getAuth, updateEmail, updateProfile } from 'firebase/auth'
import { db } from '../firebase.config'
import { useNavigate, Link } from 'react-router-dom'
import { updateDoc, doc } from 'firebase/firestore'
import { toast } from 'react-toastify'
import arrowRight from '../assets/svg/keyboardArrowRightIcon.svg'
import homeIcon from '../assets/svg/homeIcon.svg'
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
  { name: 'Account', href: '#', icon: CogIcon, current: false },
  { name: 'Password', href: '#', icon: KeyIcon, current: false },
  { name: 'Notifications', href: '#', icon: BellIcon, current: false },
  { name: 'Billing', href: '#', icon: CreditCardIcon, current: false },
  { name: 'Integrations', href: '#', icon: SquaresPlusIcon, current: false },
]
const userNavigation = [
  { name: 'Your Profile', href: '#' },
  { name: 'Settings', href: '#' },
  { name: 'Sign out', href: '#' },
]

const Profile = () => {
  const [availableToHire, setAvailableToHire] = useState(true)
  const [privateAccount, setPrivateAccount] = useState(false)
  const [allowCommenting, setAllowCommenting] = useState(true)
  const [allowMentions, setAllowMentions] = useState(true)

  const auth = getAuth()
  const [changeDetails, setChangeDetails] = useState(false)
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  })

  const { name, email } = formData

  const navigate = useNavigate()

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
      })
      toast.success('Profile updated')
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
                    Settings
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
                  action='#'
                  method='POST'
                >
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

                    <div className='mt-6 flex flex-col lg:flex-row'>
                      <div className='flex-grow space-y-6'>
                        <div>
                          <label
                            htmlFor='username'
                            className='block text-sm font-medium text-gray-700'
                          >
                            Username
                          </label>
                          <div className='mt-1 flex rounded-md shadow-sm'>
                            <span className='inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-gray-500 sm:text-sm'>
                              workcation.com/
                            </span>
                            <input
                              type='text'
                              name='username'
                              id='username'
                              autoComplete='username'
                              className='block w-full min-w-0 flex-grow rounded-none rounded-r-md border-gray-300 focus:border-sky-500 focus:ring-sky-500 sm:text-sm'
                              defaultValue={user.handle}
                            />
                          </div>
                        </div>

                        <div>
                          <label
                            htmlFor='about'
                            className='block text-sm font-medium text-gray-700'
                          >
                            About
                          </label>
                          <div className='mt-1'>
                            <textarea
                              id='about'
                              name='about'
                              rows={3}
                              className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm'
                              defaultValue={''}
                            />
                          </div>
                          <p className='mt-2 text-sm text-gray-500'>
                            Brief description for your profile. URLs are
                            hyperlinked.
                          </p>
                        </div>
                      </div>

                      <div className='mt-6 flex-grow lg:mt-0 lg:ml-6 lg:flex-shrink-0 lg:flex-grow-0'>
                        <p
                          className='text-sm font-medium text-gray-700'
                          aria-hidden='true'
                        >
                          Photo
                        </p>
                        <div className='mt-1 lg:hidden'>
                          <div className='flex items-center'>
                            <div
                              className='inline-block h-12 w-12 flex-shrink-0 overflow-hidden rounded-full'
                              aria-hidden='true'
                            >
                              <img
                                className='h-full w-full rounded-full'
                                src={user.imageUrl}
                                alt=''
                              />
                            </div>
                            <div className='ml-5 rounded-md shadow-sm'>
                              <div className='group relative flex items-center justify-center rounded-md border border-gray-300 py-2 px-3 focus-within:ring-2 focus-within:ring-sky-500 focus-within:ring-offset-2 hover:bg-gray-50'>
                                <label
                                  htmlFor='mobile-user-photo'
                                  className='pointer-events-none relative text-sm font-medium leading-4 text-gray-700'
                                >
                                  <span>Change</span>
                                  <span className='sr-only'> user photo</span>
                                </label>
                                <input
                                  id='mobile-user-photo'
                                  name='user-photo'
                                  type='file'
                                  className='absolute h-full w-full cursor-pointer rounded-md border-gray-300 opacity-0'
                                />
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className='relative hidden overflow-hidden rounded-full lg:block'>
                          <img
                            className='relative h-40 w-40 rounded-full'
                            src={user.imageUrl}
                            alt=''
                          />
                          <label
                            htmlFor='desktop-user-photo'
                            className='absolute inset-0 flex h-full w-full items-center justify-center bg-black bg-opacity-75 text-sm font-medium text-white opacity-0 focus-within:opacity-100 hover:opacity-100'
                          >
                            <span>Change</span>
                            <span className='sr-only'> user photo</span>
                            <input
                              type='file'
                              id='desktop-user-photo'
                              name='user-photo'
                              className='absolute inset-0 h-full w-full cursor-pointer rounded-md border-gray-300 opacity-0'
                            />
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className='mt-6 grid grid-cols-12 gap-6'>
                      <div className='col-span-12 sm:col-span-6'>
                        <label
                          htmlFor='first-name'
                          className='block text-sm font-medium text-gray-700'
                        >
                          First name
                        </label>
                        <input
                          type='text'
                          name='first-name'
                          id='first-name'
                          autoComplete='given-name'
                          className='mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm'
                        />
                      </div>

                      <div className='col-span-12 sm:col-span-6'>
                        <label
                          htmlFor='last-name'
                          className='block text-sm font-medium text-gray-700'
                        >
                          Last name
                        </label>
                        <input
                          type='text'
                          name='last-name'
                          id='last-name'
                          autoComplete='family-name'
                          className='mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm'
                        />
                      </div>

                      <div className='col-span-12'>
                        <label
                          htmlFor='url'
                          className='block text-sm font-medium text-gray-700'
                        >
                          URL
                        </label>
                        <input
                          type='text'
                          name='url'
                          id='url'
                          className='mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm'
                        />
                      </div>

                      <div className='col-span-12 sm:col-span-6'>
                        <label
                          htmlFor='company'
                          className='block text-sm font-medium text-gray-700'
                        >
                          Company
                        </label>
                        <input
                          type='text'
                          name='company'
                          id='company'
                          autoComplete='organization'
                          className='mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm'
                        />
                      </div>
                    </div>
                  </div>

                  {/* Privacy section */}
                  <div className='divide-y divide-gray-200 pt-6'>
                    <div className='px-4 sm:px-6'>
                      <div>
                        <h2 className='text-lg font-medium leading-6 text-gray-900'>
                          Privacy
                        </h2>
                        <p className='mt-1 text-sm text-gray-500'>
                          Ornare eu a volutpat eget vulputate. Fringilla commodo
                          amet.
                        </p>
                      </div>
                      <ul role='list' className='mt-2 divide-y divide-gray-200'>
                        <Switch.Group
                          as='li'
                          className='flex items-center justify-between py-4'
                        >
                          <div className='flex flex-col'>
                            <Switch.Label
                              as='p'
                              className='text-sm font-medium text-gray-900'
                              passive
                            >
                              Available to hire
                            </Switch.Label>
                            <Switch.Description className='text-sm text-gray-500'>
                              Nulla amet tempus sit accumsan. Aliquet turpis sed
                              sit lacinia.
                            </Switch.Description>
                          </div>
                          <Switch
                            checked={availableToHire}
                            onChange={setAvailableToHire}
                            className={classNames(
                              availableToHire ? 'bg-teal-500' : 'bg-gray-200',
                              'relative ml-4 inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2'
                            )}
                          >
                            <span
                              aria-hidden='true'
                              className={classNames(
                                availableToHire
                                  ? 'translate-x-5'
                                  : 'translate-x-0',
                                'inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
                              )}
                            />
                          </Switch>
                        </Switch.Group>
                        <Switch.Group
                          as='li'
                          className='flex items-center justify-between py-4'
                        >
                          <div className='flex flex-col'>
                            <Switch.Label
                              as='p'
                              className='text-sm font-medium text-gray-900'
                              passive
                            >
                              Make account private
                            </Switch.Label>
                            <Switch.Description className='text-sm text-gray-500'>
                              Pharetra morbi dui mi mattis tellus sollicitudin
                              cursus pharetra.
                            </Switch.Description>
                          </div>
                          <Switch
                            checked={privateAccount}
                            onChange={setPrivateAccount}
                            className={classNames(
                              privateAccount ? 'bg-teal-500' : 'bg-gray-200',
                              'relative ml-4 inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2'
                            )}
                          >
                            <span
                              aria-hidden='true'
                              className={classNames(
                                privateAccount
                                  ? 'translate-x-5'
                                  : 'translate-x-0',
                                'inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
                              )}
                            />
                          </Switch>
                        </Switch.Group>
                        <Switch.Group
                          as='li'
                          className='flex items-center justify-between py-4'
                        >
                          <div className='flex flex-col'>
                            <Switch.Label
                              as='p'
                              className='text-sm font-medium text-gray-900'
                              passive
                            >
                              Allow commenting
                            </Switch.Label>
                            <Switch.Description className='text-sm text-gray-500'>
                              Integer amet, nunc hendrerit adipiscing nam.
                              Elementum ame
                            </Switch.Description>
                          </div>
                          <Switch
                            checked={allowCommenting}
                            onChange={setAllowCommenting}
                            className={classNames(
                              allowCommenting ? 'bg-teal-500' : 'bg-gray-200',
                              'relative ml-4 inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2'
                            )}
                          >
                            <span
                              aria-hidden='true'
                              className={classNames(
                                allowCommenting
                                  ? 'translate-x-5'
                                  : 'translate-x-0',
                                'inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
                              )}
                            />
                          </Switch>
                        </Switch.Group>
                        <Switch.Group
                          as='li'
                          className='flex items-center justify-between py-4'
                        >
                          <div className='flex flex-col'>
                            <Switch.Label
                              as='p'
                              className='text-sm font-medium text-gray-900'
                              passive
                            >
                              Allow mentions
                            </Switch.Label>
                            <Switch.Description className='text-sm text-gray-500'>
                              Adipiscing est venenatis enim molestie commodo eu
                              gravid
                            </Switch.Description>
                          </div>
                          <Switch
                            checked={allowMentions}
                            onChange={setAllowMentions}
                            className={classNames(
                              allowMentions ? 'bg-teal-500' : 'bg-gray-200',
                              'relative ml-4 inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2'
                            )}
                          >
                            <span
                              aria-hidden='true'
                              className={classNames(
                                allowMentions
                                  ? 'translate-x-5'
                                  : 'translate-x-0',
                                'inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
                              )}
                            />
                          </Switch>
                        </Switch.Group>
                      </ul>
                    </div>
                    <div className='mt-4 flex justify-end py-4 px-4 sm:px-6'>
                      <button
                        type='button'
                        className='inline-flex justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2'
                      >
                        Cancel
                      </button>
                      <button
                        type='submit'
                        className='ml-5 inline-flex justify-center rounded-md border border-transparent bg-sky-700 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-sky-800 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2'
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </main>
      </div>
      <div className='profile'>
        <header className='profileHeader'>
          <p className='pageHeader'>My Profile</p>
          <button type='button' className='logOut' onClick={onLogout}>
            Logout
          </button>
        </header>
        <main>
          <div className='profileDetailsHeader'>
            <p className='profileDetailsText'>Personal Details</p>
            <p
              className='changePersonalDetails'
              onClick={() => {
                changeDetails && onSubmit()
                setChangeDetails((prevState) => !prevState)
              }}
            >
              {changeDetails ? 'done' : 'change'}
            </p>
          </div>
          <div className='profileCard'>
            <form>
              <input
                type='text'
                id='name'
                className={!changeDetails ? 'profileName' : 'profileNameActive'}
                disabled={!changeDetails}
                value={name}
                onChange={onChange}
              />
              <input
                type='email'
                id='email'
                className={
                  !changeDetails ? 'profileEmail' : 'profileEmailActive'
                }
                disabled={!changeDetails}
                value={email}
                onChange={onChange}
              />
            </form>
          </div>
          <Link to='/create-listing' className='createListing'>
            <img src={homeIcon} alt='home' />
            <p>Sell or rent your home</p>
            <img src={arrowRight} alt='arrow right' />
          </Link>
        </main>
      </div>
    </>
  )
}

export default Profile
