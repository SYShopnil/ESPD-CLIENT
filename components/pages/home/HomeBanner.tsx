import ErrorMessage from "@/components/common/ErrorMessage";
import { PAGE_SEARCH_RESULT } from "@/config/constants";
import { getUniqueItemsByKey } from "@/utils/utils";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";
import Select from "react-select";
import MagnifyingGlass from "./assets/MagnifyingGlass.svg";
import Vector from "./assets/Vector.svg";
import heroimg from "./assets/hero-img.jpg";
import ReactPlayer from "react-player";
import Link from "next/link";

export default function HomeBanner({ subjects, setting }) {
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [error, setError] = useState("");
  const router = useRouter();

  const subject_options = subjects?.map((subject) => ({
    value: subject?.id,
    label: subject?.name,
  }));

  let level_options = [];
  if (selectedSubject) {
    const subject_details = subjects.find(
      (i) => i.id === selectedSubject.value
    );
    level_options = subject_details?.SubjectOnLevel?.map((item) => ({
      value: item.Level?.id,
      label: item?.Level?.name,
    }));
    level_options = getUniqueItemsByKey(level_options, "value");
  }

  const onClickSearch = () => {
    if (selectedSubject === null) {
      setError("Please select a subject");
      return; //TODO show error under select box
    }
    const tutorSubject =
      selectedSubject?.label.toLowerCase().split(" ").length > 1
        ? selectedSubject?.label.toLowerCase().split(" ").join("-")
        : selectedSubject?.label.toLowerCase();
    console.log({ tutorSubject });
    let url = `${PAGE_SEARCH_RESULT}/online-${tutorSubject}-tutors?subject_id=${selectedSubject.value}&subject_name=${selectedSubject.label}`;
    if (selectedLevel) {
      url += `&level_id=${selectedLevel.value}`;
    }
    console.log({ url });
    router.push(url);
  };

  const home_hero_image = setting?.find(
    (item) => item.key === "home_hero_image"
  );
  const home_hero_desc = setting?.find((item) => item.key === "home_hero_desc");
  const home_desc = setting?.find((item) => item?.key === "home_hero_desc");
  const home_title = setting?.find((item) => item?.key === "home_hero_title");
  return (
    <>
      <div className="container homeBannerWrapperBox">
        <div className="row">
          <div className="col-12">
            <div className="homeBannerWrapper">
              <div className="textTitleCon">
                <div>
                  <div className="titleText">
                    Unlock Your Full Potential with
                    <span>
                      <div className="parentBox">
                        <span className="parentText">Personalised Online</span>
                        <Image className="Vector" src={Vector} alt="" />
                      </div>
                    </span>
                    Tutoring
                  </div>
                </div>
                <p className="titleSubText">{home_hero_desc?.value}</p>
                <div className="searchBoxHero">
                  <h3 className="searchTitle">Find Your Perfect Tutor</h3>
                  <div className="searchBox">
                    <div className="searchInnerBox">
                      <div className="levelCon custom-select">
                        <Select
                          classNamePrefix="espd-select"
                          isSearchable
                          isClearable
                          options={subject_options}
                          onChange={(value, triggeredAction) => {
                            setSelectedSubject(value);
                            setError("");
                            if (triggeredAction.action === "clear") {
                              setSelectedLevel(null);
                            }
                          }}
                          menuPlacement="top"
                          placeholder="Enter your Subject"
                        />
                        {!!(error !== "") && <ErrorMessage text={error} />}
                      </div>
                      <div className="levelCon custom-select outBorderRadius">
                        <Select
                          classNamePrefix="espd-select"
                          isSearchable
                          isClearable
                          options={level_options}
                          onChange={(value) => setSelectedLevel(value)}
                          menuPlacement="top"
                          placeholder="Select Level"
                        />
                      </div>
                    </div>

                    <div className="searchBtnBox">
                      <button onClick={onClickSearch} className="searchBtnSet">
                        <Image
                          className="MagnifyingGlass"
                          src={MagnifyingGlass}
                          alt=""
                        />
                        <p className="levelText">Search</p>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="imgCon">
                <div className="heroImg banner">
                  <Link
                    href="https://www.youtube.com/watch?v=EYzcWeLZHRc"
                    target="_blank"
                  >
                    <video className="" width={560} autoPlay muted loop>
                      <source
                        src="/videos/Feb 2024 intro FOR WEBSITE.mp4?autoplay"
                        type="video/mp4"
                      />
                    </video>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
