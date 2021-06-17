import React, { useState, useContext, useEffect } from 'react';
import { BsListTask } from 'react-icons/bs';
import ClassChat from './ClassChat';
import Classfooter from './Classfooter';
import { useHistory } from 'react-router-dom';
import AuthContext from '../../../context/auth/AuthContext';
import './classroom.css';
import Room from './Room';

import imgtry from '../../assets/img/1.jpg';

import img1 from '../../assets/classImages/img1.png';
import img2 from '../../assets/classImages/img2.png';
import img3 from '../../assets/classImages/img3.png';
import img4 from '../../assets/classImages/img4.png';
import img5 from '../../assets/classImages/img5.png';
import img6 from '../../assets/classImages/img6.png';
import MyModal from "../../myModal/Modal";
import EditClass from "./EditClass";
function ClassRoom() {
  const authContext = useContext(AuthContext);
  const {
    isAdd,
    participants,
    myCreatedClass,
    allMyClasses,
    clearFilter,
    user,
    filtered,
    loadUser,
    getLearnersClassroom,
    classConversation,
    createAClassConversation,
    learnerClass,
  } = authContext;

  const classPics = [img1, img2, img3, img4, img5];
  const history = useHistory();
  const navigateTo = () => history.push('/Classchat');
  const [myClasses, setMyClasses] = useState([]);
  const [alreadySet, setalreadySet] = useState(0);
  const [aLearnersClass, setALearnersClass] = useState([]);
  const [loggedUser, setloggedUser] = useState(undefined);
  const [handleModal, sethandleModal] = useState('none');
  const [modalData, setmodalData] = useState({});

  const [classModalstate, setclassModalstate] = useState('none');

  useEffect(() => {
    if (myClasses.length > 0) {
      // console.log(myClasses);
      setalreadySet(1);
    }
  }, [myClasses]);

  
  useEffect(async () => {
    loadUser();
  }, []);

  let theID = user && user._id;

  useEffect(() => {
    loadUser();
  }, []);
  useEffect(() => {
    if (myClasses.length > 0) {
      setalreadySet(1);
    }
  }, [myClasses]);

  useEffect(async () => {
    try {
      user && getLearnersClassroom(user._id);
    } catch (err) {
      console.log(err);
    }
  }, [theID]);
  useEffect(async () => {
    // Object(user).hasOwnProperty("_id") && getLearnersClassroom(user._id);

    try {
      if (Array.isArray(learnerClass)) {
        new Promise(async (resolve, reject) => {
          let temp = [...learnerClass];
          temp.map(
            (singleClass) =>
              (singleClass.bg = classPics[Math.floor(Math.random() * 7)])
          );

          resolve(temp);
        }).then(async (newClasses) => {
          await setALearnersClass(learnerClass);
        });
      } else {
        console.log('no from learner class');
      }
    } catch (err) {
      console.error(err + 'error from MainclassEntry');
    }
  }, [learnerClass]);

  useEffect(async () => {
    try {
      await myCreatedClass();

      if (alreadySet === 0) {
        if (
          Object(allMyClasses).hasOwnProperty('classroom') &&
          Array.isArray(learnerClass)
        ) {
          new Promise(async (resolve, reject) => {
            await setalreadySet(1);
            let temp = [...allMyClasses.classroom, ...learnerClass];
            temp.map(
              (singleClass) =>
                (singleClass.bg = classPics[Math.floor(Math.random() * 7)])
            );

            resolve(temp);
          }).then(async (newClasses) => await setMyClasses(newClasses));
        } else {
          console.log('no');
        }
      }
    } catch (err) {
      console.log(err);
    }
  }, [allMyClasses, learnerClass]);

  const classroomModaltoggle = () => {
    if (classModalstate === "flex") {
      setclassModalstate("none");
    } else {
      setclassModalstate("flex");
    }
  };

  const createClass = () => {
    console.log("class created");
    classroomModaltoggle();
  };
  
  return (
    <div className="" style={{ width: '100%' }}>
       <MyModal
        modalHeader={"Edit Class"}
        toggleModal={classroomModaltoggle}
        modalStatus={classModalstate}
        component={<EditClass/>}
        header_bg={""}
      />
      <div className="back">
        <div className="classes">
          <div className="tutor">
          <h4> <span className='tutorName' >tutoring</span>/tutored</h4>
          </div>
          <div className="w-100 d-flex mt-5" style={{ flexWrap: 'wrap' }}>
            {myClasses.map((e, index) => (
              <Room e={e} key={index} />
            ))}
          </div>
        </div>
        <div className="contener">
          <div className="classcont">
            <div className="top">
              <div className="about">
                <p className="subject">Basics of english language</p>
                <p className="teacher">Tutor: Mr Colins More</p>
              </div>
              <div className="task">
                <p className="thread">New Thread</p>
                <div className="dropdown">
                <BsListTask className='dropbtn' size={20} style={{cursor:'pointer'}}/>
                <div className="dropdown-content">
                        <div  onClick={() => createClass()} className="createclassText">Edit Profile</div>
                      </div>
                </div>
               
              </div>
            </div>
            <div className="chats">
              <ClassChat />
            </div>
          </div>
          <Classfooter />
        </div>
      </div>
    </div>
  );
}

export default ClassRoom;
