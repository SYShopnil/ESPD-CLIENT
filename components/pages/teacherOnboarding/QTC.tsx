import ArrowRight from "./assets/ArrowRight.svg";

import Image from "next/image";
import React, {useState} from "react";
import ErrorMessage from "@/components/common/ErrorMessage";

export default function QTC({ onClickNext, setQtsConferred, qtsConferred }) {

  const [error, setError] = useState('');

  const onClick = () => {
    if (qtsConferred === null) {
      setError("Please select an option")
    } else {
      onClickNext();
    }
  };
  return (
    <>
      <div className="qtclWrapper">
        <div className="pageGoing">
          <div className="pageGoingNumberBox">
            <a className="pageGoingNumber active" href="#">
              1
            </a>
            <div className="pageGoingDiv borderActive"></div>
          </div>
          <div className="pageGoingNumberBox">
            <a className="pageGoingNumber" href="#">
              2
            </a>
            <div className="pageGoingDiv"></div>
          </div>
          <div className="pageGoingNumberBox">
            <a className="pageGoingNumber" href="#">
              3
            </a>
            <div className="pageGoingDiv"></div>
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
            Do you have QTS (Qualified Teacher Status) conferred upon you by a
            university or teaching practice centre within the UK?
          </p>
          {!!(error !== "") &&
              <ErrorMessage
                  text={error}
              />
          }
          <div className="optionBtnBox">
            <button
              className={`optionBtn ${qtsConferred === true ? "active" : ""}`}
              onClick={() => {
                setError("")
                setQtsConferred(true)
              }}
            >
              Yes
            </button>
            <button
              className={`optionBtn ${qtsConferred === false ? "active" : ""}`}
              onClick={() => {
                setError("")
                setQtsConferred(false)
              }}
            >
              No
            </button>
          </div>
        </div>
        <div className="teacherOnBtnBox">
          <button className="otpVerifyBtn" onClick={onClick}>
            Next
            <Image className="ArrowRight" priority src={ArrowRight} alt="" />
          </button>
        </div>
      </div>
    </>
  );
}
