import Image from "next/image";
import octicon_check from "@/components/pages/home/assets/octicon_check-16.svg";

export default function FindTutorConfirmation() {



    return (
        <>
            <div className="successSend">
                <Image
                    className="octicon_check"
                    priority
                    src={octicon_check}
                    alt=""
                />
                <p>We’ve received your request.</p>
                <p>One of our experts will get back to you soon.</p>
            </div>

        </>
    )
}