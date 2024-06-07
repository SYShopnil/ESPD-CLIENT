import Image from "next/image";
import backVector from "@/components/pages/logInSignUpHeader/assets/backVector.svg";
import Link from "next/link";
import React, { useRef, useState } from "react";
import Camera from "@/components/pages/studentProfile/assets/Camera.svg";
import { getCountryCallingCode } from "react-phone-number-input/input";
import EyeSlash from "@/components/pages/signUp/assets/EyeSlash.svg";
import Eye from "./assets/Eye.svg";
import { LOCAL_STORAGE_KEY, PAGE_TEACHER_DASHBOARD } from "@/config/constants";
import useUser from "@/hooks/userUser";
import {
    API_FILE_UPLOAD,
    API_GET_TUTOR_PROFILE,
    API_UPDATE_TEACHER_INFO,
    API_UPDATE_TEACHER_PASSWORD
} from "@/services/api/endpoints";
import { useMutation, useQuery } from "react-query";
import { get, post } from "@/services/api/api";
import { useForm } from "react-hook-form";
import { encryptData } from "@/services/encryptUtil";
import axios from "axios";
import { showToast } from "@/utils/toastUtils";
import ErrorMessage from "@/components/common/ErrorMessage";

export default function ProfileSettings() {
    const [toggleState, setToggleState] = useState(1);
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
    const [image, setImage] = useState(null);
    const [url, setUrl] = useState(null);
    const [passwordErrorMessage, setPasswordErrorMessage] = useState('');


    const inputRef = useRef(null);


    const toggleTab = ({ index }: { index: any }) => {
        setToggleState(index);
    }

    const { user } = useUser();
    const id = user?.id;

    const { isLoading, isError, error, data, isSuccess } = useQuery({
        queryKey: ['singleTeacher'],
        queryFn: () => get(API_GET_TUTOR_PROFILE),
        enabled: !!id
    });
    const tutor = isSuccess ? data?.data : {};
    const {
        control,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        values: {
            first_name: tutor?.first_name,
            last_name: tutor?.last_name,
            phone: tutor?.phone,
            email: tutor?.email,
            address_line_1: tutor?.address_line_1,
            address_line_2: tutor?.address_line_2,
            city: tutor?.city,
            postal_code: tutor?.postal_code,
            country: tutor?.country,
        }
    });

    // second useForm instance for form 2
    const {
        register: register2,
        handleSubmit: handleSubmit2,
        formState: { errors: errors2 },
    } = useForm();

    const updateMutation = useMutation(
        async (data) => await post(`${API_UPDATE_TEACHER_INFO}`, data),
        {
            onSuccess: (res) => {
                const access_token = user?.access_token;
                const userInfo = encryptData({
                    ...res?.data,
                    access_token
                });

                window.localStorage.setItem(LOCAL_STORAGE_KEY, userInfo);

                showToast("success", "Profile updated");

                window.location.reload();
            },
            onError: (err) => {
                showToast("error", "Error Occured");
            },
        }
    );

    const teacherPasswordMutation = useMutation(
        async (data) => await post(`${API_UPDATE_TEACHER_PASSWORD}`, data),
        {
            onSuccess: (res) => {

                showToast("success", "Password updated");

                window.location.reload();
            },
            onError: (err) => {

                setPasswordErrorMessage("Error occured")
            },
        }
    );

    const handleClick = () => {
        // open file input box on click of another element
        inputRef.current.click();
    };

    const handleFileChange = event => {
        const fileObj = event.target.files && event.target.files[0];

        if (!fileObj) {
            return;
        }

        if (fileObj) {
            setImage(URL.createObjectURL(event.target.files[0]));
        }

        let formData = new FormData();

        formData.append('file', event.target.files[0]);

        console.log('>> formData >> ', formData);

        axios.post(API_FILE_UPLOAD,
            formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }
        ).then(res => {

            console.log(res?.data?.data);

            setUrl(res?.data?.data?.url);

        }).catch(err => console.log(err));
    };

    const getProfileImage = () => {
        if (image) {
            return (
                <img
                    className="camera"
                    src={image}
                    alt=""
                    width={180}
                    height={180}
                />
            )
        }

        if (image === null && tutor?.profile_photo) {
            return (
                <img
                    className="camera"
                    src={tutor?.profile_photo}
                    alt=""
                    width={180}
                    height={180}
                />
            )
        }

        return (
            <Image
                className="camera"
                src={Camera}
                alt=""
            />
        )
    };

    const onFormSubmit = (data: any) => {
        const payload = {
            ...data
        }
        if (url !== null) {
            payload.profile_photo = url;
        }
        updateMutation.mutate(payload);

    };

    const handlePasswordSubmit = (data: any) => {

        if (!!(data?.password !== data?.confirm_password)) {

            return setPasswordErrorMessage("Password didn't match")
        }

        const payload = { new_password: data?.password }

        teacherPasswordMutation.mutate(payload)
    };

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-12 col-sm-12 col-md-12">
                        <div className="favouriteLisHead">
                            <Link href={`/${PAGE_TEACHER_DASHBOARD}?page=statistics`}>
                                <div className="signUpBack">
                                    <Image
                                        className="backVector"
                                        src={backVector}
                                        alt=""
                                    />
                                    <p className="backText">Back to Dashboard</p>
                                </div>
                            </Link>
                            <h1>Your Profile</h1>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 col-sm-12 col-md-2">

                    </div>
                    <div className="col-12 col-sm-12 col-md-8">
                        <div className="profileWrap">

                            <div>
                                <div className="personalDetailsWrap">
                                    <input
                                        style={{ display: 'none' }}
                                        ref={inputRef}
                                        type="file"
                                        onChange={handleFileChange}
                                    />
                                    <form onSubmit={handleSubmit(onFormSubmit)} noValidate>
                                        <div className="personalFormWrap">
                                            <h4 className="profileItemtitle">Personal Details</h4>

                                            <div className="uploadImageBox">
                                                <div className="uploadImageInner">
                                                    <a href="#">
                                                        {getProfileImage()}
                                                    </a>
                                                </div>

                                                {/* <button className="uploadImageBtn" onClick={handleClick} type="button">
                                                    <Image
                                                        className="UploadSimple"
                                                        src={UploadSimple}
                                                        alt=""
                                                    />
                                                    Upload an image
                                                </button> */}
                                            </div>

                                            <div className="profileFormBox">
                                                <div className="nameBox">
                                                    <div className="firstBox">
                                                        <p>First name</p>

                                                        <input
                                                            readOnly
                                                            type="text"
                                                            id="first_name"
                                                            {...register("first_name")}
                                                        />
                                                    </div>

                                                    <div className="firstBox">
                                                        <p>Last name</p>
                                                        <input
                                                            readOnly
                                                            type="text"
                                                            id="last_name"
                                                            {...register("last_name")}
                                                        />
                                                    </div>
                                                </div>

                                                <div className="fromNumberCon">
                                                    <p>Phone number</p>

                                                    <div className="phoneInputBox">
                                                        <a>+{getCountryCallingCode("GB")}</a>

                                                        <input
                                                            readOnly
                                                            type="phone"
                                                            id="phone"
                                                            {...register("phone")}
                                                        />
                                                    </div>
                                                </div>

                                                <div className="emailBox">
                                                    <p>Email address</p>

                                                    <input
                                                        readOnly
                                                        type="email"
                                                        id="email"

                                                        {...register("email")}
                                                    />
                                                </div>

                                            </div>
                                        </div>

                                        <div className="personalFormWrap">
                                            <h4 className="profileItemtitle">Address</h4>
                                            <div className="addressFormBox">

                                                <div className="addressBox">
                                                    <p>Address Line 1</p>
                                                    <input
                                                        readOnly
                                                        type="text"
                                                        id="address_line_one"
                                                        {...register("address_line_1")}
                                                    />
                                                </div>
                                                <div className="addressBox">
                                                    <p>Address Line 2 (Optional)</p>
                                                    <input
                                                        readOnly
                                                        type="text"
                                                        id="address_line_two"
                                                        {...register("address_line_2")}
                                                    />
                                                </div>
                                                <div className="cityCodeBox">
                                                    <div className="cityBox">
                                                        <p>City</p>
                                                        <input
                                                            readOnly
                                                            type="text"
                                                            id="city"
                                                            {...register("city")}
                                                        />
                                                    </div>
                                                    <div className="cityBox">
                                                        <p>Postal Code</p>
                                                        <input
                                                            readOnly
                                                            type="text"
                                                            id="postal_code"
                                                            {...register("postal_code")}
                                                        />
                                                    </div>
                                                    <div className="cityBox">
                                                        <p>Country</p>
                                                        <input
                                                            readOnly
                                                            type="text"
                                                            id="country"
                                                            {...register("country")}
                                                        />
                                                    </div>
                                                </div>

                                            </div>
                                            {/* <div className="saveBtnBox">
                                                <button type="submit" disabled={updateMutation.isLoading}>
                                                    {updateMutation.isLoading ? 'Please wait...' : 'Save Changes'}
                                                </button>
                                            </div> */}
                                        </div>
                                    </form>

                                    <form onSubmit={handleSubmit2(handlePasswordSubmit)} noValidate>
                                        <div className="personalFormWrap">
                                            <div className="passwordFormBox">
                                                <h4>Password</h4>

                                                {passwordErrorMessage !== '' &&
                                                    <div className={'alert alert-danger'}>
                                                        {passwordErrorMessage}
                                                    </div>
                                                }

                                                <h5>To change your password, simply enter a new password in both fields and click save.</h5>
                                                <div className="passwordBox">
                                                    <div className="passInner">
                                                        <input
                                                            className="passInput"
                                                            type={passwordVisible ? "text" : "password"}
                                                            placeholder="New Password"
                                                            {...register2("password", {
                                                                required: "This field is required",
                                                            })}
                                                        />

                                                        <Image
                                                            className="passEye"
                                                            priority
                                                            src={passwordVisible ? Eye : EyeSlash}
                                                            alt=""
                                                            onClick={() => setPasswordVisible(!passwordVisible)}
                                                        />
                                                    </div>

                                                    <div >
                                                        {errors2.confirm_password && errors2.confirm_password?.message && (
                                                            <ErrorMessage
                                                                text={errors2.confirm_password?.message}
                                                            />
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="passwordBox">
                                                    <div className="passInner">
                                                        <input
                                                            className="passInput"
                                                            type={confirmPasswordVisible ? "text" : "password"}
                                                            placeholder="Confirm New Password"
                                                            {...register2("confirm_password", {
                                                                required: "This field is required",
                                                            })}
                                                        />

                                                        <Image
                                                            className="passEye"
                                                            priority
                                                            src={confirmPasswordVisible ? Eye : EyeSlash}
                                                            alt=""
                                                            onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
                                                        />
                                                    </div>

                                                    <div >
                                                        {errors2.confirm_password && errors2.confirm_password?.message && (
                                                            <ErrorMessage
                                                                text={errors2.confirm_password?.message}
                                                            />
                                                        )}
                                                    </div>

                                                </div>
                                            </div>
                                            <div className="saveBtnBox">
                                                <button>Update Password</button>
                                            </div>
                                        </div>
                                    </form>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-sm-12 col-md-2">

                    </div>
                </div>
            </div>
        </>
    )
}
