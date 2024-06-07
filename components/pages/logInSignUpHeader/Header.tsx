import Image from "next/image";
import Link from "next/link";
import backVector from "./assets/backVector.svg";
import logo from "./assets/logo.png";
import React from "react";
import { PAGE_LOGIN_CHOICE } from "@/config/constants";

export default function Header({hideBackButton}) {
    return (
        <>
            <div className="headerWrapper">
                <div>
                    <div className="loginChoiceHead">
                        <a href="/">
                            <Image
                                className="logo"
                                width={160}
                                src={logo}
                                alt=""
                            />
                        </a>
                    </div>
                    {!hideBackButton &&
                      <Link href="/">
                        <div className="signUpBack">
                          <Image
                            className="backVector"
                            src={backVector}
                            alt=""
                          />
                          <p className="backText">Back</p>
                        </div>
                      </Link>
                    }

                </div>
            </div>
        </>
    )
}
