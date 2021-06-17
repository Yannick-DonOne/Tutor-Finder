import React, { useState, useContext } from "react";
//import {Plus } from 'react-bootstrap-icons';
import { Button, Form } from "react-bootstrap";
import MyModal from "../../myModal/Modal";
import Participant from "./Participant";
import ButtonAddPart from "./ButtonAddPart";
import AuthContext from "../../../context/auth/AuthContext";

function CreateClassroom() {
  const authContext = useContext(AuthContext);
  const { IcreateClass, storePDATA, finaList, allMyClasses } = authContext;
  const [classData, setclassData] = useState({
    className: "",
    classCode: "",
  });
  const [classModalstate, setclassModalstate] = useState("none");
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
  const { className, classCode } = classData;
  const handleChange = (e) => {
    setclassData({ ...classData, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    // e.preventDefault();
    // e.preventDefault();
    let participants = finaList;
    IcreateClass({ className, classCode, participants });
    setclassData({
      className: "",
      classCode: "",
    });
  };

  const createTheClass = () => {
    // IcreateClass(className,classCode)
  };
  return (
    <div className="body p-4">
      <MyModal
        modalHeader={"Add Participants"}
        toggleModal={classroomModaltoggle}
        modalStatus={classModalstate}
        component={<Participant toggleModal={classroomModaltoggle} />}
        header_bg={""}
      />
      <Form onSubmit={(e) => handleSubmit(e)}>
        <Form.Group className="mb-4" controlId="formBasicEmail">
          <Form.Label className="mb-2">Course Name</Form.Label>
          <Form.Control
            style={{ fontSize: "1.4rem" }}
            className="px-4"
            type="text"
            required
            placeholder="Enter Course Title"
            name="className"
            value={className}
            onChange={(e) => handleChange(e)}
          />
          <Form.Control.Feedback type="invalid">
            Please Enter Course Name
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label className="mb-2">Course Code</Form.Label>
          <Form.Control
            style={{ fontSize: "1.4rem" }}
            className="mb-4 px-4"
            type="text"
            required
            placeholder="Enter Course Code"
            name="classCode"
            value={classCode}
            onChange={(e) => handleChange(e)}
          />
        </Form.Group>
        <Form.Group controlId="formBasicCheckbox">
          <div className="d-flex justify-content-between">
            <ButtonAddPart createClass={createClass} />
            <Button
              className="btn btn-lg px-4  btn-danger"
              variant="danger"
              type="submit"
              onClick={createTheClass}
            >
              Create Class
            </Button>
          </div>
        </Form.Group>
      </Form>
    </div>
  );
}

export default CreateClassroom;
