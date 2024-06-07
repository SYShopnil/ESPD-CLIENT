import Image from "next/image";
import Asset14 from "@/components/pages/search-result/assets/Asset14.svg";
import Link from "next/link";
import Phone from "@/components/pages/home/assets/Phone.svg";
import React from "react";
import FindTutorPopup from "@/components/find-tutor-popup";

export default function FindTutorShort() {
    return (
        <>
            <div className="">
                <div className="searchRequireHelpInner">
                    <Image
                        className="Asset14"
                        src={Asset14}
                        alt=""
                    />
                    <h1>Require Help?</h1>
                    <p>Our team of tutor experts are ready to help you always Find me a tutor</p>
                    <FindTutorPopup
                        buttonClass={'signUpBtn'}
                    />
                </div>
            </div>
        </>
    )
}
