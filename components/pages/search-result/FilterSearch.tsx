import { get } from "@/services/api/api";
import { API_GET_HOME } from "@/services/api/endpoints";
import { useRouter } from "next/router";
import React, { useRef, useState } from "react";
import { useQuery } from "react-query";
import Select from "react-select";
import WeekDays from "./WeekDays";
import Image from "next/image";
import ArrowLeft from "@/components/pages/BookingOption/assets/ArrowLeft.svg";
import { getDaysAndHours } from "@/utils/utils";
import { DAYS } from "@/config/constants";

const tutionType = [
  { value: "one_to_one", label: "One-to-one" },
  { value: "group", label: "Group" },
];

export default function FilterSearch({ onClickClearAll, onClickApplyFilter }) {
  const router = useRouter();

  const {
    availability,
    super_tutor,
    exam_board,
    free_video_call,
    student_level,
    subject_name,
    tution_type,
  } = router?.query;
  //availability: Monday_morning|Monday_afternoon|Tuesday_evening

  const handleFilter = (queryString, value) => {
    let updatedQuery = {
      ...router.query,
    };

    if (queryString === "super_tutor") {
      if (!value) {
        delete updatedQuery[queryString];
      } else {
        updatedQuery[queryString] = "yes";
      }
    } else if (queryString === "free_video_call") {
      if (!value) {
        delete updatedQuery[queryString];
      } else {
        updatedQuery[queryString] = "yes";
      }
    } else if (queryString === "subject_name") {
      console.log(value);

      if (!value) {
        delete updatedQuery[queryString];
      } else {
        updatedQuery["subject_name"] = value?.label;
        updatedQuery["subject_id"] = value?.value;
        // updatedQuery[queryString] = value?.label;
      }
    } else if (queryString === "student_level") {
      if (!value) {
        delete updatedQuery[queryString];
      } else {
        updatedQuery[queryString] = value?.value;
      }
    } else if (queryString === "exam_board") {
      if (!value) {
        delete updatedQuery[queryString];
      } else {
        updatedQuery[queryString] = value?.value;
      }
    } else if (queryString === "tution_type") {
      if (!value) {
        delete updatedQuery[queryString];
      } else {
        updatedQuery[queryString] = value?.value;
      }
    } else {
      updatedQuery[queryString] = value;
    }

    // const isChecked = value;

    // setterFunc(value);

    // update query param
    // const updatedQuery = {
    //     ...router.query,
    //     [queryString]: value
    // };

    router.push(
      {
        pathname: router.pathname,
        query: updatedQuery,
      },
      undefined,
      { scroll: false }
    );
  };

  const handleAvailibility = (hours) => {
    let updatedQuery = {
      ...router.query,
    };

    if (hours) {
      updatedQuery.availability = hours.join("|");
    }
    /*if (days) {
            updatedQuery.days = days.join("|");
        }*/

    router.push(
      {
        pathname: router.pathname, // Keep the current path
        query: updatedQuery, // Update the query string with the new filter value
      },
      undefined,
      { scroll: false }
    );
  };

  const onClickClear = () => {
    router.push(
      {
        pathname: router.pathname,
        query: {},
      },
      undefined,
      { scroll: false }
    );
    if (onClickClearAll) {
      onClickClearAll();
    }
  };

  const { days, hours } = getDaysAndHours(availability);

  const {
    isLoading,
    isError,
    error,
    isSuccess,
    data: home,
  } = useQuery({
    queryKey: ["homeData"],
    queryFn: () => get(API_GET_HOME),
  });

  const subject_options =
    isSuccess && home?.data?.subjects?.length
      ? home?.data?.subjects?.map((subject) => ({
          value: subject?.id,
          label: subject?.name,
        }))
      : [];

  const level_options =
    isSuccess && home?.data?.levels?.length
      ? home?.data?.levels?.map((level) => ({
          value: level?.id,
          label: level?.name,
        }))
      : [];

  const boards_options =
    isSuccess && home?.data?.exam_boards?.length
      ? home?.data?.exam_boards?.map((level) => ({
          value: level?.id,
          label: level?.name,
        }))
      : [];

  const filteredLevel =
    isSuccess && level_options.find((item) => item?.value == student_level);

  const filteredSubject =
    isSuccess && subject_options.find((item) => item?.value == subject_options);

  return (
    <>
      <div className="filterSearchWrapper">
        <div className="filterAndShortBox">
          <div className="filterAndShortInner">
            <h2>Filter and Sort</h2>
            <div className="checkContent">
              <div className="checkInnerSearch">
                <label className="containerLevel">
                  <input
                    type="checkbox"
                    onChange={(e) =>
                      handleFilter("super_tutor", e.target.checked)
                    }
                    checked={super_tutor === "yes"}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>Super Tutor</p>
              </div>
              <p className="checkContentSubText">
                Super tutors have a high number of repeat bookings and positive
                ratings
              </p>
            </div>
            <div className="checkContent">
              <div className="checkInnerSearch">
                <label className="containerLevel">
                  <input
                    type="checkbox"
                    onChange={(e) =>
                      handleFilter("free_video_call", e.target.checked)
                    }
                    checked={free_video_call === "yes"}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>Free Video Call</p>
              </div>
            </div>
            <div className="bookinglevelConSearch">
              <div className="bookinglevelCon">
                <div className="levelTitleHeadWrap">
                  <h3>Subject</h3>
                  {/* <button className="levelTitleHeadBtn">Clear</button> */}
                </div>
                <div className="levelSelectCon">
                  <div className="levelSelectInput">
                    <Select
                      classNamePrefix="espd-select"
                      isSearchable
                      isClearable
                      options={subject_options}
                      onChange={(value) => handleFilter("subject_name", value)}
                      placeholder="Select"
                      value={filteredSubject}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="bookinglevelConSearch">
              <div className="bookinglevelCon">
                <div className="levelTitleHeadWrap">
                  <h3>Student's Level</h3>
                  {/* <button className="levelTitleHeadBtn">Clear</button> */}
                </div>
                <div className="levelSelectCon">
                  <div className="levelSelectInput">
                    <Select
                      classNamePrefix="espd-select"
                      isSearchable
                      isClearable
                      options={level_options}
                      onChange={(value) => handleFilter("student_level", value)}
                      placeholder="Select"
                      value={filteredLevel}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="bookinglevelConSearch">
              <div className="bookinglevelCon">
                <div className="levelTitleHeadWrap">
                  <h3>Exam Board</h3>
                  {/* <button className="levelTitleHeadBtn" onClick={handleClear}>Clear</button> */}
                </div>
                <div className="levelSelectCon">
                  <div className="levelSelectInput">
                    <Select
                      classNamePrefix="espd-select"
                      isSearchable
                      isClearable
                      options={boards_options}
                      onChange={(value) => handleFilter("exam_board", value)}
                      placeholder="Select"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="bookinglevelConSearch">
              <div className="bookinglevelCon">
                <div className="levelTitleHeadWrap">
                  <h3>Tuition Type</h3>
                  {/* <button className="levelTitleHeadBtn">Clear</button> */}
                </div>
                <div className="levelSelectCon">
                  <div className="levelSelectInput">
                    <Select
                      classNamePrefix="espd-select"
                      isSearchable
                      isClearable
                      options={tutionType}
                      onChange={(value) => handleFilter("tution_type", value)}
                      placeholder="Select"
                    />
                  </div>
                </div>
              </div>
            </div>
            <h3>Availability</h3>
            <div className="dateCheckWrap">
              {DAYS.map((day) => {
                return (
                  <WeekDays
                    key={day}
                    day={day}
                    hours={hours}
                    isDayChecked={days.includes(day)}
                    onClickCheckbox={(isChecked, day) => {
                      if (isChecked) {
                        const new_arr = [...hours, `${day}_none`];
                        handleAvailibility(new_arr);
                      } else {
                        const new_arr = hours.filter(
                          (item) => !item.startsWith(`${day}_`)
                        );
                        handleAvailibility(new_arr);
                      }
                    }}
                    onSelectSlot={(day, slot) => {
                      const data = `${day}_${slot}`;
                      const exists = hours.find((i) => i === data);
                      if (exists) {
                        const filtered = hours.filter((i) => i !== data);
                        handleAvailibility(filtered);
                      } else {
                        handleAvailibility([...hours, data]);
                      }
                    }}
                  />
                );
              })}
              <button className="allFilterClear" onClick={onClickClear}>
                Clear All
              </button>
              <div className="applyFilterBtnBox">
                <div className="applyFilterInner">
                  <a
                    className="signUpBtn"
                    href="#"
                    type="submit"
                    onClick={(e) => {
                      e.preventDefault();
                      if (onClickApplyFilter) {
                        onClickApplyFilter();
                      }
                    }}
                  >
                    Apply Filters
                    <Image
                      className="signUpBtnArro"
                      priority
                      src={ArrowLeft}
                      alt=""
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
