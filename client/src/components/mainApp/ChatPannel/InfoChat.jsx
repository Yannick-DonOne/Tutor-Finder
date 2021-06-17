import React, { useEffect, useState } from 'react';
import Chatlist from './Chatlist';
import Searchbar from './Searchbar';
import { Button } from 'react-bootstrap';
import { ArrowLeftSquare } from 'react-bootstrap-icons';
import AuthContext from '../../../context/auth/AuthContext';
import { useContext } from 'react';
const PF = 'http://localhost:5000/images/';

function InfoChat() {
  const authContext = useContext(AuthContext);
  const { user } = authContext;
  return (
    <div className="infochat">
      <div className="info-header">
        <ArrowLeftSquare className="arrow" size={36} />
        <div className="bar">
          <Button variant="none" style={{ width: '175px', height: '65px' }}>
            <i
              className="fas fa-bars"
              style={{ width: '80px', height: '45px', marginLeft: '2em' }}
            ></i>
          </Button>
        </div>
        <div className="topnav" id="myTopnav">
          <a href="#home" class="active">
            Home
          </a>
          <a href="#news">News</a>
          <a href="#contact">Contact</a>
          <a href="#about">About</a>
        </div>
        <h1>Chatting</h1>
      </div>
      <div className="info-person">
        <div className="avatar-contain">
          <div className="avatar">
            <img className="avatar-img" src={user && PF + user.profilePic} />
          </div>
        </div>
        <div className="person-name">
          <h2>{user && user.username}</h2>
        </div>
      </div>
      <div className="chat-list">
        <Searchbar />
        <div className="chatlinks">
          <Chatlist />
        </div>
      </div>
    </div>
  );
}

export default InfoChat;
