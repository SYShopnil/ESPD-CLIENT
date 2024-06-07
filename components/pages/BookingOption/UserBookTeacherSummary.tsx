import React, { useState } from "react";
import { useRouter } from "next/router";

import Clock from "./assets/Clock.svg";
import Flask from "./assets/Flask.svg";
import SealCheck from "./assets/SealCheck.svg";
import Student from "./assets/Student.svg";

import Image from "next/image";
import StarRating from "@/components/common/StarRating";
import { setStarRating } from "@/utils/utils";
import ReviewPopup from "@/components/review-popup";
import Star from "@/components/pages/search-result/assets/Star.svg";

const UserBookTeacherSummary = ({ tutor }) => {
  const [modalShow, setModalShow] = React.useState(false);

  const reviewCount = tutor?.Review?.length;
  const totalRating = tutor?.Review?.reduce(
    (total, obj) => obj?.rating + total,
    0
  );

  const placeHolderImageUrl =
    "https://placehold.co/1000x1000?text=image+not+available";

  return (
    <>
      <div className="bookingUserWrap">
        <div className="firstRow">
          <div className="bookingUserImg">
            <img
              className="userImg"
              src={tutor?.profile_photo || placeHolderImageUrl}
              alt={tutor?.first_name}
            />
          </div>
          <div className="bookingUserText">
            <a href="#">
              <h2>
                {tutor?.first_name} {tutor?.last_name}
              </h2>
            </a>
            <p>{tutor?.bio}</p>
            <div className="starView">
              <div className="pcReviewBox">
                <StarRating
                  totalRating={totalRating}
                  reviewCount={reviewCount}
                />
              </div>
              <div className="mobileReviewBox">
                <div className="starImgBox">
                  <Image className="StarImg" priority src={Star} alt="" />
                </div>
              </div>
              <p className="fix-review-p">
                {setStarRating(totalRating, reviewCount)}.0
                <span>
                  <a
                    className="primarryLink"
                    onClick={() => setModalShow(true)}
                    href="#"
                  >
                    ({tutor?.Review?.length} Reviews)
                  </a>
                </span>
              </p>
            </div>
          </div>
          <div className="mobileTeacherRate">
            <div className="mobileTeacgerRateIner">
              <p>£{tutor?.price_one_to_one} </p>
              <p>/hour</p>
            </div>
          </div>
        </div>
        <div className="secondRow">
          <div className="bookingUserDes">
            <div className="bookingUserDesInner">
              <Image className="userSubImg" priority src={Flask} alt="" />
              <p>{tutor?.experience} years of experience</p>
            </div>
            <div className="bookingUserDesInner">
              <Image className="userSubImg" priority src={Clock} alt="" />
              <p>{tutor?.tution_hours || 100}+ hrs taught</p>
            </div>
            <div className="bookingUserDesInner">
              <Image className="userSubImg" priority src={Student} alt="" />
              <p>{tutor?.repeated_student || 100} repeat students</p>
            </div>
            <div className="bookingUserDesInner">
              {tutor?.is_dbs_checked && (
                <>
                  <Image
                    className="userSubImg"
                    priority
                    src={SealCheck}
                    alt=""
                  />
                  <p>DBS checked</p>
                </>
              )}
            </div>
          </div>
          {/*<div className="bookingUserDes">*/}
          {/*    */}
          {/*</div>*/}
        </div>
      </div>

      {/* Review pop up Modal */}
      <ReviewPopup
        tutor={tutor}
        modalShow={modalShow}
        setModalShow={setModalShow}
      />
    </>
  );
};

export default UserBookTeacherSummary;
