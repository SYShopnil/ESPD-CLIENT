import Image from "next/image";
import React from "react";
import MagnifyingGlassColor from "./assets/MagnifyingGlassColor.svg";
import MagnifyingGlassWhite from "./assets/MagnifyingGlassWhite.svg";
import PhoneWhite from "./assets/PhoneWhite.svg";
import useUser from "@/hooks/userUser";

export default function Wellcome() {

    const { user } = useUser();

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-12 col-sm-12 col-md-12">
                        <div className="wellcomeTitle">
                            <h3>Welcome!</h3>
                            <h1>{user?.first_name}</h1>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 col-sm-12 col-md-12">
                        <div className="wellcomeWrap">
                            <h1>You haven’t booked a lesson yet!</h1>
                            <div className="btnWrap">
                                <a href="#" className="wellComeBtn">
                                    <Image
                                        className="MagnifyingGlassColor"
                                        src={MagnifyingGlassColor}
                                        alt=""
                                    />
                                    <Image
                                        className="MagnifyingGlassWhite"
                                        src={MagnifyingGlassWhite}
                                        alt=""
                                    />
                                    Find a Tutor
                                </a>
                                <a href="#" className="wellComeBtn active">
                                    <Image
                                        className="PhoneWhite"
                                        src={PhoneWhite}
                                        alt=""
                                    />
                                    Request a tutor
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
