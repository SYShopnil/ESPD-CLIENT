import React from "react";
import Header from "@/components/pages/logInSignUpHeader/Header";
import Footer from "@/components/pages/home/Footer";
import ForgetPasswordForm from "@/components/pages/forgetPassword/ForgetPassword";
import Head from "next/head";


export default function RequestOtp() {

	return (
		<>
			<Head>
				<title>Reset password | ESPD </title>
			</Head>

			<div className="signUpWrapperSet">
				<div className="container">
					<div className="row">
						<div className="col-12">
							<Header
								hideBackButton={true}
							/>
						</div>
					</div>
					<div className="row">
						<div className="col-12">
							<ForgetPasswordForm />
						</div>
					</div>
					<div className="row">
						<Footer />
					</div>
				</div>

			</div>
		</>
	);
}
