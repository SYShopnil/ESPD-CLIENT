import {durationOptions} from "@/config/constants";

export const formatMusicList = (str: string): string => {
    if (str === undefined || str === null) return '';

    const music_types = str?.split(",");
    let ret = '';
    music_types.map((item, i, arr) => {
        if (arr.length - 1 === i) {
            ret+= ` ${item}`
        }else if (i === 0) {
            ret+= `${item} •`
        } else {
            ret+= ` ${item} •`
        }
    });
    return ret;
}

export const removeEmptyKeys = (obj) => {
    Object.keys(obj).forEach(
        (key) => (obj[key] === null || obj[key] === undefined) && delete obj[key]);
    return obj;
}

export const getTimeSlots = () => {
    var timeArray = [];
    var startTime = new Date();
    startTime.setHours(7, 0, 0, 0); // Set the start time to 7:00 AM

    var endTime = new Date();
    endTime.setHours(21, 0, 0, 0); // Set the end time to 9:00 PM

    var currentTime = startTime;

    while (currentTime <= endTime) {
      var formattedTime = currentTime.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      });

      timeArray.push(formattedTime.toLowerCase()); // Add the formatted time to the array
      currentTime.setMinutes(currentTime.getMinutes() + 15); // Increment time by 15 minutes
    }

    return timeArray;
}

/**
 * get days & hours array from query string in this format: Monday_morning|Monday_afternoon|Tuesday_evening
 */
export const getDaysAndHours = (queryStr) => {
    if (queryStr === undefined || queryStr === null || queryStr === '') {
        return {days: [], hours: []}
    }
    const arr = queryStr.split("|");
    const all_days = arr.map( item => item.split("_")[0]);
    const unique_days = all_days.filter((day, index, currentVal) =>
        currentVal.indexOf(day) === index
    )

    return {days: unique_days, hours: arr}
}

export const setStarRating = (totalRating:number , reviewCount:number) => {

  const avgRating =  Math.floor(totalRating / reviewCount);

  if(isNaN(avgRating)) return 0

  return avgRating

}

export const getUniqueItemsByKey = (arr, key) => {
    const uniqueMap = new Map(); // Create a map to store unique items

    for (const item of arr) {
        const keyValue = item[key]; // Get the value of the specified key
        if (!uniqueMap.has(keyValue)) {
            uniqueMap.set(keyValue, item); // Add the item to the map if it's not already present
        }
    }

    return Array.from(uniqueMap.values()); // Convert the map back to an array of unique items
}

export const formatMySQLDateTimeToHumanFriendly = (mysqlDateTime) => {
    const date = new Date(mysqlDateTime);

    const options = {
        year: 'numeric',
        month: 'short',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    };

    return date.toLocaleString('en-US', options);
}

export const convertMySQLDateTimeToISO = (mysqlDateTime) => {
    const [datePart, timePart] = mysqlDateTime.split(' ');
    const [year, month, day] = datePart.split('-');
    const [hour, minute, second] = timePart.split(':');

    // Create an ISO-formatted date-time string
    const isoDateTime = `${year}-${month}-${day}T${hour}:${minute}:${second}Z`;

    return isoDateTime;
}


/*
* return duration options based on teacher's availability for that day.
* example: if teacher is available for only 4 hours on a certain day,
* on duration dropdown, only show upto 4 hours
* */
export const getDurations = (bookingDateValue, durationOptions, timeslots) => {
    if (bookingDateValue === null || bookingDateValue === undefined
    || !bookingDateValue?.day) {
        return durationOptions
    }

    if (timeslots === null || timeslots === undefined) {
        return durationOptions
    }

    // console.log('boo', bookingDateValue);
    // console.log('times', timeslots);

    const slot_label = getSlotLabelFromTime(bookingDateValue.time)

    // console.log('label', slot_label);
    let slots_count = 0;
    timeslots?.map(i => {
        i?.days?.map(j => {
            if (j.day === bookingDateValue?.day) {
                // slots_count = j?.slots?.length;
                const index = j?.slots?.findIndex(slot => slot?.label === slot_label);
                slots_count = j?.slots?.length - index;
            }
        })
    })

    // console.log('sotts', slots_count);
    if (slots_count ===  0) return durationOptions;
    if (slots_count === 1) {
        slots_count = 2;
    }
    const hours = slots_count * 0.5 // slots are egenrated in 30 min interval

    // console.log('hsys', hours);
    return durationOptions?.filter( i => i.value <= hours);
}

export const getSlotLabelFromTime = (dateString) => {
    const parts = dateString.split(' ');
    const timePart = parts[1];
    const [hour, minute] = timePart.split(':');
    return `${hour}:${minute}`
}

export const getUniqueLabels = (inputArray) => {
    if (inputArray === undefined || inputArray === null) return [];

    const uniqueLabels = {};
    const resultArray = [];

    for (const item of inputArray) {
        if (!uniqueLabels[item.label]) {
            uniqueLabels[item.label] = true;
            resultArray.push(item);
        }
    }

    return resultArray;
}

export const getUniqueGroupBookings = (inputArray) => {
    if (inputArray === undefined || inputArray === null) return [];

    const uniqueLabels = {};
    const resultArray = [];

    for (const item of inputArray) {
        if (!uniqueLabels[item.label]) {
            uniqueLabels[item.label] = true;
            resultArray.push(item);
        }
    }

    return resultArray;
}

export const getUniqueSubjectOffered = (inputArray) => {
    if (inputArray === undefined || inputArray === null) return [];

    const resultArray = [];

    inputArray?.map(item => {
        const find = resultArray.find(i => (i.level_id === item?.level_id && i.subject_id === item?.subject_id))
        if (!find) {
            resultArray.push(item)
        }
    })
    return resultArray;
}
