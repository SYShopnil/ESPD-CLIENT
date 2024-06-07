import useUser from "@/hooks/userUser";
import { get } from "@/services/api/api";
import { API_GET_STUDENT_BOOKING } from "@/services/api/endpoints";
import Image from "next/image";
import React, { useState } from "react";
import { useQuery } from "react-query";
import ArrowRightWhite from "./assets/ArrowRightWhite.svg";
import BookingRow from "./BookingRow";

export default function LessonsDetails() {
    const [toggleState, setToggleState] = useState(1);

    const toggleTab = ({ index }: { index: any }) => {
        setToggleState(index);
    }

    const { user } = useUser();

    const studentId = user?.id;

    const { isLoading, isError, error, data: bookingData } = useQuery({
        queryKey: ['studentBookingData', studentId],
        queryFn: () => get(`${API_GET_STUDENT_BOOKING}`),
        enabled: !!studentId
    });

    const upcomingLessons = bookingData?.data?.upcoming;
    const completedLessons = bookingData?.data?.complete;

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-12 col-sm-12 col-md-12">
                        <div className="wellcomeTitle">
                            <h3>Welcome!</h3>
                            <h1>{user?.first_name}</h1>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 col-sm-12 col-md-12">
                        <div className="lessonWrap">
                            <div className="lessonButtonWrap">
                                <div className={toggleState === 1 ? "lessonTabButton LessonActive" : "tabButton"} onClick={() => toggleTab({ index: 1 })}>
                                    <p>Upcoming Lessons</p>
                                </div>
                                <div className={toggleState === 2 ? "lessonTabButton LessonActive" : "tabButton"} onClick={() => toggleTab({ index: 2 })}>
                                    <p>Completed Lessons</p>
                                </div>
                                <div className={toggleState === 3 ? "lessonTabButton LessonActive" : "tabButton"} onClick={() => toggleTab({ index: 3 })}>
                                    <p>Cancelled Lessons</p>
                                </div>
                            </div>

                            <div className={toggleState === 1 ? "lessonContainer activeCon" : "lessonContainer"}>
                                <table>

                                    <tbody>
                                        <tr>
                                            <td>
                                                <h1>Date and Time</h1>
                                            </td>
                                            <td>
                                                <h1>Subject</h1>
                                            </td>
                                            <td className="upClassesTypeMobileNone">
                                                <h1>Class Type</h1>
                                            </td>
                                            <td>
                                                <h1>Teacher</h1>
                                            </td>
                                            <td>
                                                <h1></h1>
                                            </td>
                                            <td>
                                                <h1></h1>
                                            </td>
                                        </tr>

                                        {
                                            upcomingLessons?.map(lesson => <BookingRow key={lesson.id} lesson={lesson} />)
                                        }
                                    </tbody>
                                </table>
                            </div>
                            <div className={toggleState === 2 ? "lessonContainer activeCon" : "lessonContainer"}>
                                <table>

                                    <tbody>
                                        <tr>
                                            <td>
                                                <h1>Date and Time</h1>
                                            </td>
                                            <td>
                                                <h1>Subject</h1>
                                            </td>
                                            <td>
                                                <h1>Class Type</h1>
                                            </td>
                                            <td>
                                                <h1>Teacher</h1>
                                            </td>
                                            <td>
                                                <h1></h1>
                                            </td>
                                        </tr>

                                        {
                                            completedLessons?.map(lesson => <BookingRow key={lesson.id} lesson={lesson} />)
                                        }
                                    </tbody>
                                </table>
                            </div>
                            <div className={toggleState === 3 ? "lessonContainer activeCon" : "lessonContainer"}>
                                Cancelled Lessons
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
