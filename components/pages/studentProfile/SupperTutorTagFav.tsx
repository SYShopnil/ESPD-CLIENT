import Image from "next/image";
import SealCheck from "@/components/pages/studentProfile/assets/SealCheck.svg";
import React from "react";

export default function SupperTutorTagFav() {
    return (
        <>
            <div>
                <div className="supperTutorBoxFev">
                    <div className="supperTutorBoxInnerFev">
                        <Image
                            className="userImgFevSealCheck"
                            src={SealCheck}
                            alt=""
                        />
                        <p className="supperTutorTextFev">Super Tutor</p>
                    </div>
                </div>
            </div>
        </>
    )
}
