import React, { useState } from 'react';
import Modal from "react-bootstrap/Modal";
import FindTutorConfirmation from "./FindTutorConfirmation";
import FindTutorPopUpForm from "./FindTutorPopUpForm";
import Image from "next/image";
import Phone from "@/components/find-tutor-popup/Phone.svg";

function FindTutorPopup({ buttonClass }) {
    const [modalShow, setModalShow] = React.useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);

    return (
        <>
            <div className="findTutorMainWrap">
                <a className={buttonClass} href="#" onClick={(e) => {
                    e.preventDefault();
                    setModalShow(true);
                }}>
                    <Image
                        className="User"
                        priority
                        src={Phone}
                        alt=""
                    />
                    Find me a tutor
                </a>
                <Modal

                    show={modalShow}
                    onHide={() => {
                        setModalShow(false)
                        setShowConfirmation(false)

                    }}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <div className="findTutorPopWrap">
                        <Modal.Header closeButton>
                            <Modal.Title id="contained-modal-title-vcenter" className="modelTitle">

                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div className="modelInnerCon">
                                {showConfirmation
                                    ?
                                    <FindTutorConfirmation />
                                    :
                                    <FindTutorPopUpForm setShowConfirmation={setShowConfirmation} />

                                }
                            </div>
                        </Modal.Body>
                        <Modal.Footer>

                        </Modal.Footer>
                    </div>
                </Modal>
            </div>
        </>
    );
}

export default FindTutorPopup;
