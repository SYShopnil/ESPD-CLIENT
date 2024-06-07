import ArrowRight from "./assets/ArrowRight.svg";
import ArrowLeftGray from "./assets/ArrowLeftGray.svg";

import Image from "next/image";
import React from "react";
import {boolean, object, string} from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {post} from "@/services/api/api";
import {API_ON_BOARD_TEACHER} from "@/services/api/endpoints";
import {useMutation} from "react-query";
import {useRouter} from "next/navigation";
import ErrorMessage from "@/components/common/ErrorMessage";

const URL = /^((https?|ftp):\/\/)?(www.)?(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i

export default function PersonalDetails({ onClickPrevious, qtsConferred, dbsChecked, experiences, setConfirmation }) {
  const router = useRouter();

  let tutorOnBoardSchema = object({
    email: string().email().required("Email is required"),
    phone: string().required("Contact Number is required"),
    linkedin_url: string().required("Linkedin profile url is required").matches(URL, 'Enter a valid url'),
    qts_confered: boolean(),

  });

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(tutorOnBoardSchema) });

  const tutorOnBoardMutation = useMutation(
    async (data) => post(API_ON_BOARD_TEACHER, data),
    {
      onSuccess: (res) => {
        setConfirmation(res?.success)
      },
      onError: (err) => {
        console.log({ err });
      },
    }

  )
  const onFormSubmit = (data: any) => {
    const finalData = {
      ...data,
      qts_confered: qtsConferred,
      experience: experiences?.join(","),
      has_dbs_checked: dbsChecked,
    }
    tutorOnBoardMutation.mutate(finalData);
  };

  return (
    <>
      <div className="qtclWrapper">
        <div className="pageGoing">
          <div className="pageGoingNumberBox">
            <a className="pageGoingNumber active" href="#">
              1
            </a>
            <div className="pageGoingDiv borderActive"></div>
          </div>
          <div className="pageGoingNumberBox">
            <a className="pageGoingNumber active" href="#">
              2
            </a>
            <div className="pageGoingDiv borderActive"></div>
          </div>
          <div className="pageGoingNumberBox">
            <a className="pageGoingNumber active" href="#">
              3
            </a>
            <div className="pageGoingDiv borderActive"></div>
          </div>
          <div className="pageGoingNumberBox">
            <a className="pageGoingNumber active" href="#">
              4
            </a>
          </div>
        </div>

        <h1>Join our team of dedicated educators</h1>
        <form onSubmit={handleSubmit(onFormSubmit)} noValidate >
          <div className="optionWrap">
            <p className="ProssesTextDetails">Enter your personal details</p>
            <div className="personalDetailsForm">



              <div className="nameBox">

                <div className="firstBox ">
                  <p className="startP">Your email address*</p>
                  <input
                    className={errors.email && errors.email?.message ? 'has-error' : ''}
                    type="email"
                    id="email"
                    {...register("email", {
                      required: {
                        value: true,
                        message: "this field is required",
                      },
                    })}
                  />

                  {errors.email && errors.email?.message && (
                    <ErrorMessage
                      text={errors.email?.message}
                    />
                  )}



                </div>

                <div className="firstBox has-errorContactUn">

                  <p className="startP">Your contact number*</p>

                  <input
                    className={errors.phone && errors.phone?.message ? 'has-error' : ''}
                    type="text"
                    id="phone"
                    {...register("phone", {
                      required: {
                        value: true,
                        message: "this field is required",
                      },
                    })} />

                  {errors.phone && errors.phone?.message && (
                    <ErrorMessage
                      text={errors.phone?.message}
                    />
                  )}

                </div>
              </div>

              <div className="urlBox">
                <div className="firstBoxUrl ">
                  <p className="startP">
                    Please attach your Linkedin profile url here*
                  </p>
                  <input
                    className={errors.linkedin_url && errors.linkedin_url?.message ? 'has-error' : ''}
                    type="text"
                    id="linkedin_url"
                    {...register("linkedin_url", {
                      required: {
                        value: true,
                        message: "this field is required",
                      },
                    })} />

                  {errors.linkedin_url && errors.linkedin_url?.message && (
                    <ErrorMessage
                      text={errors.linkedin_url?.message}
                    />
                  )}
                </div>
              </div>



            </div>
          </div>
          <div className="teacherExpeBtnBox">

            <button className="previousBtn" onClick={onClickPrevious}>

              <Image
                className="ArrowLeftGray"
                priority
                src={ArrowLeftGray}
                alt=""
              />
              Previous
            </button>


            <button className="otpVerifyBtn" type="submit" disabled={tutorOnBoardMutation.isLoading} >
              {
                tutorOnBoardMutation.isLoading ? "Please wait" : "Submit Request"
              }
              <Image className="ArrowRight" priority src={ArrowRight} alt="" />
            </button>

          </div>
        </form>

      </div>
    </>
  );
}
