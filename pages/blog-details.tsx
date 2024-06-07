import React, { useState } from "react";
import Header from "@/components/pages/home/Header";
import { useQuery } from "react-query";
import { get } from "@/services/api/api";
import { API_GET_HOME, API_GET_SINGLE_BLOG } from "@/services/api/endpoints";
import Footer from "@/components/pages/home/Footer";
import Discover from "@/components/pages/home/Discover";
import feature from "@/components/pages/home/assets/feature-huge.svg";
import ArrowRight from "@/components/pages/BookingOption/assets/ArrowRight.svg";
import userBBlog from "@/components/pages/home/assets/userBBlog.svg";
import blogdetails from "@/components/pages/home/assets/blogdetails-huge.png";
import Image from "next/image";
import FeaturedBlogsSingle from "@/components/pages/resources/FeaturedBlogsSingle";
import { PAGE_RESOURCES, } from "@/config/constants";
import Link from "next/link";
import { useRouter } from "next/router";
export default function BlogDetails() {

  const router = useRouter()

  const blogId = router?.query?.id
  console.log(blogId);

  const { isLoading, isError, error, data } = useQuery({
    queryKey: ['homeData'],
    queryFn: () => get(API_GET_HOME)
  });

  const { isLoading: isResourceLoading, isError: isResourceError, error: resourceError, data: singleBlog } = useQuery({
    queryKey: ['singleBlog', blogId],
    queryFn: () => get(`${API_GET_SINGLE_BLOG}/${blogId}`),
    enabled: !!(blogId)
  });

  return (
    <>
      <div className="workEspdWrapper">
        <Header subjects={data?.data?.subjects} />
        <div className="blogDetailsWrapMain">
          <div className="blogdetailsWrapHead">
            <Link className="bookingBack" href={PAGE_RESOURCES}>
              <Image
                className="commonImg"
                priority
                src={ArrowRight}
                alt=""
              />
              Back to Resources
            </Link>
            <p>{singleBlog?.data?.category}</p>
            <h1>{singleBlog?.data?.title}</h1>
          </div>
          <div className="blogdetailsWrap">
            <div className="blogdetailsHead">
              <img
                className="userBBlog"
                priority
                src={singleBlog?.data?.author_image}
                alt=""
              />
              <div className="blogdetailsHeadUserInfo">
                <h5>{singleBlog?.data?.author_name}</h5>
                <p>{singleBlog?.data?.date}</p>
              </div>
            </div>
            <img
              className="blogdetailsImg"
              priority
              src={singleBlog?.data?.image}
              alt=""
            />

            <div
              dangerouslySetInnerHTML={{ __html: singleBlog?.data?.content }}
            />
            <div className="featuredBlogsWrap">
              <div className="featuredBlogsHead">
                <h1>Featured Blogs</h1>
              </div>
              <div className="container featuredBlogsContainer">
                <div className="row">
                  <FeaturedBlogsSingle />
                  <FeaturedBlogsSingle />
                  <FeaturedBlogsSingle />
                </div>
              </div>
            </div>
          </div>
          <Discover />
        </div>
        <Footer subjects={data?.data?.subjects} />
      </div>
    </>
  );
}
