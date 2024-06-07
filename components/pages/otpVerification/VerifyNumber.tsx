import React, {useState} from 'react';
import OtpInput from 'react-otp-input';
import verifyPhoneIcon from "./assets/verifyPhoneIcon.svg";
import ArrowRight from "./assets/ArrowRight.svg";

import Image from "next/image";
import {useMutation} from 'react-query';
import {useRouter} from "next/router";
import {post} from '@/services/api/api';
import {API_VERIFY_OTP} from '@/services/api/endpoints';

import {
	LOCAL_STORAGE_KEY, LOCAL_STORAGE_KEY_REDIRECT_URL,
	LOCAL_STORAGE_KEY_TOKEN,
	PAGE_STUDENT_DASHBOARD,
	PAGE_TEACHER_DASHBOARD,
	ROLE_TEACHER
} from "@/config/constants";
import {encryptData} from "@/services/encryptUtil";

export default function VerifyNumber() {
	const [otp, setOtp] = useState('');
	const router = useRouter();
	const { role, redirect_url } = router.query

	const DASHBOARD_URL = role === ROLE_TEACHER ? PAGE_TEACHER_DASHBOARD : PAGE_STUDENT_DASHBOARD;

	const otpMutation = useMutation(
		async (data) => await post(API_VERIFY_OTP, data),
		{
			onSuccess: (res) => {
				if (res?.success === true) {
					const userInfo = encryptData(res.data);
					window.localStorage.setItem(LOCAL_STORAGE_KEY, userInfo);
					window.localStorage.setItem(LOCAL_STORAGE_KEY_TOKEN, res?.data?.access_token);
					const saved_redirect = window.localStorage.getItem(LOCAL_STORAGE_KEY_REDIRECT_URL);

					if (redirect_url) {
						router.replace(redirect_url)
					}else if(saved_redirect) {
						window.localStorage.removeItem(LOCAL_STORAGE_KEY_REDIRECT_URL)
						router.replace(saved_redirect)
					} else {
						router.replace(DASHBOARD_URL)
					}
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
				<p>We’ve sent you a six digit OTP on your email/mobile</p>

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
						{otpMutation.isLoading ? "Please Wait" : "Verify"}
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
