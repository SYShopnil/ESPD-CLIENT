import Image from "next/image";
import React from "react";
import cup from "./assets/cup.svg";
import pot from "./assets/pot.svg";
import right from "./assets/right.svg";
import SingleExcellence from "@/components/pages/home/SingleExcellence";


export default function WhyEspd({feature}) {
    const feature_work_espd = feature?.filter(item => item?.location === "work_at_espd")
    
    return (
        <>
            <div className="container excellenceWrapper">
                <div className="row whyEspdRow">
                    <div className="col-12">
                        <h3>Why ESPD?</h3>
                    </div>
                </div>
                <div className="row">
                    {
                        feature_work_espd?.map(singleFeature => <SingleExcellence key={singleFeature?.id} singleFeature ={singleFeature} />)
                    }
                </div>
            </div>
        </>
    )
}
