import Image from "next/image";
import React, { useState } from "react";
import Header from "@/components/pages/home/Header";
import { useQuery } from "react-query";
import { get } from "@/services/api/api";
import { API_GET_HOME } from "@/services/api/endpoints";
import Footer from "@/components/pages/home/Footer";
import EspdBanner from "@/components/pages/work-espd/EspdBanner";
import WhyEspd from "@/components/pages/work-espd/WhyEspd";
import EspdBannerFree from "@/components/pages/work-espd/EspdBannerFree";
import EspdBannerLeftImg from "@/components/pages/work-espd/EspdBannerLeftImg";
import FAQs from "@/components/pages/home/FAQs";
import DiscoverNextLevel from "@/components/pages/work-espd/DiscoverNextLevel";
import Head from "next/head";

export default function WorkEspd() {
  const { isLoading, isError, error, data } = useQuery({
    queryKey: ['homeDataAtWorkAtEspd'],
    queryFn: () => get(API_GET_HOME)
  });

  const work_espd_body_features = data?.data?.feature?.filter(item => item?.location === "work_at_espd_body")
  const setting = data?.data?.setting

  // console.log(work_espd_body_features[0])

  return (
    <>
      <Head>
        <title>Work at ESPD | ESPD </title>
      </Head>

      <div className="workEspdWrapper">
        <Header subjects={data?.data?.subjects} />
        <div className="workEspdWrap">
          <EspdBanner setting={setting} />
          <WhyEspd feature={data?.data?.feature} />
          <EspdBannerFree feature={work_espd_body_features ? work_espd_body_features[0] : []} />
          <EspdBannerLeftImg feature={work_espd_body_features ? work_espd_body_features[1] : []} />
          {/* <EspdBannerFree feature={work_espd_body_features ? work_espd_body_features[2] : []} /> */}
          <FAQs faqs={data?.data?.faqs} />
          <DiscoverNextLevel />
        </div>
        <Footer subjects={data?.data?.subjects} />
      </div>
    </>
  );
}


