import Modal from "react-bootstrap/Modal";
import React, { useState } from "react";

export default function WriteReviewConfirmationPopUp({showWriteReviewConfirmationModal, setShowWriteReviewConfirmationModal}) {


    return (
        <>
            <Modal
                show={showWriteReviewConfirmationModal}
                onHide={() => {
                    setShowWriteReviewConfirmationModal(false)
                }}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <div className="findTutorPopWrap findTutorPopWrapShare">
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter" className="modelTitle">

                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="write-pop-up-wrapper">
                            <h1>Thank You for sharing your feedback!</h1>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>

                    </Modal.Footer>
                </div>
            </Modal>
        </>
    )
}
