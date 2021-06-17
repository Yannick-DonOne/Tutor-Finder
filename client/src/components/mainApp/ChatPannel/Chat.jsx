import React, { useContext, useState, useEffect, useRef } from 'react';
// import Message from './Message';
import AuthContext from '../../../context/auth/AuthContext';
import './chat.css';
import axios from 'axios';
import { format } from 'timeago.js';
import yaya1 from '../../assets/yaya1.jpg';
import { io } from 'socket.io-client';
import Chatlist from './Chatlist';
import Searchbar from './Searchbar';
import { Button } from 'react-bootstrap';
import {
  ArrowLeftSquare,
  ThreeDotsVertical,
  Paperclip,
} from 'react-bootstrap-icons';
import { GrSend } from 'react-icons/gr';
import './chat.css';
import MsgRcd from './MsgRcd';

function Chat() {
  const PF = 'http://localhost:5000/images/';

  const authContext = useContext(AuthContext);
  const {
    user,
    getConversation,
    conversation,
    loadUser,
    getMsg,
    myMsg,
    anewMsg,
    createMessage,
  } = authContext;
  const [myConv, setMyConv] = useState();

  const [currentChat, setCurrentChat] = useState();
  const [addedMsg, setAddedMsg] = useState();
  const [conversationId, setconversationId] = useState('');
  const socket = useRef();
  const [tryIt, setTryIt] = useState();
  const [arrivalMessage, setArrivalMessage] = useState(null);

  const [newUser, setnewUser] = useState();

  const [newMsg, setNewMsg] = useState({
    text: '',
  });
  if (Object(socket).hasOwnProperty('current')) {
    // console.log(socket.current);
    if (Object(socket.current).hasOwnProperty('id')) {
      console.log(socket.current);
    }
  }
  const { text } = newMsg;
  //starts here
  useEffect(() => {
    socket.current = io('ws://localhost:8900');
    socket.current.on('getMessage', (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setTryIt((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(async () => {
    if (Object(user).hasOwnProperty('_id')) {
      setnewUser(user._id);
      let userId = user._id;
      socket.current.emit('addUser', userId);
      socket.current.on('getUsers', (users) => {
        console.log(users);
      });
    }
  }, [user]);

  //ends

  // initial
  useEffect(async () => {
    await setTryIt(myMsg.message);
  }, [myMsg.message]);

  const onChange = (e) =>
    setNewMsg({ ...newMsg, [e.target.name]: e.target.value });

  const clicked = async (conv) => {
    localStorage.setItem('conv_id', conv._id);
    setconversationId(conv._id);
    setCurrentChat(conv);
    console.log(currentChat);
  };

  useEffect(async () => {
    let anID = await localStorage.getItem('conv_id');
    getMsg(anID);
  }, [anewMsg, localStorage.getItem('conv_id')]);

  useEffect(() => {
    loadUser();
  }, []);

  useEffect(async () => {
    try {
      user && getConversation(user._id);
    } catch (error) {
      console.log(error);
    }
  }, [user, conversation]);

  useEffect(async () => {
    setMyConv(conversation.conv);
  }, [conversation.conv]);

  const onSubmit = async (e) => {
    e.preventDefault();
    createMessage({ sender: user && user._id, text, conversationId });
    setNewMsg({
      senderId: newUser,
      text: '',
    });

    const receiverId = currentChat.members.find((member) => member !== newUser);
    console.log(receiverId);

    console.log(newUser + ' from new User');
    socket.current.emit('sendMessage', {
      senderId: newUser,
      receiverId,
      text,
    });
  };
  return (
    <div className="globe-scope">
      <div className="infochat">
        <div className="info-header">
          <ArrowLeftSquare className="arrow" size={36} />
          <div className="bar">
            <Button variant="none" style={{ width: '175px', height: '65px' }}>
              <i
                className="fas fa-bars"
                style={{ width: '80px', height: '45px', marginLeft: '2rem' }}
              ></i>
            </Button>
          </div>
          <div className="topnav" id="myTopnav"></div>
          <h1>Chat</h1>
        </div>
        <div className="info-person">
          <div className="avatar-contain">
            <div className="avatar">
              <img
                className="avatar-img"
                src={
                  Object(user).hasOwnProperty('profilePic') &&
                  user.profilePic === ' '
                    ? 'http://www.iconarchive.com/download/i102645/graphicloads/flat-finance/person.ico'
                    : Object(user).hasOwnProperty('profilePic') &&
                      user.profilePic !== '' &&
                      PF + user.profilePic
                }
                style={{
                  borderRadius: 50,
                }}
              />
            </div>
          </div>
          <div className="person-name">
            <h2>{user && user.username}</h2>
          </div>
        </div>
        <div className="chat-list">
          <Searchbar />
          <div className="chatlinks">
            {typeof myConv === 'object' &&
              myConv.map((conv) => (
                <div
                  onClick={() => clicked(conv)}
                  style={{
                    cursor: 'pointer',
                  }}
                  key={conv.username}
                >
                  <Chatlist conv={conv} currentUser={user} />
                </div>
              ))}
          </div>
        </div>
      </div>
      <div className="viewchat">
        <div className="chatbox">
          <div className="chatHeader">
            <div className="me">
              <div className="list-name">
                <p className="title">
                  {typeof currentChat === 'object' &&
                    currentChat.members.map((member) => (
                      <div>
                        {member.username === user.username
                          ? null
                          : member.username}
                      </div>
                    ))}
                </p>
              </div>
            </div>
            <div className="more">
              <ThreeDotsVertical size={30} />
            </div>
          </div>
          <div className="chatBody">
            <div className="messages">
              {typeof currentChat === 'undefined' ? (
                <h1>Open a conversation to start a chat</h1>
              ) : (
                <div>
                  {typeof tryIt === 'object' &&
                    tryIt.map((m) => (
                      <div
                        style={{
                          backgroundColor:
                            m.sender !== user._id ? 'red' : 'blue',
                        }}
                        className={
                          m.sender === user._id ? 'message mine' : 'message'
                        }
                      >
                        <div className=" m-5 ">
                          <MsgRcd
                            //   className=" p-3 mt-4 txt text.white "
                            m={m}
                          />
                          <p className="h5 pt-3"> {format(m.createdAt)} </p>
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </div>
            <div className="chatFooter1">
              <form onSubmit={onSubmit} className="typebar-1">
                <input
                  type="text"
                  name="text"
                  value={text}
                  onChange={onChange}
                  required
                  placeholder="Type your message"
                />
                <Paperclip size={30} />
                <button className="send-msg" type="submit">
                  {' '}
                  <GrSend size={30} />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;
