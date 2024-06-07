import Eye from "./assets/Eye.svg";
import EyeSlash from "./assets/EyeSlash.svg";
import google from "./assets/google.svg";
import facebook from "./assets/facebook.svg";


import Image from "next/image";
import React, {useState} from "react";
import Link from "next/link";
import {object, string} from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {useMutation} from "react-query";
import {API_LOGIN_STUDENT, API_LOGIN_TEACHER} from "@/services/api/endpoints";
import {post} from "@/services/api/api";
import {useRouter} from "next/router";
import {API_URL} from "@/config/config";
import {
  LOCAL_STORAGE_KEY,
  LOCAL_STORAGE_KEY_REDIRECT_URL,
  LOCAL_STORAGE_KEY_TOKEN,
  PAGE_RESET_PASS_REQUEST_OTP,
  PAGE_SIGNUP,
  PAGE_STUDENT_DASHBOARD,
  PAGE_TEACHER_DASHBOARD,
  PAGE_TEACHER_ONBOARDING,
  ROLE_STUDENT,
  ROLE_TEACHER
} from "@/config/constants";
import PrimaryButton from "@/components/common/PrimaryButton";
import ErrorMessage from "@/components/common/ErrorMessage";
import {encryptData} from "@/services/encryptUtil";

export default function LogInFrom({ role }) {
  const router = useRouter();

  const [token, setToken] = useState(null)
  const { redirect_url, accessToken } = router.query
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [error, setError] = useState('');
  const LOGIN_URL = role === ROLE_TEACHER ? API_LOGIN_TEACHER : API_LOGIN_STUDENT;
  const DASHBOARD_URL = role === ROLE_TEACHER ? `${PAGE_TEACHER_DASHBOARD}?page=statistics` : PAGE_STUDENT_DASHBOARD;

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
        const saved_redirect = window.localStorage.getItem(LOCAL_STORAGE_KEY_REDIRECT_URL);
        if (redirect_url) {
          router.replace(redirect_url)
        } else if(saved_redirect) {
          window.localStorage.removeItem(LOCAL_STORAGE_KEY_REDIRECT_URL)
          router.replace(saved_redirect)
        } else {
          router.replace(DASHBOARD_URL)
        }
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
      <div className="logInWrapperSet">
        <div className="formWrap">
          <h1 className="logInTitle">Sign in</h1>
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
            {role === ROLE_STUDENT && <p>
              Don’t have an account yet?
              <span>
                <Link href={role === ROLE_STUDENT
                  ? `${PAGE_SIGNUP}?role=${role}`
                  : PAGE_TEACHER_ONBOARDING}>Sign up</Link>
              </span>
            </p>}
          </div>
        </div>

        {role === ROLE_STUDENT && <div className="socialSign">
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
        </div>}
      </div>
    </>
  );
}
