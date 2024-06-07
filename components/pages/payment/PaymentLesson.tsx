import Image from "next/image";
import React from "react";
import logo from "@/components/pages/signUp/assets/logo.svg";
import {getCountryCallingCode} from "react-phone-number-input/input";
import Info from "./assets/Info.svg";
import users from "./assets/users-svgrepo-com.svg";
import ArrowRight from "./assets/ArrowRight.svg";
import Link from "next/link";

export default function PaymentLesson() {
	return (
		<>
			<div className="confirmWrapperSet">
				<div className="confirmWrapperInnerSet">
					<div className="confirmInner">
						<div className="confirmHeadTitle">
							<h1>Confirm your lesson</h1>
							<p>Your lesson will be confirmed after the payment is completed</p>
						</div>
						<div className="confirmCardInner">
							<div className="confirmInnerBox">
								<form>
									<div className="emailBox">
										<p>Name on the card</p>
										<input
											type="name"
										/>
									</div>
									<div className="passwordBox">
										<p>Card number</p>
										<div className="phoneInputBox">
											<a className="confirmCardSite" href="#">
												+{getCountryCallingCode("US")}
											</a>
											<input
												type="phone"
											/>
										</div>
									</div>
									<div className="validityBox">
										<div className="innerBox">
											<p>Expiry date</p>
											<input
												type="text"
											/>
										</div>
										<div className="innerBox">
											<div className="upperTitle">
												<p>Security code</p>
												<a href="#">
													<Image
														className="Info"
														src={Info}
														alt=""
													/>
												</a>
											</div>
											<input
												type="text"
											/>
										</div>
									</div>
									<div className="checkInnerBoxPrimarry">
										<div className="checkInnerBox">
											<label className="containerLevel">
												<input
													type="checkbox"
												/>
												<span className="checkmark"></span>
											</label>
											<p>Save card informations for future purchases</p>
										</div>
									</div>
									<div className="makePaymentBtnBox">
										<Link className="signUpBtn" href="#" type="submit">
											Make Payment
											<Image
												className="signUpBtnArro"
												priority
												src={ArrowRight}
												alt=""
											/>
										</Link>
									</div>
								</form>
								<a className="skipText" href="#">Skip</a>
							</div>
							<div className="confirmInnerBox">
								<div className="confirmUserInnerBox">
									<div className="confirmUserInner">
										<Image
											className="users"
											priority
											src={users}
											alt=""
										/>
									</div>
									<div className="userInnerTitle">
										<h3>Halimah T.</h3>
										<p>Chemistry (A-Level)</p>
										<p>3rd August (18.00 - 19.00)</p>
									</div>
								</div>
								<div className="priceInnerTitle">
									<p>Price</p>
									<p>£40 / hr</p>
								</div>
								<div className="totalInnerTitle">
									<p>Total</p>
									<p>£40</p>
								</div>

								<p className="notetext">By adding your payment details, you are agreeing to Espd’s <span><a
									href="#">Terms of Use, Privacy Policy</a></span> and <span><a
									href="#">Cookie Policy.</a></span></p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
