import OtpInput from "react-otp-input";
import verifyEmailIcon from "./assets/verifyEmailIcon.svg";
import ArrowRight from "./assets/ArrowRight.svg";
import ArrowCircleRight from "./assets/ArrowCircleRight.svg";
import ArrowLeftGray from "./assets/ArrowLeftGray.svg";

import Image from "next/image";
import React, { useState } from "react";
import ArrowRightWhite from "@/components/pages/search/assets/ArrowRightWhite.svg";
import ErrorMessage from "@/components/common/ErrorMessage";

const EXP = [
	'A Level',
	'GCSE',
	'KS3',
	'Primary school tutor',
	'11 plus tutor'
];

export default function Experience({ onClickNext, onClickPrevious , experiences ,setExperinces }) {

	const [error, setError] = useState('');

	const onClick = () => {
		if (experiences?.length === 0) {
			setError("Please select at least one option")
		} else {
		  onClickNext();
		}
	  };


	return (
		<>
			<div className="qtclWrapper">
				<div className="pageGoing">
					<div className="pageGoingNumberBox">
						<a className="pageGoingNumber active" href="#">1</a>
						<div className="pageGoingDiv borderActive"></div>
					</div>
					<div className="pageGoingNumberBox">
						<a className="pageGoingNumber active" href="#">2</a>
						<div className="pageGoingDiv borderActive"></div>
					</div>
					<div className="pageGoingNumberBox">
						<a className="pageGoingNumber" href="#">3</a>
						<div className="pageGoingDiv"></div>
					</div>
					<div className="pageGoingNumberBox">
						<a className="pageGoingNumber" href="#">4</a>
					</div>
				</div>

				<h1>Join our team of dedicated educators</h1>
				<div className="optionWrap">
					<div className="expeQusn">
						<p className="ProssesTextExp">Do you have at least three years' experience teaching any of these levels?<span>(You can select more than one)</span></p>
					</div>
					{!!(error !== "") &&
						<ErrorMessage
							text={error}
						/>
					}
					<div className="experiencOption">
						{EXP.map(item => {
							return (
								<div key={item} className="checkInnerSearch">
									<label className="containerLevel">
										<input type="checkbox"
											onChange={(e) => {
												setError("")
												const isChecked = e.target.checked;
												if (isChecked) {
													setExperinces([
														...experiences,
														item
													]);
												} else {
													const filtered = experiences.filter(i => i !== item);
													setExperinces([
														...filtered
													]);
												}
											}}
											checked={experiences.includes(item)} />
										<span className="checkmark"></span>
									</label>
									<p>{item}</p>
								</div>
							)
						})}

					</div>

				</div>
				<div className="teacherExpeBtnBox">
					<button className="previousBtn" onClick={onClickPrevious} >
						<Image
							className="ArrowLeftGray"
							priority
							src={ArrowLeftGray}
							alt=""
						/>
						Previous
					</button>
					<button className="otpVerifyBtn" onClick={onClick}>
						Next
						<Image
							className="ArrowRight"
							priority
							src={ArrowRight}
							alt=""
						/>
					</button>

				</div>
			</div>
		</>
	);
}
