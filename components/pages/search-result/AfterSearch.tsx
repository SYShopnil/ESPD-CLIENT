import React, { useEffect, useState } from "react";
import FilterSearch from "@/components/pages/search-result/FilterSearch";
import SearchItem from "@/components/pages/search-result/SearchItem";
import Link from "next/link";
import Image from "next/image";
import ArrowRight from "@/components/pages/search/assets/ArrowRightww.svg";
import ArrowRightWhite from "@/components/pages/search/assets/ArrowRightWhite.svg";
import StillRequire from "@/components/pages/BookingOption/StillRequire";
import { useQuery } from "react-query";
import { get } from "@/services/api/api";
import { API_GET_ALL_TUTOR, API_TUTOR_SEARCH } from "@/services/api/endpoints";
import { useRouter } from "next/router";
import { removeEmptyKeys } from "@/utils/utils";
import SearchPagination from "@/components/pages/search-result/SearchPagination";
import Sliders from "./assets/Sliders.svg";
import Modal from "react-bootstrap/Modal";
import DatePopUp from "@/components/pages/BookingOption/DatePopUp";
import MobileDatePopUp from "@/components/pages/BookingOption/MobileDatePopUp";
import ArrowLeft from "@/components/pages/BookingOption/assets/ArrowLeft.svg";
import FAQs from "../home/FAQs";
import { FAQ } from "@/config/faqs";

export default function AfterSearch({ faqs, tutor_subject }) {
  const [page, setPage] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  // pop up
  const [modalShow, setModalShow] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const router = useRouter();
  const {
    super_tutor,
    exam_board,
    free_video_call,
    subject_id,
    student_level,
    availability,
    subject_name,
    tution_type,
  } = router?.query;

  let queryParam = {
    page,
    super_tutor,
    exam_board,
    free_video_call,
    subject_id,
    student_level,
    availability,
    tution_type,
  };

  queryParam = removeEmptyKeys(queryParam);

  const queryStr = new URLSearchParams(queryParam).toString();

  const {
    isLoading,
    isError,
    error,
    data: tutors,
    isSuccess,
  } = useQuery({
    queryKey: [
      "tutorsData",
      super_tutor,
      exam_board,
      page,
      free_video_call,
      student_level,
      student_level,
      availability,
      subject_id,
      tution_type,
    ],
    queryFn: () => get(`${API_TUTOR_SEARCH}?${queryStr}`),
    enabled: router.isReady,
  });

  const toggleMenu = () => {
    setIsOpen((open) => !open);
  };

  // this function shows pagination based on logic
  const showPagination = () => {
    if (
      !isLoading &&
      tutors?.data?.meta?.total >= tutors?.data?.meta?.perPage
    ) {
      return (
        <SearchPagination
          currentPage={tutors?.data?.meta?.currentPage}
          lastPage={tutors?.data?.meta?.lastPage}
          next={tutors?.data?.meta?.next}
          onClickPage={(index) => setPage(index)}
        />
      );
    }
  };

  useEffect(() => {
    // 👇️ scroll to top on page load
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [tutors?.data?.meta?.currentPage, router]);

  //sort: super tutors will come first
  let results = tutors?.data?.data;
  results?.sort((a, b) => b.is_super_tutor - a.is_super_tutor);
  return (
    <>
      <div className="container beforeSearchWrapper">
        <div className="row">
          <div className="col-12 col-sm-12 col-md-12 ">
            <div className="BeforeSearchHead">
              <h1>{tutor_subject}</h1>
              <p>
                Here are the <span>fully qualified and experienced</span>{" "}
                {subject_name} tutors who can help you, based on your search
              </p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-sm-12 col-md-4 ">
            <div className="filterSearchWrapper filterSearchWrapperNone">
              <FilterSearch />
            </div>
          </div>
          <div className="col-12 col-sm-12 col-md-8 ">
            <div className="searchresultWrapper">
              <div className="BeforeSearchWrap ">
                <h2>{tutors?.data?.meta?.total} Teachers Available</h2>
              </div>

              <div className="availableOrFilterWrap">
                <h2>{tutors?.data?.length} Teachers Available</h2>
                <div className="filterBtnWrap">
                  <a className="backText" onClick={() => setModalShow(true)}>
                    <Image className="filterIcon" src={Sliders} alt="" />
                  </a>
                </div>
              </div>

              {isLoading && (
                <div className="spinner-border text-light" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              )}

              {!!isSuccess &&
                results?.map((tutor, index) => (
                  <SearchItem
                    key={tutor?.id}
                    tutor={tutor}
                    favTeachers={tutors?.data?.fav_teachers}
                  />
                ))}

              {/*pagination*/}

              {showPagination()}
            </div>
          </div>
        </div>

        {faqs !== undefined && (
          <div style={{ marginTop: "50px" }}>
            <FAQs faqs={faqs} skipFilter={true} />
          </div>
        )}

        <StillRequire />

        {/*Pop Up Modal*/}
        <div className="popUpWrapperDate">
          <Modal
            show={modalShow}
            onHide={() => {
              setModalShow(false);
              setShowConfirmation(false);
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
                ></Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className="modelInnerCon">
                  <FilterSearch
                    onClickClearAll={() => setModalShow(false)}
                    onClickApplyFilter={() => setModalShow(false)}
                  />
                </div>
              </Modal.Body>
              <Modal.Footer></Modal.Footer>
            </div>
          </Modal>
        </div>
      </div>
    </>
  );
}
