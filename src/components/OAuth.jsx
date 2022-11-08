import googleIcon from '../assets/svg/googleIcon.svg'
import {useLocation, useNavigate, useNavigation} from 'react-router-dom'
import {getAuth, signInWithPopup, GoogleAuthProvider} from 'firebase/auth'
import {doc, setDoc, getDoc, serverTimestamp} from 'firebase/firestore'
import {db} from "../firebase.config"
import {toast} from 'react-toastify'

const OAuth = () => {

    const navigate = useNavigate()
    const location = useLocation()

    const onGoogleClick = async ()=> {
        try{
            const auth = getAuth()
            const provider = new GoogleAuthProvider()
            const result = await signInWithPopup(auth, provider)
            const user = result.user
            //check if user already exists in DB
            const docRef = doc(db, 'users', user.uid)
            const docSnap = await getDoc(docRef)
            //if user doesn't exist, create user
            if(!docSnap.exists()){
                await setDoc(doc(db, 'users', user.uid), {
                    name : user.displayName,
                    email: user.email,
                    timestamp: serverTimestamp()
                })
            }
            if(location.pathname === '/sign-up'){
            navigate('/finish-profile')}
            else navigate('/matches')
        }
        catch(error){
            toast.error('Could not authorise with Google')
        }

    }

  return (
        <div>
        <div>
        <p className='text-sm font-medium text-gray-700'>
        Sign {location.pathname === '/sign-up' ? 'up':'in'} with Google
        </p>

        <div className='mt-1 grid grid-cols-1 gap-3'>
            <div>
            <button
                onClick={onGoogleClick}
                className='inline-flex w-full justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-500 shadow-sm hover:bg-gray-50'
            >
                <span className='sr-only'>Sign up with Google</span>
                <img className='h-4 w-4' src={googleIcon}/>
            </button>
            </div>
        </div>
        </div>

        <div className='relative mt-6'>
        <div
            className='absolute inset-0 flex items-center'
            aria-hidden='true'
        >
            <div className='w-full border-t border-gray-300' />
        </div>
        <div className='relative flex justify-center text-sm'>
            <span className='bg-white px-2 text-gray-500'>
            Or continue with
            </span>
        </div>
        </div>
    </div>
  )
}

export default OAuth