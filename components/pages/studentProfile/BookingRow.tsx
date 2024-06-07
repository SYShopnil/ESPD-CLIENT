import React, { useState } from 'react';
import Image from "next/image";
import ArrowRightWhite from "./assets/ArrowRightWhite.svg";
import UploadSimple from "./assets/UploadSimple.svg";
import { addHoursToDate, formatDate } from '@/services/dateUtils';
import { PAGE_JOIN_GROUP } from '@/config/constants';
import SharePopup from '@/components/share-popup';
import WriteReviewPopUp from '@/components/WriteReviewPopUp';
import WriteReviewConfirmationPopUp from '@/components/WriteReviewConfirmationPopUp';

function BookingRow({ lesson }) {
    const [showWriteModal, setShowWriteModal] = useState(false);
    const [showShareModal, setShowShareModal] = useState(false);
    const [showWriteReviewConfirmationModal, setShowWriteReviewConfirmationModal] = useState(false);
    const [currentPageUrl, setCurrentPageUrl] = useState('');

    const onClickShare = async (token) => {
        setShowShareModal(true);
        setCurrentPageUrl(`${window.location.origin}/${PAGE_JOIN_GROUP}=${token}`)

        // const shareData = {
        //     title: "ESPD",
        //     text: `Join group`,
        //     url: `${window.location.origin}/${PAGE_JOIN_GROUP}=${token}`,
        // };

        // await window.navigator.share(shareData);
    }

    const onClickWriteReview = () => {
        setShowWriteModal(true);
    }

    return (
        <tr>
            <td>
                <p>{formatDate(lesson?.start_time)}</p>
                <p>{formatDate(lesson?.start_time, undefined, 'hh:mm a')} - {formatDate(addHoursToDate(lesson?.start_time, lesson?.duration), undefined, 'hh:mm a')}</p>
            </td>
            <td>
                <p>{lesson?.Subject?.name}</p>
            </td>
            <td className="upClassesTypeMobileNone">
                <p>{lesson?.booking_type === 'One_To_One' ? 'One-to-One' : `Group (${lesson?.no_of_member} students)`}</p>
            </td>
            <td>
                <p>{lesson?.Teacher?.first_name} {lesson?.Teacher?.last_name}</p>
            </td>
            <td>
                {
                    (lesson?.booking_type === "One_To_Group" && lesson?.status !== "COMPLETE")

                        &&
                        <a className="lessonGroupDetailsBtn" onClick={() => onClickShare(lesson?.token)}>
                            <Image
                                className="ArrowRightWhiteLesson"
                                src={UploadSimple}
                                alt=""
                            />
                            Group Invitation

                        </a>

                }
            </td>
            <td>
                {
                    (lesson?.status !== "COMPLETE")

                    &&

                    <a className="lessonDetailsBtn" href={lesson?.meet_link}>
                        Join
                        <Image
                            className="ArrowRightWhiteLesson"
                            src={ArrowRightWhite}
                            alt=""
                        />
                    </a>
                }

                {lesson?.status === 'COMPLETE' &&
                  <a className="lessonDetailsBtn" onClick={() => onClickWriteReview()}>
                      Write a review
                      <Image
                        className="ArrowRightWhiteLesson"
                        src={ArrowRightWhite}
                        alt=""
                      />
                  </a>

                }
            </td>
            <SharePopup showShareModal={showShareModal} setShowShareModal={setShowShareModal} currentPageUrl={currentPageUrl} />
            <WriteReviewPopUp
                showWriteModal={showWriteModal}
                setShowWriteModal={setShowWriteModal}
                setShowWriteReviewConfirmationModal={setShowWriteReviewConfirmationModal}
                lesson={lesson} />
            <WriteReviewConfirmationPopUp
                showWriteReviewConfirmationModal={showWriteReviewConfirmationModal}
                setShowWriteReviewConfirmationModal={setShowWriteReviewConfirmationModal}
            />
        </tr>
    );
}

export default BookingRow;
