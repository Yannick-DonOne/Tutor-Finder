import React, { useContext, useState, useEffect } from 'react';
// import Card from './Card/Card';
import AuthContext from '../../../context/auth/AuthContext';

import { Button } from 'react-bootstrap';
import CreateClassroom from './CreateClassroom';
import ClassParticipant from './ClassParticipant';
import { Link } from 'react-router-dom';
function MainClassEntry() {
  const authContext = useContext(AuthContext);
  const { isAdd, participants, myCreatedClass, allMyClasses } = authContext;

  const [myClasses, setMyClasses] = useState();
  const [modalShow, setModalShow] = React.useState(false);
  const [modalShow1, setModalShow1] = React.useState(false);
  const [store, setStore] = useState();

  useEffect(() => {
    myCreatedClass();
  }, [allMyClasses]);
  useEffect(async () => {
    try {
      await setMyClasses(allMyClasses.classroom);
    } catch (err) {
      console.log(err);
    }
  }, [allMyClasses]);

  const myfunc = async (thenewData) => {
    try {
      setModalShow1(true);
      await setStore(thenewData);
    } catch (error) {
      console.log(error);
    }
  };
  // console.log(store);

  return (
    <div>
      <Button variant="danger p-3" onClick={() => setModalShow(true)}>
        Create A New Class
      </Button>

      <CreateClassroom show={modalShow} onHide={() => setModalShow(false)} />
      {typeof myClasses === 'object' &&
        myClasses.map((data) => (
          <div className="bg-secondary p-5 m-3 ">
            <h5 className="ml-5">Course Name</h5>
            <h5 className="text-info ml-5"> {data.className} </h5>
            <h5 className="ml-5">Course Code</h5>
            <h5 className="text-info ml-5 "> {data.classCode} </h5>
            <h5 className="ml-5">Tutors Name</h5>
            <h5 className="text-info ml-5 "> {data.tutorName} </h5>
            <Button variant="danger p-3" onClick={() => myfunc(data)}>
              view Paticipants
            </Button>
            <ClassParticipant
              show={modalShow1}
              onHide={() => setModalShow1(false)}
            />
            <div show={modalShow1} onHide={() => setModalShow1(false)}></div>
          </div>
        ))}
    </div>
  );
}

export default MainClassEntry;