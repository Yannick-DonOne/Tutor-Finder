import React, { useState, useEffect, useContext } from "react";
import Card from "./Card/Card";
import "./viewtutors.css";
// import AuthContext from '../../context/auth/AuthContext';
import AuthContext from "../../../context/auth/AuthContext";
import ReviewContext from "../../../context/reviews/ReviewContext";
import { Link } from "react-router-dom";

function ViewTutors(props) {
  const [data, setData] = useState();
  const [dataTemp, setdataTemp] = useState();
  const [searchText, setsearchText] = useState("");

  const authContext = useContext(AuthContext);
  const reviewContext = useContext(ReviewContext);
  const { clearFilter, user, filtered, filterClasses } = authContext;

  const { clearReview } = reviewContext;
  const {
    allTutor,
    ViewAllTutors,
    loadUser,
    viewTutProfiles,
    tutData,
    iStore,
    myCreatedClass,
    IcreateClass,
  } = authContext;
  useEffect(async () => {
    loadUser();
    ViewAllTutors();
    clearReview();
    myCreatedClass();
    IcreateClass();
  }, []);

  const onChange = async (e) => {
    let text = String(e.target.value).toLowerCase();
    await setsearchText(text);

    console.log(data);
    let newList = dataTemp.filter(
      (e) =>
        String(e.username).toLowerCase().indexOf(text) != -1 ||
        String(e.gender).toLowerCase().indexOf(text) != -1 ||
        String(e.speciality).toLowerCase().indexOf(text) != -1 ||
        String(e.location).toLowerCase().indexOf(text) != -1
    );
    setData(newList);
    // console.log(newList);
  };
  useEffect(async () => {
    try {
      let filterUser =
        (await Object(allTutor).hasOwnProperty("user")) &&
        allTutor.user.filter((e) => e._id !== user._id);

      await setData(
        allTutor.user.length > filterUser.length ? filterUser : allTutor.user
      );
      await setdataTemp(
        allTutor.user.length > filterUser.length ? filterUser : allTutor.user
      );
    } catch (err) {
      console.error(err);
    }
  }, [allTutor]);

  return (
    <div className="alltutors">
      <div className="fish-roll">
        <div className="head-alltutor h1 mx-4 mt-4">All Tutors</div>
        <div className="classroom_search  d-flex mt-3 pl-4 pr-3 py-2">
          <form className="search_tutor">
            <input
              value={searchText}
              type="text"
              placeholder="Search tutor"
              style={{ backgroundColor: "transparent" }}
              className="w-100 border-0 pr-3"
              onChange={(e) => onChange(e)}
            />
          </form>
          <i class="fas view fa-search align-self-center"></i>
        </div>
      </div>
      {typeof data === "object" &&
        data.map((tut) => (
          <Card className="d-flex  " key={tut.email} tut={tut} />
        ))}
    </div>
  );
}

export default ViewTutors;
