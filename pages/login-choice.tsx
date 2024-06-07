
import Asset from "@/components/pages/signUp/assets/Group.svg";
import Image from "next/image";
import React from "react";
import ArrowRight from "@/components/pages/signUp/assets/ArrowRight.svg";
import useUser from "@/hooks/userUser";
import { useRouter } from "next/router";
import { PAGE_LOGIN, PAGE_STUDENT_DASHBOARD, ROLE_STUDENT, ROLE_TEACHER } from "@/config/constants";
import Header from "../components/pages/logInSignUpHeader/Header";
import LogInFrom from "../components/pages/logIn/LogInFrom";
import Footer from "../components/pages/logInSignUpHeader/Footer";
import Head from "next/head";

export default function LoginChoice() {
	const router = useRouter()
	const { user } = useUser();

	if (user && user.access_token) {
		//TODO conditonaly redirect to dashbiard based on role
		router.replace(PAGE_STUDENT_DASHBOARD)
	}
	return (
		<>
			<Head>
				<title>Login | ESPD </title>
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
							<div className="innerWrapperSetMain">
								<div className="innerWrapperSet">
									<h1 className="signUpTitle">Log in</h1>
									<div className="innerWrap">
										<Image
											className="AssetImg"
											priority
											src={Asset}
											alt=""
										/>
										<div className="categoryBox">
											<div className="categoryBoxInner">
												<p>I am a student</p>
												<div className="div">
													<a className="categoryBtn" href={`${PAGE_LOGIN}?role=${ROLE_STUDENT}`}>
														Student Login
														<Image
															className="signUpBtnArro"
															priority
															src={ArrowRight}
															alt=""
														/>
													</a>
												</div>
											</div>
											<div className="middleLine"></div>
											<div className="categoryBoxInner">
												<p>I am a teacher</p>
												<div className="div">
													<a className="categoryTeacherBtn" href={`${PAGE_LOGIN}?role=${ROLE_TEACHER}`} >
														Tutor Login
														<Image
															className="signUpBtnArro"
															priority
															src={ArrowRight}
															alt=""
														/>
													</a>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
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
