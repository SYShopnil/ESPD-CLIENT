import React, {useState} from 'react';
import Modal from "react-bootstrap/Modal";
import SignupForm from "./SignupForm";
import SignInForm from "@/components/auth-modal/SignInForm";
import OtpVerify from "@/components/auth-modal/OtpVerify";

const AuthModal = ({ modalShow, onClickCancel, action, onLoginSuccess }) => {

    const [currentForm, setCurrenForm] = useState('signup');

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

                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="formWrapperMain">
                        <div className="formWrapperSet">
                            {!!(currentForm === 'signup') &&
                                <SignupForm
                                  action={action}
                                  onClickSignin={() => setCurrenForm('signin')}
                                  onSendOtpSuccess={() => setCurrenForm('otp')}
                                />
                            }
                            {!!(currentForm === 'signin') &&
                                <SignInForm
                                  action={action}
                                  onLoginSuccess={onLoginSuccess}
                                  onClickSignup={() => setCurrenForm('signup')}
                                />
                            }
                            {!!(currentForm === 'otp') &&
                                <OtpVerify
                                  onLoginSuccess={onLoginSuccess}
                                  onClickSignup={() => setCurrenForm('signup')}
                                />
                            }
                        </div>
                    </div>
                </Modal.Body>
            </div>
        </Modal>
    );
};

export default AuthModal;
