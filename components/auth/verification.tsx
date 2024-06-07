import { Inter } from "@next/font/google";
const inter = Inter({ subsets: ["latin"] });
import { useMutation } from "react-query";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { sendOtpRequest, verifyOtpRequest } from "@/services/signupRequest";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import InputMask from "react-input-mask";
import React, { useRef } from "react";
import { USER_SECRET_KEY } from "@/config/config";
import { EmailTruncated } from "./EmailTruncated";
var CryptoJS = require("crypto-js");

type FormData = {
	code: number;
};

const Verification: React.FC<{
	sendOtpMail: any;
}> = ({ sendOtpMail }) => {
	console.log("sendOtpMail", sendOtpMail);
	const router = useRouter();
	const inputRef = useRef<HTMLInputElement>(null);

	const schema2 = yup
		.object()
		.shape({
			otp_code: yup.number().required("Otp Code  Required"),
		})
		.required();

	const {
		control,
		register: register2,
		handleSubmit: handleSubmit2,
		formState: { errors: errors2 },
		setFocus,
	} = useForm({
		resolver: yupResolver(schema2),
	});

	const { mutate: sendOtpToEmail, isLoading } = useMutation(verifyOtpRequest, {
		onSuccess: (response: any) => {
			toast.info(response.data.message, {
				autoClose: 1000,
			});
			const userResponse = response.data.data;

			console.log("response.data.data", userResponse);
			const userInfo = CryptoJS.AES.encrypt(
				JSON.stringify(userResponse),
				USER_SECRET_KEY
			).toString();
			window.localStorage.setItem("userInfo", userInfo);

			if (userResponse.auth_flag == "old_user") {
				router.push("/");
			}
			if (userResponse.auth_flag == "new_user") {
				router.push("/");
			}
		},

		onError: (err: any) => {
			// router.push("/");
			console.log("err", err);
			toast.info(err.message);
		},
	});

	const verifyOtp = async (formData: any) => {
		const config: any = {
			data: {
				email: sendOtpMail,
				otp_code: formData.otp_code,
			},
			method: "POST",
		};

		sendOtpToEmail(config);
	};

	return (
		<>
			<div className="verificationWrap">
				<div className="verificationBody">
					<img className="verificationIcon" src="/verification.png" />
					<h3 className="verificationText">Email verification</h3>
					<p className="verificationSubtext">
						Nous vous avons envoyé un code temporaire de connexion à
						<br />
						{sendOtpMail && <EmailTruncated email={sendOtpMail} />}
					</p>
					<form onSubmit={handleSubmit2(verifyOtp)}>
						<div className="codeBox">
							<Controller
								name="otp_code"
								control={control}
								rules={{ required: true, minLength: 6, maxLength: 6 }}
								render={({ field }) => (
									<InputMask
										{...field}
										mask="999999"
										placeholder="Entrer le code de connexion"
										alwaysShowMask={false}
										className="codeInput"
										ref={(input) => {
											if (input) {
												inputRef;
											}
										}}
									/>
								)}
							/>

							<img className="Lock1Icon" src="/Lock1.png" />

							{errors2.otp_code?.message && (
								<span style={{ color: "Red" }} className="error-message">
									{errors2.otp_code.message as React.ReactNode}
								</span>
							)}
						</div>
						<div className="btnBox">
							<button className="onBtn" type="submit">
								{isLoading ? <span className="loader"></span> : "Suivant"}
							</button>
						</div>
					</form>

					<div className="read">
						<p className="readText">
							En continuant, vous avez lu et acceptez les{" "}
							<a className="readBtn" href="#">
								conditions générales d’utilisation
							</a>{" "}
							et la{" "}
							<a className="readBtn" href="#">
								politique de confidentialité{" "}
							</a>
							des données de OnParty
						</p>
					</div>
				</div>
			</div>
		</>
	);
};
export default Verification;
