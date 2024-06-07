import React from 'react';
import Image from "next/image";
import cup from "./assets/cup.svg";

const SingleExcellence = ({ singleFeature }) => {
    return (
        <>
            <div className="col-12 col-sm-12 col-md-4">
                <div className="innerBox">
                    <div className="innerBoxImg">
                        {/* <Image
                            className="icon"
                            src={singleFeature?.image}
                            alt=""
                        /> */}
                        <img
                            className=""
                            src={singleFeature?.image}
                            alt=""
                        />
                    </div>
                    <h3>{singleFeature?.title}</h3>
                    <p>{singleFeature?.description}</p>
                </div>
            </div>
        </>
    );
};

export default SingleExcellence;