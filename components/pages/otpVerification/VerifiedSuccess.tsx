import React from 'react';
import octicon_check from "./assets/octicon_check-16.svg";
import ArrowRight from "./assets/ArrowRight.svg";

import Image from "next/image";
import {PAGE_STUDENT_DASHBOARD, PAGE_TEACHER_DASHBOARD, ROLE_TEACHER} from '@/config/constants';
import Link from 'next/link';

export default function VerifiedSuccess() {
	let DASHBOARD_URL = "/"
	if (typeof window !== 'undefined') {
		const role = window.localStorage.getItem("userRole");
		DASHBOARD_URL = role === ROLE_TEACHER ? PAGE_TEACHER_DASHBOARD : PAGE_STUDENT_DASHBOARD;
	}

	return (
		<>
			<div className="verifyEmailWrapper">
				<Image
					className="verifyEmailIcon"
					priority
					src={octicon_check}
					alt=""
				/>
				<h2>Verified Successfully </h2>

				<Link className="otpVerifyBtn" href={`/${DASHBOARD_URL}`}>
					Go to Dashboard
					<Image
						className="ArrowRight"
						priority
						src={ArrowRight}
						alt=""
					/>
				</Link>
			</div>
		</>
	);
}
