import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Image from "next/image";
import Star from "@/components/pages/BookingOption/assets/Star.svg";
import SingleReview from "./SingleReview";

function ReviewPopup({ tutor, modalShow, setModalShow }) {
  return (
    <>
      <div className="popUpWrapper reviewModelWrapPopUp">
        <Modal
          show={modalShow}
          onHide={() => setModalShow(false)}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          className="reviewModelWrapPopUp"
        >
          <Modal.Header closeButton>
            <Modal.Title
              id="contained-modal-title-vcenter"
              className="modelTitle"
            ></Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="modelInnerCon">
              <div className="reviewModelWrap">
                <h2>
                  {tutor?.first_name} {tutor?.last_name}
                </h2>
                <div className="reviewStarBox">
                  <Image
                    className="reviewUserStar"
                    priority
                    src={Star}
                    alt=""
                  />
                  <p>5.0 {`(${tutor?.Review?.length} Reviews)`}</p>
                </div>
                {tutor?.Review?.map((review) => (
                  <SingleReview key={review.id} review={review} />
                ))}
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer></Modal.Footer>
        </Modal>
      </div>
    </>
  );
}

export default ReviewPopup;
