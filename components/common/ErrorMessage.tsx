import React from 'react';
import Image from "next/image";
import WarningCircle from "./WarningCircle.svg";

function ErrorMessage({ text }) {
  return (
      <div className="has-errorWrap">
          <div className="has-ErrorMsg">
              <Image
                  className="WarningCircle"
                  priority
                  src={WarningCircle}
                  alt=""
              />
              <p>{text}</p>
          </div>
      </div>
  );
}

export default ErrorMessage;
