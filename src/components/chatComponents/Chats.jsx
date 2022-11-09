import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/authContext";
import {ChatContext} from '../../context/chatContext'
import { db } from "../../firebase.config";

const Chats = () => {
  const [chats, setChats] = useState([]);

  const { currentUser } = useContext(AuthContext);

  console.log(currentUser)
  const { dispatch } = useContext(ChatContext);

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data());
      });

      return () => {
        unsub();
      };
    };

    currentUser.uid && getChats();
  }, [currentUser.uid]);

  const handleSelect = (u) => {
    dispatch({ type: "CHANGE_USER", payload: u });
  };

  return (
    <>
      {Object.entries(chats)
        ?.sort((a, b) => b[1].date - a[1].date)
        .map((chat) => (
          <li
            key={chat[0]}
            onClick={() => handleSelect(chat[1].userInfo)}
            className='flex py-4'
          >
            <img
              className='h-10 w-10 rounded-full'
              src={chat[1].userInfo.photoURL}
              alt=''
            />
            <div className='ml-3'>
              <p className='text-sm font-medium text-gray-900'>
                {chat[1].userInfo.displayName}
              </p>
              <p className='text-sm text-gray-500'>
                {chat[1].lastMessage?.text}
              </p>
            </div>
          </li>
        ))}
  
    </>
  )
};

export default Chats;
