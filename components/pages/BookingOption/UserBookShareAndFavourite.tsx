import React, {useState} from 'react';

import Image from 'next/image';
import share from "./assets/share.svg";
import Heart from "./assets/Heart.svg";
import HeartFilled from "./assets/HeartFilled.svg";
import {showToast} from '@/utils/toastUtils';
import {useMutation} from 'react-query';
import {ROLE_STUDENT} from '@/config/constants';
import {API_POST_FAVOURITE} from '@/services/api/endpoints';
import {post} from '@/services/api/api';
import SharePopup from '@/components/share-popup';
import AuthModal from '@/components/auth-modal/AuthModal';

const UserBookShareAndFavourite = ({ user, teacherId, isFavorite }) => {
    const [showShareModal, setShowShareModal] = useState(false);
    const [currentPageUrl, setCurrentPageUrl] = useState('');
    const [isTutorFavourite, setIsTutorFavourite] = useState(false);
    const [loginModalVisible, setLoginModalVisible] = React.useState(false);

    const favouriteMutation = useMutation(
        async (data) => await post(API_POST_FAVOURITE, data),
        {
            onSuccess: (res) => {
                setIsTutorFavourite(true);
                setLoginModalVisible(false);
                showToast("success", "added to favourite")
                window.location.reload();
            },
            onError: (err) => {
                showToast("error", "error occured")
            },
        }
    );

    const callFavoriteMutation = (student_id) => {
        favouriteMutation.mutate({
            teacher_id: teacherId,
            student_id: student_id
        })
    }

    const onClickFavourite = () => {
        if (user && user.access_token === undefined) {
            setLoginModalVisible(true);
            return;
        } else if (user && user.role !== ROLE_STUDENT) {
            return;
        }

        callFavoriteMutation(user?.id)
    }

    return (
        <>
            <div className="getLinkBox">
                <a className="getLinkBtn" href={'#'}
                    onClick={(e) => {
                        e.preventDefault();
                        setShowShareModal(true);
                        setCurrentPageUrl(window?.location?.href)
                    }}>
                    <Image
                        className="commonImg"
                        priority
                        src={share}
                        alt=""
                    />
                    Share
                </a>
                <a className="getLinkBtn" onClick={onClickFavourite} >
                    <Image
                        className="commonImg"
                        priority
                        src={isTutorFavourite || isFavorite ? HeartFilled : Heart}
                        alt=""
                    />
                    {isTutorFavourite || isFavorite ? 'Saved' : 'Save'}
                </a>
            </div>
            {/*Share Pop Up*/}

            <SharePopup
                showShareModal={showShareModal}
                setShowShareModal={setShowShareModal}
                currentPageUrl={currentPageUrl}
            />

            {/* Go to log in page modal  */}

            <AuthModal
                action={'save profile'}
                modalShow={loginModalVisible}
                onClickCancel={() => setLoginModalVisible(false)}
                onLoginSuccess={(user_data) => callFavoriteMutation(user_data?.id)}
            />
        </>
    );
};

export default UserBookShareAndFavourite;
