import React from "react";
import Image from "next/image";
import Clock from "@/components/pages/teacherProfile/assets/Clock.svg";
import ChalkboardTeacher from "@/components/pages/teacherProfile/assets/ChalkboardTeacher.svg";
import Student from "@/components/pages/teacherProfile/assets/Student.svg";

export default function Statistics() {
    return (
        <>
            <div className="statisticsWrapperMain">
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-sm-12 col-md-12">
                            <div className="dashboardItemTitle">
                                <h1>Overall Statistics</h1>
                                <div className="dropDownBoxDash">
                                    <div className="bookinglevelCon">
                                        <select className="form-select levelSelect" aria-label="Default select example">
                                            <option selected>This Month</option>
                                            <option value="1">All</option>
                                            <option value="2">This Month</option>
                                            <option value="3">Last Month</option>
                                            <option value="3">Last Quarter </option>
                                            <option value="3">This Year</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row statisticMobileWrap">
                        <div className="col-12 col-sm-12 col-md-4">
                            <div className="dashboardItemInnerWrap">
                                <div className="dashboardItemBox">
                                    <Image
                                        className="dashboardItemIcon"
                                        priority
                                        src={Clock}
                                        alt=""
                                    />
                                    <div className="dashboardItemSubBox">
                                        <h1>00</h1>
                                        <p>Hours Taught</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-sm-12 col-md-4">
                            <div className="dashboardItemInnerWrap">
                                <div className="dashboardItemBox">
                                    <Image
                                        className="dashboardItemIcon"
                                        priority
                                        src={ChalkboardTeacher}
                                        alt=""
                                    />
                                    <div className="dashboardItemSubBox">
                                        <h1>00</h1>
                                        <p>Lesson Completed</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-sm-12 col-md-4">
                            <div className="dashboardItemInnerWrap">
                                <div className="dashboardItemBox dashboardItemBoxLast">
                                    <Image
                                        className="dashboardItemIcon"
                                        priority
                                        src={Student}
                                        alt=""
                                    />
                                    <div className="dashboardItemSubBox">
                                        <h1>00</h1>
                                        <p>Repeat Bookings</p>
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
