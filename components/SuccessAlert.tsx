import React from 'react';
import Lottie from "lottie-react";
import octicon_check from "@/components/pages/otpVerification/assets/octicon_check-16.svg";
import octicon_cross_red from "@/components/pages/otpVerification/assets/invalid_icon.svg";
import ArrowRight from "@/components/pages/otpVerification/assets/ArrowRight.svg";
import TrophyAnimation from "@/components/lottie.json";

import Image from "next/image";
import { PAGE_SEARCH_RESULT, PAGE_STUDENT_DASHBOARD, PAGE_TEACHER_DASHBOARD, ROLE_TEACHER } from '@/config/constants';
import Link from 'next/link';

export default function SuccessAlert({ message, shouldGoToDashboard, isSuccess, content }) {
	let DASHBOARD_URL = "/"
	if (typeof window !== 'undefined') {
		const role = window.localStorage.getItem("userRole");
		DASHBOARD_URL = /*role === ROLE_TEACHER ? PAGE_TEACHER_DASHBOARD :*/ PAGE_STUDENT_DASHBOARD;
	}

	return (
		<>
			<div className="verifyEmailWrapper">
				{isSuccess &&
					<Lottie
						animationData={TrophyAnimation}
						className="lottie-container"
						loop={true}
					/>
				}
				{!isSuccess &&
					<Image
						className="verifyEmailIcon"
						priority
						src={octicon_cross_red}
						alt=""
					/>
				}
				<h2>{message}</h2>
				{content}

				{!!(shouldGoToDashboard) && <Link className="otpVerifyBtn" href={`/${DASHBOARD_URL}`}>
					Go to Dashboard
					<Image
						className="ArrowRight"
						priority
						src={ArrowRight}
						alt=""
					/>
				</Link>}
			</div>
		</>
	);
}
