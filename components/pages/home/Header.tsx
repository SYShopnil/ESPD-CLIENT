import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Image from "next/image";
import logo from "./assets/logo.png";
import CaretDown from "./assets/CaretBigDown.svg";
import CaretUp from "./assets/CaretUp.svg";
import User from "./assets/User.svg";
import Phone from "./assets/Phone.svg";
import mobileIcon from "./assets/mobileIcon.svg";
import closeIcon from "./assets/closeIcon.png";
import PresentationChart from "@/components/pages/teacherProfile/assets/PresentationChart.svg";
import userIcon from "../studentProfile/assets/userIcon.png";
import Heart from "../studentProfile/assets/Heart.svg";
import SignOut from "../studentProfile/assets/SignOut.svg";
import GearSix from "../studentProfile/assets/GearSix.svg";
import Link from "next/link";
import FindTutorPopUp from "@/components/find-tutor-popup";
import UserIcon from "./assets/UserIcon.svg";
import { useRouter } from "next/navigation";
import useUser from "@/hooks/userUser";
import {
  LOCAL_STORAGE_KEY,
  PAGE_LOGOUT,
  PAGE_RESOURCES,
  PAGE_SEARCH_RESULT,
  PAGE_STUDENT_DASHBOARD,
  PAGE_TEACHER_ACCOUNT,
  PAGE_TEACHER_DASHBOARD,
  PAGE_TEACHER_ONBOARDING,
  PAGE_WORK_AT_ESPD,
  ROLE_STUDENT,
  ROLE_TEACHER,
} from "@/config/constants";
import { PAGE_LOGIN_CHOICE } from "@/config/constants";
import { rotate } from "next/dist/server/lib/squoosh/impl";
import { boolean } from "yup";
import { API_GET_HOME } from "@/services/api/endpoints";
import { get } from "@/services/api/api";
import { useQuery } from "react-query";

