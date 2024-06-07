import Link from "next/link";
import Image from "next/image";
import SupperTutorTag from "@/components/pages/search-result/SupperTutorTag";
import Heart from "@/components/pages/search-result/assets/Heart.svg";
import HeartFilled from "@/components/pages/search-result/assets/HeartFilled.svg"
import Star from "@/components/pages/search-result/assets/Star.svg";
import ArrowLeft from "@/components/pages/search-result/assets/ArrowLeft.svg";
import Flask from "@/components/pages/search/assets/Flask.svg";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation, useQuery } from "react-query";
import { API_GET_FAVOURITE_TUTOR, API_GET_TUTOR, API_POST_FAVOURITE } from "@/services/api/endpoints";
import { get, post } from "@/services/api/api";
import useUser from "@/hooks/userUser";
import { LOCAL_STORAGE_KEY_REDIRECT_URL, PAGE_SIGNUP, PAGE_TEACHER, ROLE_STUDENT } from "@/config/constants";
import { showToast } from "@/utils/toastUtils";
import ModalLayout from "@/components/common/ModalLayout";
import StarRating from "@/components/common/StarRating";
import { setStarRating } from "@/utils/utils";
import ReviewPopup from "@/components/review-popup";


export default function SearchItem({ tutor, favTeachers }) {

    const [isFavourite, setIsFavourite] = useState(false);
    const [modalShow, setModalShow] = React.useState(false);
    const [reviewModalShow, setReviewModalShow] = useState(false);
    const [searchedTutorId, setSearchedTutorId] = useState(null);
    const [popupMessage, setPopupMessage] = useState(null)


    const router = useRouter();

    const teacherId = tutor?.id

    const { user } = useUser();

    const studentId = user?.id;

    const placeHolderImageUrl = 'https://placehold.co/1000x1200?text=image+not+available'

    const { isLoading, isError, error, data: searchedTutor } = useQuery({
        queryKey: ['searchedTutor', searchedTutorId],
        queryFn: () => get(`${API_GET_TUTOR}/${searchedTutorId}`),
        enabled: !!(searchedTutorId)
    });

    const { isLoading: isFavouriteLoading, isError: isFavouriteError, error: favouriteError, data: favouriteTutors, isSuccess: isFavouriteSuccess } = useQuery({
        queryKey: ['favouriteTeacher'],
        queryFn: () => get(`${API_GET_FAVOURITE_TUTOR}`),
        enabled: !!(studentId)
    });

    const isfav = favTeachers?.find(i => i === teacherId);


    const favouriteMutation = useMutation(
        async (data) => await post(API_POST_FAVOURITE, data),
        {
            onSuccess: (res) => {

                if (res?.data?.is_favorite === true) {

                    setIsFavourite(res?.data?.is_favorite)
                    showToast("success", "added to favourite")

                } else {

                    setIsFavourite(res?.data?.is_favorite)
                    showToast("warn", "removed from favourite")
                }

            },
        }
    );

    const onClickFavourite = (tutor) => {

        if (user && user.access_token === undefined) {
            setModalShow(true);
            setPopupMessage(`To save ${tutor?.first_name}'s profile, you need create an account`)
            return;
            //    const isConfirmed = window.confirm("You have to login first")
        }
        else if (user && user.role !== ROLE_STUDENT) {
            return;
        } else {
            setIsFavourite(!isFavourite)
        }

        favouriteMutation.mutate({
            teacher_id: teacherId,
            student_id: studentId
        })
    }



    return (
        <>
            <div className="">
                <div className="pcTeacherCard">
                    <div className="searchItemWrap">
                        <div className="searchItemUser">
                            <div className="searchIemUserInner">
                                <Link href="#">

                                    <img src={tutor?.profile_photo || placeHolderImageUrl} className="userImgSearch" alt={tutor?.first_name} />

                                    {/*Supper Tutor Tag*/}
                                    {tutor?.is_super_tutor && <SupperTutorTag />}

                                </Link>
                                <a className="btn-fav">
                                    <Image
                                        className="userImgSearchHeart"
                                        src={isFavourite || !!(isfav) ? HeartFilled : Heart}
                                        alt=""
                                        onClick={() => onClickFavourite(tutor)}
                                    />
                                </a>
                            </div>
                        </div>
                        <div className="searchItemContent">
                            <div className="searchItemContentHead">
                                <Link href={`${PAGE_TEACHER}/${teacherId}`}><p>{tutor?.first_name} {tutor?.last_name}</p></Link>
                                <p>£{tutor?.price_one_to_one} <span>/hour</span></p>
                            </div>
                            <h2 className="itemBuiTextShortClass">{tutor?.bio}</h2>
                            <div className="reviewBoxSearch">
                                <div className="starView">
                                    <Link href="#">
                                        <div className="pcReviewBox">
                                            <StarRating reviewCount={tutor?.reviewCount} totalRating={tutor?.totalRating} />
                                        </div>
                                        <div className="mobileReviewBox">
                                            <div className="starImgBox">
                                                <Image
                                                    className="StarImg"
                                                    priority
                                                    src={Star}
                                                    alt=""
                                                />
                                            </div>
                                        </div>
                                    </Link>
                                    <p>{setStarRating(tutor?.totalRating, tutor?.reviewCount)}</p>

                                        <Link className="primarryLink review-text-add" href="#" onClick={(e) => {
                                            e.preventDefault();
                                            setSearchedTutorId(teacherId)
                                            setReviewModalShow(true)
                                        }} >({tutor?.reviewCount} Reviews)</Link>

                                </div>
                            </div>
                            <div className="exparianceWrap">
                                <Image
                                    className="Flask"
                                    priority
                                    src={Flask}
                                    alt=""
                                />
                                <p>{tutor?.experience} years of experience</p>
                            </div>
                            <div className="examBoard">
                                <p>Exam Boards</p>
                                {tutor?.examBoardLogos?.map(url => {
                                    return (
                                        <img
                                            width={60}
                                            className="examBoarIcon"
                                            src={url}
                                            alt=""
                                        />
                                    )
                                })}
                            </div>
                            <div className="des">
                                <p>{tutor?.short_desc} </p>
                            </div>
                            <div className="viewFullPage">

                                <Link className="viewFullPageBtn" href={`${PAGE_TEACHER}/${tutor?.id}`} >
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
                </div>

                {/*Mobile Teacher Card*/}

                <div className="mobileTeacherCard">
                    <Link href={`${PAGE_TEACHER}/${teacherId}`}>
                        <div className="searchItemWrap">
                            <div className="searchItemUser">
                                <div className="searchIemUserInner">
                                    <Link href="#">
                                        {/* <Image
                                    className="userImgSearch"
                                    src={tutor?.profile_photo}
                                    width={}
                                    alt=""
                                /> */}
                                        <img src={tutor?.profile_photo} className="userImgSearch" alt={tutor?.first_name} />

                                        {/*Supper Tutor Tag*/}

                                        {tutor?.is_super_tutor && <SupperTutorTag />}

                                    </Link>
                                    <a className="btn-fav">
                                        <Image
                                            className="userImgSearchHeart"
                                            src={isFavourite ? HeartFilled : Heart}
                                            alt=""
                                            onClick={onClickFavourite}
                                        />
                                    </a>
                                </div>
                            </div>
                            <div className="searchItemContent">
                                <div className="searchItemContentHead">
                                    <Link href={`${PAGE_TEACHER}/${teacherId}`}><p>{tutor?.first_name} {tutor?.last_name}</p></Link>
                                    <p>£{tutor?.price_one_to_one} <span>/hour</span></p>
                                </div>
                                <h2 className="itemBuiTextShortClass">{tutor?.bio}</h2>
                                <div className="exparianceWrap">
                                    <Image
                                        className="Flask"
                                        priority
                                        src={Flask}
                                        alt=""
                                    />
                                    <p>{tutor?.experience} years of experience</p>
                                </div>
                                <div className="reviewBoxSearch">
                                    <div className="starView">
                                        <Link href="#">
                                            <div className="pcReviewBox">
                                                <StarRating reviewCount={tutor?.reviewCount} totalRating={tutor?.totalRating} />
                                            </div>
                                            <div className="mobileReviewBox">
                                                <div className="starImgBox">
                                                    <Image
                                                        className="StarImg"
                                                        priority
                                                        src={Star}
                                                        alt=""
                                                    />
                                                </div>
                                            </div>
                                        </Link>
                                        <p>{setStarRating(tutor?.totalRating, tutor?.reviewCount)} </p>
                                        <Link
                                            className="primarryLink review-text-add"
                                            href="#"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                setSearchedTutorId(teacherId)
                                                setReviewModalShow(true)
                                            }}
                                        >({tutor?.reviewCount} Reviews)</Link>
                                    </div>
                                </div>
                                <div className="examBoard">
                                    <p>Exam Boards</p>
                                    {tutor?.examBoardLogos?.map(url => {
                                        return (
                                            <img
                                                width={60}
                                                className="examBoarIcon"
                                                src={url}
                                                alt=""
                                            />
                                        )
                                    })}

                                </div>
                                <div className="des">
                                    <p>{tutor?.short_desc} </p>
                                </div>
                                <div className="viewFullPage">

                                    <Link className="viewFullPageBtn" href={`/teacher/${tutor?.id}`} >
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
                    </Link>
                </div>
            </div>

            <ModalLayout
                message={popupMessage}
                modalShow={modalShow}
                onClickYes={() => {
                    window.localStorage.setItem(LOCAL_STORAGE_KEY_REDIRECT_URL, `${window?.location?.href}`);
                    router.replace(`${PAGE_SIGNUP}?redirect_url=${window?.location?.href}`)
                }}
                onClickCancel={() => setModalShow(false)}
            />

            {/* Review pop up Modal */}
            <ReviewPopup key={searchedTutor?.data?.id} tutor={searchedTutor?.data} modalShow={reviewModalShow} setModalShow={setReviewModalShow} />
        </>
    )
}
