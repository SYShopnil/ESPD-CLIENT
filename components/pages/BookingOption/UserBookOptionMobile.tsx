import Image from "next/image";
import React, { useEffect, useMemo, useState } from "react";
import ArrowLeft from "./assets/ArrowLeft.svg";
import PrimaryButton from "@/components/common/PrimaryButton";
import StarRating from "@/components/common/StarRating";
import closeIcon from "@/components/pages/home/assets/closeIcon.svg";
import {
  durationOptions,
  ROLE_STUDENT,
  studentNumber,
} from "@/config/constants";
import useUser from "@/hooks/userUser";
import { post } from "@/services/api/api";
import {
  API_BOOKING_GROUP,
  API_BOOKING_ONETOONE,
} from "@/services/api/endpoints";
import { showToast } from "@/utils/toastUtils";
import {
  convertMySQLDateTimeToISO,
  formatMySQLDateTimeToHumanFriendly,
  getDurations,
  setStarRating,
} from "@/utils/utils";
import Link from "next/link";
import { useRouter } from "next/router";
import { Controller, useForm } from "react-hook-form";
import { useMutation } from "react-query";
import Select from "react-select";
import TeacherMessageForm from "./TeacherMessageForm";
import ErrorMessage from "@/components/common/ErrorMessage";
import Star from "@/components/pages/search-result/assets/Star.svg";
import Modal from "react-bootstrap/Modal";
import DatePopUp from "@/components/pages/BookingOption/DatePopUp";
import AuthModal from "@/components/auth-modal/AuthModal";
import ReviewPopup from "@/components/review-popup";

