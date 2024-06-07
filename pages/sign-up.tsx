import React from "react";
import SignUpFrom from "@/components/pages/signUp/SignUpFrom";
import Header from "@/components/pages/logInSignUpHeader/Header";
import Footer from "@/components/pages/logInSignUpHeader/Footer";
import {useRouter} from "next/router";
import Head from "next/head";

export default function SignUp() {
	const router = useRouter()
	const { role } = router.query;


	return (
		<>
				<Head>
				<title>Sign up | ESPD </title>
			</Head>

			<div className="signUpWrapperSet">
				<div className="container">
					<div className="row">
						<div className="col-12">
							<Header />
						</div>
					</div>
					<div className="row">
						<div className="col-12">
							<SignUpFrom role={role} />
						</div>
					</div>
					<div className="row">
						<div className="col-12">
							<Footer />
						</div>
					</div>
				</div>

			</div>
		</>
	);
}
