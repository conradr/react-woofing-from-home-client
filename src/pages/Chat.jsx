import React from 'react'
import "../style.scss";
import SideBar from '../components/chatComponents/Sidebar'
import Chat from '../components/chatComponents/Chat'


const Home = () => {
  return (
    <div className='home'>
      <div className="container">
        <SideBar />
        <Chat/>
      </div>
    </div>
  )
}

export default Home