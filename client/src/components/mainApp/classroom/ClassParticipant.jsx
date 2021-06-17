import React, { useState, useContext, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import Users from "./Users";
import ClassContext from "../../../context/classroom/ClassContext";
import AuthContext from "../../../context/auth/AuthContext";
import ClassUser from "./ClassUser";

function ClassParticipant(props) {
  const participantData = props.myData;
  useEffect(async () => {
    console.log("received " + props.myData);
  }, []);

  return (
    <div>
      <Modal
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Add Participants
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Users</h4>
          {typeof props.participantData === "object" &&
            props.participantData.map((user) => <ClassUser user={user} />)}
        </Modal.Body>
        {/* Logout */}
        <Modal.Footer>
          <Button variant="danger" onClick={props.onHide}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ClassParticipant;
