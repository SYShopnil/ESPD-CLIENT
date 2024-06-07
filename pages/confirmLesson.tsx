import Image from "next/image";
import React from "react";
import {getCountryCallingCode} from "react-phone-number-input/input";
import Info from "../public/Info.svg";
import users from "../public/users-svgrepo-com.svg";
import Header from "@/components/pages/logInSignUpHeader/Header";
import PaymentLesson from "@/components/pages/payment/PaymentLesson";
import Footer from "@/components/pages/logInSignUpHeader/Footer";

export default function confirmLesson() {

	return (
		<>
			<div className="signUpWrapperSet">
				<div className="container">
					<div className="row">
						<div className="col-12">
							<Header />
						</div>
					</div>
					<div className="row">
						<div className="col-12">
							<PaymentLesson />
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
