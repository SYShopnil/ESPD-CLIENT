import Image from "next/image";
import React, { useState } from "react";
import heroimg from "./assets/img-huge.svg";



export default function EspdBannerFree({feature}) {
    return (
        <>
            <div className=" espdWrapperBox">
                <div className="homeBannerWrapper">
                    <div className="textTitleCon">
                        <div>
                            <h1 className="titleText">{feature?.title}</h1>
                        </div>
                        <p className="titleSubText">{feature?.description}</p>
                    </div>
                    <div className="imgCon espdSingleImg">
                        <img
                            className="heroImg"
                            src={feature?.image}
                            alt=""
                        />
                    </div>
                </div>
            </div>
        </>
    )
}