export default function UserBookOptionMobile({
  tutor,
  timeslots,
  levelOption,
}) {
  const [calculatedCost, setCalculatedCost] = useState(null);
  const [isMessage, setIsMessage] = useState(false);
  const [bookingType, setBookingType] = useState("1-1"); //1-1, group
  const [isOpen, setIsOpen] = useState(false);
  const [bookingDate, setBookingDate] = useState(null);
  const [formattedValue, setFormattedValue] = useState(null);

  //modals
  const [loginModalVisible, setLoginModalVisible] = React.useState(false);
  const [dateModalVisible, setDateModalVisible] = useState(false);
  const [modalShow, setModalShow] = React.useState(false);

  const {
    handleSubmit,
    control,
    formState: { errors },
    register,
    watch,
    setValue,
  } = useForm();
  const level = watch("subject_level");
  const noOfGroupMember = watch("members_number");
  const bookingDateValue = watch("date_time");

  const router = useRouter();

  const teacherId = tutor?.id;

  const levelCost = tutor?.levelCost;

  const { user } = useUser();

  const BOOKING_URL =
    bookingType === "group" ? API_BOOKING_GROUP : API_BOOKING_ONETOONE;

  const onChange = (e) => {
    setBookingType(e.target.value);
  };

  const toggleMenu = () => {
    setIsOpen((open) => !open);
  };

  let examBoard = [];
  if (level) {
    const find = tutor?.SubjectOffered?.find(
      (subject) => subject.offerd_id === level?.value
    );
    tutor?.SubjectOffered?.map((item) => {
      if (
        item?.level_id === find?.level_id &&
        item?.subject_id === find?.subject_id
      ) {
        examBoard.push({
          value: item?.examboard_id,
          label: item?.examboard_name,
        });
      }
    });
  }

  const bookingMutation = useMutation(
    async (data) => await post(BOOKING_URL, data),
    {
      onSuccess: (res) => {
        router.replace(res?.data?.payment_url);
      },
      onError: (err) => {
        showToast("error", "Error occured");
      },
    }
  );

  const handleContactMessageForm = (data) => {
    setIsMessage(data);
  };

  const onClickBook = (form_data) => {
    if (user && user.access_token === undefined) {
      setLoginModalVisible(true);
      return;
    } else if (user && user.role !== ROLE_STUDENT) {
      return;
    }

    callBookingMutation(form_data, user?.id);
  };

  const callBookingMutation = (form_data, student_id) => {
    // subjectOfferedId is an offer id on subject_offered table in db
    // subjectOfferedId is used to separate subject_id and level_id
    const subjectOfferedId = form_data?.subject_level?.value;
    const start_time = convertMySQLDateTimeToISO(form_data?.date_time?.time);

    const filteredSubjectLevelObj = tutor?.SubjectOffered?.filter(
      (subject) => subject.offerd_id === subjectOfferedId
    )[0];
    let payload = {
      amount: calculatedCost ? calculatedCost : tutor?.price_one_to_one,
      start_time: start_time,
      duration: form_data?.duration?.value,
      student_id: student_id,
      teacher_id: teacherId,
      level_id: filteredSubjectLevelObj?.level_id,
      subject_id: filteredSubjectLevelObj?.subject_id,
      exam_board_id: form_data?.exam_board?.value,
      suuport_message: form_data?.support_message,
    };

    if (bookingType === "group") {
      payload.no_of_member = form_data?.members_number?.value;
      payload.amount = calculatedCost ? calculatedCost : tutor?.price_group;
    }

    bookingMutation.mutate(payload);
  };

  useEffect(() => {
    const filteredSubjectLevelObj = tutor?.SubjectOffered?.find(
      (subject) => subject.offerd_id === level?.value
    );

    const level_id = filteredSubjectLevelObj?.level_id;
    let cost;
    if (level_id && bookingType === "1-1") {
      cost = levelCost?.find(
        (item) => item?.level_id === level_id && item?.no_of_member === 1
      );
      setCalculatedCost(cost?.cost_per_student);
    } else if (
      level_id &&
      bookingType === "group" &&
      noOfGroupMember !== null
    ) {
      cost = levelCost?.find(
        (item) =>
          item?.level_id === level_id &&
          item?.no_of_member === noOfGroupMember?.value
      );
      setCalculatedCost(cost?.cost_per_student);
    }
  }, [level, noOfGroupMember, bookingType]);

  const handleManualSubmit = () => {
    handleSubmit(onClickBook)();
  };

  const onSelectDateTime = (slot) => {
    setDateModalVisible(false);
    const formattedSelectedValue = formatMySQLDateTimeToHumanFriendly(
      slot.time
    );
    setValue("date_time", slot, { shouldValidate: true });
    setFormattedValue(formattedSelectedValue);
  };

  const onLoginFromPopup = (user_data) => {
    handleSubmit((form_data) =>
      callBookingMutation(form_data, user_data?.id)
    )();
  };

  const [fix, setFix] = useState(false);

  function setFixedSidebar() {
    if (window.scrollY >= 500) {
      setFix(true);
    } else {
      setFix(false);
    }
  }
  useEffect(() => {
    window.addEventListener("scroll", setFixedSidebar);
  }, []);

  const durationOptionsFiltered = getDurations(
    bookingDateValue,
    durationOptions,
    timeslots
  );

  const reviewCount = tutor?.Review?.length;
  const totalRating = tutor?.Review?.reduce(
    (total, obj) => obj?.rating + total,
    0
  );

  return (
    <>
      <div className="bookLessonFixedWrap">
        <form noValidate>
          <div className="bookLessonFixed">
            <div className="bookLessonFixedInner">
              <div className="bookLessonFixedRate">
                <div className="mobileTeacgerRateIner mobileTeacgerRateInerFixed">
                  <p>£{tutor?.price_one_to_one} </p>
                  <p>/hour</p>
                </div>
                <div className="starView">
                  <div className="pcReviewBox">
                    <StarRating
                      reviewCount={reviewCount}
                      totalRating={totalRating}
                    />
                  </div>
                  <div className="mobileReviewBox">
                    <div className="starImgBox">
                      <Image className="StarImg" priority src={Star} alt="" />
                    </div>
                  </div>
                  <p>
                    {setStarRating(totalRating, reviewCount)}.0{" "}
                    <span>
                      <Link
                        className="primarryLink"
                        onClick={() => setModalShow(true)}
                        href="#"
                      >
                        ({tutor?.Review?.length} Reviews)
                      </Link>
                    </span>
                  </p>
                </div>
              </div>
              <div className="">
                <a
                  className="signUpBtn"
                  href="#"
                  type="submit"
                  onClick={toggleMenu}
                >
                  Book Lesson
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
          <div className={`lessonPopUpWrapper ${isOpen ? "is-open" : ""}`}>
            <div className="mobileDateAndTimePopWrap">
              <a href="#" onClick={toggleMenu}>
                <div className="MobileCloseIconBox">
                  <Image
                    className="mbileCloseIcon"
                    priority
                    src={closeIcon}
                    alt=""
                  />
                </div>
              </a>
              {isMessage ? (
                <TeacherMessageForm
                  tutor={tutor}
                  onClickHandler={() => handleContactMessageForm(false)}
                />
              ) : (
                <div className="rateDetails">
                  {!!calculatedCost && (
                    <p>
                      £{calculatedCost}
                      <span> /Per hour</span>
                    </p>
                  )}
                  {!!(
                    calculatedCost === null || calculatedCost === undefined
                  ) && (
                    <p>
                      £
                      {bookingType === "group"
                        ? tutor?.price_group
                        : tutor?.price_one_to_one}
                      <span> /Per hour</span>
                    </p>
                  )}
                  <div className="redioSelectBox">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        onChange={onChange}
                        checked={bookingType === "1-1"}
                        name="flexRadioDefault"
                        id="flexRadioDefault1"
                        value="1-1"
                      />
                      <label htmlFor={"flexRadioDefault1"}>
                        One - to - one
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        onChange={onChange}
                        checked={bookingType === "group"}
                        name="flexRadioDefault"
                        id="flexRadioDefault2"
                        value="group"
                      />
                      <label
                        className="position-relative"
                        htmlFor={"flexRadioDefault2"}
                      >
                        Group tuition with friends
                        <span className="badge bg-warning text-dark  position-absolute bottom-50 start-100 translate-middle-y">
                          Save Money
                        </span>
                      </label>
                    </div>
                  </div>
                  {bookingType === "group" && (
                    <div className="bookinglevelCon">
                      <h2>Number of members</h2>
                      <p>You can add up to 10 of your friends to this group</p>

                      <div className="levelSelectCon">
                        <div className="levelSelectInput">
                          <Controller
                            name="members_number"
                            control={control}
                            rules={{ required: "This field is required" }}
                            render={({ field }) => (
                              <Select
                                classNamePrefix="espd-select"
                                isSearchable
                                options={studentNumber}
                                {...field}
                                isClearable
                                placeholder="Select"
                              />
                            )}
                          />

                          {errors?.members_number && (
                            <ErrorMessage
                              text={errors?.members_number?.message}
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                  <div className="dateTimeCon">
                    <div className="date">
                      <h2>Date and time</h2>

                      <div className="levelSelectInput">
                        <Controller
                          name="date_time"
                          rules={{ required: "This field is required" }}
                          control={control}
                          render={({ field }) => (
                            <input
                              className="levelSelectIn"
                              onClick={() => setDateModalVisible(true)}
                              {...field}
                              type="text"
                              value={formattedValue ?? null} // Display formatted or entered value
                              placeholder="Select  date & time"
                            />
                          )}
                        />
                        {errors?.date_time && (
                          <ErrorMessage text={errors?.duration?.message} />
                        )}
                        <svg
                          onClick={() => setDateModalVisible(true)}
                          height="20"
                          width="20"
                          viewBox="0 0 20 20"
                          aria-hidden="true"
                          focusable="false"
                          className="css-tj5bde-Svg CaretUpDown"
                        >
                          <path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path>
                        </svg>
                      </div>
                    </div>
                    <div className="duration">
                      <h2>Duration (hr)</h2>

                      <div className="levelSelectCon">
                        <div className="levelSelectInput">
                          <Controller
                            name="duration"
                            control={control}
                            rules={{ required: "This field is required" }}
                            render={({ field }) => (
                              <Select
                                classNamePrefix="espd-select"
                                isSearchable
                                options={durationOptionsFiltered}
                                {...field}
                                isClearable
                                placeholder="Select duration"
                              />
                            )}
                          />

                          {errors?.duration && (
                            <ErrorMessage text={errors?.duration?.message} />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="dateTimeCon bookinglevelConSecond">
                    <div className="date">
                      <h2>Subject and level</h2>

                      <div className="levelSelectInput">
                        <Controller
                          name="subject_level"
                          control={control}
                          rules={{ required: "This field is required" }}
                          render={({ field }) => (
                            <Select
                              classNamePrefix="espd-select"
                              isSearchable
                              options={levelOption}
                              {...field}
                              isClearable
                              placeholder="Select subject & level"
                            />
                          )}
                        />

                        {errors?.subject_level && (
                          <ErrorMessage text={errors?.subject_level?.message} />
                        )}
                      </div>
                    </div>
                    <div className="duration">
                      <h2>Education Board</h2>

                      <div className="levelSelectCon">
                        <div className="levelSelectCon">
                          <div className="levelSelectInput">
                            <Controller
                              name="exam_board"
                              control={control}
                              // rules={{required: 'This field is required'}}
                              render={({ field }) => (
                                <Select
                                  classNamePrefix="espd-select"
                                  isSearchable
                                  options={examBoard}
                                  {...field}
                                  isClearable
                                  placeholder="Select exam board"
                                />
                              )}
                            />

                            {errors?.exam_board && (
                              <ErrorMessage
                                text={errors?.exam_board?.message}
                              />
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="writeText">
                    <h2>What topic area do you require support with?</h2>
                    <textarea
                      {...register("support_message")}
                      rows={5}
                      placeholder="Write here"
                    />
                    {errors?.message && (
                      <ErrorMessage text={errors?.exam_board?.message} />
                    )}
                  </div>
                  <p className="noteText">
                    Once you’re done with creating the group, you can send
                    invitation links to your friends to join to the group
                  </p>
                  <div className="createGroupBtnBox">
                    <PrimaryButton
                      loading={bookingMutation.isLoading}
                      text={
                        bookingType === "group" ? "Create Group" : "Book Lesson"
                      }
                      onClick={handleManualSubmit}
                    />

                    <p>
                      Any questions?{" "}
                      <span>
                        <a
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            handleContactMessageForm(true);
                          }}
                        >
                          Message tutor
                        </a>
                      </span>
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </form>
      </div>

      <div className="popUpWrapperDate">
        <Modal
          show={dateModalVisible}
          onHide={() => {
            setDateModalVisible(false);
          }}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          className="test"
        >
          <div className="dateAndTimePopWrap">
            <Modal.Header closeButton>
              <Modal.Title
                id="contained-modal-title-vcenter"
                className="modelTitle"
              >
                Availability
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="modelInnerCon">
                <div className="mobilePopUp">
                  <DatePopUp
                    slots={timeslots}
                    bookingDate={bookingDate}
                    onSelectSlot={onSelectDateTime}
                  />
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer></Modal.Footer>
          </div>
        </Modal>
      </div>

      <AuthModal
        action={"book lesson"}
        modalShow={loginModalVisible}
        onClickCancel={() => setLoginModalVisible(false)}
        onLoginSuccess={onLoginFromPopup}
      />

      <ReviewPopup
        tutor={tutor}
        modalShow={modalShow}
        setModalShow={setModalShow}
      />
    </>
  );
}
