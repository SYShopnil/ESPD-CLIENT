import React from 'react';
import SingleDaySlot from './SingleDaySlot';

function WeekDays({ day, isDayChecked, onClickCheckbox, onSelectSlot, hours }) {

    const handleChange = (e) => {
        let isChecked = e.target.checked;
        onClickCheckbox(isChecked, day);
    }

    return (
        <div className="checkContent">
            <div className="checkInnerSearch">
                <label className="containerLevel">
                    <input type="checkbox"
                        onChange={handleChange}
                        checked={isDayChecked}
                    />
                    <span className="checkmark"></span>
                </label>
                <p>{day}</p>
            </div>
            {isDayChecked && <SingleDaySlot
            day={day}
            hours={hours}
            onSelectSlot={onSelectSlot}
            />}
        </div>
    );
}

export default WeekDays;
