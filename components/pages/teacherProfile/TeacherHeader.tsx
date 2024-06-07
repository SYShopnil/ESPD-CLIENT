import Link from "next/link";
import Image from "next/image";
import logo from "@/components/pages/signUp/assets/logo.png";
import UserIcon from "./assets/UserIcon.svg";
import React from "react";
import userIcon from "./assets/UserIcon.svg";
import Heart from "@/components/pages/studentProfile/assets/Heart.svg";
import GearSix from "@/components/pages/studentProfile/assets/GearSix.svg";
import SignOut from "@/components/pages/studentProfile/assets/SignOut.svg";
import PresentationChart from "@/components/pages/teacherProfile/assets/PresentationChart.svg";
import CalendarBlank from "@/components/pages/teacherProfile/assets/CalendarBlank.svg";
import useUser from "@/hooks/userUser";

import { LOCAL_STORAGE_KEY, PAGE_LOGOUT, PAGE_TEACHER_ACCOUNT, PAGE_TEACHER_DASHBOARD, ROLE_TEACHER } from "@/config/constants";
import { useRouter } from "next/navigation";
import {API_URL} from "@/config/config";

export default function Count() {

    const { user } = useUser();
    const router = useRouter();



    const handleLogout = (e) => {
        e.preventDefault();
        window.localStorage.removeItem(LOCAL_STORAGE_KEY);
        router.replace(`${PAGE_LOGOUT}?role=${ROLE_TEACHER}`);

    }

    return (
        <>
            <div className="teacherHeaderWrapper">
                <div className="teacherHeader">
                    <div className="teacherHeaderLogo">
                        <Link href="/">
                            <Image
                                className="logo"
                                width={160}
                                src={logo}
                                alt="" />
                        </Link>
                    </div>
                    <div className="teacherInfo">

                        <div className="userWrap">
                            <Link href={`/${PAGE_TEACHER_DASHBOARD}`}>
                                <h1>{user?.first_name}</h1>
                            </Link>
                            <div className="userIconBox">
                                <a href="#">
                                    <div className="teacherInfoUserBox">

                                        <img className="teacherIcon" src={user && user?.profile_photo !== null ? user?.profile_photo : UserIcon} alt="" />

                                    </div>
                                </a>
                                <div className="userMenuBox">
                                    <div className="userMenuWrap">
                                        <Link className="userMenuBtn" href={`/${PAGE_TEACHER_DASHBOARD}?page=statistics`}>
                                            <Image
                                                className="UserGearSix"
                                                src={PresentationChart}
                                                alt=""
                                            />
                                            <p>Dashboard</p>
                                        </Link>
                                        <Link className="userMenuBtn" href={`${API_URL}/api/v1/calendar/google/redirect`}>
                                            <Image
                                                className="UserGearSix"
                                                src={CalendarBlank}
                                                alt=""
                                            />
                                            <p>Connect Calendar</p>
                                        </Link>
                                        <Link className="userMenuBtn" href={`/${PAGE_TEACHER_ACCOUNT}`}>
                                            <Image
                                                className="UserGearSix"
                                                src={GearSix}
                                                alt=""
                                            />
                                            <p>Account Settings</p>
                                        </Link>
                                        <a className="userMenuBtn" onClick={handleLogout} >
                                            <Image
                                                className="UserGearSix"
                                                src={SignOut}
                                                alt=""
                                            />
                                            <p>Logout</p>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
