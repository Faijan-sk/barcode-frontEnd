import React from "react";
import Image, { StaticImageData } from "next/image";

import Oxxo from "@/public/img/pay/oxxo.jpeg";
import Seven from "@/public/img/pay/seven-11.jpeg";

const storeLogo: StaticImageData[] = [Oxxo, Seven];

const StoreCard = () => {
  return (
    <div
      className="px-3 py-4 rounded my-4"
      style={{ boxShadow: `rgba(0, 0, 0, 0.16) 0px 1px 4px` }}
    >
      <div className="border-bottom mb-3">
        <h6 className="fw-bolder">Instrucciones</h6>
      </div>

      {/* Image Container */}
      <div className="d-flex flex-wrap gap-3">
        {storeLogo.map((logo, index) => (
          <div
            key={index}
            className="d-flex align-items-center justify-content-center border rounded"
            style={{ width: "100px", height: "100px" }}
          >
            <Image
              src={logo}
              alt={`Store logo ${index + 1}`}
              width={100}
              height={100}
              style={{ objectFit: "contain" }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default StoreCard;
