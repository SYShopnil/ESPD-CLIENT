import Image from "next/image";
import backVector from "@/components/pages/logInSignUpHeader/assets/backVector.svg";
import Link from "next/link";
import React, {useRef, useState} from "react";
import Camera from "@/components/pages/studentProfile/assets/Camera.svg";
import UploadSimple from "@/components/pages/studentProfile/assets/UploadSimple.svg";
import {getCountryCallingCode} from "react-phone-number-input/input";
import Eye from "./assets/Eye.svg";
import EyeSlash from "@/components/pages/signUp/assets/EyeSlash.svg";
import useUser from "@/hooks/userUser";
import {
    API_FILE_UPLOAD,
    API_GET_STUDENT_PROFILE,
    API_UPDATE_STUDENT_INFO,
    API_UPDATE_STUDENT_PASSWORD
} from "@/services/api/endpoints";
import {get, post} from "@/services/api/api";
import {useMutation, useQuery} from "react-query";
import {useForm} from "react-hook-form";
import axios from "axios";
import {encryptData} from "@/services/encryptUtil";
import {LOCAL_STORAGE_KEY} from "@/config/constants";
import {showToast} from "@/utils/toastUtils";
import ErrorMessage from "@/components/common/ErrorMessage";

export default function Profile() {
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
        queryKey: ['singleStudent'],
        queryFn: () => get(API_GET_STUDENT_PROFILE),
        enabled: !!id
    });

    const student = isSuccess ? data?.data : {};

    const {
        control,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        values: {
            first_name: student?.first_name,
            last_name: student?.last_name,
            phone: student?.phone,
            email: student?.email,
            address_line_1: student?.address_line_1,
            address_line_2: student?.address_line_2,
            city: student?.city,
            postal_cdoe: student?.postal_cdoe,
            country: student?.country,
        }
    });

    // useForm instance for form 2
    const {
        register: register2,
        handleSubmit: handleSubmit2,
        formState: { errors: errors2 },
    } = useForm();

    const updateMutation = useMutation(
        async (data) => await post(`${API_UPDATE_STUDENT_INFO}`, data),
        {
            onSuccess: (res) => {
                const access_token = user?.access_token;
                const encryptPayload = {
                    ...res?.data,
                    access_token
                }

                const userInfo = encryptData(encryptPayload);

                window.localStorage.setItem(LOCAL_STORAGE_KEY, userInfo);

                showToast("success", "Updated Successfully")

                window.location.reload();
            },
            onError: (err) => {

            },
        }
    );

    const studentPasswordMutation = useMutation(
        async (data) => await post(`${API_UPDATE_STUDENT_PASSWORD}`, data),
        {
            onSuccess: (res) => {
                showToast("success", "Updated Successfully")

                window.location.reload();
            },
            onError: (err) => {

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

        if (image === null && student?.profile_photo) {
            return (
                <img
                    className="camera"
                    src={student?.profile_photo}
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

        studentPasswordMutation.mutate(payload)
    };



    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-12 col-sm-12 col-md-12">
                        <div className="favouriteLisHead">
                            <Link href="/student-dashboard">
                                <div className="signUpBack">
                                    <Image
                                        className="backVector"
                                        src={backVector}
                                        alt=""
                                    />
                                    <p className="backText">Back to Dashboard</p>
                                </div>
                            </Link>
                            <h1>Personal Details</h1>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 col-sm-12 col-md-2">

                    </div>
                    <div className="col-12 col-sm-12 col-md-8">
                        <div className="profileWrap">
                            <div className="lessonButtonWrap">
                                <div className={toggleState === 1 ? "lessonTabButton LessonActive" : "tabButton"} onClick={() => toggleTab({ index: 1 })}>
                                    {/* <p>Personal Details</p> */}
                                    {/* <h1>Your Profile</h1> */}
                                </div>
                                {/* <div className={toggleState === 2 ? "lessonTabButton LessonActive" : "tabButton"} onClick={() => toggleTab({ index: 2 })}>
                                    <p>Payment Details</p>
                                </div> */}
                            </div>

                            <div className={toggleState === 1 ? "lessonContainer activeCon" : "lessonContainer"}>
                                <input
                                    style={{ display: 'none' }}
                                    ref={inputRef}
                                    type="file"
                                    onChange={handleFileChange}
                                />
                                <form onSubmit={handleSubmit(onFormSubmit)} noValidate>
                                    <div className="personalDetailsWrap">
                                        <div className="personalFormWrap">

                                            <div className="uploadImageBox">
                                                <div className="uploadImageInner">
                                                    <a href="#">
                                                        {getProfileImage()}
                                                    </a>
                                                </div>

                                                <button className="uploadImageBtn" onClick={handleClick} type="button">
                                                    <Image
                                                        className="UploadSimple"
                                                        src={UploadSimple}
                                                        alt=""
                                                    />
                                                    Upload an image
                                                </button>
                                            </div>

                                            <div className="profileFormBox">

                                                <div className="nameBox">
                                                    <div className="firstBox">
                                                        <p>First name</p>

                                                        <input
                                                            type="text"
                                                            id="first_name"
                                                            {...register("first_name")}
                                                        />
                                                    </div>

                                                    <div className="firstBox">
                                                        <p>Last name</p>
                                                        <input
                                                            type="text"
                                                            id="last_name"
                                                            {...register("last_name")}
                                                        />
                                                    </div>
                                                </div>

                                                <div className="fromNumberCon">
                                                    <p>Phone number</p>

                                                    <div className="phoneInputBox">
                                                        <a >+{getCountryCallingCode("GB")}</a>

                                                        <input
                                                            type="phone"
                                                            id="phone"
                                                            {...register("phone")}
                                                        />
                                                    </div>
                                                </div>

                                                <div className="emailBox">
                                                    <p>Email address</p>

                                                    <input
                                                        type="email"
                                                        id="email"
                                                        readOnly
                                                        {...register("email")}
                                                    />
                                                </div>

                                            </div>
                                        </div>

                                        <div className="personalFormWrap">
                                            <div className="addressFormBox">

                                                <div className="addressBox">
                                                    <p>Address Line 1</p>
                                                    <input
                                                        type="text"
                                                        id="address_line_one"
                                                        {...register("address_line_1")}
                                                    />
                                                </div>
                                                <div className="addressBox">
                                                    <p>Address Line 2 (Optional)</p>
                                                    <input
                                                        type="text"
                                                        id="address_line_two"
                                                        {...register("address_line_2")}
                                                    />
                                                </div>
                                                <div className="cityCodeBox">
                                                    <div className="cityBox">
                                                        <p>City</p>
                                                        <input
                                                            type="text"
                                                            id="city"
                                                            {...register("city")}
                                                        />
                                                    </div>
                                                    <div className="cityBox">
                                                        <p>Postal Code</p>
                                                        <input
                                                            type="text"
                                                            id="postal_cdoe"
                                                            {...register("postal_cdoe")}
                                                        />
                                                    </div>
                                                    <div className="cityBox">
                                                        <p>Country</p>
                                                        <input
                                                            type="text"
                                                            id="country"
                                                            {...register("country")}
                                                        />
                                                    </div>
                                                </div>

                                                <div className="saveBtnBox">
                                                    <button type="submit" disabled={updateMutation.isLoading}>
                                                        {updateMutation.isLoading ? 'Please wait...' : 'Save Changes'}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>


                                    </div>
                                </form>

                                <form onSubmit={handleSubmit2(handlePasswordSubmit)} noValidate >
                                    <div className="personalFormWrap">
                                        <div className="passwordFormBox">
                                            <h4>Password</h4>

                                            {passwordErrorMessage !== '' &&
                                                <div className={'alert alert-danger'}>
                                                    {passwordErrorMessage}
                                                </div>
                                            }

                                            <h5>To change your password, simply enter a new password in both fields and click save.</h5>
                                            <form>
                                                <div className="passwordBox">
                                                    <div className="passInner">
                                                        <input
                                                            className="passInput"
                                                            type={passwordVisible ? "text" : "password"}
                                                            placeholder="New Password"
                                                            {...register2("password", {
                                                                required: "this field is required",
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

                                                    <div>
                                                        {errors2.password && errors2.password?.message && (
                                                            <ErrorMessage
                                                                text={errors2.password?.message}
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
                                                                required: "this field is required",
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
                                            </form>
                                        </div>

                                        <div className="saveBtnBox">
                                            <button type="submit">Update Password</button>
                                        </div>
                                    </div>
                                </form>

                            </div>

                        </div>
                        {/* <div className={toggleState === 2 ? "lessonContainer activeCon" : "lessonContainer"}>
                            <div className="personalFormWrap">
                                <div className="paymentDetailsWrap">
                                    <div className="cardDetails">
                                        <div className="cardType">
                                            <a href="#">
                                                <Image
                                                    className="masterCardIcon"
                                                    priority
                                                    src={masterCardIcon}
                                                    alt=""
                                                />
                                                <p>Mastercard</p>
                                            </a>
                                        </div>
                                        <p>**** **** <span>6932</span></p>
                                    </div>
                                    <div className="editBtnBox">
                                        <a href="#">
                                            <Image
                                                className="PencilSimple"
                                                priority
                                                src={PencilSimple}
                                                alt=""
                                            />
                                            <p>Edit</p>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div> */}
                    </div>
                </div>
                <div className="col-12 col-sm-12 col-md-2">

                </div>
            </div>

        </>
    )
}
