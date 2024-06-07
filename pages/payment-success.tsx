import Image from "next/image";
import React from "react";
import logo from "../components/pages/signUp/assets/logo.svg";
import Link from "next/link";
import SuccessAlert from "@/components/SuccessAlert";
import Footer from "@/components/pages/home/Footer";
import { useQuery } from "react-query";
import { get } from "@/services/api/api";
import { API_GET_HOME } from "@/services/api/endpoints";
import PaymentLayout from "@/components/PaymentLayout";
import Head from "next/head";
import Script from "next/script";


export default function PaymentSuccess() {

    const { isLoading, isError, error, data } = useQuery({
        queryKey: ['homeData'],
        queryFn: () => get(API_GET_HOME)
    });

    const content = <div className="content">
        <p>
            Please check your dashboard for a link to the tutorial.
            <br />

            If this is a group tutorial, you should share the link now from the dashboard.
            <br />

            Thank you for choosing ESPD.
            <br />

            We look forward to supporting you with your exam success goals.

        </p>
    </div>;


    return (
        <>
            <PaymentLayout>
                <SuccessAlert
                    isSuccess={true}
                    message={'Congratulations, your tutorial has been booked!'}
                    shouldGoToDashboard={true}
                    content={content}
                />
            </PaymentLayout>
            {/* <div className="otpVerificationWrapper">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="otpBrandIcon">
                                <Link href="/">
                                    <Image
                                        className="logo"
                                        src={logo}
                                        alt=""
                                    />
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <div className="otpMiddleWrap">
                                 <SuccessAlert
                                     isSuccess={true}
                                     message={'Payment successful'}
                                     shouldGoToDashboard={true}
                                 />
                            </div>
                        </div>
                    </div>
                </div>
                <Footer subjects={data?.data?.subjects} setting={data?.data?.setting} />
            </div> */}
        </>
    );
}
