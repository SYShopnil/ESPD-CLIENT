import Head from "next/head";
import Image from "next/image";
import Header from "@/components/pages/home/Header";
import HomeBanner from "@/components/pages/home/HomeBanner";
import Count from "@/components/pages/home/Count";
import Subject from "@/components/pages/home/Subject";
import Excellence from "@/components/pages/home/Excellence";
import Appreciation from "@/components/pages/home/Appreciation";
import FAQs from "@/components/pages/home/FAQs";
import Discover from "@/components/pages/home/Discover";
import Footer from "@/components/pages/home/Footer";

import InfiniteScroll from "react-infinite-scroll-component";
import { useEffect, useRef, useState } from "react";
// import { Inter } signUpFrom '@next/font/google'
import { API_URL } from "@/config/config";
import styles from "@/styles/Home.module.css";
import { useQuery } from "react-query";

import { get } from "@/services/api/api";
import { API_GET_HOME } from "@/services/api/endpoints";
import StillRequire from "@/components/pages/BookingOption/StillRequire";

const META_CONTENT =
  "Welcome to ESPD, an Expert Online Tuition Service based in the UK. Offering Fully Qualified and Experienced Tutors who empower Primary, 11+, Secondary, GCSE and A Level students. Fully DBS Background Checked. Find an Online Tutor today.";
const TITTLE = "ESPD: Online Tutoring - Fully Qualified 1:1 Tuition Services";

export default function Home() {
  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["homeData"],
    queryFn: () => get(API_GET_HOME),
  });

  return (
    <>
      <Head>
        <title>{TITTLE}</title>
        <meta name="description" content={META_CONTENT} />
      </Head>
      <div className="mainWrapperSet">
        <Header />
        <HomeBanner
          subjects={data?.data?.subjects}
          setting={data?.data?.setting}
        />
        <Count />
        <Subject subjects={data?.data?.subjects} />
        <Excellence feature={data?.data?.feature} />
        <Appreciation testimonials={data?.data?.testimonials} />
        <FAQs isHomePage={true} faqs={data?.data?.faqs} skipFilter={false} />
        <StillRequire />
        <Footer />
      </div>
    </>
  );
}
