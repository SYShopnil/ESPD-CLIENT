import Image from "next/image";
import React from "react";
import phoneGray from "./assets/phoneGray.svg";
import email from "./assets/email.svg";
import instagram from "./assets/instagram.svg";
import youtube from "./assets/youtube.svg";
import facebook from "./assets/facebook.svg";
import LogoFooter from "./assets/LogoFooter.svg";
import TiktokLogo from "./assets/TiktokLogo.svg";
import Link from "next/link";
import {
  PAGE_RESOURCES,
  PAGE_SEARCH_RESULT,
  PAGE_WORK_AT_ESPD,
  PRIVACY_POLICY,
  TERMS_CONDITION,
} from "@/config/constants";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { API_GET_HOME } from "@/services/api/endpoints";
import { get } from "@/services/api/api";
import logo from "@/components/pages/home/assets/logo.png";

export default function Footer() {
  const router = useRouter();
  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["homeData"],
    queryFn: () => get(API_GET_HOME),
  });

  const subjects = data?.data?.subjects;
  const popularSubjects = subjects?.filter((subject) => subject.is_popular);

  const currentYear = new Date().getFullYear();

  const settings: any = {};

  data?.data?.setting?.map((item) => {
    settings[item?.key] = item?.value;
  });

  return (
    <>
      <div className="footerMain">
        <div className="container footerWrapper">
          <div className="row">
            <div className="col-12">
              <Link href="/">
                <Image
                  className="footerLogo"
                  priority
                  src={logo}
                  width={160}
                  alt="ESPD"
                />
              </Link>
            </div>
          </div>
          <div className="row">
            <div className="col-12 col-sm-12 col-md-3">
              <div className="espdDes">
                <p className="footerDes">{settings?.desc || ""}</p>
                <h3 className="footerContaText">Contact Us</h3>

                <a
                  href={`tel:${settings?.phone || ""}`}
                  className="footerContaConLink"
                >
                  <div className="footerContaCon">
                    <Image
                      className="PhoneCall"
                      priority
                      src={phoneGray}
                      alt=""
                    />
                    <p>{settings?.phone || ""}</p>
                  </div>
                </a>

                <a
                  href={`mailto:${settings?.email || ""}`}
                  className="footerContaConLink"
                >
                  <div className="footerContaCon">
                    <Image className="PhoneCall" priority src={email} alt="" />
                    <p>{settings?.email || ""}</p>
                  </div>
                </a>

                <div className="footerSocialIconCon">
                  <Link target="_blank" href={settings?.instagram || ""}>
                    <Image className="" priority src={instagram} alt="" />
                  </Link>

                  <Link target="_blank" href={settings?.youtube || ""}>
                    <Image className="" priority src={youtube} alt="" />
                  </Link>
                  <Link target="_blank" href={settings?.facebook || ""}>
                    <Image className="" priority src={facebook} alt="" />
                  </Link>
                  <Link target="_blank" href={settings?.tiktok || ""}>
                    <Image priority src={TiktokLogo} alt="" />
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-12 col-sm-12 col-md-3">
              <div className="footer2nd">
                <h3 className="footerHeading">Popular Subjects</h3>
                <div className="footerSubCon">
                  {popularSubjects?.map((subject) => {
                    return (
                      <div key={subject?.id}>
                        <Link
                          onClick={(e) => {
                            e.preventDefault();
                            router.push(
                              `${PAGE_SEARCH_RESULT}?subject_name=${subject?.name}&subject_id=${subject?.id}`
                            );
                          }}
                          href={"#"}
                        >
                          {subject.name}
                        </Link>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="col-12 col-sm-12 col-md-2">
              <div className="footer3rd">
                <h3 className="footerHeading">Important Links</h3>
                <div className="footerLinkCon">
                  <div>
                    <Link href={PAGE_WORK_AT_ESPD}>Work at ESPD</Link>
                  </div>
                  <div>
                    <Link href={PAGE_RESOURCES}>Free Resources</Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-sm-12 col-md-4">
              <div className="footer4th">
                <h3 className="footerHeading">Subscribe for Newsletter</h3>
                <div className="footerSearchBox">
                  <input className="footerSearchInput" placeholder="Email" />
                  <Link className="footerSearchBtnSet" href="#">
                    <div className="footerSearchBtnBox">
                      <p className="levelText">Subscribe Now</p>
                    </div>
                  </Link>
                </div>

                <Link href={TERMS_CONDITION}>
                  <p className="underLinetext">Terms and Conditions</p>
                </Link>
                <Link href={PRIVACY_POLICY}>
                  <p className="underLinetext">Privacy Policy</p>
                </Link>

                <p className="underLineSubtext">
                  ESPD LTD is a registered company and our logo and business
                  name are trademarked
                </p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12 copyRow">
              <p className="levelText">
                © Copyright ESPD {currentYear}. All rights reserved.
              </p>

              <p className="levelText">
                Designed By&nbsp;
                <span>
                  <Link target="_blank" href={settings?.brand_url || ""}>
                    {settings?.brand_name || ""}
                  </Link>
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
