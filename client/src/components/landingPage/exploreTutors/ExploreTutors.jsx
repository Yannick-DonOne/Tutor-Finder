import React from "react";
import CustomCard from "./CustomCard";
import Card1 from "../../assets/Cards/card.jpg";
import Card2 from "../../assets/Cards/card1.jpg";

export default function ExploreTutors() {
  return (
    <div
      id="exploreTutors"
      className="container-fluid row d-flex flex-column p-3"
    >
      <div className="titleText col-sm-8 col-lg-5 col text-center mt-5 align-self-center">
        <h2 className="mb-3">Explore our Tutors</h2>
        <p>
          We have a multitude of courses tailored to your career goals and busy
          schedule. These courses have been developed to enhance your knowledge
          and critical thinking abilities and make you an expert in your domain
        </p>
      </div>
      <div className="cards d-flex flex-column container-fluid mt-5 row ">
        <div className="row col-xl-10  col-lg-11 col-sm-11 align-self-center">
          <CustomCard
            url={Card1}
            text={
              "Nullam nunc magna viveranec  ipsum a, ultricies iaculis eros Nullam nunc magna viveranec  ipsum a, ultricies iaculis eros"
            }
          />
          <CustomCard
            url={
              "https://image.freepik.com/free-photo/front-view-woman-reading-something-her-students_23-2148633356.jpg"
            }
            text={
              "Nullam nunc magna viveranec  ipsum a, ultricies iaculis eros Nullam nunc magna viveranec  ipsum a, ultricies iaculis eros"
            }
          />
          <CustomCard
            url={Card2}
            text={
              "Nullam nunc magna viveranec  ipsum a, ultricies iaculis eros Nullam nunc magna viveranec  ipsum a, ultricies iaculis eros"
            }
          />
        </div>
      </div>
    </div>
  );
}
