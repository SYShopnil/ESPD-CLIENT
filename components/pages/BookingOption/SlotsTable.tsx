import React from 'react'

export default function SlotsTable({ days, onSelectSlot, bookingDate }) {
    // console.log({days});
    // console.log(partedSlots ,"slottable " + showSlot)
    const onClick = (slot, item) => {
        if (slot.is_booked) return;
        onSelectSlot({id: slot?.id, time:slot?.time, day: item?.day})
    }

    return (
        <div className="frame">
            {!!(days?.length) && days?.map( item => {
                return (
                    <div className="div">
                        <div className="div-2">
                            <div className="text-wrapper">{item?.day?.split(" ")[0]}</div>
                            <div className="text-wrapper-2">{item?.day?.split(" ")[1]}</div>
                        </div>
                        <div className="div-3">
                            {!!(item?.slots?.length === 0) && <p>Not available</p>}

                            {!!(item?.slots?.length) && item?.slots?.map( slot => {
                                return (
                                    <div className={slot?.id === bookingDate?.id ? 'div-wrapper-3' : 'div-wrapper'}
                                         onClick={() => onClick(slot, item)} data-booked={slot?.is_booked}>
                                        <div className={slot?.id === bookingDate?.id ? 'text-wrapper-6' : 'text-wrapper-3'}>{slot?.is_booked ? 'Booked' : slot?.label}</div>
                                    </div>
                                )
                            })
                            }
                        </div>
                    </div>
                )
            })

            }

            {/*<div className="div">
                    <div className="div-2">
                        <div className="text-wrapper">Sat</div>
                        <div className="text-wrapper-2">09</div>
                    </div>
                    <div className="div-3">
                        <div className="div-wrapper-4">
                            <div className="text-wrapper-9">Not Available</div>
                        </div>
                    </div>
                </div>
                <div className="div">
                    <div className="div-2">
                        <div className="text-wrapper">Sun</div>
                        <div className="text-wrapper-2">10</div>
                    </div>
                    <div className="div-3">
                        <div className="div-wrapper-4">
                            <div className="text-wrapper-9">Not Available</div>
                        </div>
                    </div>
                </div>*/}
        </div>
    )
}
