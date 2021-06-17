import React, { useState, useEffect } from "react";
import empty from "../../assets/classroom/empty.png";
// import EditClass from '../../ViewAllTutors/EditClass';

const PF = "http://localhost:5000/images/";

export default function ClassDetails({ data }) {
  const [aClass, setaClass] = useState({});
  useEffect(() => {
    setaClass(data);
  }, [data]);
  return (
    <div className="p-5">
      <p>
        Tutor name: <span className="font-weight-bold">{aClass.tutorName}</span>
      </p>
      <p>
        Couse Code: <span className="font-weight-bold">{aClass.classCode}</span>
      </p>
      <p>
        Couse title:{" "}
        <span className="font-weight-bold">{aClass.className}</span>
      </p>
      {/* <p className="h2"></p> */}
      {Object(aClass).hasOwnProperty("participants") &&
      aClass.participants.length > 0 ? (
        aClass.participants.map((person) => {
          return (
            <div
              style={{ borderBottom: "solid 1px #ccc" }}
              className="d-flex py-2 mt-3"
            >
              <img
                src={PF + person.profilePic}
                width="50"
                height="50"
                className="rounded-circle"
                alt=""
              />
              <div className="ml-3">{person.username}</div>
            </div>
          );
        })
      ) : (
        <div style={{ width: "70%", height: "70%" }}>
          <img src={empty} style={{ width: "100%", height: "80%" }} alt="" />
          <span className="h2">No participants</span>
        </div>
      )}
    </div>
  );
}
