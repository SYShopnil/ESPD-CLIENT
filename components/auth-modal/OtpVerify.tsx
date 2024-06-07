import React, {useState} from 'react';
import Image from "next/image";
import verifyPhoneIcon from "@/components/pages/otpVerification/assets/verifyPhoneIcon.svg";
import OtpInput from "react-otp-input";
import ArrowRight from "@/components/pages/otpVerification/assets/ArrowRight.svg";
import {LOCAL_STORAGE_KEY, LOCAL_STORAGE_KEY_TOKEN} from "@/config/constants";
import {useMutation} from "react-query";
import {post} from "@/services/api/api";
import {API_VERIFY_OTP} from "@/services/api/endpoints";
import {encryptData} from "@/services/encryptUtil";

function OtpVerify({onLoginSuccess}) {

    const [otp, setOtp] = useState('');

    const otpMutation = useMutation(
        async (data) => await post(API_VERIFY_OTP, data),
        {
            onSuccess: (res) => {
                if (res?.success === true) {
                    const userInfo = encryptData(res.data);
                    window.localStorage.setItem(LOCAL_STORAGE_KEY, userInfo);
                    window.localStorage.setItem(LOCAL_STORAGE_KEY_TOKEN, res?.data?.access_token);
                    onLoginSuccess(res?.data);
                }
                else {
                    alert("OTP DOESNT MATCH")
                }
            },
            onError: (err) => {
                console.log({ err });

                alert("OTP DOESNT MATCH")
            },
        }
    );

    const onFormSubmit = (e) => {

        e.preventDefault()

        const email = window.localStorage.getItem("userEmail");

        console.log(email, Number(otp));



        otpMutation.mutate({
            email,
            otp: Number(otp)
        });
    };

    return (
        <>
            <div className="verifyEmailWrapper">
                <Image
                    className="verifyEmailIcon"
                    priority
                    src={verifyPhoneIcon}
                    alt=""
                />
                <h1>Verify your number</h1>
                <p>We’ve sent you a six digit OTP on your email</p>

                <div className="otpBox">
                    <OtpInput
                        value={otp}
                        onChange={setOtp}
                        numInputs={6}
                        renderInput={(props) => <input {...props} />}
                    />
                </div>
                {
                    <button className="otpVerifyBtn" type="submit" onClick={onFormSubmit}>
                        {otpMutation.isLoading ? "Please Wait" : "Submit Now"}
                        <Image
                            className="ArrowRight"
                            priority
                            src={ArrowRight}
                            alt=""
                        />
                    </button>
                }
            </div>
        </>
    );
}

export default OtpVerify;
