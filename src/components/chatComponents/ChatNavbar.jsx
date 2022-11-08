import React, { useContext } from 'react'
import { AuthContext } from "../../context/authContext";


const ChatNavbar = () => {
  const {currentUser} = useContext(AuthContext)

  return (
    <div className='chat-navbar'>
      <span className="logo">Woofing Chat</span>
      <div className="user">
        <img src={currentUser.photoURL} alt="" />
        <span>{currentUser.displayName}</span>
      </div>
    </div>
  )
}

export default ChatNavbar