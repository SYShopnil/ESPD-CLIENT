import React from "react";
import { useRouter } from "next/router";

import Header from "@/components/pages/home/Header";
import Footer from "@/components/pages/home/Footer";
import UserBookoption from "@/components/pages/BookingOption/UserBookoption";
import AboutUserBook from "@/components/pages/BookingOption/AboutUserBook";
import StillRequire from "@/components/pages/BookingOption/StillRequire";
import { useQuery } from "react-query";
import { API_GET_TIME_SLOTS, API_GET_TUTOR } from "@/services/api/endpoints";
import { get } from "@/services/api/api";
import Head from "next/head";
import { TEACHER_META_TAGS } from "@/config/constants";

export default function BookingOption({ meta, desc }) {
  const router = useRouter();
  const teacherId = router.query?.id;
  const {
    isLoading,
    isError,
    error,
    data: tutor,
  } = useQuery({
    queryKey: ["singleTutorData", teacherId],
    queryFn: () => get(`${API_GET_TUTOR}/${teacherId}`),
    enabled: !!teacherId,
  });
  const { data: timeslots } = useQuery({
    queryKey: ["timeslots", teacherId],
    queryFn: () => get(`${API_GET_TIME_SLOTS}?id=${teacherId}`),
    enabled: !!teacherId,
  });

  return (
    <>
      <Head>
        <title>{meta}</title>
        <meta name="description" content={desc} />
      </Head>
      <div className="bookingOptionwrapper">
        <Header />
        <div className="bookingMiddleWrap">
          <div className="container">
            <div className="row">
              <div className="col-12 col-md-6 col-sm-12">
                <div>
                  <UserBookoption
                    tutor={tutor?.data}
                    timeslots={timeslots?.data}
                  />
                </div>
              </div>
              <div className="col-12 col-md-6 col-sm-12">
                <div>
                  <AboutUserBook tutor={tutor?.data} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <StillRequire />
        </div>
        <Footer />
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const teacherId = Number(context?.query?.id);

  let head = {
    meta: "",
    desc: "",
  };
  TEACHER_META_TAGS.forEach((teacher) => {
    // console.log({ teacher, params: teacherId });
    if (teacherId && teacher.teacher_id == +teacherId) {
      head.desc = teacher.meta_desc;
      head.meta = teacher.meta_title;
    }
  });

  return {
    props: head,
  };
}
