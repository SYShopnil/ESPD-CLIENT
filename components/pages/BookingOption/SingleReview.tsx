import React from 'react';
import Star from "@/components/pages/BookingOption/assets/Star.svg";
import user from "@/components/pages/BookingOption/assets/user.svg";
import Image from 'next/image';
import { formatDate } from '@/services/dateUtils';

function SingleReview({ review }) {

    const date = formatDate(review?.date)
    return (
        <div className="reviewInnerBox">
            <div className="reviewUserhead">
                <div className="reviewUserImg">
                    <a href="#">
                        <img
                            className="reviewUser"
                            src={review?.profile_photo}
                            alt={review?.first_name}
                        />
                    </a>
                </div>
                <div className="reviewUserCon">
                    <a href="#"><h1>{review?.first_name + review?.last_name} </h1></a>
                    <p>{date}</p>
                    <div className="reviewStarBox">
                        <Image
                            className="reviewUserStar"
                            priority
                            src={Star}
                            alt=""
                        />
                        <p>{review?.rating}</p>
                    </div>
                </div>
            </div>
            <p className="reviewUserDes">{`“${review?.desc}”`}</p>
        </div>
    );
}

export default SingleReview;