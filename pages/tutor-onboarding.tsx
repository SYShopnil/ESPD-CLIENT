import Image from "next/image";
import React, { useState } from "react";
import logo from "../components/pages/signUp/assets/logo.png";
import backVector from "../components/pages/teacherOnboarding/assets/ArrowLeft.svg";
import teacherIcon from "../components/pages/teacherOnboarding/assets/nav-content_right.svg";
import QTC from "@/components/pages/teacherOnboarding/QTC";
import Experience from "@/components/pages/teacherOnboarding/Experience";
import DBC from "@/components/pages/teacherOnboarding/DBC";
import PersonalDetails from "@/components/pages/teacherOnboarding/PersonalDetails";
import Link from "next/link";
import TeacherOnSuccess from "@/components/pages/teacherOnboarding/TeacherOnSuccess";
import Head from "next/head";
import { useQuery } from "react-query";
import { API_GET_HOME } from "@/services/api/endpoints";
import { get } from "@/services/api/api";

export default function TutorOnboarding() {
  const [step, setStep] = useState(1);
  const [qtsConferred, setQtsConferred] = useState(null);
  const [dbsChecked, setDbsChecked] = useState(null);
  const [experiences, setExperinces] = useState([]);
  const [confirmation, setConfirmation] = useState(false);

  const { isLoading, isError, error, data } = useQuery({
    queryKey: ['homeDataAtWorkAtEspd'],
    queryFn: () => get(API_GET_HOME)
  });
  const setting = data?.data?.setting
  const phone = setting?.find(item => item.key === "phone")
  const email = setting?.find(item => item.key === "email")

  console.log({ phone })
  console.log({ email })
  return (
    <>
      <Head>
        <title>Work at ESPD | ESPD </title>
      </Head>
      <div className="teacherOnboardingWrapper">
        <div className="tutorOnHeaderWrap">
          <div>
            <Link href="/">
              <Image
                className="logo"
                src={logo}
                width={160}
                alt="" />
            </Link>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-12">
              {
                !confirmation ? (
                  <div className="teacherOnMiddle">
                    {step == 1 && (
                      <QTC
                        onClickNext={() => setStep(2)}
                        qtsConferred={qtsConferred}
                        setQtsConferred={setQtsConferred}
                      />
                    )}
                    {step == 2 && (
                      <Experience
                        onClickNext={() => { setStep(3) }}
                        experiences={experiences}
                        setExperinces={setExperinces}
                        onClickPrevious={() => setStep(1)}
                      />
                    )}
                    {step == 3 && (
                      <DBC
                        onClickNext={() => setStep(4)}
                        onClickPrevious={() => setStep(2)}
                        dbsChecked={dbsChecked}
                        setDbsChecked={setDbsChecked}
                      />
                    )}
                    {step == 4 && (
                      <PersonalDetails
                        onClickPrevious={() => setStep(3)}
                        qtsConferred={qtsConferred}
                        dbsChecked={dbsChecked}
                        experiences={experiences}
                        setConfirmation={setConfirmation}
                      />
                    )}
                  </div>
                )
                  :
                  <div className="teacherOnMiddle">
                    <TeacherOnSuccess />
                  </div>
              }

            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <div className="signUpFooter">
                <p className="textLineFooter">
                  Need help? Call us at{" "}
                  <span>
                    <a className="numberFooter" href={`tel:${phone?.value || ''}`}>
                      {phone?.value}
                    </a>
                  </span>{" "}
                  or{" "}
                  <span>
                    <a className="numberFooter" href={`mailto:${email?.value || ''}`}>
                      Email us
                    </a>
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
