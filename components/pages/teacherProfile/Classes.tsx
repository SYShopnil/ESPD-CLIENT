import React from "react";
import BookingRow from "@/components/pages/teacherProfile/BookingRow";
import useUser from "@/hooks/userUser";
import {useQuery} from "react-query";
import {get} from "@/services/api/api";
import {API_GET_TEACHER_BOOKING} from "@/services/api/endpoints";
import {getUniqueGroupBookings} from "@/utils/utils";

export default function Classes() {
    const { user } = useUser();

    const teacherId = user?.id;

    const { isLoading, isError, error, data: bookingData } = useQuery({
        queryKey: ['teacherBookingData'],
        queryFn: () => get(`${API_GET_TEACHER_BOOKING}`),
        enabled: !!teacherId
    });
    let upcomingClasses = bookingData?.data?.upcoming;
    upcomingClasses = upcomingClasses?.filter(item => item.parent_booking_id === null)
    return (
        <>
            <div className="upComingWrapMain upComingWrapMainMobile">
                <div className="upComingWrap">
                    <h1 className="upComingWrapTitle">Upcoming Classes</h1>
                    <div className="upComingWrapContainer">
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
                                    <h1></h1>
                                </td>
                            </tr>
                            {
                                upcomingClasses?.map( item => <BookingRow key={item.id} lesson={item} />)
                            }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}
