import React from 'react';

function SingleDaySlot({ onSelectSlot, day, hours }) {
    const isMorningChecked = hours.find(i => i === `${day}_morning`);
    const isAftChecked = hours.find(i => i === `${day}_afternoon`);
    const isEvChecked = hours.find(i => i === `${day}_evening`);
    return (
        <div className="checkInnerSearchItem">
            <button className={`checkInnerSearchItemBox ${isMorningChecked ? 'active' : ''}`} onClick={() => onSelectSlot(day, 'morning')}>
                9 am - 12 pm
            </button>
            <button className={`checkInnerSearchItemBox ${isAftChecked ? 'active' : ''}`} onClick={() => onSelectSlot(day, 'afternoon')}>
                12 pm - 4 pm
            </button>
            <button className={`checkInnerSearchItemBox ${isEvChecked ? 'active' : ''}`} onClick={() => onSelectSlot(day, 'evening')}>
                4 pm - 7 pm
            </button>
        </div>
    );
}

export default SingleDaySlot;
