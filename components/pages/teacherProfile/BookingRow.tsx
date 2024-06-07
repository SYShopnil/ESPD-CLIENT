import React from 'react';
import Image from "next/image";
import ArrowRightWhite from "./assets/ArrowRightWhite.svg";
import {addHoursToDate, formatDate} from '@/services/dateUtils';

function BookingRow({ lesson }) {
    return (
        <tr>
            <td>
                <p>{formatDate(lesson?.start_time)}</p>
                <p>{formatDate(lesson?.start_time, undefined, 'hh:mm a')} - {formatDate(addHoursToDate(lesson?.start_time, lesson?.duration), undefined, 'hh:mm a')}</p>
            </td>
            <td>
                <p>{lesson?.Subject?.name}</p>
            </td>
            <td className="upClassesTypeMobileNone">
                <p>{lesson?.booking_type === 'One_To_One' ? 'One-to-One' : `Group (${lesson?.no_of_member} students)`}</p>
            </td>
            <td>
                <a className="lessonDetailsBtn" target='_blank' href={lesson?.meet_link}>
                    Start Class
                    <Image
                        className="ArrowRightWhiteLesson"
                        src={ArrowRightWhite}
                        alt=""
                    />
                </a>
            </td>
        </tr>
    );
}

export default BookingRow;
