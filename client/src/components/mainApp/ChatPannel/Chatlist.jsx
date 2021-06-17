import React, { useContext, useState, useEffect } from "react";
import defaultImage from "../../assets/default.png";
import AuthContext from "../../../context/auth/AuthContext";

function Chatlist({ conv, currentUser }) {
  const authContext = useContext(AuthContext);
  const { user, getConversation, conversation, loadUser } = authContext;
  const [myConv, setMyConv] = useState([]);
  const PF = "http://localhost:5000/images/";

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <div className="list">
      {conv.members.map((m) => (
        <div className="me align-items-center">
          {m._id === user._id ? null : (
            <div className="avatar-chat">
              <img
                className="avatar-pic"
                src={
                  m.profilePic === ""
                    ? "http://www.iconarchive.com/download/i102645/graphicloads/flat-finance/person.ico"
                    : PF + m.profilePic
                }
                alt=""
              />
            </div>
          )}
          {m._id === user._id ? null : (
            <div className="title h4">{m.username}</div>
          )}
        </div>
      ))}
      <div className="preview">
        <p className="bdg h4">10</p>
        <p className="text-secondary h5">Yoo.. boy, hafa? Where is my money?</p>
      </div>
    </div>
  );
}
export default Chatlist;
