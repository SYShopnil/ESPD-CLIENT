import React from "react";
import WeeklyHours from "@/components/pages/teacherProfile/WeeklyHours";
import useUser from "@/hooks/userUser";
import {useQuery} from "react-query";
import {API_GET_TEACHER_BOOKING} from "@/services/api/endpoints";
import {get} from "@/services/api/api";
import Statistics from "./Statistics";
import Classes from "./Classes";
import {useRouter} from "next/router";


export default function TeacherDashboard() {
    const router = useRouter();
    const { page } = router?.query;

    const { user } = useUser();

    const teacherId = user?.id;

    const { isLoading, isError, error, data: bookingData } = useQuery({
        queryKey: ['teacherBookingData'],
        queryFn: () => get(`${API_GET_TEACHER_BOOKING}`),
        enabled: !!teacherId
    });


    const upcomingClasses = bookingData?.data?.upcoming;

    return (
        <>
            <div className="container teacherDashboardWrapMain">
                <div className="row">
                    <div className="col-12 col-sm-12 col-md-12">
                        <h1 className="teacherDashboardTitle">Dashboard</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 col-sm-12 col-md-3">
                        <div className="buttonWrap">
                            <div className={page === "statistics" ? "tabButton active" : "tabButton"}>
                                <a href="?page=statistics">Statistics</a>
                            </div>
                            <div className={page === "classes" ? "tabButton active" : "tabButton"}>
                                <a href="?page=classes">Classes</a>
                            </div>
                            <div className={page === "calendar" ? "tabButton active" : "tabButton"}>
                                <a href="?page=calendar">Calendar</a>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-sm-12 col-md-9">
                        <div className={page === "statistics" ? "tabCon activeCon" : "tabCon"}>
                            <Statistics />
                        </div>
                        <div className={page === "classes" ? "tabCon activeCon" : "tabCon"}>
                            <Classes />
                        </div>
                        <div className={page === "calendar" ? "tabCon activeCon" : "tabCon"}>
                            <WeeklyHours />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
