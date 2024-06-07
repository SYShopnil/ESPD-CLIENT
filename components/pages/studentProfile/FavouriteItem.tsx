import Link from "next/link";
import Image from "next/image";
import userImgSearch from "@/components/pages/studentProfile/assets/userIconFav.svg";
import SupperTutorTag from "@/components/pages/search-result/SupperTutorTag";
import Heart from "@/components/pages/search/assets/Heart.svg";
import HeartFilled from "@/components/pages/studentProfile/assets/HeartFilled.svg";
import Star from "@/components/pages/search-result/assets/Star.svg";
import image33 from "@/components/pages/search-result/assets/image33.svg";
import image34 from "@/components/pages/search-result/assets/image34.svg";
import image35 from "@/components/pages/search-result/assets/image35.svg";
import image36 from "@/components/pages/search-result/assets/image36.svg";
import ArrowLeft from "@/components/pages/search-result/assets/ArrowLeft.svg";
import React from "react";
import SupperTutorTagFav from "@/components/pages/studentProfile/SupperTutorTagFav";
import { PAGE_TEACHER } from "@/config/constants";
import { setStarRating } from "@/utils/utils";
import StarRating from "@/components/common/StarRating";

export default function FavouriteItem({ tutor }) {

    const teacherId = tutor?.teacher_id

    const reviewCount = tutor?.review?.length;
    const totalRating = tutor?.review?.reduce((total, obj) => obj?.rating + total, 0);

    const placeHolderImageUrl = 'https://placehold.co/1000x1000?text=image+not+available' 


    return (
        <>
            <div className="FavouritItemWrapper">
                <div className="fevItemWrap">
                    <div className="searchItemUser">
                        <div className="searchIemUserInner">
                            <Link href="#">

                                <img
                                    className="userImgFavourite"
                                    src={tutor?.profile_photo || placeHolderImageUrl}
                                    alt=""
                                />

                                {tutor?.is_super_tutor &&
                                    <SupperTutorTagFav />
                                }

                            </Link>
                            <Link href="#">
                                <Image
                                    className="userImgSearchHeart"
                                    src={HeartFilled}
                                    alt=""
                                />
                            </Link>
                        </div>
                    </div>
                    <div className="searchItemContent">
                        <div className="fevItemContentHead">
                            <Link href={`${PAGE_TEACHER}/${teacherId}`}><p>{tutor.first_name} {tutor?.last_name}</p></Link>
                            <p>£{tutor?.hourly_rate} <span>/hour</span></p>
                        </div>
                        <h2 className="itemBuiTextShortClass">{tutor?.bio}</h2>
                        <div className="reviewBoxSearch">
                            <div className="starView">
                                <StarRating totalRating={totalRating} reviewCount={reviewCount} />
                                {/* <Link href="">
                                    <div className="starImgBox">
                                        <Image
                                            className="StarImg"
                                            priority
                                            src={Star}
                                            alt=""
                                        /><Image
                                            className="StarImg"
                                            priority
                                            src={Star}
                                            alt=""
                                        /><Image
                                            className="StarImg"
                                            priority
                                            src={Star}
                                            alt=""
                                        /><Image
                                            className="StarImg"
                                            priority
                                            src={Star}
                                            alt=""
                                        /><Image
                                            className="StarImg"
                                            priority
                                            src={Star}
                                            alt=""
                                        />
                                    </div>
                                </Link> */}
                                <p>{setStarRating(totalRating, reviewCount)}.0 <span><a className="primarryLink" >({tutor?.review?.length} Reviews)</a></span></p>
                            </div>
                        </div>

                    </div>

                </div>
                <div className="fevBottomContent">
                    <div className="examBoard">
                        <p>Exam Boards</p>
                        <Link href="#">
                            <Image
                                className="examBoarIcon"
                                src={image33}
                                alt=""
                            />
                        </Link>
                        <Link href="#">
                            <Image
                                className="examBoarIcon"
                                src={image34}
                                alt=""
                            />
                        </Link>
                        <Link href="#">
                            <Image
                                className="examBoarIcon"
                                src={image35}
                                alt=""
                            />
                        </Link>
                        <Link href="#">
                            <Image
                                className="examBoarIcon"
                                src={image36}
                                alt=""
                            />
                        </Link>
                    </div>
                    <div className="des">
                        <p>He is the Head of Chemistry at one of very few schools in the country that is designed completely to enable students of science to reach their full potentia. </p>
                    </div>
                    <div className="viewFullPage">
                        <Link className="viewFullPageBtn" href={`${PAGE_TEACHER}/${teacherId}`}>
                            View full profile
                            <Image
                                className="ArrowLeftView"
                                src={ArrowLeft}
                                alt=""
                            />
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}
