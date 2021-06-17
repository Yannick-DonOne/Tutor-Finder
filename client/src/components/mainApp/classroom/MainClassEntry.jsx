import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ClassroomHomeHeader from './classroomComponent/ClassroomHomeHeader';
import AuthContext from '../../../context/auth/AuthContext';
import CreateClassroom from './CreateClassroom';
import './myclassroom.css';

import imgtry from '../../assets/img/1.jpg';
import img1 from '../../assets/classImages/img1.png';
import img2 from '../../assets/classImages/img2.png';
import img3 from '../../assets/classImages/img3.png';
import img4 from '../../assets/classImages/img4.png';
import img5 from '../../assets/classImages/img5.png';
import img6 from '../../assets/classImages/img6.png';
import MyModal from '../../myModal/Modal';
import ClassDetails from './ClassDetails';

const classPics = [img1, img2, img3, img4, img5, img6];
let searchState;
export default function MainClassEntry() {
  const PF = 'http://localhost:5000/images/';

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

  const [myClasses, setMyClasses] = useState([]);
  const [aLearnersClass, setALearnersClass] = useState([]);

  const [alreadySet, setalreadySet] = useState(0);
  const [firstSearch, setfirstSearch] = useState(0);
  const [loggedUser, setloggedUser] = useState(undefined);
  const [handleModal, sethandleModal] = useState('none');
  const [modalData, setmodalData] = useState({});
  const [searchText, setsearchText] = useState('');
  const [myClassesTemp, setmyClassesTemp] = useState();

  const [classModalstate, setclassModalstate] = useState('none');

  useEffect(async () => {
    loadUser();
  }, []);

  let theID = user && user._id;

  useEffect(() => {
    loadUser();
  }, []);

  useEffect(() => {
    setloggedUser(user);
  }, [user]);

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
          })
            .then(async (newClasses) => {
              await setMyClasses(newClasses);
              return await newClasses;
            })
            .then((e) => setmyClassesTemp(e));
        } else {
          console.log('no');
        }
      }
    } catch (err) {
      console.log(err);
    }
  }, [allMyClasses, learnerClass]);
  
  const classroomModaltoggle = () => {
    if (classModalstate === 'flex') {
      setclassModalstate('none');
    } else {
      setclassModalstate('flex');
    }
  };

  const createClass = () => {
    console.log('class created');
    classroomModaltoggle();
  };

  const toggleModal = (e = 'null', index = 'null', from = 'null') => {
    e.preventDefault();
    // console.log(e);
    if (handleModal === 'flex') {
      sethandleModal('none');
    } else {
      if (index !== 'null') {
        new Promise((resolve, reject) => {
          let arrayFrom =
            from == 'learner' ? learnerClass : from == 'tutor' && myClasses;
          resolve(arrayFrom[index]);
        })
          .then(async (data) => await setmodalData(data))
          .then(() => sethandleModal('flex'));
      } else {
        sethandleModal('flex');
      }
    }
  };

  const search = async (e) => {
    let text = await String(e.target.value).toLowerCase();
    setsearchText(text);

    console.log(myClasses);
    let newList = await myClassesTemp.filter(
      (e) =>
        e.classCode.toString().toLowerCase().indexOf(text) != -1 ||
        e.className.toString().toLowerCase().indexOf(text) != -1 ||
        e.tutorName.toString().toLowerCase().indexOf(text) != -1
    );
    await console.log(newList);
    await setMyClasses(newList);
  };
  // const routeToChat = async (e) => {
  //   try {
  //     let members = await e.participants;
  //     createAClassConversation({ members });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const alice = (data) => {
    console.log(data);
  };

  return (
    <div
      className="p-4"
      style={{ width: '100%', height: '100vh', overflowY: 'auto' }}
    >
      <MyModal
        modalHeader={'Create new class'}
        toggleModal={classroomModaltoggle}
        modalStatus={classModalstate}
        component={<CreateClassroom />}
        header_bg={''}
      />
      <MyModal
        component={<ClassDetails data={modalData} />}
        modalStatus={handleModal}
        modalHeader={'Class detail'}
        toggleModal={toggleModal}
      />
      <ClassroomHomeHeader
        searchBarText={searchText}
        search={search}
        createClass={createClass}
        showCreateClassroom={
          Object(loggedUser).hasOwnProperty('status') && loggedUser.status
        }
        toggleModal={toggleModal}
      />
      <div className="w-100 d-flex mt-5" style={{ flexWrap: 'wrap' }}>
        {Object(loggedUser).hasOwnProperty('status') &&
        loggedUser.status === 'tutor'
          ? myClasses.map((e, index) => {
              return (
                <Link
                  className="classroomCard text-white rounded m-3"
                  style={{
                    backgroundImage: `url("${e.bg}")`,
                    backgroundSize: 'cover',
                  }}
                  key={index}
                  to={{
                    pathname:'/Classchat',
                  }}
                  
                >
                  <div className="w-100 h-100">
                    <div
                      className="rounded px-4 pt-4"
                      style={{
                        backgroundColor: 'rgba(0,0,0,0.5)',
                        width: '100%',
                        height: '100%',
                        position: 'relative',
                      }}
                    >
                      <div className="w-100 d-flex position-relative">
                        <div
                          className="pr-2"
                          style={{ width: '90%', textOverflow: 'wrap' }}
                        >
                          <p
                            className="h2 font-weight-bold"
                            onClick={() => alice(e)}
                          >
                            Course ID: {e.classCode}
                          </p>
                        </div>

                        <div
                          className="bg-dark"
                          onClick={(e) => toggleModal(e, index, 'tutor')}
                        >
                          <i
                            style={{
                              position: 'absolute',
                              right: 0,
                              top: '.5rem',
                            }}
                            class="far fa-eye eyIcon"
                          ></i>
                        </div>
                      </div>

                      <p className="h4 mt-5 font-weight-bold">
                        Title: {e.className}
                      </p>

                      <div
                        style={{ position: 'absolute', bottom: '1rem' }}
                        className="d-flex align-items-end"
                      >
                        <div
                          className="d-flex rounded-circle justify-content-center align-items-center bg-light"
                          style={{ width: 53, height: 53 }}
                        >
                          <img
                            className="rounded-circle"
                            src={
                              e.tutor_id.profilePic == ''
                                ? 'http://www.iconarchive.com/download/i102645/graphicloads/flat-finance/person.ico'
                                : PF + e.tutor_id.profilePic
                            }
                            width="50"
                            height="50"
                            alt=""
                          />
                        </div>
                        <span className="h4 ml-3 font-weight-bold align-self-center">
                          {e.tutorName}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })
          : Object(loggedUser).hasOwnProperty('status') &&
            loggedUser.status === 'learner' &&
            learnerClass.map((e, index) => {
              return (
                <Link
                  className="classroomCard text-white rounded m-3"
                  style={{
                    backgroundImage: `url("${e.bg}")`,
                    backgroundSize: 'cover',
                  }}
                  key={index}
                  to="/Classchat"
                >
                  <div className="w-100 h-100">
                    <div
                      className="rounded px-4 pt-4"
                      style={{
                        backgroundColor: 'rgba(0,0,0,0.5)',
                        width: '100%',
                        height: '100%',
                        position: 'relative',
                      }}
                    >
                      <div className="w-100 d-flex position-relative">
                        <div
                          className="pr-2"
                          style={{ width: '90%', textOverflow: 'wrap' }}
                        >
                          <p className="h2 font-weight-bold">
                            Course ID: {e.classCode}
                          </p>
                        </div>

                        <div
                          className="bg-dark"
                          onClick={(e) => toggleModal(e, index, 'learner')}
                        >
                          <i
                            style={{
                              position: 'absolute',
                              right: 0,
                              top: '.5rem',
                            }}
                            class="far fa-eye eyIcon"
                          ></i>
                        </div>
                      </div>

                      <p className="h4 mt-5 font-weight-bold">
                        Title: {e.className}
                      </p>

                      <div
                        style={{ position: 'absolute', bottom: '1rem' }}
                        className="d-flex align-items-end"
                      >
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
                        <span className="h4 ml-3 font-weight-bold align-self-center">
                          {e.tutorName}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
      </div>
    </div>
  );
}
