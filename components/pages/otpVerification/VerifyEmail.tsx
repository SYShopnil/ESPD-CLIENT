import React, { useState } from 'react';
import OtpInput from 'react-otp-input';
import verifyEmailIcon from "./assets/verifyEmailIcon.svg";
import ArrowRight from "./assets/ArrowRight.svg";

import Image from "next/image";

export default function VerifyEmail() {
	const [otp, setOtp] = useState('');
	return (
		<>
			<div className="verifyEmailWrapper">
				<Image
					className="verifyEmailIcon"
					priority
					src={verifyEmailIcon}
					alt=""
				/>
				<h1>Verify your email</h1>
				<p>We’ve sent you a five digit OTP on your email</p>

				<div className="otpBox">
					<OtpInput
						value={otp}
						onChange={setOtp}
						numInputs={4}
						renderInput={(props) => <input {...props} />}
					/>
				</div>
				<a className="otpVerifyBtn" href="#" type="submit">
					Submit Now
					<Image
						className="ArrowRight"
						priority
						src={ArrowRight}
						alt=""
					/>
				</a>
			</div>
		</>
	);
}
