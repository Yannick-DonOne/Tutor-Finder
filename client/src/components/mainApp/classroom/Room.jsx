import React, { useContext, useState, useEffect } from 'react';
import './classroom.css';
// import './myclassroom.css'
import { useHistory } from 'react-router-dom';
import imgtry from '../../assets/img/1.jpg';
import AuthContext from '../../../context/auth/AuthContext';

function Room({ room, e }) {
  const authContext = useContext(AuthContext);

  const {
    classMessaging,
    createAClassMessage,
    getClassMsg,
    getClassMessages,
  } = authContext;

  const history = useHistory();
  const navigateTo = () => history.push('/Classchat');

  const chatting = async () => {
    try {
      let ID = await e._id;

      getClassMsg(ID);
      // console.log('from component ' + ID);
      localStorage.setItem('CLASSID', ID);
      localStorage.setItem('CLASSNAME', e.className);
      localStorage.setItem('TUTORNAME', e.tutorName);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      onClick={chatting}
      className="rooms p-5"
      style={{
        backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.22), 
                rgba(0, 0, 0, 0.33)),url("${e.bg}")`,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        color: 'white',
      }}
    >
      <div className="away">
        <div className="every">
          <div className="tities">
            <h3>Course ID : {e.classCode} </h3>
            <h4>Title:{e.className}</h4>
          </div>
        </div>
        <div className="giveme">
          <div className="giveaway">
            <div
              className="d-flex rounded-circle justify-content-center align-items-center bg-light"
              style={{ width: 53, height: 53 }}
            >
              <img
                className="rounded-circle"
                src={imgtry}
                width="50"
                height="50"
                alt=""
              />
            </div>
          </div>
          <div className="mignon">
            <span className="h4 ml-3 font-weight-bold align-self-center">
              {e.tutorName}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Room;
