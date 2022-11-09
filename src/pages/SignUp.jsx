import {
  createUserWithEmailAndPassword, getAuth, updateProfile
} from 'firebase/auth'
import { doc, serverTimestamp, setDoc } from 'firebase/firestore'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import boneLogo from '../assets/svg/boneLogo.svg'
import googleIcon from '../assets/svg/googleIcon.svg'
import OAuth from '../components/OAuth'
import visibilityIcon from '../assets/svg/visibilityIcon.svg'
import { db } from '../firebase.config'

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    photoUrl: '',
    imgUrls: ''
  })

  const { name, email, password } = formData

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
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      )

      const user = userCredential.user

      updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: "https://firebasestorage.googleapis.com/v0/b/woofing-from-home.appspot.com/o/images%2Fprofile-default.png?alt=media&token=b393541c-8ad8-4b57-a70f-f2b4d236fa1f"
      })

      //create a copy of the form in state
      // const formDataCopy = { ...formData }

      //we don't want to save the password to the database
      // delete formDataCopy.password

      //get the time from the server
      // formDataCopy.timestamp = serverTimestamp()

      //add the user to the database
      // we don't need to remove the password, just create a new object with the data we need.
      await setDoc(doc(db, 'users', user.uid), {
        name,
        email,
        photoURL : "https://firebasestorage.googleapis.com/v0/b/woofing-from-home.appspot.com/o/images%2Fprofile-default.png?alt=media&token=b393541c-8ad8-4b57-a70f-f2b4d236fa1f",
        imgUrls: [
          "https://firebasestorage.googleapis.com/v0/b/woofing-from-home.appspot.com/o/images%2Fprofile4.png?alt=media&token=92d4ad56-f366-4624-9ee5-d06e60b12899]",
          "https://firebasestorage.googleapis.com/v0/b/woofing-from-home.appspot.com/o/images%2Fprofile3.png?alt=media&token=6c4b4516-7a15-4756-8212-7df6d6ba13cf",
          "https://firebasestorage.googleapis.com/v0/b/woofing-from-home.appspot.com/o/images%2Fprofile2.png?alt=media&token=24e3cbb7-5052-45a6-ad0b-c4d10400aa65",
          "https://firebasestorage.googleapis.com/v0/b/woofing-from-home.appspot.com/o/images%2Fprofile1.png?alt=media&token=b16abbae-37f5-4fb5-a558-b9c21bcdcec3"],
        timestamp: serverTimestamp(),
        uid: user.uid,
      });
      await setDoc(doc(db, "userChats", user.uid), {});
      navigate('/finish-profile')
    } catch (error) {
      toast.error('Something went wrong with registration')
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
                  Sign up for an account
                </h2>
                <p className='mt-2 text-center text-sm text-gray-600'>
                  Already have an account?
                  <Link
                    to='/sign-in'
                    className='font-medium text-indigo-600 hover:text-indigo-500'
                  >
                    Sign In
                  </Link>
                </p>
              </div>

              <div className='mt-8'>
                <OAuth/>

                <div className='mt-6'>
                  <form onSubmit={onSubmit} className='space-y-6'>
                    <div>
                      <label
                        htmlFor='name'
                        className='block text-sm font-medium text-gray-700'
                      >
                        Name
                      </label>
                      <div className='mt-1'>
                        <input
                          id='name'
                          name='name'
                          type='text'
                          autoComplete='name'
                          value={name}
                          onChange={onChange}
                          required
                          className='block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
                        />
                      </div>
                    </div>

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
                          className='block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
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
                          className='block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
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
                        className='flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
                      >
                        Sign up
                      </button>
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
    <br/>
    <br/>
    </>
  )
}

export default SignUp
