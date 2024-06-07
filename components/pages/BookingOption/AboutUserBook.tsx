import React, { useState } from "react";
import { useRouter } from "next/router";
import ReviewOnDetailPage from "./ReviewOnDetailPage";
import ReviewPopup from "@/components/review-popup";
import { getUniqueSubjectOffered } from "@/utils/utils";

export default function AboutUserBook({ tutor }) {
  // pop up
  const [modalShow, setModalShow] = useState(false);
  const [showFullText, setShowFullText] = useState(false);

  const router = useRouter();
  const { id } = router.query;

  const onClickReadMore = () => {
    setModalShow(true);
  };

  const toggleReadMore = (e) => {
    e.preventDefault();
    setShowFullText(!showFullText);
  };

  const uniqueSubjects = getUniqueSubjectOffered(tutor?.SubjectOffered);

  return (
    <>
      <div className="aboutUserBookWrapper">
        <div className="aboutBox">
          <h2>
            About {tutor?.first_name} {tutor?.last_name}
          </h2>
          {!showFullText && (
            <p
              dangerouslySetInnerHTML={{
                __html: tutor?.description?.slice(0, 400),
              }}
            ></p>
          )}
          {showFullText && (
            <p dangerouslySetInnerHTML={{ __html: tutor?.description }}></p>
          )}

          {!!(tutor?.description?.length > 399) && (
            <a className="readMoreBtn" onClick={toggleReadMore}>
              {`${showFullText ? "Read Less" : "Read More"}`}
            </a>
          )}
        </div>

        <div className="subjectBox">
          <h2>Subjects Offered</h2>
          <div className="subjectTitle">
            <table>
              {/*https://stackoverflow.com/a/54535317*/}
              <tbody>
                <tr>
                  <td>
                    <p>Subject</p>
                  </td>
                  <td>
                    <p>Levels Taught</p>
                  </td>
                </tr>
                {!tutor?.SubjectOffered ? (
                  <></>
                ) : (
                  uniqueSubjects?.map((item) => {
                    // tutor?.SubjectOffered?.map(item => {
                    return (
                      <>
                        <tr key={item?.id}>
                          <td>{item?.name}</td>
                          <td>{item?.level}</td>
                        </tr>
                      </>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
        <div className="subjectBox">
          <h2>Exam Boards</h2>
          <div className="examBoardInner">
            {!tutor?.ExamBoardOnTeacher ? (
              <></>
            ) : (
              tutor?.ExamBoardOnTeacher?.map((item) => {
                return (
                  <div key={item?.id} className="examBoardimg">
                    <img
                      style={{ height: 30 }}
                      className="image33"
                      src={item?.logo}
                      alt={item?.name}
                    />
                  </div>
                );
              })
            )}
          </div>
        </div>
        {/*Qualifacations */}
        <div className="subjectBox">
          <h2>Qualifications</h2>
          <div className="subjectTitle">
            <table>
              <tbody>
                <tr>
                  <td>
                    <p>Subject</p>
                  </td>
                  <td>
                    <p>Degree</p>
                  </td>
                </tr>
                {!tutor?.Qualification ? (
                  <></>
                ) : (
                  tutor?.Qualification?.map((item) => {
                    return (
                      <>
                        <tr>
                          <td>{item?.subject}</td>
                          <td>{item?.degree}</td>
                        </tr>
                      </>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
        {/*Review */}
        <div className="subjectBox">
          <h2>Reviews ({tutor?.Review?.length})</h2>
          <div className="reviewWrap">
            {/*<>
                            <div className="reviewInnerBox">
                                <div className="reviewUserhead">
                                    <div className="reviewUserImg">
                                        <a href="#">
                                            <img
                                                className="reviewUser"
                                                src={tutor?.Review[0]?.profile_photo}
                                                alt={tutor?.Review[0]?.first_name}
                                            />
                                        </a>
                                    </div>
                                    <div className="reviewUserCon">
                                        <a href="#"><h1>{tutor?.Review[0]?.first_name} {tutor?.Review[0]?.last_name}</h1></a>
                                        <p>{tutor?.Review[0]?.date}</p>
                                        <div className="reviewStarBox">
                                            <Image
                                                className="reviewUserStar"
                                                priority
                                                src={Star}
                                                alt=""
                                            />
                                            <p>{tutor?.Review[0]?.rating}.0</p>
                                        </div>
                                    </div>
                                </div>
                                <p className="reviewUserDes">“{tutor?.Review[0]?.desc}”</p>
                            </div>

                            <div className="reviewInnerBox">
                                <div className="reviewUserhead">
                                    <div className="reviewUserImg">
                                        <a href="#">
                                            <img
                                                className="reviewUser"
                                                src={tutor?.Review[1]?.profile_photo}
                                                alt={tutor?.Review[1]?.first_name}
                                            />
                                        </a>
                                    </div>
                                    <div className="reviewUserCon">
                                        <a href="#"><h1>{tutor?.Review[1]?.first_name} {tutor?.Review[1]?.last_name}</h1></a>
                                        <p>{tutor?.Review[1]?.date}</p>
                                        <div className="reviewStarBox">
                                            <Image
                                                className="reviewUserStar"
                                                priority
                                                src={Star}
                                                alt=""
                                            />
                                            <p>{tutor?.Review[1]?.rating}.0</p>
                                        </div>
                                    </div>
                                </div>
                                <p className="reviewUserDes">“{tutor?.Review[1]?.desc}”</p>
                            </div>
                        </>*/}

            {/* <div className="reviewInnerBox">
                            <div className="reviewUserhead">
                                <div className="reviewUserImg">
                                    <a href="#">
                                        <Image
                                            className="reviewUser"
                                            priority
                                            src={user}
                                            alt=""
                                        />
                                    </a>
                                </div>
                                <div className="reviewUserCon">
                                    <a href="#"><h1>Lucy</h1></a>
                                    <p>March 2020</p>
                                    <div className="reviewStarBox">
                                        <Image
                                            className="reviewUserStar"
                                            priority
                                            src={Star}
                                            alt=""
                                        />
                                        <p>5.0</p>
                                    </div>
                                </div>
                            </div>
                            <p className="reviewUserDes">“From covering new content to prepping for exams, my teacher was great at providing a variety of resources to fill the gaps in our knowledge.
                                Above all, he is a committed teacher who strives to instil his students with enthusiasm and ambition,
                                qualities which remain important beyond your time in education.”</p>
                        </div> */}

            {tutor?.Review?.slice(0, 2).map((item) => {
              return <ReviewOnDetailPage review={item} key={item.first_name} />;
            })}
          </div>

          {tutor?.Review?.length > 2 ? (
            <a className="readMoreBtn" onClick={onClickReadMore}>
              Read More
            </a>
          ) : (
            ""
          )}
        </div>

        {/*Review Pop up Modal*/}

        <ReviewPopup
          tutor={tutor}
          modalShow={modalShow}
          setModalShow={setModalShow}
        />
      </div>
    </>
  );
}
