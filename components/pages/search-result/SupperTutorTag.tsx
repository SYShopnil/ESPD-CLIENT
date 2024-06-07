import Image from "next/image";
import SealCheck from "@/components/pages/search-result/assets/SealCheck.svg";
import React from "react";

export default function SupperTutorTag() {
    return (
        <>
            <div>
                <div className="supperTutorBox">
                    <div className="supperTutorBoxInner">
                        <Image
                            className="userImgSearchSealCheck"
                            src={SealCheck}
                            alt=""
                        />
                        <p>Super Tutor</p>
                    </div>
                </div>
            </div>
        </>
    )
}
