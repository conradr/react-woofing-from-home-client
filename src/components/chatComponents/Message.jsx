import React, { useContext, useEffect, useRef } from 'react'
import { AuthContext } from '../../context/authContext'
import { ChatContext } from '../../context/chatContext'

const Message = ({ message }) => {
  const { currentUser } = useContext(AuthContext)
  const { data } = useContext(ChatContext)

  const ref = useRef()

  // useEffect(() => {
  //   ref.current?.scrollIntoView({ behavior: 'smooth' })
  // }, [message])

  return (
    <div
      ref={ref}
      className='chat-message'
    >
      <div
        className={`${
          message.senderId === currentUser.uid
            ? 'flex items-end'
            : 'flex items-end justify end float-right'
        }
          `}
      >
        <div
          className={`${
            message.senderId === currentUser.uid
              ? 'flex flex-col space-y-2 text-m max-w-l mx-2 order-2 items-start'
              : 'flex flex-col space-y-2 text-m max-w-l mx-2 order-1 items-end'
          }
          `}
        >
          <div>
            <span
              className={`${
                message.senderId === currentUser.uid
                  ? 'px-4 py-2 rounded-lg inline-block rounded-br-none bg-blue-600 text-white '
                  : 'px-4 py-2 rounded-lg inline-block bg-gray-300 text-gray-600'
              }
          `}
            >
              {message.text}
              {message.img && (
                <img
                  src={message.img}
                  className={`${
                    message.senderId === currentUser.uid
                      ? 'w-6 h-6 rounded-full order-1'
                      : 'w-6 h-6 rounded-full order-2'
                  }
          `}
                  alt=''
                />
              )}
            </span>
          </div>
        </div>
        <img
          src={
            message.senderId === currentUser.uid
              ? currentUser.photoURL
              : data.user.photoURL
          }
          className={`${
            message.senderId === currentUser.uid
              ? 'w-6 h-6 rounded-full order-1'
              : 'w-6 h-6 rounded-full order-2'
          }
          `}
        />
      </div>
    </div>
  )
}

export default Message
