import React, { useContext, useState, useEffect } from 'react';
import { FiMoreVertical } from 'react-icons/fi';
import './classroom.css';
import AuthContext from '../../../context/auth/AuthContext';
import { format } from 'timeago.js';

function ClassChat() {
  const PF = 'http://localhost:5000/images/';

  const authContext = useContext(AuthContext);

  const {
    classMessaging,
    createAClassMessage,
    getClassMsg,
    getClassMessages,
    user,
  } = authContext;

  useEffect(async () => {
    try {
      let conversationId = await localStorage.getItem('CLASSID');
      getClassMsg(conversationId);
    } catch (error) {
      console.log(error);
    }
  }, [localStorage.getItem('CLASSID'), classMessaging]);

  const [storeChat, setStoreChat] = useState();

  useEffect(async () => {
    setStoreChat(getClassMessages.message);
  }, [getClassMessages.message]);
  return (
    <div className='px-4 border-md border-right-' >
      {typeof storeChat === 'object' &&
        storeChat.map((chatData) => (
          <div className=" p-3  m-3">
            <div className='msgX w-100 px-4 border-md border-right- '
              style={{
                backgroundColor:
                  chatData.sender[0]._id === user && user._id ? 'teal' : 'pink',
                alignItems:
                  chatData.sender[0]._id === user && user._id
                    ? 'flex-end'
                    : null,
              }}
            >
              <div className='hit'>
                <div className="circlemode">
               <div className="imgavatar">
               <img
                    src={
                      PF + chatData.sender[0].profilePic === ''
                        ? 'http://www.iconarchive.com/download/i102645/graphicloads/flat-finance/person.ico'
                        : PF + chatData.sender[0].profilePic
                    }
                    alt=""
                    height="50px"
                    width="50px"
                    borderRadius='50%'
                  />
               </div>
                <div className="msghead">
                <h2 className="text-white">
                    {' '}
                    {chatData.sender[0].username}{' '}
                  </h2>
                  </div> 
                </div>
               <div className="msgbody">
               <h2> {chatData.text} </h2>
               </div> 
                <span className="text-secondary mb-4">
                  {format(chatData.createdAt)}{' '}
                </span>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}

export default ClassChat;
