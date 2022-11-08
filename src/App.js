import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import PrivateRoute from './components/PrivateRoute'
import Homepage from './pages/Homepage'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import Profile from './pages/Profile'
import FinishProfile from './pages/FinishProfile'
import UploadImages from './pages/UploadImages'
import UploadProfileImage from './pages/UploadProfileImage'
import SuitabilityForm from './pages/SuitabilityForm'
import MatchProfile from './pages/MatchProfile'
import HeaderNav from './components/HeaderNav'
import HeaderTitle from './components/HeaderTitle'
import AddDog from './pages/AddDog'
import AllMatches from './pages/AllMatches'
import Faq from './pages/Faq'
import AboutUs from './pages/AboutUs'
import Footer from './components/Footer'

import ContactUs from './pages/ContactUs'

import { AuthContextProvider } from './context/authContext'
import { ChatContextProvider } from './context/chatContext'
import Chat from './pages/Chat'


function App() {
  return (
    <>

      <AuthContextProvider>
        <ChatContextProvider>
        <Router>
          <HeaderNav />
          <HeaderTitle />
          <main className='-mt-4'>
            <div className='mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8'>
              <div className='rounded-lg bg-white px-5 py-6 shadow sm:px-6'>
                <Routes>
                  <Route path='/' element={<Homepage />} />
                  <Route path='/contactus' element={<ContactUs/>}/>
                  <Route path='/faq' element={<Faq />} />
                  <Route path='/about' element={<AboutUs />} />
                  <Route path='/sign-up' element={<SignUp />} />
                  <Route path='/sign-in' element={<SignIn />} />
                  <Route path='/profile' element={<PrivateRoute />}>
                    <Route path='/profile' element={<Profile />} />
                  </Route>
                  <Route path='/finish-profile' element={<PrivateRoute />}>
                    <Route path='/finish-profile' element={<FinishProfile />} />
                  </Route>

                  <Route
                    path='/upload-profile-image'
                    element={<PrivateRoute />}
                  >
                    <Route
                      path='/upload-profile-image'
                      element={<UploadProfileImage />}
                    />
                  </Route>
                  <Route path='/upload-images' element={<PrivateRoute />}>
                    <Route path='/upload-images' element={<UploadImages />} />
                  </Route>
                  <Route path='/suitability-form' element={<PrivateRoute />}>
                    <Route
                      path='/suitability-form'
                      element={<SuitabilityForm />}
                    />
                  </Route>
                  <Route path='/add-dog' element={<PrivateRoute />}>
                    <Route path='/add-dog' element={<AddDog />} />
                  </Route>
                  <Route path='/matches' element={<PrivateRoute />}>
                    <Route path='/matches' element={<AllMatches />} />
                  </Route>
                  
                  <Route path='/chat' element={<PrivateRoute />}>
                    <Route path='/chat' element={<Chat />} />
                  </Route>



                  <Route path='/matches/:matchID' element={<MatchProfile />} />

                  <Route path='/matches/:matchID/:customer2Id' element={<MatchProfile />} />

                </Routes>
                <ToastContainer />
              </div>
            </div>
          </main>
          <Footer />
        </Router>
          </ChatContextProvider>
      </AuthContextProvider>
    </>
  )
}

export default App
