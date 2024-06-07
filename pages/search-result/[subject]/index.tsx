import React from "react";
import Header from "@/components/pages/home/Header";
import Footer from "@/components/pages/home/Footer";
import AfterSearch from "@/components/pages/search-result/AfterSearch";
import Image from "next/image";
import backVector from "@/components/pages/logInSignUpHeader/assets/backVector.svg";
import Link from "next/link";
import { OLD_LINK_METATAGS } from "@/config/constants";
import Head from "next/head";
import { FAQ } from "@/config/faqs";

export default function Search(props) {
  return (
    <>
      <Head>
        {props.meta_title ? (
          <title>{props.meta_title}</title>
        ) : (
          <title>
            {props?.subject_name}
            {props?.subject_name ? " tutors |" : ""} ESPD{" "}
          </title>
        )}
        {props.meta_desc && (
          <meta name="description" content={props.meta_desc} />
        )}
      </Head>

      <div className="searchWrapperSet">
        <Header />
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="backHomeBox">
                <Link href="/">
                  <div className="signUpBack">
                    <Image className="backVector" src={backVector} alt="" />
                    <p className="backText">Back to Home</p>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <AfterSearch faqs={props.faqs} tutor_subject={props.tutor_subject} />
        <Footer />
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const props: any = {
    subject_name: context?.query?.subject_name || null,
  };
  //get meta tag values based on subject id
  const subject_id = context?.query?.subject_id;
  const params_subject_name = context?.params?.subject;
  // console.log({ params_subject_name });
  if (subject_id) {
    const data = OLD_LINK_METATAGS.find((i) => {
      // console.log({ dataBase: i.subject_name, params: params_subject_name });
      return i.subject_id == subject_id;
    });
    const faqs = FAQ.find((i) => i.subject_id == subject_id);
    if (data) {
      props.meta_title = data.meta_title;
      props.meta_desc = data.meta_desc;
      props.tutor_subject = data.subjects;
    }
    // console.log(data);
    if (faqs) {
      props.faqs = faqs.faqs;
    }
  }

  return {
    props: props,
  };
}
