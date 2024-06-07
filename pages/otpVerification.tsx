import Image from "next/image";
import React from "react";
import logo from "../components/pages/signUp/assets/logo.svg";
import VerifyEmail from "@/components/pages/otpVerification/VerifyEmail";
import VerifyNumber from "@/components/pages/otpVerification/VerifyNumber";
import VerifiedSuccess from "@/components/pages/otpVerification/VerifiedSuccess";
import Link from "next/link";


export default function otpVerification() {

	return (
		<>
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
								<VerifyNumber />
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
