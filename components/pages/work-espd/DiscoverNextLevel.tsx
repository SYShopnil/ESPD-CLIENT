import MagnifyingGlass from "./assets/MagnifyingGlass.svg";
import FindTutorPopUp from "@/components/find-tutor-popup";

import Image from "next/image";
import React from "react";
import Link from "next/link";
import { PAGE_TEACHER_ONBOARDING } from "@/config/constants";
import ArrowLeft from "@/components/pages/BookingOption/assets/ArrowLeft.svg";

export default function DiscoverNextLevel() {
    return (
        <>
            <div className="discoverWrapperMain">
                <div className="container discoverWrapper">
                    <div className="row discoverRow DiscoverNextLevel">
                        <div className="col-12">
                            <h1>Ready to take your career to next level?</h1>
                            <div className="espdBannerBn">
                                <Link className="signUpBtn" href={PAGE_TEACHER_ONBOARDING} type="submit">
                                    Register with Us
                                    <Image
                                        className="signUpBtnArro"
                                        priority
                                        src={ArrowLeft}
                                        alt=""
                                    />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
