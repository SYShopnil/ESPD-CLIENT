import { get } from "@/services/api/api";
import { API_GET_HOME } from "@/services/api/endpoints";
import React from "react";
import { useQuery } from "react-query";

export default function Footer() {
    const { isLoading, isError, error, data } = useQuery({
        queryKey: ['homeData'],
        queryFn: () => get(API_GET_HOME)
    });

    const settings: any = {};

    data?.data?.setting?.map(item => {
        settings[item?.key] = item?.value
    });
    return (
        <>
            <div className="footerWrapper">
                <div className="signUpFooter">
                    <p className="textLineFooter">Need help? Call us at  <span><a className="numberFooter" href={`tel:${settings?.phone || ''}`}>{settings?.phone || ''}</a></span> or <span><a className="numberFooter"
                        href={`mailto:${settings?.email || ''}`}>Email us</a></span></p>
                </div>
            </div>
        </>
    )
}
