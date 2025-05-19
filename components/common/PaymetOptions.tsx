"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import balance from "/public/img/payment/balance.png";
import HomeFilterOptions from "./HomeFilterOptions";

const PaymetOptions = () => {
  const pathName = usePathname();

  return (
    <>
      <div className="available__balance pb__40">
        {/* <div className="balance">
          <Image src={balance} alt="img" />
          <span className="title fz-24 fw-700">Availble Balance</span>
        </div> */}
        {/* <span className="fz-24 fw-700">$4531.00</span> */}
      </div>
      <ul className="order__button mb__40"></ul>
    </>
  );
};

export default PaymetOptions;
