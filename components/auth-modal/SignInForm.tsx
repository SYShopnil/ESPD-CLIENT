import React, {useState} from 'react';
import ErrorMessage from "@/components/common/ErrorMessage";
import Image from "next/image";
import Eye from "@/components/pages/signUp/assets/Eye.svg";
import EyeSlash from "@/components/pages/signUp/assets/EyeSlash.svg";
import google from "@/components/pages/signUp/assets/google.svg";
import facebook from "@/components/pages/signUp/assets/facebook.svg";
import {API_LOGIN_STUDENT, API_SOCIAL_VALIDATION} from "@/services/api/endpoints";
import {object, string} from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {useMutation, useQuery} from "react-query";
import {get, post} from "@/services/api/api";
import {LOCAL_STORAGE_KEY, LOCAL_STORAGE_KEY_TOKEN, PAGE_RESET_PASS_REQUEST_OTP, PAGE_STUDENT_DASHBOARD} from "@/config/constants";
import PrimaryButton from "@/components/common/PrimaryButton";
import {API_URL} from "@/config/config";
import {encryptData} from "@/services/encryptUtil";

function SignupForm({onClickSignup, onLoginSuccess, action}) {

    const [passwordVisible, setPasswordVisible] = useState(false);
    const [error, setError] = useState('');
    const LOGIN_URL = API_LOGIN_STUDENT;

    let loginSchema = object({
        email: string().email().required("Email is required"),
        password: string().required("Password is required"),
    });

    const {
        control,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ resolver: yupResolver(loginSchema) });

    const loginMutation = useMutation(
        async (data) => await post(LOGIN_URL, data),
        {
            onSuccess: (res) => {
                const userInfo = encryptData(res.data);
                window.localStorage.setItem(LOCAL_STORAGE_KEY, userInfo);
                window.localStorage.setItem(LOCAL_STORAGE_KEY_TOKEN, res?.data?.access_token);
                onLoginSuccess(res.data);
            },
            onError: (err) => {
                if (err && err?.response?.status === 401) {
                    setError('Invalid credentials');
                }
                if (err && err?.response?.status === 406) {
                    setError(err?.response?.data?.message);
                }
            },
        }
    );

    const onFormSubmit = (data: any) => {
        setError('');
        loginMutation.mutate(data);
    };

    return (
        <>
            <div className="formWrap">
                <h1 className="logInTitle">Sign in to {action}</h1>
                {error !== '' &&
                  <div className={'alert alert-danger'}>
                      {error}
                  </div>
                }
                <form noValidate>
                    <div>
                        <div className="emailBox">
                            <p>Email address *</p>
                            <input
                                className={errors.email && errors.email?.message ? 'has-error' : ''}
                                type="email"
                                id="email"
                                {...register("email", {
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

                    <div className="passwordBox">
                        <p>Password *</p>

                        <div className="passInner ">
                            <input
                                className={`passInput ${errors.password && errors.password?.message ? 'has-error' : ''}`}
                                type={passwordVisible ? "text" : "password"}
                                id="password"
                                {...register("password", {
                                    required: "* password is required",
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

                        {errors.password && errors.password?.message && (
                            <ErrorMessage
                                text={errors.password?.message}
                            />
                        )}
                    </div>
                    <div className="forgetBox">
                        <a href={`${PAGE_RESET_PASS_REQUEST_OTP}`}>Forgot Password?</a>
                    </div>

                    <div className="signInButtonBox">
                        <PrimaryButton
                            type={'submit'}
                            text={'Login'}
                            loading={loginMutation.isLoading}
                            onClick={handleSubmit(onFormSubmit)}
                        />
                    </div>

                </form>
                <div className="alreadySign">
                    <p>
                        Don’t have an account yet?
                        <span>
                <a href={'#'} onClick={(e=> {
                    e.preventDefault();
                    onClickSignup();
                })}>Sign up</a>
              </span>
                    </p>
                </div>
                {/*<div className="socialSign">
                    <div className="barWith">
                        <div className="bar"> </div>
                        <p>Or Sign in with </p>
                        <div className="bar"> </div>
                    </div>

                    <div className="socialInner">
                        <a href={`${API_URL}/api/v1/auth/google/redirect`} >
                            <Image
                                className="socialIconSingUp"
                                priority
                                src={google}
                                alt=""
                            />
                        </a>
                        <a href={`${API_URL}/api/v1/auth/facebook/redirect`} >
                            <Image
                                className="socialIconSingUp"
                                priority
                                src={facebook}
                                alt=""
                            />
                        </a>
                    </div>
                </div>*/}
            </div>

        </>
    );
}

export default SignupForm;
