import React from "react";
import LogInFrom from "@/components/pages/logIn/LogInFrom";
import Link from "next/link";
import { useRouter } from 'next/router'
import Header from "@/components/pages/logInSignUpHeader/Header";
import Footer from "@/components/pages/logInSignUpHeader/Footer";
import { LOCAL_STORAGE_KEY, LOCAL_STORAGE_KEY_TOKEN, PAGE_STUDENT_DASHBOARD, PAGE_TEACHER_DASHBOARD, ROLE_STUDENT, ROLE_TEACHER } from "@/config/constants";
import useUser from "@/hooks/userUser";
import { API_SOCIAL_VALIDATION } from "@/services/api/endpoints";
import { useQuery } from "react-query";
import { get } from "@/services/api/api";
import { encryptData } from "@/services/encryptUtil";
import Head from "next/head";



export default function Login() {
	const router = useRouter()
	const { role, accessToken } = router.query
	const { user } = useUser();
	if (user && user.access_token) {
		const savedRole = user?.role;
		if (savedRole && ![ROLE_TEACHER, ROLE_STUDENT].includes(savedRole)) {
			router.replace('/')
		}
		const DASHBOARD_URL = savedRole === ROLE_TEACHER ? PAGE_TEACHER_DASHBOARD : PAGE_STUDENT_DASHBOARD;
		router.replace(DASHBOARD_URL)
	}
	if (role && ![ROLE_TEACHER, ROLE_STUDENT].includes(role)) {
		router.push('404')
	}

	const { isLoading, isSuccess, isError, data: validatedSocialUser } = useQuery({
		queryKey: ['validatedSocialUser', accessToken],
		queryFn: () => get(`${API_SOCIAL_VALIDATION}?accessToken=${accessToken}`),
		enabled: !!(accessToken)
	});

	if (isSuccess) {
		console.log({ validatedSocialUser })
		const DASHBOARD_URL = role === ROLE_TEACHER ? `${PAGE_TEACHER_DASHBOARD}?page=statistics` : PAGE_STUDENT_DASHBOARD;
		const userInfo = encryptData(validatedSocialUser?.data);
		window.localStorage.setItem(LOCAL_STORAGE_KEY, userInfo);
		window.localStorage.setItem(LOCAL_STORAGE_KEY_TOKEN, validatedSocialUser?.data?.access_token);
		router.replace(DASHBOARD_URL)
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
							<LogInFrom
								role={role}
							/>
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
