import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Navbar from './components/Navbar'
import PrivateRoute from './components/PrivateRoute'
import Homepage from './pages/Homepage'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import Profile from './pages/Profile'
import FinishProfile from './pages/FinishProfile'
import UploadImages from './pages/UploadImages'

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path='/sign-up' element={<SignUp />} />
          <Route path='/sign-in' element={<SignIn />} />
          <Route path='/profile' element={<PrivateRoute />}>
            <Route path='/profile' element={<Profile />} />
          </Route>
          <Route path='/finish-profile' element={<PrivateRoute />}>
            <Route path='/finish-profile' element={<FinishProfile />} />
          </Route>
          <Route path='/upload-images' element={<PrivateRoute />}>
            <Route path='/upload-images' element={<UploadImages />} />
          </Route>
        </Routes>

        <ToastContainer />
        <Navbar />
      </Router>
    </>
  )
}

export default App
