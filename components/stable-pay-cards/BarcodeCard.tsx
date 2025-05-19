import React from "react";

interface BarcodeCard {
  barcodeUrl: string;
  reference: string;
}

import Image from "next/image";
const BarcodeCard = ({ barcodeUrl, reference }: BarcodeCard) => {
  return (
    <div
      className="px-3 py-4 rounded my-4 rounded"
      style={{ boxShadow: `rgba(0, 0, 0, 0.16) 0px 1px 4px` }}
    >
      <div className="border-bottom mb-3">
        <h6 className="fw-bolder">Referencia</h6>
      </div>
      <div className="card-body">
        {/* barcode */}
        <div>
          {" "}
          <div
            style={{
              width: "100%",
              position: "relative",
              aspectRatio: "2 /1 ",
            }}
          >
            <Image
              src={barcodeUrl}
              alt="barcode"
              layout="fill"
              objectFit="contain"
            />
          </div>
        </div>
        <div
          className="text-center card-header rounded py-2"
          style={{ background: "#f1f4f8" }}
        >
          {reference}
        </div>
      </div>
    </div>
  );
};

export default BarcodeCard;
