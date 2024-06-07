import Image from "next/image";
import React, {useState} from "react";
import {useRouter} from "next/router";
import {LOCAL_STORAGE_KEY_REDIRECT_URL, PAGE_SIGNUP, ROLE_STUDENT} from "@/config/constants";
import {useMutation} from "react-query";
import {get} from "@/services/api/api";
import ModalLayout from "../common/ModalLayout";
import useUser from "@/hooks/userUser";
import ArrowRight from '@/components/pages/logIn/assets/ArrowRight.svg';
import {showToast} from "@/utils/toastUtils";

export default function JoiningGroup() {
    const [modalShow, setModalShow] = React.useState(false);
    const [popupMessage, setPopupMessage] = useState(null)
    const router = useRouter()
    const auth_token = router?.query?.auth_token
    const { user } = useUser();


    const joinMutation = useMutation(
        async (data) => await get(`/booking/teacher/join-group?auth_token=${auth_token}&student_id=${user?.id}`),
        {
            onSuccess: (res) => {
                router.replace(res?.data?.payment_url)
            },
            onError: (err) => {
                const code = err?.response?.status;
                if (code === 400 && err?.response?.data?.message) {
                    showToast("error", err?.response?.data?.message)
                }
            },
        }
    );

    const Join = () => {
        if (user && user.access_token === undefined) {
            setPopupMessage('To join, you need create an account')
            setModalShow(true);
            return;
        } else if (user && user.role !== ROLE_STUDENT) {
            return;
        }
        joinMutation.mutate();
    }

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-12 col-sm-12 col-md-12">
                        <div className="LoggedOutWrap">
                            <h1></h1>
                            <div className="btnWrap ">
                                <div className="createGroupBtnBox">
                                    <button className="wellComeBtn active" disabled={joinMutation.isLoading} onClick={Join}>
                                        {joinMutation.isLoading && <div className="spinner-border spinner-border-sm text-light" role="status">
                                            <span className="visually-hidden">Loading...</span>
                                        </div>}

                                        {!joinMutation.isLoading &&
                                            <>
                                                {"Join-Group"}
                                                <Image
                                                    className="signUpBtnArro"
                                                    priority
                                                    src={ArrowRight}
                                                    alt=""
                                                />
                                            </>
                                        }

                                    </button>

                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>`
            <ModalLayout
                modalShow={modalShow}
                message={popupMessage}
                onClickYes={() => {
                    window.localStorage.setItem(LOCAL_STORAGE_KEY_REDIRECT_URL, `${window?.location?.href}`);
                    router.replace(`${PAGE_SIGNUP}?redirect_url=${window?.location?.href}`)
                }}
                onClickCancel={() => setModalShow(false)}
            />
        </>
    )
}
