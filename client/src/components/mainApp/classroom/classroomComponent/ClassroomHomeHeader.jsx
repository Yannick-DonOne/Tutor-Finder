import React, { useRef, useContext, useEffect, useState } from "react";
import AuthContext from "../../../../context/auth/AuthContext";

export default function ClassroomHomeHeader({
  toggleModal,
  showCreateClassroom,
  createClass,
  search,
  searchBarText,
}) {
  const authContext = useContext(AuthContext);
  const [inputData, setinputData] = useState(searchBarText);

  useEffect(() => {
    setinputData(searchBarText);
  }, [searchBarText]);

  return (
    <div className="d-flex flex-column">
      <div className="d-flex justify-content-between">
        <span className="h1">Classroom</span>
        <span
          style={{
            display:
              showCreateClassroom === "learner"
                ? "none"
                : showCreateClassroom === "tutor" && "block",
          }}
          className="createClass text-danger text-decoration-underline"
        >
          <span onClick={() => createClass()} className="createclassText">
            create new classroom
          </span>
          <span onClick={() => createClass()} className="createclassIcon">
            <i class="fas fa-plus-circle fa-2x"></i>
          </span>
        </span>
      </div>
      <div className="classroom_search d-flex pl-4 pr-3 py-2">
        <form className="search_tutor">
          <input
            value={inputData}
            type="text"
            placeholder="Search tutor/course"
            style={{ backgroundColor: "transparent" }}
            className="w-100 border-0 pr-3"
            onChange={(e) => search(e)}
          />
        </form>
        <i
          class="fas view fa-search align-self-center"
          style={{ zIndex: 0 }}
        ></i>
      </div>
    </div>
  );
}
