import React from "react";
import FindTutorPopUp from "@/components/find-tutor-popup";
import { useQuery } from "react-query";
import { API_GET_HOME } from "@/services/api/endpoints";
import { get } from "@/services/api/api";

export default function StillRequire() {
  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["homeData"],
    queryFn: () => get(API_GET_HOME),
  });

  const settings: any = {};

  data?.data?.setting?.map((item) => {
    settings[item?.key] = item?.value;
  });

  const email = data?.data?.setting?.find((item) => item.key === "email");

  return (
    <>
      <div className="stillRequireMainBox">
        <div className="container stillRequireWrapper">
          <div className="row stillRequireRow">
            <div className="col-12">
              <h2>Still Require Help?</h2>
              <p className="discovrSub">
                Complete our online form, and our team will reach out with a
                curated list of tutors just for you.
              </p>
              <FindTutorPopUp buttonClass={"primaryBtnSet text-white"} />

              {Object.keys(settings).length !== 0 && (
                <div className="orCallBox">
                  <p className="OeCall">
                    {/* <span>
                                        <a href={`mailto:${email?.value}`}> {email?.value} </a>
                                    </span> */}
                    or call
                    <span>
                      <a href={`tel:${settings?.phone || ""}`}>
                        {" "}
                        {settings?.phone}
                      </a>
                    </span>{" "}
                    to speak to a consultant
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
