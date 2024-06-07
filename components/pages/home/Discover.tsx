import MagnifyingGlass from "./assets/MagnifyingGlass.svg";
import FindTutorPopUp from "@/components/find-tutor-popup";

import Image from "next/image";
import React from "react";
import Link from "next/link";
import { PAGE_SEARCH } from "@/config/constants";

export default function Discover() {
    return (
        <>
            <div className="discoverWrapperMain">
                <div className="container discoverWrapper">
                    <div className="row discoverRow">
                        <div className="col-12">
                            <h1>Discover the Difference!</h1>
                            <p className="discovrSub">Schedule a Free Tutor Meeting Today and See How They Can Support Your Child.</p>
                            {/* <FindTutorPopUp
                                buttonClass={'primaryBtnSet'}
                            /> */}
                            <Link href={PAGE_SEARCH} className="primaryBtnSet">
                               <div className="primaryBtn">
                                   <Image
                                       className="User"
                                       priority
                                       src={MagnifyingGlass}
                                       alt=""
                                   />
                                   <p className="primaryBtnText">Search Tutor</p>
                               </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
