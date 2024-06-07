import React, { useState } from "react";
import { useRouter } from 'next/router'
import Header from "@/components/pages/logInSignUpHeader/Header";
import Footer from "@/components/pages/home/Footer";
import useUser from "@/hooks/userUser";
import ForgetPasswordForm from "@/components/pages/forgetPassword/ForgetPassword";
import VerifyNumber from "@/components/pages/otpVerification/VerifyNumber";
import ErrorMessage from "@/components/common/ErrorMessage";
import PrimaryButton from "@/components/common/PrimaryButton";
import { object, string } from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "react-query";
import { post } from "@/services/api/api";
import { API_RESET_PASS_REQUEST_OTP, API_RESET_PASS_VERIFY_OTP } from "@/services/api/endpoints";
import { PAGE_RESET_PASS, PAGE_RESET_PASS_VERIFY_OTP } from "@/config/constants";
import Image from "next/image";
import verifyEmailIcon from "@/components/pages/otpVerification/assets/verifyEmailIcon.svg";
import OtpInput from "react-otp-input";
import ArrowRight from "@/components/pages/otpVerification/assets/ArrowRight.svg";
import Link from "next/link";
import logo from "@/components/pages/signUp/assets/logo.svg";
import Head from "next/head";


export default function VerifyOtp() {

	const router = useRouter()
	const [otp, setOtp] = useState('');

	const [error, setError] = useState('');
	const [title, setTitle] = useState('Forgot Password');
	const [step, setStep] = useState('request'); //request, verify, reset

	let loginSchema = object({
		email: string().email().required("Email is required"),
	});

	const {
		control,
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({ resolver: yupResolver(loginSchema) });

	const verifyMutation = useMutation(
		async (data) => await post(API_RESET_PASS_VERIFY_OTP, data),
		{
			onSuccess: (res) => {
				window.localStorage.setItem('reset_pass_token', res?.data?.token);
				router.push(PAGE_RESET_PASS);
				/*setTitle('Enter a new password');
				setStep('reset');*/
			},
			onError: (err) => {
				if (err && err?.response?.status === 401) {
					setError('Invalid credentials');
				}
				if (err && err?.response?.status === 406) {
					setError(err?.response?.data?.message);
				}
				if (err && (err?.response?.status === 404 || err?.response?.status === 400)) {
					setError(err?.response?.data?.message);
				}
			},
		}
	);

	const onFormSubmit = (data: any) => {
		setError('');
		const payload = {
			email: window.localStorage.getItem('reset_pass_email'),
			otp: otp
		}
		// window.localStorage.setItem('reset_pass_email', data.email);
		verifyMutation.mutate(payload);
	};

	return (
		<>
			<Head>
				<title>OTP verification | ESPD </title>
			</Head>

			<div className="otpVerificationWrapper">
				<div className="container">
					<div className="row">
						<div className="col-12">
							<div className="otpBrandIcon">
								<Link href="/">
									<Image
										className="logo"
										src={logo}
										alt=""
									/>
								</Link>
							</div>
						</div>
					</div>
					<div className="row">
						<div className="col-12">
							<div className="otpMiddleWrap">
								<div className="verifyEmailWrapper">
									<Image
										className="verifyEmailIcon"
										priority
										src={verifyEmailIcon}
										alt=""
									/>
									<h1>Verify your email</h1>
									<p>We’ve sent you a six digit OTP on your email</p>

									<div className="otpBox">
										{error !== '' &&
											<div className={'d-flex justify-content-center'}>
												<div className={'alert alert-danger'} style={{ width: 200 }}>
													{error}
												</div>
											</div>
										}
										<OtpInput
											value={otp}
											onChange={setOtp}
											numInputs={6}
											renderInput={(props) => <input {...props} />}
										/>
									</div>
									{
										<button className="otpVerifyBtn" type="submit" onClick={onFormSubmit}>
											{verifyMutation.isLoading ? "Please Wait" : "Verify"}
											<Image
												className="ArrowRight"
												priority
												src={ArrowRight}
												alt=""
											/>
										</button>
									}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
