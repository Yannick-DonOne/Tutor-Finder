import React from "react";
import {
  ArrowLeftSquare,
  Search,
  ThreeDotsVertical,
  Paperclip,
  SymmetryHorizontal,
} from "react-bootstrap-icons";
function Searchbar() {
  return (
    <div className="search">
      <div className="sch w-100 d-flex justify-content-center align-items-center">
        <input type="search" name="" id="" placeholder="Search Chat..." />
        <Search style={{ position: "absolute", right: "1rem" }} size={25} />
      </div>
    </div>
  );
}

export default Searchbar;
