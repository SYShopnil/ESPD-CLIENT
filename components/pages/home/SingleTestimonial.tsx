import React from 'react';
import Image from 'next/image';
import dotUp from "./assets/dotUp.svg";
import dotDown from "./assets/dotDown.svg";
import userssvgrepocom from "./assets/Tutors-images.png";

function SingleTestimonial({ testimonial }) {
    return (
        <div className="container">
            <div className="col-12 col-sm-12 col-md-12 singleTestimonialWrap">
                <div className="tabWrap">
                    <div className="innerBox">
                        <Image
                            className="icon"
                            src={dotUp}
                            alt=""
                        />
                        <p className="textSub">
                            {testimonial?.desc}
                        </p>
                        <div className="bottomUserWrap">
                            <div className="innerBoxImg">
                                <img
                                    className="iconUser"
                                    src={testimonial?.image}
                                    alt=""
                                />
                                <div className="bottomUsertext">
                                    <h3>{testimonial?.student_name}</h3>
                                    {testimonial.is_student && <p>{testimonial?.subject}</p>}
                                    <p>{testimonial?.school}</p>
                                </div>
                            </div>
                        </div>
                        <div className="lastQuet">
                            <Image
                                className="iconLast"
                                src={dotDown}
                                alt=""
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SingleTestimonial;
