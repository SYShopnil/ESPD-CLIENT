import Image from "next/image";
import React from "react";
import Star from "@/components/pages/BookingOption/assets/Star.svg";
import { formatDate } from "@/services/dateUtils";

export default function ReviewOnDetailPage({ review }) {
  const date = formatDate(review?.date);
  const descripition = review?.desc?.toString();

  return (
    <>
      <div className="reviewInnerBox">
        <div className="reviewUserhead">
          <div className="reviewUserImg">
            <img
              className="reviewUser"
              src={review?.profile_photo}
              alt={review?.first_name}
            />
          </div>
          <div className="reviewUserCon">
            <a href="#">
              <h2>{review?.first_name + " " + review?.last_name}</h2>
            </a>
            {/*<p>{date}</p>*/}
            <div className="reviewStarBox">
              <Image className="reviewUserStar" priority src={Star} alt="" />
              <p>{review?.rating}.0</p>
            </div>
          </div>
        </div>
        <p className="reviewUserDes" style={{ textAlign: "justify" }}>
          “{descripition}”
        </p>
      </div>
    </>
  );
}
