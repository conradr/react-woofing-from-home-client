import React from 'react'
import Search from './Search'
import Chats from './Chats'
import ChatNavbar from './ChatNavbar'

const Sidebar = () => {
  return (
    <>
      <nav
        aria-label='Sidebar'
        className='sticky top-6 divide-y divide-gray-300'
      >
        <ul role='list' className='divide-y divide-gray-200'>
        <ChatNavbar />
        <Chats />
        </ul>
      </nav>
 
    </>
  )
}

export default Sidebar
