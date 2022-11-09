import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import visibilityIcon from '../assets/svg/visibilityIcon.svg'
import { async } from '@firebase/util'
import OAuth from '../components/OAuth'

import boneLogo from '../assets/svg/boneLogo.svg'

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const { email, password } = formData

  const navigate = useNavigate()

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()

    try {
      const auth = getAuth()

      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      )

      if (userCredential.user) {
        navigate('/matches')
      }
    } catch (error) {
      toast.error('User not found')
    }
  }

  return (
    <>
      <main>
        <div className='flex min-h-full'>
          <div className='flex flex-1 flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24'>
            <div className='mx-auto w-full max-w-sm lg:w-96'>
              <div>
                <img
                  className='h-12 w-auto'
                  src={boneLogo}
                  alt='Your Company'
                />
                <h2 className='mt-6 text-3xl font-bold tracking-tight text-gray-900'>
                  Sign in to your account
                </h2>
                <p className='mt-2 text-center text-sm text-gray-600'>
                  Don't have an account?
                  <Link
                    to='/sign-up'
                    className='font-medium text-cyan-600 hover:text-cyan-500'
                  >
                    Sign up
                  </Link>
                </p>
              </div>

              <div className='mt-8'>
                <OAuth />

                <div className='mt-6'>
                  <form onSubmit={onSubmit} className='space-y-6'>
                    <div>
                      <label
                        htmlFor='email'
                        className='block text-sm font-medium text-gray-700'
                      >
                        Email address
                      </label>
                      <div className='mt-1'>
                        <input
                          id='email'
                          name='email'
                          type='email'
                          autoComplete='email'
                          value={email}
                          onChange={onChange}
                          required
                          className='block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-cyan-500 focus:outline-none focus:ring-cyan-500 sm:text-sm'
                        />
                      </div>
                    </div>

                    <div className='space-y-1'>
                      <label
                        htmlFor='password'
                        className='block text-sm font-medium text-gray-700'
                      >
                        Password
                      </label>
                      <div className='mt-1 relative'>
                        <input
                          id='password'
                          name='password'
                          type={showPassword ? 'text' : 'password'}
                          autoComplete='current-password'
                          value={password}
                          onChange={onChange}
                          required
                          className='block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-cyan-500 focus:outline-none focus:ring-cyan-500 sm:text-sm'
                        />
                        <div className='absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5'>
                          <img
                            src={visibilityIcon}
                            alt='show password'
                            className='pointer'
                            onClick={() =>
                              setShowPassword((prevState) => !prevState)
                            }
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <button
                        type='submit'
                        className='flex w-full justify-center rounded-md border border-transparent bg-rose-500 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-rose-600 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2'
                      >
                        Sign in
                      </button>
                    </div>
                    <div className='flex items-center justify-between'>
                      <div className='text-sm'>
                        <Link
                          to='/forgot-password'
                          className='font-medium text-cyan-600 hover:text-cyan-500'
                        >
                          Forgot your password?
                        </Link>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className='relative hidden w-0 flex-1 lg:block'>
            <img
              className='absolute inset-0 h-full w-full object-cover'
              src='https://images.unsplash.com/photo-1588943211346-0908a1fb0b01?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2535&q=80'
              alt=''
            />
          </div>
        </div>
      </main>
      {/* todo - remove breaks */}
      <br />
      <br />
    </>
  )
}

export default SignIn
