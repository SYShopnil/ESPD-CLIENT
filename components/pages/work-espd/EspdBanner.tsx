import Image from "next/image";
import React, { useState } from "react";
import Select from 'react-select'
import Vector from "./assets/Vector.svg";
import MagnifyingGlass from "./assets/MagnifyingGlass.svg";
import heroimg from "./assets/hero-img.svg";
import Link from "next/link";
import { useRouter } from "next/router";
import { PAGE_SEARCH_RESULT, PAGE_TEACHER_ONBOARDING, PAGE_WORK_AT_ESPD } from "@/config/constants";
import ArrowLeft from "@/components/pages/BookingOption/assets/ArrowLeft.svg";



export default function EspdBanner({ setting }) {

    const work_espd_hero_title = setting?.find(item=> item.key === "work_espd_hero_title")
    const work_espd_hero_desc = setting?.find(item=> item.key === "work_espd_hero_desc")
    const work_espd_hero_image = setting?.find(item=> item.key === "work_espd_hero_image")

    return (
        <>
            <div className=" espdWrapperBox">
                <div className="homeBannerWrapper">
                    <div className="textTitleCon">
                        <div>
                            <h1 className="titleText">{work_espd_hero_title?.value}</h1>
                        </div>
                        <p className="titleSubText">{work_espd_hero_desc?.value}</p>
                        <div className="espdBannerBn">
                            <Link className="signUpBtn" href={PAGE_TEACHER_ONBOARDING} type="submit">
                                Work at ESPD
                                <Image
                                    className="signUpBtnArro"
                                    priority
                                    src={ArrowLeft}
                                    alt=""
                                />
                            </Link>
                        </div>
                    </div>
                    <div className="imgCon">
                        <img
                            className="heroImg"
                            src={work_espd_hero_image?.value}
                            alt=""
                        />
                    </div>
                </div>
            </div>
        </>
    )
}
