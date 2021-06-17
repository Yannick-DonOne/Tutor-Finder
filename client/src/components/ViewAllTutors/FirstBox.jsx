import React, { useEffect, useState, useContext } from "react";
import ReviewContext from "../../context/reviews/ReviewContext";

const PF = "http://localhost:5000/images/";

export default function FirstBox({
  username,
  speciality,
  bio,
  location,
  profilePic,
  status,
}) {
  let pp = localStorage.getItem("profilePic");

  const reviewContext = useContext(ReviewContext);

  const { aTutsReview, viewATutR, reviews, myReview, getMyReview } =
    reviewContext;
  const [tutData, setTutData] = useState();

  const [pathname, setpathName] = useState();

  useEffect(() => {
    getMyReview();
    setpathName(window.location.pathname);
  }, []);

  return (
    <div
      className={`bg-white rounded ${status === "learner" ? "p-5" : "p-4"} `}
      style={{ height: "65%" }}
    >
      <div
        className={`${
          status === "tutor"
            ? "d-flex"
            : "d-flex flex-column align-items-center"
        }`}
      >
        <div
          style={{
            width: status === "learner" ? 80 : 55,
            height: status === "learner" ? 80 : 55,
          }}
          className={`bg-secondary d-flex ${
            status === "learner" && "mb-4"
          } rounded-circle justify-content-center align-items-center`}
        >
          {pathname === "/profile" ? (
            <img
              src={
                profilePic === ""
                  ? "http://www.iconarchive.com/download/i102645/graphicloads/flat-finance/person.ico"
                  : PF + profilePic
              }
              width={status === "learner" ? "75" : "50"}
              height={status === "learner" ? "75" : "50"}
              className={`rounded-circle`}
              alt=""
            />
          ) : (
            pathname === "/tut/profile" && (
              <img
                src={
                  profilePic === ""
                    ? "http://www.iconarchive.com/download/i102645/graphicloads/flat-finance/person.ico"
                    : pp === ""
                    ? "http://www.iconarchive.com/download/i102645/graphicloads/flat-finance/person.ico"
                    : PF + pp
                }
                width={status === "learner" ? "75" : "50"}
                height={status === "learner" ? "75" : "50"}
                className={`rounded-circle`}
                alt=""
              />
            )
          )}
        </div>
        <div className="ml-3">
          <p className={`${status === "learner" && "font-weight-bold fs-3"}`}>
            {username}
          </p>
          <p className="text-danger">{speciality}</p>
        </div>
      </div>
      <div style={{ overflowY: "auto", maxHeight: "70%" }}>
        <p className="text-secondary mt-4">Location</p>
        <p className="text-danger">{location}</p>

        <div className="mt-3">
          <p className="text-secondary">Ratings</p>
          <p className="text-danger">
            4.5{" "}
            <span className="ml-2 text-danger">
              <i class="fas fa-star "></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="far fa-star"></i>
            </span>
          </p>
        </div>

        <p className="text-secondary">About</p>

        <p className="p-2 pr-4" style={{ wordSpacing: 1.5, lineHeight: 1.6 }}>
          {bio}
        </p>
      </div>
    </div>
  );
}
