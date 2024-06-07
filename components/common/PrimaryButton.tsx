import React from 'react';
import Image from "next/image";
import ArrowRight from "@/components/pages/logIn/assets/ArrowRight.svg";

function PrimaryButton({loading, text, type = 'button', onClick}) {
    return (
        <button className="signUpBtn" disabled={loading} onClick={onClick} type={type}>
            {loading && <div className="spinner-border spinner-border-sm text-light" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>}

            {!loading &&
                <>
                    {text}
                  <Image
                    className="signUpBtnArro"
                    priority
                    src={ArrowRight}
                    alt=""
                  />
                </>
            }

        </button>
    );
}

export default PrimaryButton;
