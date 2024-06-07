import React, { useState } from "react";
import Image from "next/image";
import Plus from "./assets/Plus.svg";
import Mius from "./assets/Mius.svg";
export default function FAQs({ faqs, isHomePage, skipFilter }) {
  let filtered = [];

  if (skipFilter) {
    filtered = faqs;
  } else {
    if (isHomePage) {
      filtered = faqs?.filter((i) => i.type === "student");
    } else {
      filtered = faqs?.filter((i) => i.type === "teacher");
    }
  }

  return (
    <>
      <div className="container faqsWrapper">
        <div className="row faqsRow">
          <div className="col-12">
            <h2>Read our FAQs</h2>
            <div className="faqsWrap">
              <div className="accordion" id="accordionExample">
                {filtered?.map((item, i) => {
                  return (
                    <div className="accordion-item" key={i}>
                      <h3 className="accordion-header" id="headingOne">
                        <button
                          className="accordion-button"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target={"#collapse" + i}
                        >
                          {item?.question}
                        </button>
                      </h3>
                      <div
                        id={"collapse" + i}
                        className="accordion-collapse collapse"
                        aria-labelledby="headingOne"
                        data-bs-parent="#accordionExample"
                      >
                        <div
                          className="accordion-body"
                          dangerouslySetInnerHTML={{ __html: item?.answer }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
