import Image from "next/image";
import React, { useState } from "react";
import MagnifyingGlassColor from "@/components/pages/studentProfile/assets/MagnifyingGlassColor.svg";
import MagnifyingGlassWhite from "@/components/pages/studentProfile/assets/MagnifyingGlassWhite.svg";
import ArrowRightWhite from "@/components/pages/studentProfile/assets/ArrowRightWhite.svg";
import PhoneColoured from "@/components/find-tutor-popup/Phone.svg";
import Phone from "@/components/find-tutor-popup/PhoneColoured.svg";
import Modal from "react-bootstrap/Modal";
import FindTutorPopup from "@/components/find-tutor-popup";
import Link from "next/link";
import { useRouter } from "next/router";
import { PAGE_LOGIN, ROLE_STUDENT, ROLE_TEACHER } from "@/config/constants";
import FindTutorConfirmation from "@/components/find-tutor-popup/FindTutorConfirmation";
import FindTutorPopUpForm from "@/components/find-tutor-popup/FindTutorPopUpForm";

export default function LoggedOut() {
    const [modalShow, setModalShow] = React.useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);

    const router = useRouter();
    const role = router?.query?.role

    console.log(role);
    const LOGIN_ROLE = role === ROLE_TEACHER ? ROLE_TEACHER : ROLE_STUDENT;

    if (role === undefined) return null;

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-12 col-sm-12 col-md-12">
                        <div className="LoggedOutWrap">
                            <h1>You have logged out!</h1>
                            <div className="btnWrap">
                                {(role && role === ROLE_STUDENT) &&
                                    <a href="#" className="wellComeBtn" onClick={(e) => {
                                        e.preventDefault();
                                        setModalShow(true);
                                    }}>
                                        <Image
                                            className="MagnifyingGlassColor"
                                            src={Phone}
                                            alt=""
                                        />
                                        <Image
                                            className="MagnifyingGlassWhite"
                                            src={PhoneColoured}
                                            alt=""
                                        />
                                        Find a Tutor
                                    </a>

                                }
                                <Link href={`${PAGE_LOGIN}?role=${LOGIN_ROLE}`} className="wellComeBtn active">
                                    Login
                                    <Image
                                        className="ArrowRightWhiteLog"
                                        src={ArrowRightWhite}
                                        alt=""
                                    />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

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
    )
}
