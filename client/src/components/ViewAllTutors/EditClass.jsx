import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../context/auth/AuthContext";
import AuthState from "../../context/auth/AuthContext";

export default function TutorProfileHeader({ status, handleModal }) {
  const authContext = useContext(AuthContext);
  const { createConversation, loadUser, user } = authContext;

  const [statusUser, setstatusUser] = useState("");
  useEffect(async () => {
    let activePath = await window.location.pathname;
    await setstatusUser(activePath);
    loadUser();
  }, []);

  const receiverID = localStorage.getItem("id");

  const openConversation = async () => {
    let senderID = await user._id;
    createConversation({ senderID, receiverID });
  };

  return statusUser === "/tut/profile" ? (
    <div className="d-flex mb-4">
      
    </div>
  ) : (
    statusUser === "/profile" && (
      <div className="d-flex mb-4">
        <p className="h3">Profile</p>
        <div onClick={() => handleModal()} className="ml-auto">
          <i class="far fa-edit profileHeaderIcon"></i>
        </div>
      </div>
    )
  );
}
