import octicon_check from "./assets/octicon_check-16.svg";

import Image from "next/image";

export default function TeacherOnSuccess() {

	return (
		<>
			<div className="TeacherOnSuccessWrapper">
				<Image
					className="octicon_check"
					priority
					src={octicon_check}
					alt=""
				/>
				<h1>We’ve received your request</h1>
				<h1>One of our experts will get back to you ASAP!</h1>
			</div>
		</>
	);
}
