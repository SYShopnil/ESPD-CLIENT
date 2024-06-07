import React, { useState } from "react";
import Header from "@/components/pages/home/Header";
import { useQuery } from "react-query";
import { get } from "@/services/api/api";
import { API_GET_ALL_RESOURCE, API_GET_HOME } from "@/services/api/endpoints";
import Footer from "@/components/pages/home/Footer";
import Discover from "@/components/pages/home/Discover";
import feature from "@/components/pages/home/assets/feature-huge.svg";
import ArrowRight from "@/components/pages/home/assets/ArrowRightPrimary.svg";
import Image from "next/image";
import FeaturedBlogsSingle from "@/components/pages/resources/FeaturedBlogsSingle";
import StillRequire from "@/components/pages/BookingOption/StillRequire";
import Head from "next/head";
export default function Resources() {

  const { isLoading, isError, error, data } = useQuery({
    queryKey: ['homeData'],
    queryFn: () => get(API_GET_HOME)
  });

  const { isLoading: isResourceLoading, isError: isResourceError, error: resourceError, data: resourceData } = useQuery({
    queryKey: ['resourceData'],
    queryFn: () => get(API_GET_ALL_RESOURCE)
  });

  return (
    <>
     <Head>
        <title>Resources | ESPD </title>
      </Head>

      <div className="workEspdWrapper">
        <Header/>
        <div className="resourcesWrap">
          <div className="resourcesWrapHead">
            <h1>ESPD Blog</h1>
            <p>Your go-to guide for education advice.</p>
          </div>
          <div className="featuredBlogsWrap">
            <div className="featuredBlogsHead">
              <h1>Featured Blogs</h1>
            </div>
            <div className="container featuredBlogsContainer">
              <div className="row">
                {
                  resourceData?.data?.map(blog => <FeaturedBlogsSingle key={blog.id} blog={blog} />)
                }
              </div>
            </div>
          </div>
          <StillRequire/>
          {/* <Discover /> */}
        </div>
        <Footer />
      </div>
    </>
  );
}
