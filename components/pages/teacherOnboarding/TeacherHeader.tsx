import Image from "next/image";
import logo from "@/components/pages/signUp/assets/logo.svg";
import backVector from "@/components/pages/teacherOnboarding/assets/ArrowLeft.svg";
import teacherIcon from "@/components/pages/teacherOnboarding/assets/nav-content_right.svg";
import React from "react";

export default function TeacherHeader() {
    return (
        <>
            <div className="">
                <div className="teacherOnheader">
                    <div>
                        <a href="#">
                            <Image
                                className="logo"
                                src={logo}
                                alt=""
                            />
                        </a>
                        <a href="#">
                            <div className="signUpBack">
                                <Image
                                    className="backVector"
                                    src={backVector}
                                    alt=""
                                />
                                <p className="backText">Back</p>
                            </div>
                        </a>
                    </div>
                    <div className="teacherInfo">
                        <a href="#">
                            <div className="teacherInfoBox">
                                <p className="teacherName">Halimah</p>
                                <Image
                                    className="teacherIcon"
                                    src={teacherIcon}
                                    alt=""
                                />
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </>
    )
}
