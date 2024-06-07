import Header from "@/components/pages/home/Header";
import Footer from "@/components/pages/home/Footer";
import octicon_check from "@/public/octicon_check-16.svg";
import Image from "next/image";
import React from "react";
import ArrowRight from "@/components/pages/logIn/assets/ArrowRight.svg";
export default function Congratulations() {
	return (
		<>
			<div className="congratulationsWrapperSet">
				<Header />
				<div className="container cograWrapper">
					<div className="row">
						<div className="col-12">
							<div className="congraInner">
								<Image
									className="octicon_check"
									priority
									src={octicon_check}
									alt=""
								/>
								<h1>Congratulations!</h1>
								<h1>You’ve Successfully Booked the Lesson.</h1>
								<a className="congraBtn" href="#" type="submit">
									Go to Dashboard
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
				<Footer />
			</div>
		</>
	);
}
