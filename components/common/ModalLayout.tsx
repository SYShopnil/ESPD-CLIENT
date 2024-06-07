import React, { Children } from 'react';
import Modal from "react-bootstrap/Modal";
import Button from 'react-bootstrap/Button';
import ConfirmationModal from './ConfirmationModal';
import SignUpPopUp from '../pages/BookingOption/SignUpPopUp';

const ModalLayout = ({ modalShow, onClickCancel, onClickYes, message }) => {

    return (
        <Modal

            show={modalShow}
            onHide={onClickCancel}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <div className="findTutorPopWrap">
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter" className="modelTitle">
                        {message}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="modelInnerCon">
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={onClickCancel}>
                        Cancel
                    </Button>
                    <button className={'btn-main'} onClick={onClickYes}>
                        Create account
                    </button>
                </Modal.Footer>
            </div>
            {/*<SignUpPopUp />*/}
        </Modal>
    );
};

export default ModalLayout;
