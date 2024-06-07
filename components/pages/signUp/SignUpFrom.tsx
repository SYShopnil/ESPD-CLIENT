import {getCountryCallingCode} from "react-phone-number-input/input";
import Eye from "./assets/Eye.svg";
import EyeSlash from "./assets/EyeSlash.svg";
import ArrowRight from "./assets/ArrowRight.svg";
import google from "./assets/google.svg";
import facebook from "./assets/facebook.svg";
import CheckCircle from "./assets/CheckCircle.svg";
import ColourCheckCircle from "./assets/ColourCheckCircle.svg";
import Image from "next/image";
import React, {useState} from "react";
import Link from "next/link";
import {boolean, number, object, string} from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {useMutation} from "react-query";
import {post} from "@/services/api/api";
import {API_REGISTER_STUDENT, API_REGISTER_TEACHER} from "@/services/api/endpoints";
import {useRouter} from "next/navigation";
import ErrorMessage from "@/components/common/ErrorMessage";
import {PAGE_OTP_VERFICATION, ROLE_TEACHER} from "@/config/constants";
import {showToast} from "@/utils/toastUtils";

export default function SignUpFrom({ role }) {
  const router = useRouter();
  const [passwordVisible, setPasswordVisible] = useState(false);

  // password suggestion states
  const [hasMinEightChar, setHasMinEightChar] = useState(false);
  const [hasMinOneNumber, setHasMinOneNumber] = useState(false);
  const [hasCapitalLetter, setHasCapitalLetter] = useState(false);
  const [hasSpecialSymbol, setHasSpecialSymbol] = useState(false);

  function validatePassword(password) {
    const minLengthRegex = /^.{8,}$/;
    const hasNumberRegex = /\d/;
    const hasUpperCaseRegex = /[A-Z]/;
    const hasSpecialCharacterRegex = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/;

    // Check each rule
    const isMinLengthValid = minLengthRegex.test(password);
    const hasNumber = hasNumberRegex.test(password);
    const hasUpperCase = hasUpperCaseRegex.test(password);
    const hasSpecialCharacter = hasSpecialCharacterRegex.test(password);

    setHasMinEightChar(isMinLengthValid);
    setHasMinOneNumber(hasNumber);
    setHasCapitalLetter(hasUpperCase);
    setHasSpecialSymbol(hasSpecialCharacter)

  }


  const REGISTER_URL = role === ROLE_TEACHER ? API_REGISTER_TEACHER : API_REGISTER_STUDENT;

  let userSchema = object({
    first_name: string().required("First name is required"),
    last_name: string().required("Last name is required"),
    phone: number().typeError('Must be a number').required("Phone is required"),
    email: string().email().required("Email is required"),
    password: string().required("Password is required"),
    agree_check: boolean().oneOf([true], 'Please agree to the terms & conditions')
  });

  const {
    control,
    register,
    handleSubmit,
    formState: { errors, dirtyFields },
  } = useForm({ resolver: yupResolver(userSchema) });

  const registerMutation = useMutation(
    async (data) => await post(REGISTER_URL, data),
    {
      onSuccess: (res) => {
        window.localStorage.setItem("userRole", role);
        router.replace(`/${PAGE_OTP_VERFICATION}`);
      },
      onError: (err) => {
        const code = err?.response?.status;
        if (code === 400 && err?.response?.data?.message) {
          showToast("error", err?.response?.data?.message)
        }
      },
    }
  );

  const onFormSubmit = (data: any) => {
    window.localStorage.setItem("userEmail", data?.email)
    data.phone = `+44${data.phone}`;
    delete data['agree_check']
    registerMutation.mutate(data);
  };


  return (
    <>
      <div className="formWrapperMain">
        <div className="formWrapperSet">
          <h1 className="signUpTitle">Sign up </h1>
          <div className="formWrap">
            <form onSubmit={handleSubmit(onFormSubmit)} noValidate>
              <div className="nameBox">
                <div className="firstBox">
                  <p>First name*</p>

                  <input
                      className={errors.first_name && errors.first_name?.message ? 'has-error' : ''}
                      type="text"
                      id="first_name"
                      {...register("first_name", {
                        required: {
                          value: true,
                          message: "this field is required",
                        },
                      })}
                  />


                  {errors.first_name && errors.first_name?.message && (
                      <ErrorMessage
                          text={errors.first_name?.message}
                      />
                  )}

                </div>

                <div className="firstBox">
                  <p>Last name*</p>
                  <input
                      className={errors.last_name && errors.last_name?.message ? 'has-error' : ''}
                      type="text"
                      id="last_name"
                      {...register("last_name", {
                        required: "last name is required",
                      })}
                  />

                  {errors.last_name && errors.last_name?.message && (
                      <ErrorMessage
                          text={errors.last_name?.message}
                      />
                  )}

                </div>
              </div>

              <div className="fromNumberCon">
                <p>Phone number*</p>

                <div className="phoneInputBox">
                  <a>+{getCountryCallingCode("GB")}</a>

                  <input
                      className={errors.phone && errors.phone?.message ? 'has-error' : ''}
                      type="phone"
                      id="phone"
                      {...register("phone", {
                        required: "Phone number is required",
                      })}
                  />
                </div>


                {errors.phone && errors.phone?.message && (
                    <ErrorMessage
                        text={errors.phone?.message}
                    />
                )}

              </div>

              <div className="emailBox">
                <p>Email address*</p>

                <input
                    className={errors.email && errors.email?.message ? 'has-error' : ''}
                    type="email"
                    id="email"
                    placeholder="Enter you email"
                    {...register("email", {
                      required: "Email is required",
                    })}
                />

                {errors.email && errors.email?.message && (
                    <ErrorMessage
                        text={errors.email?.message}
                    />
                )}

              </div>

              <div className="passwordBox">
                <p>Password*</p>

                <div className="passInner">
                  <input
                      className={`passInput ${errors.password && errors.password?.message ? 'has-error' : ''}`}
                      type={passwordVisible ? "text" : "password"}
                      id="password"
                      {...register("password", {
                        onChange: e => validatePassword(e.target.value),
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

              {!!(dirtyFields?.password) &&
                  <div className="suggestPasBox">
                    <p className="suggestPasP">Password should contain:</p>

                    <div className="suggestPassInner">
                      <div className="checkItem">
                        <Image
                            className="CheckCircle"
                            priority
                            src={hasMinEightChar ? ColourCheckCircle : CheckCircle}
                            alt=""
                        />
                        <p className={`checkItemText ${hasMinEightChar ? "activeNote" : ""}`}>At least 8 characters</p>
                      </div>
                      <div className="checkItem">
                        <Image
                            className="CheckCircle"
                            priority
                            src={hasMinOneNumber ? ColourCheckCircle : CheckCircle}
                            alt=""
                        />
                        <p className={`checkItemText ${hasMinOneNumber ? "activeNote" : ""}`}>At least one number</p>
                      </div>
                    </div>
                    <div className="suggestPassInner">
                      <div className="checkItem">
                        <Image
                            className="CheckCircle"
                            priority
                            src={hasCapitalLetter ? ColourCheckCircle : CheckCircle}
                            alt=""
                        />
                        <p className={`checkItemText ${hasCapitalLetter ? "activeNote" : ""}`}>
                          At least one capital letter
                        </p>
                      </div>
                      <div className="checkItem">
                        <Image
                            className="CheckCircle"
                            priority
                            src={hasSpecialSymbol ? ColourCheckCircle : CheckCircle}
                            alt=""
                        />
                        <p className={`checkItemText ${hasSpecialSymbol ? "activeNote" : ""}`}>At least one special symbol</p>
                      </div>
                    </div>
                  </div>
              }

              <div className=" signUpWrapCheckBoxStyle">
                <div className="checkInnerBox">
                  <label className="containerLevel">
                    <input
                        type="checkbox"
                        {...register("agree_check")}
                        /*onChange={(e) => {
                          setChecked(e.target.checked)
                          if (e.target.checked) {
                            setAgreeMessage('')
                          }
                        }}*/
                    />
                    <span className="checkmark"></span>
                  </label>
                  <p>By signing up, you agree to Espd’s <span>Terms of Use, Privacy Policy</span> and <span>Cookie Policy.</span></p>
                </div>
                {errors.agree_check && errors.agree_check?.message && (
                    <ErrorMessage
                        text={errors.agree_check?.message}
                    />
                )}
              </div>

              <button className="signUpBtn" disabled={registerMutation.isLoading}>
                {registerMutation.isLoading ? "Please wait..." : "Sign up"}
                <Image
                    className="signUpBtnArro"
                    priority
                    src={ArrowRight}
                    alt=""
                />
              </button>
            </form>

            <div className="alreadySign">
              <p>
                Already have an account?
                <span>
                <Link href="/login?role=student">Sign in</Link>
              </span>
              </p>
            </div>
          </div>

          <div className="socialSign">
            <div className="barWith">
              <div className="bar"> </div>
              <p>Or Sign up with </p>
              <div className="bar"> </div>
            </div>

            <div className="socialInner">
              <a href="#">
                <Image
                    className="socialIconSingUp"
                    priority
                    src={google}
                    alt=""
                />
              </a>
              <a href="#">
                <Image
                    className="socialIconSingUp"
                    priority
                    src={facebook}
                    alt=""
                />
              </a>
              {/*<a href="#">*/}
              {/*  <Image className="socialIconSingUp" priority src={apple} alt="" />*/}
              {/*</a>*/}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
