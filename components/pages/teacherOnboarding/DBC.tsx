import ArrowRight from "./assets/ArrowRight.svg";
import ArrowLeftGray from "./assets/ArrowLeftGray.svg";

import Image from "next/image";
import React, {useState} from "react";
import ErrorMessage from "@/components/common/ErrorMessage";

export default function DBC({
  onClickNext,
  onClickPrevious,
  dbsChecked,
  setDbsChecked,
}) {

  const [error, setError] = useState('');

  const onClick = () => {
    if (dbsChecked === null) {
      setError("Please select an option")
    } else {
      onClickNext();
    }
  };

  return (
    <>
      <div className="qtclWrapper teacherOnWrapDbc">
        <div className="pageGoing">
          <div className="pageGoingNumberBox">
            <a className="pageGoingNumber active" href="#">
              1
            </a>
            <div className="pageGoingDiv borderActive"></div>
          </div>
          <div className="pageGoingNumberBox">
            <a className="pageGoingNumber active" href="#">
              2
            </a>
            <div className="pageGoingDiv borderActive"></div>
          </div>
          <div className="pageGoingNumberBox">
            <a className="pageGoingNumber active" href="#">
              3
            </a>
            <div className="pageGoingDiv borderActive"></div>
          </div>
          <div className="pageGoingNumberBox">
            <a className="pageGoingNumber" href="#">
              4
            </a>
          </div>
        </div>

        <h1>Join our team of dedicated educators</h1>
        <div className="optionWrap">
          <p className="ProssesText">
            Do you have a current and clear DBS check?
          </p>
          {!!(error !== "") &&
              <ErrorMessage
                  text={error}
              />
          }
          <div className="optionBtnBox">
            <button
              className={`optionBtn ${dbsChecked === true ? "active" : ""}`}
              onClick={() => {
                setError("")
                setDbsChecked(true)
              }}
            >
              Yes
            </button>
            <button
              className={`optionBtn ${dbsChecked === false ? "active" : ""}`}
              onClick={() => {
                setError("")
                setDbsChecked(false)
              }}
            >
              No
            </button>
          </div>
        </div>
        <div className="teacherExpeBtnBox">
          <button className="previousBtn" onClick={onClickPrevious}>
            <Image
              className="ArrowLeftGray"
              priority
              src={ArrowLeftGray}
              alt=""
            />
            Previous
          </button>
          <button className="otpVerifyBtn" onClick={onClick}>
            Next
            <Image className="ArrowRight" priority src={ArrowRight} alt="" />
          </button>
        </div>
      </div>
    </>
  );
}
