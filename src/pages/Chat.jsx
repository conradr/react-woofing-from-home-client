import React from 'react'
import '../style.scss'
import SideBar from '../components/chatComponents/Sidebar'
import Chat from '../components/chatComponents/Chat'

const Home = () => {
  return (
    <>
      <div className='py-6'>
        <div className='mx-auto max-w-3xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-12 lg:gap-8 lg:px-8'>
          <div className='lg:col-span-3 lg:block xl:col-span-3'>
            <SideBar />
          </div>
          <main className='lg:col-span-9 xl:col-span-9'>
            <div class='flex-1 p:2 sm:p-6 justify-between flex flex-col h-screen'>
              
                <Chat />
              </div>
          </main>
        </div>
      </div>
    </>
  )
}

export default Home
