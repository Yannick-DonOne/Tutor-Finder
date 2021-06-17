import React, { useContext, useEffect, useState } from "react";
import "./mymodal.css";

function MyModal({ modalStatus, component, toggleModal, modalHeader }) {
  return (
    <div className="mymodal" style={{ display: `${modalStatus}`, zIndex: 2 }}>
      <div className="modalCard">
        <div className="modalHeader d-flex">
          {modalHeader}
          <div
            onClick={(e) => toggleModal(e)}
            className="bg-dark closeModalIcon px-3 ml-auto "
          >
            <i class="fas fa-times text-white align-self-center"></i>
          </div>
        </div>

        <div style={{ height: "90%" }}>{component}</div>
      </div>
    </div>
  );
}

export default MyModal;
