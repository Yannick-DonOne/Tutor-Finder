import React, { useContext, useEffect, useState } from 'react';
import images from '../../assets/classroom/images.jpg';
import AuthContext from '../../../context/auth/AuthContext';
import './user.css';
const PF = 'http://localhost:5000/images/';

function ClassUser({ parti }) {
  const authContext = useContext(AuthContext);
  const { storePaticipant, storePDATA } = authContext;

  const added = async () => {
    try {
      let PID = await parti._id;
      storePaticipant(PID);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="pack ">
      <div className="d-flex align-items-center w-100">
        <div style={{ width: '50px', height: '50px' }}>
          <img
            src={
              parti.profilePic === ''
                ? 'http://www.iconarchive.com/download/i102645/graphicloads/flat-finance/person.ico'
                : PF + parti.profilePic
            }
            width="50px"
            height="50px"
            className="pix"
            alt=""
          />
        </div>
        <div className="ml-3 mr-auto">{parti.username}</div>
        <button
          className="btn btn_add btn-warning px-5 py-3"
          variant="outline-success"
          onClick={added}
        >
          Add
        </button>
      </div>
    </div>
  );
}

export default ClassUser;
