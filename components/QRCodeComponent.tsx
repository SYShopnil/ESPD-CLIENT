import { useEffect, useState } from 'react';
import QRCode from 'qrcode.react';
import axios from 'axios';
import { API_URL } from '@/config/config';

export default function QRCodeComponent({ code, size }: any) {
  const [updatedValue, setUpdatedValue] = useState<any>(null);
  const qrValue = updatedValue ? "Scaned" : code;

  // useEffect(() => {
  //   if(code){
  //     axios.get(API_URL + "/api/common/update-booked-status?booked_offer_id=" + code)
  //      .then(response => {
  //        console.log(response);
  //      })
  //      .catch(error => {
  //        console.error(error);
  //      });
  //   }
  // }, [code]);

    useEffect(() => {
    if(code){
      const fromData = {
        status:"used"
      }
      axios.put(API_URL + "/api/book-offers/" + code ,fromData)
       .then(response => {
         setUpdatedValue(response.data.data);
       })
       .catch(error => {
         console.error(error);
       });
    }
  }, [code]);

  return (
    <>
        <QRCode
          value={code}
          size={size}
          fgColor="#000000"
          bgColor="#ffffff"
          level="L"
          renderAs="svg"
        />
    </>
  );
}
