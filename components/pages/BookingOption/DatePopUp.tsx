import CaretLeft from "./assets/CaretLeft.svg";
import CaretRight from "./assets/CaretRight.svg";
import Image from "next/image";
import React, { useState } from "react";

import moment from "moment";
import { formatDateForDateMonth } from "@/services/dateUtils";
import SlotsTable from "./SlotsTable";


export default function DatePopUp({ slots, onSelectSlot, bookingDate }) {

    const [currentIndex, setCurrentIndex] = useState(0)

    if (slots === undefined || slots === null || (Array.isArray(slots) && slots?.length === 0)) return null

    const week = slots[currentIndex];
    const lastIndex = slots?.length - 1

    return (
        <>
            <div className="DatePopUpWrapper">
                <div className="headerDateWrap">
                    <div className="initialDate">
                        <a href="#">{week?.label}</a>
                    </div>
                    <div className="nextDate">
                        <button className="btn-icon" onClick={() => {
                            if (currentIndex === 0) {
                                setCurrentIndex(0)
                            } else {
                                setCurrentIndex(currentIndex - 1)
                            }
                        }}>
                            <Image
                                className="CaretLeftIcon"
                                src={CaretLeft}
                                alt="ESPD"
                            />
                        </button>
                        <button className="btn-icon" onClick={() => {
                            if (currentIndex === lastIndex) {
                                setCurrentIndex(lastIndex)
                            } else {
                                setCurrentIndex(currentIndex + 1)
                            }
                        }}>
                            <Image
                                className="CaretLeftIcon"
                                src={CaretRight}
                                alt="ESPD"
                            />
                        </button>
                    </div>
                </div>
                {
                    <SlotsTable
                        bookingDate={bookingDate}
                        onSelectSlot={onSelectSlot}
                        days={week?.days}
                    />

                }

            </div>
        </>
    )
}
