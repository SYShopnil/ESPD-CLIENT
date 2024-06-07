import Image from "next/image";
import feature from "@/components/pages/home/assets/feature-huge.svg";
import ArrowRight from "@/components/pages/home/assets/ArrowRightPrimary.svg";
import React from "react";
import Router from "next/router";
import { PAGE_BLOG_DETAILS } from "@/config/constants";

export default function FeaturedBlogsSingle({ blog }) {

    const onClickReadMore = (id) => {
        console.log("clicked id:", id);
        Router.replace(`${PAGE_BLOG_DETAILS}?id=${id}`)
    }
    return (
        <>
            <div className="col-12 col-sm-12 col-md-4">
                <a className="featuredBlogsClickWrapper" onClick={() => onClickReadMore(blog?.id)}>
                    <div className="featuredBlogsItem">
                        <div className="featuredBlogsItemInner">
                            <img
                                className="featureImg"
                                src={blog?.image}
                                alt=""
                            />
                            <div className="featuredBlogsItemDetails">
                                <p className="featuredTag">{blog?.category}</p>
                                <h2>{blog?.title}</h2>
                                <h3>{blog?.short_desc}</h3>
                                <button>
                                    <p>Read More</p>
                                    <Image
                                        className="ArrowRight"
                                        src={ArrowRight}
                                        alt=""
                                    />
                                </button>
                            </div>
                        </div>
                    </div>
                </a>

            </div>
        </>
    )
}
