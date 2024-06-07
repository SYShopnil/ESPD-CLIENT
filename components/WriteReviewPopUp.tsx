import Modal from "react-bootstrap/Modal";
import React, { useState } from "react";
import Star_blank from "@/components/pages/BookingOption/assets/Star_blank.svg";
import ArrowRight_white from "@/components/pages/BookingOption/assets/ArrowRight_white.svg";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { post } from "@/services/api/api";
import { API_POST_REVIEW } from "@/services/api/endpoints";
import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'


export default function WriteReviewPopUp({ showWriteModal, setShowWriteModal, setShowWriteReviewConfirmationModal, lesson }) {

    const [rating, setRating] = useState(0);

    console.log("write review pop", lesson);

    const {
        control,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const writeRewviewMutation = useMutation(
        async (data) => await post(API_POST_REVIEW, data),
        {
            onSuccess: (res) => {
                setShowWriteModal(false)
                setShowWriteReviewConfirmationModal(true)

            },
            onError: (err) => {

            },
        }
    );


    const onFormSubmit = (data: any) => {

        const payload = {
            teacher_id: lesson?.teacher_id,
            student_id: lesson?.student_id,
            rating: rating,
            desc: data?.message
        }

        writeRewviewMutation.mutate(payload);
    };


    return (
        <>
            <Modal
                show={showWriteModal}
                onHide={() => {
                    setShowWriteModal(false)
                }}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <div className="findTutorPopWrap findTutorPopWrapShare">
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter" className="modelTitle">

                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form noValidate onSubmit={handleSubmit(onFormSubmit)}>
                            <div className="write-pop-up-wrapper">
                                <h1>How was the class with {`${lesson?.Teacher?.first_name} ${lesson?.Teacher?.last_name}`}?</h1>
                                <h2>Rate Your Tutor and Share Your Valuable Experience</h2>
                                <h3>Select rating</h3>
                                <div className="rating-wrap">
                                    <div className="rating-icon">
                                        <Rating
                                            style={{ maxWidth: 130 }}
                                            onChange={setRating}
                                            value={rating} />
                                        {/* <Image className="star-blank-icon" src={Star_blank} alt=" " />
                                        <Image className="star-blank-icon" src={Star_blank} alt=" " />
                                        <Image className="star-blank-icon" src={Star_blank} alt=" " />
                                        <Image className="star-blank-icon" src={Star_blank} alt=" " />
                                        <Image className="star-blank-icon" src={Star_blank} alt=" " /> */}
                                    </div>
                                    <p>{rating}.0</p>
                                </div>
                                <h4>Write few lines about your overall experience</h4>
                                <textarea
                                    {...register("message", {
                                        required: "This field is required",
                                    })}
                                    rows={5}
                                    placeholder="Write here"
                                />
                                <button className="write-pop-up-btn" type="submit">
                                    Submit
                                    <Image className="ArrowRight_white" src={ArrowRight_white} alt=" " />
                                </button>
                            </div>
                        </form>
                    </Modal.Body>
                    <Modal.Footer>

                    </Modal.Footer>
                </div>
            </Modal>
        </>
    )
}