export default function Header() {
  const { user } = useUser();

  const router = useRouter();

  const dashboard_url =
    user?.role === ROLE_TEACHER ? PAGE_TEACHER_ACCOUNT : PAGE_STUDENT_DASHBOARD;
  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["homeData"],
    queryFn: () => get(API_GET_HOME),
  });

  const subjects = data?.data?.subjects;

  // pop up
  //Mobile menu
  const [isOpen, setIsOpen] = useState(false);
  const sideDrawerClosedHandler = () => {
    setIsOpen(false);

    // Unsets Background Scrolling to use when SideDrawer/Modal is closed
    document.body.style.overflow = "unset";
  };

  // FUNCTION TO HANDLE OPEN ACTION ON SIDEDRAWER/MODAL
  const showSidebar = () => {
    setIsOpen(true);

    // Disables Background Scrolling whilst the SideDrawer/Modal is open
    if (typeof window != "undefined" && window.document) {
      document.body.style.overflow = "hidden";
    }
  };

  const [isDrop, setIsDrop] = useState(false);

  const dropToggleMenu = (e) => {
    e.preventDefault();
    setIsDrop((drop) => !drop);
  };

  const handleLogout = (e) => {
    e.preventDefault();
    window.localStorage.removeItem(LOCAL_STORAGE_KEY);
    // router.replace(PAGE_LOGOUT);
    router.replace(`${PAGE_LOGOUT}?role=${user?.role}`);
  };
  const isLoggedIn = !!(user && user.access_token);
  const role = user?.role;

  return (
    <>
      <div className="topMenuWarpMain">
        <div className="topMenuWarp">
          <div className="brand">
            <Link href="/">
              <Image
                className="brandIcon"
                priority
                src={logo}
                width={160}
                alt="ESPD"
              />
            </Link>
          </div>
          <div className="menuWarp">
            <div className="menuInner">
              <ul>
                <li className="nav-item navDropDown">
                  <a className="nav-link" href="#">
                    <p>Available tutors</p>
                    <div className="menuDrownDownArrowBox">
                      <Image className="CaretDown" src={CaretDown} alt="" />
                      <Image className="CaretUp" src={CaretUp} alt="" />
                    </div>
                  </a>
                  <div className="headerMenuWrap">
                    <div className="menuDropDownInner">
                      {subjects?.map((subject) => (
                        <a
                          key={subject?.id}
                          onClick={(e) => {
                            e.preventDefault();
                            window.location = `${PAGE_SEARCH_RESULT}?subject_name=${subject?.name}&subject_id=${subject?.id}`;
                            // router.refresh();
                          }}
                          href={`${PAGE_SEARCH_RESULT}?subject_name=${subject?.name}&subject_id=${subject?.id}`}
                        >
                          {subject?.name}{" "}
                        </a>
                      ))}
                    </div>
                  </div>
                </li>

                <li className="nav-item">
                  <Link className="nav-link" href={PAGE_RESOURCES}>
                    <p>Resources</p>
                  </Link>
                </li>

                {!isLoggedIn && (
                  <li className="nav-item">
                    <a className="nav-link" href={PAGE_WORK_AT_ESPD}>
                      Work at ESPD
                    </a>
                  </li>
                )}

                {!isLoggedIn && (
                  <li className="nav-item loginMenu">
                    <Link href={PAGE_LOGIN_CHOICE} className="nav-link">
                      <Image className="User" src={User} alt="" />
                      <p>Log in</p>
                    </Link>
                  </li>
                )}

                {!isLoggedIn && (
                  <li className="nav-item">
                    <FindTutorPopUp
                      buttonClass={"nav-link phoneMenu text-white"}
                    />
                  </li>
                )}
              </ul>
            </div>

            {!!(isLoggedIn && role === ROLE_STUDENT) && (
              <div className="headerUserWrapper">
                <div className="userWrap">
                  <Link href={`${dashboard_url}`}>
                    <h2>{user?.first_name}</h2>
                  </Link>
                  <div className="userIconBox">
                    <a href="#">
                      <div className="teacherInfoUserBox">
                        <img
                          className="teacherIcon"
                          src={
                            user && user?.profile_photo !== null
                              ? user?.profile_photo
                              : UserIcon
                          }
                          alt=""
                        />
                      </div>
                    </a>
                    <div className="userMenuBox">
                      <div className="userMenuWrap">
                        <Link
                          className="userMenuBtn"
                          href={PAGE_STUDENT_DASHBOARD}
                        >
                          <Image
                            className="UserGearSix"
                            src={PresentationChart}
                            alt=""
                          />
                          <p>Dashboard</p>
                        </Link>
                        <Link
                          className="userMenuBtn"
                          href={`${PAGE_STUDENT_DASHBOARD}/favourite`}
                        >
                          <Image className="UserHeart" src={Heart} alt="" />
                          <p>Favourite Teachers</p>
                        </Link>
                        <Link
                          className="userMenuBtn"
                          href={`${PAGE_STUDENT_DASHBOARD}/account`}
                        >
                          <Image className="UserGearSix" src={GearSix} alt="" />
                          <p>Account Settings</p>
                        </Link>
                        <a className="userMenuBtn" onClick={handleLogout}>
                          <Image className="UserGearSix" src={SignOut} alt="" />
                          <p>Logout</p>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {isLoggedIn && role === ROLE_TEACHER && (
              <div className="headerUserWrapper">
                <div className="userWrap">
                  <Link href={`/${dashboard_url}`}>
                    <h2>{user?.first_name}</h2>
                  </Link>
                  <div className="userIconBox">
                    <a href="#">
                      <div className="teacherInfoUserBox">
                        <img
                          className="teacherIcon"
                          src={
                            user && user?.profile_photo !== null
                              ? user?.profile_photo
                              : UserIcon
                          }
                          alt=""
                        />
                        {/* <Image className="teacherIcon" src={UserIcon} alt="" /> */}
                      </div>
                    </a>
                    <div className="userMenuBox">
                      <div className="userMenuWrap">
                        <Link
                          className="userMenuBtn"
                          href={`/${PAGE_TEACHER_DASHBOARD}?page=statistics`}
                        >
                          <Image
                            className="UserGearSix"
                            src={PresentationChart}
                            alt=""
                          />
                          <p>Dashboard</p>
                        </Link>
                        <Link
                          className="userMenuBtn"
                          href="/tutor-dashboard/account"
                        >
                          <Image className="UserGearSix" src={GearSix} alt="" />
                          <p>Account Settings</p>
                        </Link>
                        <a className="userMenuBtn" onClick={handleLogout}>
                          <Image className="UserGearSix" src={SignOut} alt="" />
                          <p>Logout</p>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/*mobile Menu*/}
            <div className="mobileWrapMain">
              {!isLoggedIn && (
                <div className="nav-item MobileLoginMenuWrap">
                  <Link
                    href={PAGE_LOGIN_CHOICE}
                    className="nav-link MobileLoginMenu"
                  >
                    <Image className="User" src={User} alt="" />
                    <p>Log in</p>
                  </Link>
                </div>
              )}
              <a href="#" className="MobileIconSet" onClick={showSidebar}>
                <div className="MobileIconBox">
                  <Image className="mobileIcon" src={mobileIcon} alt="" />
                </div>
              </a>

              <div className={`mobilemenuWtap ${isOpen ? "is-open" : ""}`}>
                <div className="mobileInnermain">
                  <div className="mobileMenuinner">
                    <div className="menuHeader">
                      <Image
                        className="mobileBrandIcon"
                        priority
                        src={logo}
                        alt="ESPD"
                      />
                      <a href="#" onClick={sideDrawerClosedHandler}>
                        <div className="MobileCloseIconBox">
                          <Image
                            className="mbileCloseIcon"
                            priority
                            src={closeIcon}
                            alt=""
                          />
                        </div>
                      </a>
                    </div>
                    <div className="mobilemenuitem">
                      <ul>
                        <li>
                          <a href="#" onClick={dropToggleMenu}>
                            <div className="mobileMenuflex">
                              <p>Available tutors</p>
                              <Image
                                className={`CaretDown ${
                                  isDrop ? "" : "is-drop"
                                }`}
                                src={CaretDown}
                                alt=""
                              />
                              <Image
                                className={`CaretUp ${isDrop ? "is-drop" : ""}`}
                                src={CaretUp}
                                alt=""
                              />
                            </div>
                          </a>
                          {isDrop && (
                            <div className={`mobileMenuSubDropdownBox`}>
                              <ul>
                                <li>
                                  {subjects?.map((subject) => (
                                    <a
                                      key={subject?.id}
                                      onClick={(e) => {
                                        e.preventDefault();
                                        window.location = `${PAGE_SEARCH_RESULT}?subject_name=${subject?.name}&subject_id=${subject?.id}`;
                                        // router.refresh();
                                      }}
                                      href={`${PAGE_SEARCH_RESULT}?subject_name=${subject?.name}&subject_id=${subject?.id}`}
                                    >
                                      {subject?.name}{" "}
                                    </a>
                                  ))}
                                </li>
                              </ul>
                            </div>
                          )}
                        </li>
                        <li>
                          <a href={PAGE_RESOURCES}>
                            <div className="mobileMenuflex">
                              <p>Resources</p>
                            </div>
                          </a>
                        </li>
                        {!isLoggedIn && (
                          <li>
                            <a href={PAGE_WORK_AT_ESPD}>Work at ESPD</a>
                          </li>
                        )}
                      </ul>
                    </div>
                    <div className="mobileInnerLogIn">
                      <div className="mobiletitorBox">
                        <FindTutorPopUp
                          buttonClass={"nav-link phoneMenu text-white"}
                        />
                        {/* <button className="nav-link phoneMenu" data-bs-toggle="modal"
													data-bs-target={"#find-tutor-modal"} >
													<Image
														className="User"
														src={Phone}
														alt=""
													/>
													<p>Find me a tutor</p>
												</button> */}
                      </div>
                    </div>
                  </div>
                  <a
                    className="blankSite"
                    onClick={sideDrawerClosedHandler}
                  ></a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="popUpWrapper"></div>
      </div>
    </>
  );
}
