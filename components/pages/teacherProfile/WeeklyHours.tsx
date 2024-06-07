import React, {useEffect, useState} from 'react';
import SingleDaySlot from "@/components/pages/teacherProfile/SingleDaySlot";
import {useMutation, useQuery} from "react-query";
import {get, post} from "@/services/api/api";
import {API_TEACHER_WEEKLY_HOUR} from "@/services/api/endpoints";
import {toast} from "react-toastify";
import {v4 as uuidv4} from 'uuid';
import useUser from "@/hooks/userUser";
import {DAYS} from "@/config/constants";

function WeeklyHours({ ...props }) {

    const [slots, setSlots] = useState([]); // {day: 'Monday, start: , end}
    const [checkedDays, setCheckedDays] = useState([]) // day

    const { user } = useUser();
    const id = user?.id;

    const { isLoading, isError, error, data: weeklyHours } = useQuery({
        queryKey: ['weeklyHoursData'],
        queryFn: () => get(`${API_TEACHER_WEEKLY_HOUR}`),
        enabled: !!id
    });

    useEffect(() => {
        if (weeklyHours?.data) {
            const days = weeklyHours?.data?.map((item) => item.day)
                .filter((day, index, currentVal) =>
                    currentVal.indexOf(day) === index
                );
            const hours = weeklyHours?.data?.map((item) => ({day: item.day, start: item.start_time, end: item.end_time, id: `${item?.id}`}))
            setCheckedDays(days);
            setSlots(hours)
        }
    }, [weeklyHours]);

    const updateWeeklyHours = useMutation(
        async (data) => await post(`${API_TEACHER_WEEKLY_HOUR}`, data),
        {
            onSuccess: (res) => {
                toast.success('Updated Successfully', {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            },
            onError: (err) => {
                toast.error('Error', {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            },
        }
    );

    const saveWeeklyHours = (e) => {
        const payload: any = [];
        slots?.map(item => {
            payload.push({
                day: item.day,
                start_time: item.start,
                end_time: item.end,
            });
        });
        updateWeeklyHours.mutate({
            hours: payload
        })
    }

    return (
        <div className="row">
            <div className="col-12 col-sm-12 col-md-12">
                <div className="setWeeklyWrap">
                    <h1 className="upComingWrapTitle">Set Your Weekly Hours</h1>
                    {/*<button onClick={saveWeeklyHours}>save</button>*/}
                    <div className="setWeeklyWrapContainer">
                        <table>
                            <tbody>

                                {DAYS.map(day => {
                                    return (
                                        <SingleDaySlot
                                            key={day}
                                            day={day}
                                            slots={slots}
                                            onSelectTime={(day, id, key, value) => {
                                                const updated = [...slots].map(slot => {
                                                    if (slot.id === id) {
                                                        return {
                                                            ...slot,
                                                            [key]: value
                                                        }
                                                    } else {
                                                        return slot;
                                                    }
                                                })
                                                setSlots(updated);
                                            }}
                                            onAddSlot={(day) => {
                                                setSlots([
                                                    ...slots,
                                                    { day, start: '7:00 am', end: '9:00 pm', id: uuidv4() }
                                                ])
                                            }}
                                            onDeleteSlot={(day, id) => {
                                                const filtered = [...slots].filter(i => i.id !== id)
                                                setSlots([
                                                    ...filtered
                                                ]);
                                            }}
                                            isDayChecked={checkedDays.includes(day)}

                                            onClickCheckbox={(isChecked, day) => {
                                                if (isChecked) {
                                                    setCheckedDays([
                                                        ...checkedDays,
                                                        day
                                                    ])
                                                } else {
                                                    setCheckedDays(checkedDays.filter(i => i !== day));
                                                }
                                            }}
                                        />
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                    <div className="weklytimeeSaveBtnBox">
                        <button className="weklytimeeSaveBtn" onClick={saveWeeklyHours}>Save Changes</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default WeeklyHours;
