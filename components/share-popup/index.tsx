import React, { useState } from 'react';
import Modal from "react-bootstrap/Modal";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import {
    FacebookShareButton,
    FacebookMessengerShareButton,
    WhatsappShareButton,
    EmailShareButton,
    FacebookMessengerIcon,
} from 'next-share'
import logos_facebook from "@/components/pages/home/assets/logos_facebook.png";
import Image from "next/image";
import Capa_1 from "@/components/pages/home/assets/Capa_1.svg";
import logos_whatsapp from "@/components/pages/home/assets/logos_whatsapp-icon.svg";
import logos_google from "@/components/pages/home/assets/logos_google-gmail.svg";



function SharePopup({ showShareModal, setShowShareModal, currentPageUrl }) {

    const popover = (
        <Popover id="popover-basic">
            {/* <Popover.Header as="h3">Popover right</Popover.Header> */}
            <Popover.Body>
                Copied to clipboard
            </Popover.Body>
        </Popover>
    );
    const messengerOnClick = (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        window.location.href =
            'fb-messenger://share?link=' +
            encodeURIComponent(currentPageUrl) +
            '&app_id=' +
            encodeURIComponent("")
    };

    return (
        <>
            <Modal
                show={showShareModal}
                onHide={() => {
                    setShowShareModal(false)
                }}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <div className="findTutorPopWrap findTutorPopWrapShare">
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter" className="modelTitle">
                            Share Link
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="socialIconDiv">
                            <div>
                                <Image
                                    className="Capa_1"
                                    priority
                                    src={Capa_1}
                                    alt=""
                                    onClick={messengerOnClick}
                                    style={{ cursor: "pointer" }}
                                />
                            </div>
                            <FacebookShareButton
                                url={currentPageUrl}>
                                <Image
                                    className="logos_facebook"
                                    priority
                                    src={logos_facebook}
                                    alt=""
                                />
                            </FacebookShareButton>

                            <WhatsappShareButton
                                url={currentPageUrl}
                                title={'next-share is a social share buttons for your next React apps.'}
                                separator=":: "
                            >
                                <Image
                                    className="logos_whatsapp"
                                    priority
                                    src={logos_whatsapp}
                                    alt=""
                                />
                            </WhatsappShareButton>

                            <EmailShareButton
                                url={currentPageUrl}
                                subject={"ESPD - The world is our classroom "}
                                body="Join ESPD today"
                                blankTarget={true}
                            >
                                <Image
                                    className="logos_google"
                                    priority
                                    src={logos_google}
                                    alt=""
                                />
                            </EmailShareButton>

                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <div className="sharePopUpFooterInner" >
                            <div className="footerSearchBox">
                                <input
                                    value={currentPageUrl}
                                    className="footerSearchInput"
                                />
                                <OverlayTrigger trigger="click" placement="top" overlay={popover}>
                                    <a className="footerSearchBtnSet" href="#" onClick={() => navigator.clipboard.writeText(currentPageUrl)} >
                                        <div className="footerSearchBtnBox">
                                            <p className="levelText">Copy</p>
                                        </div>
                                    </a>
                                </OverlayTrigger>
                            </div>
                        </div>
                    </Modal.Footer>
                </div>
            </Modal>
        </>
    );
}

export default SharePopup;
