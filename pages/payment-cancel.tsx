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


export default function PaymentCancel() {

    const { isLoading, isError, error, data } = useQuery({
        queryKey: ['homeData'],
        queryFn: () => get(API_GET_HOME)
    });

    return (
        <>
            <PaymentLayout>
                <SuccessAlert
                    isSuccess={false}
                    message={'Payment unsuccessful'}
                    shouldGoToDashboard={true}
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
                                    isSuccess={false}
                                    message={'Payment unsuccessful'}
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
