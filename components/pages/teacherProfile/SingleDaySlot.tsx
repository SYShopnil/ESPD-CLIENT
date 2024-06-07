import React, { useState } from 'react';
import Image from "next/image";
import Trash from "./assets/Trash.svg";
import Plus from "./assets/Plus.svg";
import Select from "react-select";
import { getTimeSlots } from '@/utils/utils';

function SingleDaySlot({ day, isDayChecked, onClickCheckbox, slots, onAddSlot, onDeleteSlot, onSelectTime }) {

    const handleChange = (e) => {
        let isChecked = e.target.checked;
        onClickCheckbox(isChecked, day);
        // do whatever you want with isChecked value
    }

    const handleAddTimeSlot = (e) => {
        e.preventDefault()
        onAddSlot(day);
    }

    const handleDeleteSlot = (id) => {
        onDeleteSlot(day, id);
    }

    const onSelect = (value, key, id) => {
        onSelectTime(day, id, key, value.value);
    }

    const timeSlots = getTimeSlots()

    const level_options = timeSlots.map(item => ({ value: item, label: item }));

    const allSlots = slots.filter(slot => slot.day === day)

    return (
        <tr key={day}>
            <td>
                <div className="checkInnerBox">
                    <div className="checkInnerBox">
                        <label className="containerLevel">
                            <input type="checkbox" onChange={handleChange} checked={isDayChecked} />
                            <span className="checkmark"></span>
                        </label>
                        <h6 className="checkInnerText">{day}</h6>
                    </div>
                </div>
            </td>
            <td>

                {allSlots?.map((item) => {
                    return (
                        <div className="weeklyTimeWrap">
                            <Select
                                isDisabled={!isDayChecked}
                                classNamePrefix="espd-select"
                                isSearchable
                                options={level_options}
                                onChange={(value) => onSelect(value, 'start', item.id)}
                                placeholder="Select"
                                value={{ value: item.start, label: item.start }}
                            />

                            {/* <button
                            disabled={!isDayChecked}
                            className={`setWeeklyTime ${isDayChecked ? '' : 'unActive'} ${isMorningChecked ? 'selected' : ''}`} onClick={() => onSelectSlot(day, 'MORNING')}>12 pm - 5 pm</button> */}


                            <div className="weeklyTimeDevide"></div>
                            <Select
                                isDisabled={!isDayChecked}
                                classNamePrefix="espd-select"
                                isSearchable
                                options={level_options}
                                onChange={(value) => onSelect(value, 'end', item.id)}
                                placeholder="Select"
                                value={{ value: item.end, label: item.end }}
                            />

                            {/* <button
                            disabled={!isDayChecked}
                            className={`setWeeklyTime ${isDayChecked ? '' : 'unActive'} ${isMorningChecked ? 'selected' : ''}`} onClick={() => onSelectSlot(day, 'MORNING')}>12 pm - 5 pm</button> */}
                            <div className="weeklyTimeDlt">
                                <div className="trashBox">
                                    <button className="trashTag" onClick={() => handleDeleteSlot(item.id)}>
                                        <Image className="Trash" src={Trash} alt="" />
                                        <div className="removeTrash removeTrashMobile">
                                            <a className="trashTagRemove" href="#">Remove Monday interval 1</a>
                                        </div>
                                    </button>
                                </div>
                            </div>

                        </div>
                    )
                })

                }


            </td>
            <td>
                <div className="weeklyTimeDlt weeklyTimeDltPlus">
                    {isDayChecked &&
                      <div className="plusBox">
                        <a className="plusTag" onClick={(e) => handleAddTimeSlot(e)}><Image className="Plus" src={Plus} alt="" /></a>
                        <div className="removePlus removePlusMobile">
                          <a className="testPlus" href="#">Add new interval</a>
                        </div>
                      </div>
                    }
                </div>
            </td>
            {/*<td>*/}
            {/*    <button*/}
            {/*        disabled={!isDayChecked}*/}
            {/*        className={`setWeeklyTime ${isDayChecked ? '' : 'unActive'} ${isEvChecked ? 'selected' : ''}`} onClick={() => onSelectSlot(day, 'EVENING')}>5 pm - 9 pm</button>*/}
            {/*</td>*/}
        </tr>
    );
}

export default SingleDaySlot;
