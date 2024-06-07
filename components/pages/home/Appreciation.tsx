import React, { useState } from "react";
import Image from "next/image";
import arrowRight from "./assets/ArrowRight.svg";
import arrowLeft from "./assets/ArrowLeft.svg";
import dotUp from "./assets/dotUp.svg";
import dotDown from "./assets/dotDown.svg";
import userssvgrepocom from "./assets/users-svgrepo-com.svg";
import SingleTestimonial from "./SingleTestimonial";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const ButtonGroup = ({ next, previous, goToSlide, ...rest }: any) => {
  const {
    carouselState: { currentSlide },
  } = rest;
  return (
    <div className="arrowWrap">
      <a
        href="#"
        onClick={(e) => {
          e.preventDefault();
          previous();
        }}
      >
        <Image className="iconIcon" priority src={arrowLeft} alt="" />
      </a>
      <a
        href="#"
        onClick={(e) => {
          e.preventDefault();
          next();
        }}
      >
        <Image className="iconIcon" priority src={arrowRight} alt="" />
      </a>
    </div>
  );
};

export default function Appreciation({ testimonials }) {
  const [toggleState, setToggleState] = useState(1);

  const toggleTab = ({ index }: { index: any }) => {
    setToggleState(index);
  };

  const studentTestimonials = testimonials?.filter(
    (testimonial) => testimonial.is_student
  );
  const parentTestimonials = testimonials?.filter(
    (testimonial) => !testimonial.is_student
  );

  const testimonialType =
    toggleState === 1 ? studentTestimonials : parentTestimonials;

  return (
    <>
      <div className="container appreciationWrapper">
        <div className="row appreciationRow">
          <div className="col-12">
            <h3>Words of Appreciation: </h3>
            <h2>What Our Parents & Students Say About Us</h2>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="container">
              <div className="row appreciationRow">
                <div className="col-12">
                  <div className="appreciationButtonWrap">
                    <div
                      className={
                        toggleState === 1 ? "tabButton active" : "tabButton"
                      }
                      onClick={() => toggleTab({ index: 1 })}
                    >
                      <p>Students</p>
                    </div>
                    <div
                      className={
                        toggleState === 2 ? "tabButton active" : "tabButton"
                      }
                      onClick={() => toggleTab({ index: 2 })}
                    >
                      <p>Parents</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <Carousel
                    additionalTransfrom={0}
                    arrows={false}
                    autoPlaySpeed={3000}
                    centerMode={false}
                    className=""
                    containerClass="container-padding-bottom"
                    customButtonGroup={<ButtonGroup />}
                    dotListClass=""
                    draggable
                    focusOnSelect={false}
                    infinite={false}
                    itemClass=""
                    keyBoardControl
                    minimumTouchDrag={80}
                    pauseOnHover
                    renderArrowsWhenDisabled={false}
                    renderButtonGroupOutside
                    renderDotsOutside={false}
                    responsive={{
                      desktop: {
                        breakpoint: {
                          max: 3000,
                          min: 1024,
                        },
                        items: 3,
                        partialVisibilityGutter: 40,
                      },
                      mobile: {
                        breakpoint: {
                          max: 768,
                          min: 0,
                        },
                        items: 1,
                        partialVisibilityGutter: 30,
                      },
                      tablet: {
                        breakpoint: {
                          max: 1024,
                          min: 768,
                        },
                        items: 2,
                        partialVisibilityGutter: 30,
                      },
                    }}
                    rewind={false}
                    rewindWithAnimation={false}
                    rtl={false}
                    shouldResetAutoplay
                    showDots={false}
                    sliderClass=""
                    slidesToSlide={1}
                    swipeable
                  >
                    {!!(testimonialType && testimonialType?.length) ? (
                      testimonialType?.map((testimonial) => (
                        <SingleTestimonial
                          key={testimonial.id}
                          testimonial={testimonial}
                        />
                      ))
                    ) : (
                      <div />
                    )}
                  </Carousel>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
