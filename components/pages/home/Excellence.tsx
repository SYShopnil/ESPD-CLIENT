import Image from "next/image";
import React from "react";
import cup from "./assets/cup.svg";
import pot from "./assets/pot.svg";
import right from "./assets/right.svg";
import SingleExcellence from "./SingleExcellence";

export default function Excellence({ feature }) {
  const feature_home = feature?.filter((item) => item?.location === "home");
  return (
    <>
      <div className="container excellenceWrapper">
        <div className="row excellenceRow">
          <div className="col-12">
            <h3>Where Exam Success Happens</h3>
            <h2>
              Unveiling Our Accomplished Tutoring Services and Unique Advantages
            </h2>
          </div>
        </div>
        <div className="row">
          {feature_home?.map((singleFeature) => (
            <SingleExcellence
              key={singleFeature?.id}
              singleFeature={singleFeature}
            />
          ))}
        </div>
      </div>
    </>
  );
}
