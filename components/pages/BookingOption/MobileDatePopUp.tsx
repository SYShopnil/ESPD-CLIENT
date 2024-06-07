import CaretLeft from "./assets/CaretLeft.svg";
import CaretRight from "./assets/CaretRight.svg";
import Image from "next/image";
import React from "react";
export default function MobileDatePopUp() {
    return (
        <>
            <div className="DatePopUpWrapper">
                <div className="headerDateWrap">
                    <div className="initialDate">
                        <a href="#">04 Sep - 10 Sep</a>
                    </div>
                    <div className="nextDate">
                        <a href="#">
                            <Image
                                className="CaretLeftIcon"
                                src={CaretLeft}
                                alt="ESPD"
                            />
                        </a>
                        <a href="#">
                            <Image
                                className="CaretLeftIcon"
                                src={CaretRight}
                                alt="ESPD"
                            />
                        </a>
                    </div>
                </div>
                <div className="dateAvailableWrap">
                    <table>
                        <tr>
                            <td>
                                <p>Mon</p>
                                <p>04</p>
                            </td>
                            <td>
                                <p>Tue</p>
                                <p>05</p>
                            </td>
                            <td>
                                <p>Wed</p>
                                <p>06</p>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <a className="" href="#">10.30</a>
                            </td>
                            <td>
                                <a href="#">10.30</a>
                            </td>
                            <td>
                                <p className="notAvailable">Not Available</p>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <a className="" href="#">10.30</a>
                            </td>
                            <td>
                                <a href="#">10.30</a>
                            </td>
                            <td>
                                <a href="#">10.30</a>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <a className="active" href="#">10.30</a>
                            </td>
                            <td>
                                <a href="#">10.30</a>
                            </td>
                            <td>

                            </td>
                        </tr>
                        <tr>
                            <td>
                                <a className="" href="#">10.30</a>
                            </td>
                            <td>
                                <a href="#">10.30</a>
                            </td>
                            <td>

                            </td>
                        </tr>
                    </table>
                </div>
            </div>
        </>
    )
}
