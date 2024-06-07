import React, { useEffect, useState } from 'react'
import TeacherSignUpForm from '@/components/pages/signUp/TeacherSignUpForm'
import SignUpFrom from '@/components/pages/signUp/SignUpFrom'
import Header from "@/components/pages/logInSignUpHeader/Header";
import Footer from "@/components/pages/logInSignUpHeader/Footer";
import { useRouter } from 'next/router'
import { useQuery } from 'react-query';
import { get } from '@/services/api/api';
import { API_TEACHER_VALIDATE_REQUEST } from '@/services/api/endpoints';
import { ROLE_TEACHER } from '@/config/constants';

export default function TeacherSignUp() {
    const router = useRouter()
    const { token } = router.query;
    const endPoint = API_TEACHER_VALIDATE_REQUEST + "?token=" + token
    const { isLoading, error, data: response, isSuccess, isError } = useQuery({ queryKey: ["validateTeacher"], queryFn: () => get(endPoint), enabled: !!token, staleTime: 0 });

    let email;
    let role;


    if (isSuccess) {
        email = response.data?.work_email
    }

    

    if (!response?.success) {
        return <></>
    }
    
    // if (token === null || token === undefined) {
    //     // return <></>
    //    router.replace("/")
    // }

    return (
        <>
            <div className="signUpWrapperSet">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <Header />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <TeacherSignUpForm role={ROLE_TEACHER} email={email} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <Footer />
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}
