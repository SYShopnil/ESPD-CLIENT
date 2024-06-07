import React, { useState } from "react";
import Select from 'react-select'
import Image from "next/image";
import Eye from "@/components/pages/logIn/assets/Eye.svg";
import ArrowRight from "@/components/pages/logIn/assets/ArrowRight.svg";
import octicon_check from "@/components/pages/home/assets/octicon_check-16.svg";
import { useRouter } from "next/navigation";
import { number, object, string } from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQuery } from "react-query";
import { API_FIND_TUTOR, API_GET_HOME, API_ON_BOARD_TEACHER } from "@/services/api/endpoints";
import { get, post } from "@/services/api/api";
import CaretUpDown from "@/components/pages/home/assets/CaretUpDown.svg";
import ErrorMessage from "@/components/common/ErrorMessage";

export default function FindTutorPopUpForm({ setShowConfirmation }) {
    const [selectedSubject, setSelectedSubject] = useState(null);
    const [selectedLevel, setSelectedLevel] = useState(null);


    const { isLoading, isError, error, data: home, isSuccess } = useQuery({
        queryKey: ['homeData'],
        queryFn: () => get(API_GET_HOME)
    });

    const router = useRouter();

    let findTutorSchema = object({
        // subject_id: number().required(),
        // level_id: number().required(),
        dexcription: string(),
        email: string().email().required("Email is required"),
        phone: string().required("Phone is required"),
        name: string().required("Name is required"),
    });

    const {
        control,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ resolver: yupResolver(findTutorSchema) });

    // { resolver: yupResolver(findTutorSchema) }

    const subject_options = (isSuccess && home?.data?.subjects?.length)
        ? home?.data?.subjects?.map(level => ({ value: level?.id, label: level?.name }))
        : [];

    const level_options = (isSuccess && home?.data?.levels?.length)
        ? home?.data?.levels?.map(level => ({ value: level?.id, label: level?.name }))
        : [];

    const findTutorMutation = useMutation(
        async (data) => post(API_FIND_TUTOR, data),
        {
            onSuccess: (res) => {

                setShowConfirmation(true);

                //TODO store it to redux
                window.localStorage.setItem("tutorOnBoard", res.data);
            },
            onError: (err) => {

            },
        }

    )


    const onFormSubmit = (data: any) => {

        const finalData = {
            subject_id: selectedSubject?.value,
            level_id: selectedLevel?.value,
            name: data?.name,
            email: data?.email,
            phone: data?.phone,
            description: data?.description
        }

        findTutorMutation.mutate(finalData);

    };




    return (
        <>
            <div className="FindTutorPopUpWrapper">

                <form onSubmit={handleSubmit(onFormSubmit)} noValidate >
                    <div className="youLike">
                        <h4 className="findPopH4">Struggling to find the perfect tutor? Let us help you</h4>
                        <h1>What would you like to support with?</h1>
                        <div className="subLevelCon">
                            <div className="subjectBox">
                                <h2>Subject</h2>
                                <div className="levelSelectCon">
                                    <div className="levelSelectInput">
                                        {/* <input
                                            className="levelSelectIn"
                                            placeholder="Enter your subject" />
                                        <a href="#">
                                            <Image
                                                className="CaretUpDown"
                                                src={CaretUpDown}
                                                alt=""
                                            />
                                        </a> */}
                                        <Select
                                            classNamePrefix="espd-select"
                                            isSearchable
                                            options={subject_options}
                                            value={selectedSubject}
                                            onChange={setSelectedSubject}
                                        />
                                    </div>

                                    {/* <div className="levelSelectOptionBoxSec">
                                        <h5>Popular Subjects</h5>
                                        <div className="subjectOptionItem">
                                            <a href="#">Chemistry</a>
                                            <a href="#">Biology</a>
                                            <a className="subjectOptionActive" href="#">Business</a>
                                            <a href="#">Computer Science</a>
                                            <a href="#">English</a>
                                        </div>
                                    </div> */}
                                </div>

                                {/*<select className="form-select levelSelect" aria-label="Default select example" {...register("subject_id")} >*/}
                                {/*    <option selected>Select  subject</option>*/}
                                {/*    <option value="1">Chemistry</option>*/}
                                {/*    <option value="2">Chemistry</option>*/}
                                {/*    <option value="3">Biology</option>*/}
                                {/*</select>*/}
                            </div>
                            <div className="subjectBox">
                                <h2>Level</h2>
                                <div className="levelSelectCon">
                                    <div className="levelSelectInput">
                                        {/* <input
                                            className="levelSelectIn"
                                            placeholder="Select  level" />
                                        <a href="#">
                                            <Image
                                                className="CaretUpDown"
                                                src={CaretUpDown}
                                                alt=""
                                            />
                                        </a> */}
                                        <Select
                                            classNamePrefix="espd-select"
                                            isSearchable
                                            options={level_options}
                                            value={selectedLevel}
                                            onChange={setSelectedLevel}
                                        />
                                    </div>

                                    {/*<div className="levelSelectOptionBoxSec">*/}
                                    {/*    <div className="subjectOptionItem">*/}
                                    {/*        <a href="#">A Levels</a>*/}
                                    {/*        <a href="#">GCSE</a>*/}
                                    {/*        <a className="subjectOptionActive" href="#">GCSE</a>*/}
                                    {/*        <a href="#">GCSE</a>*/}
                                    {/*        <a href="#">GCSE</a>*/}
                                    {/*    </div>*/}
                                    {/*</div>*/}
                                </div>
                                {/*<select className="form-select levelSelect" aria-label="Default select example" {...register("level_id")}>*/}
                                {/*    <option selected>Select</option>*/}
                                {/*    <option value="1">A Levels</option>*/}
                                {/*    <option value="2">GCSE</option>*/}
                                {/*    <option value="3">GCSE</option>*/}
                                {/*</select>*/}
                            </div>
                        </div>
                        <div className="writeText">
                            <h2>Describe what are you looking for</h2>
                            <textarea
                                rows={5}
                                placeholder="Write here"
                                {...register("description")}
                            />
                        </div>
                        <div className="detailsForm">
                            <h1>Enter personal details</h1>

                            <div  >

                                <div className="emailBox">
                                    <p>Your name*</p>
                                    <input
                                        type="text"

                                        id="name"

                                        {...register("name", {
                                            required: {
                                                value: true,
                                                message: "this field is required",
                                            },
                                        })}
                                    />
                                    <div>

                                        {errors.name && errors.name?.message && (
                                            <ErrorMessage
                                                text={errors.name?.message}
                                            />
                                        )}

                                    </div>
                                    {/*<br />*/}
                                    {/*<div>*/}
                                    {/*    {errors.name && errors.name?.message && (*/}
                                    {/*        <span style={{ color: "Red" }}>*/}
                                    {/*            {errors.name?.message as React.ReactNode}*/}
                                    {/*        </span>*/}
                                    {/*    )}*/}

                                    {/*</div>*/}
                                </div>
                                <div className="emailBox">
                                    <p>Your email*</p>
                                    <input
                                        type="email"

                                        id="email"
                                        {...register("email", {
                                            required: {
                                                value: true,
                                                message: "this field is required",
                                            },
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
                                <div className="emailBox">
                                    <p>Your phone number*</p>
                                    <input
                                        type="text"

                                        id="phone"
                                        {...register("phone", {
                                            required: {
                                                value: true,
                                                message: "this field is required",
                                            },
                                        })}
                                    />
                                    {errors.phone && errors.phone?.message && (
                                        <ErrorMessage
                                            text={errors.phone?.message}
                                        />
                                    )}
                                </div>

                                <button className="signUpBtn" type="submit" disabled={findTutorMutation.isLoading}>

                                    {findTutorMutation.isLoading ? "Please wait..." : "Send Request"}

                                    <Image
                                        className="signUpBtnArro"
                                        priority
                                        src={ArrowRight}
                                        alt=""
                                    />
                                </button>
                            </div>

                        </div>
                    </div>
                </form>

                {/* <div className="successSend">
                    <Image
                        className="octicon_check"
                        priority
                        src={octicon_check}
                        alt=""
                    />
                    <p>We’ve received your request.</p>
                    <p>One of our experts will get back to you soon.</p>
                </div> */}

            </div>
        </>
    )
}
