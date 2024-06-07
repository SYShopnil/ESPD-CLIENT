import Image from "next/image";
import React, { useState } from "react";
import ArrowRight from "./assets/ArrowRight.svg";
import ArrowLeft from "./assets/ArrowLeft.svg";
import Link from "next/link";
import CaretUpDown from "@/components/pages/home/assets/CaretUpDown.svg";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { number, object, string } from "yup";
import { useMutation } from "react-query";
import { post } from "@/services/api/api";
import { API_URL, USER_SECRET_KEY } from "@/config/config";
import { MESSAGE_WITH_TEACHER } from "@/config/constants";
import Select from 'react-select'
import PrimaryButton from "@/components/common/PrimaryButton";
import { useRouter } from "next/router";
import {
    LOCAL_STORAGE_KEY,
    LOCAL_STORAGE_KEY_TOKEN,
    PAGE_SIGNUP,
    PAGE_STUDENT_DASHBOARD,
    PAGE_TEACHER_DASHBOARD, PAGE_TEACHER_ONBOARDING, ROLE_STUDENT,
    ROLE_TEACHER
} from "@/config/constants";
import { showToast } from "@/utils/toastUtils";
import ErrorMessage from "@/components/common/ErrorMessage";

export default function TeacherMessageForm({ tutor, onClickHandler }) {
    const router = useRouter();
    const DASHBOARD_URL = PAGE_STUDENT_DASHBOARD;
    const [error, setError] = useState('');
    const [selectedOption, setSelectedOption] = useState(null);
    // const [checked, setChecked] = useState(false)

    let messageSchema = object({
        message: string().required("This field is required"),
        subject_level: number().required("This field is required"),
        exam_board_id: number().required("This field is required")
    });

    const {
        control,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const messageMutation = useMutation(
        async (data) => await post(MESSAGE_WITH_TEACHER, data),
        {
            onSuccess: (res) => {
                showToast("success", "Message sent")
            },
            onError: (err) => {
                console.log(err?.message);
            },
        }
    );


    const onFormSubmit = (data: any) => {

        // subjectOfferedId is an offer id on subject_offered table in db
        // subjectOfferedId is used to separate subject_id and level_id
        const subjectOfferedId = data?.subject_level?.value

        const filteredSubjectLevelObj = tutor?.SubjectOffered?.filter(subject => subject.offerd_id === subjectOfferedId)[0];


        const payload = {
            teacher_id: tutor?.id,
            level_id: Number(filteredSubjectLevelObj?.level_id),
            subject_id: Number(filteredSubjectLevelObj?.subject_id),
            exam_board_id: data?.exam_board_id?.value,
            message: data?.message,
            contact_email: data?.email,
            free_video_chat: data?.free_video_chat
        }

        messageMutation.mutate(payload)
    };

    const levelOption = tutor?.SubjectOffered.map(level_subject => (
        { value: level_subject?.offerd_id, label: level_subject?.name + " - " + level_subject?.level }));

    const examBoard = tutor?.ExamBoardOnTeacher.map(examBoard => ({ value: examBoard?.id, label: examBoard?.name }));


    return (
        <>
            <div className="tutorSendMsgWrap">
                <a className="bookingBack backBtnPrimary" onClick={onClickHandler}>
                    <Image
                        className="commonImg"
                        priority
                        src={ArrowRight}
                        alt=""
                    />
                    Back
                </a>
                <form noValidate onSubmit={handleSubmit(onFormSubmit)}>

                    <div className="bookinglevelCon">
                        <h2>Subject and level</h2>

                        <div className="levelSelectCon">

                            <div className="levelSelectInput">
                                <Controller
                                    name="subject_level"
                                    control={control}
                                    rules={{ required: 'This field is required' }}
                                    render={({ field }) => (
                                        <Select
                                            classNamePrefix="espd-select"
                                            isSearchable
                                            options={levelOption}
                                            {...field}
                                            isClearable
                                            placeholder="Select subject & level"
                                        />
                                    )}
                                />

                                {errors?.subject_level
                                    &&
                                    <ErrorMessage text={errors?.subject_level?.message} />
                                }

                            </div>

                        </div>
                    </div>

                    <div className="bookinglevelCon">
                        <h2>Education Board</h2>

                        <div className="levelSelectCon">
                            <div className="levelSelectInput">
                                <Controller
                                    name="exam_board_id"
                                    control={control}
                                    rules={{ required: 'This field is required' }}
                                    render={({ field }) => (
                                        <Select
                                            classNamePrefix="espd-select"
                                            isSearchable
                                            options={examBoard}
                                            {...field}
                                            isClearable
                                            placeholder="Select exam board"
                                        />
                                    )}
                                />

                                {
                                    errors?.exam_board_id
                                    &&
                                    <ErrorMessage text={errors?.exam_board_id?.message} />

                                }

                            </div>
                        </div>
                    </div>

                    <div className="bookinglevelCon">
                        <div className="emailBox">
                            <h2>Email address</h2>
                            <input
                                className={errors?.email && errors?.email?.message ? 'has-error' : ''}
                                type="email"
                                id="email"
                                {...register('email', {
                                    required: "Email is required",
                                })}
                            />
                            <div>

                                {errors.email && errors.email?.message && (
                                    <ErrorMessage
                                        text={errors.email?.message}
                                    />
                                )}

                            </div>
                        </div>

                    </div>


                    <div className="writeText">
                        <div>
                            <h2>Your Message</h2>
                            <textarea

                                {...register("message", {
                                    required: "This field is required",
                                })}
                                rows={5}
                                placeholder="Write here"
                            />
                        </div>
                        {errors?.message && errors.message?.message && (
                            <ErrorMessage
                                text={errors.message?.message}
                            />
                        )}
                    </div>

                    <div className="checkInnerBox">
                        <label className="containerLevel">
                            <input
                                type='checkbox'
                                {...register("free_video_chat")}
                            />
                            <span className="checkmark"></span>
                        </label>
                        <p>I’d like a free video chat with the teacher</p>
                    </div>
                    <div className="createGroupBtnBox">
                        <button className="signUpBtn" type="submit" disabled={messageMutation.isLoading}>
                            {messageMutation.isLoading ? 'Please wait...' : ' Send Message'}
                            <Image
                                className="signUpBtnArro"
                                priority
                                src={ArrowLeft}
                                alt=""
                            />
                        </button>
                    </div>

                </form>
            </div>
        </>
    )
}
