"use client";
import { useState, ChangeEvent, useEffect } from "react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import Select from "../select/Select";
import ata5g from "/public/img/payment/ata5g.png";
import { useSelector } from "react-redux";

import MBB from "@/public/img/operators/finaltelcel5.jpg";
import TELEFONICA from "@/public/img/operators/finalAtt.jpg";
import TFESV from "@/public/img/operators/finalthird2.jpg";

import axiosInstance from "@/lib/axiosInstance";

import { useAppSelector } from "@/hook/useAppSelector"; // Ensure the correct path
import { RootState } from "@/redux/store";
import withPrivateRoute from "@/hook/withPrivateRoute";
import AmtModal from "./AmtModal";
import { useRouter } from "next/navigation";

type RowType = {
  Skuid: string;
  pdn: string;
  amount?: number;
};

interface BarcodeData {
  Skuid: string;
  pdn: string;
  amount?: number; // The `?` makes it optional
}

interface ImageStore {
  [key: string]: StaticImageData;
}

const imageStore: ImageStore = {
  MBB,
  TELEFONICA,
  TFESV,
};

interface Product {
  pdn: string; // Assuming 'pdn' is a string
  amt: string; // Assuming 'amt' is a string
  Skuid: string; // Assuming 'Skuid' is a string
  crn: string;
}

// Define operator type
interface Operator {
  id: number;
  name: string;
  image: any; // Use StaticImageData type if you import your images properly
}

const Packages = () => {
  //** Loader Fetch barcode loader  */
  const [fetchBarcodeLoader, setFetchPlanLoader] = useState<string | false>(
    false
  );
  const [showModal, setShowModal] = useState<boolean | false>(false);
  const [selectedPlans, setSelectedPlans] = useState<object>({});

  // Add state for mobile detection
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [isGenerateBarcode, setIsGenerateBarcode] = useState<boolean>(false);

  // ** Routs
  const router = useRouter();

  // ** hook
  const plansDetails = useAppSelector(
    (state: RootState) => state.plans.plansDetails
  );

  // ** Generate Barcode
  /**
   *
   * @param details
   * ! Old Code generate barcode
   * @returns
   */

  const fetchBarcode = async (details: BarcodeData) => {
    const { Skuid, pdn } = details;
    const newTab = window.open("", "_blank");

    if (!newTab) {
      alert(
        "Popup blocker prevented opening a new tab. Please allow pop-ups for this site."
      );
      return;
    }
    setFetchPlanLoader(`${Skuid}${pdn}`);
    try {
      setIsGenerateBarcode(true);
      const res = await axiosInstance.post("/generate-barcode/", {
        Skuid,
        pdn,
        msisdn: plansDetails?.msisdn_info?.msisdn,
        ...(details.amount ? { amount: details.amount } : {}), // ✅ Correct syntax
      });
      const { data } = res;

      if (data.payment_response.url) {
        newTab.location.href = data.payment_response.url;
      } else {
        alert("Failed to generate barcode URL.");
        newTab.close();
      }
    } catch (error) {
      alert("Something went wrong!");
      console.error("Error generating barcode:", error);
      newTab.close();
    } finally {
      setIsGenerateBarcode(false);
      setFetchPlanLoader("");
    }
  };

  /*
  const fetchBarcode = async (details: BarcodeData) => {
    const { Skuid, pdn } = details;

    setFetchPlanLoader(`${Skuid}${pdn}`);
    try {
      setIsGenerateBarcode(true);
      const res = await axiosInstance.post("/generate-barcode/", {
        Skuid,
        pdn,
        msisdn: plansDetails?.msisdn_info?.msisdn,
        ...(details.amount ? { amount: details.amount } : {}), // ✅ Correct syntax
      });
      const { data } = res;

      //   router.push({
      //     pathname: "/target-page", // Target page where you want to send the data
      //     query: { data: JSON.stringify(data) }, // Sending data as query params
      //   });
    } catch (error) {
      alert("Something went wrong!");
      console.error("Error generating barcode:", error);
    } finally {
      setIsGenerateBarcode(false);
      setFetchPlanLoader("");
    }
  };
  */

  const toggle = (action: string) => {
    if (action == "open") {
      setShowModal(true);
    } else {
      setShowModal(false);
      setSelectedPlans({});
    }
  };

  const handleGenerateBarcode = (row: RowType) => {
    debugger;

    if (!row?.Skuid) {
      console.error("Invalid Skuid:", row);
      return;
    }

    if (row.Skuid === "0") {
      setSelectedPlans(row);
      toggle("open");
    } else {
      fetchBarcode({ Skuid: row.Skuid, pdn: row.pdn });
    }
  };

  const products = plansDetails?.products ?? [];

  return (
    <>
      <div className="row g-4">
        {products.length > 0 ? (
          products.map((pr: Product, index: number) => {
            const product = plansDetails?.msisdn_info?.product || "MBB"; // Fallback to "MBB" if undefined

            return (
              <div key={`${pr?.pdn}-${index}`} className="col-md-6 col-12">
                <div
                  className="valu__items"
                  style={{
                    padding: isMobile ? "10px" : "15px",
                    borderRadius: "8px",
                    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <div
                    className="valu__usd"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      marginBottom: "10px",
                    }}
                  >
                    <Image
                      src={imageStore[product as keyof ImageStore] || MBB} // Fallback image
                      alt="img"
                      style={{
                        maxWidth: isMobile ? "40px" : "60px",
                        height: "auto",
                        borderRadius: "3px",
                      }}
                    />
                    <span
                      className="fz-18 fw-500"
                      style={{
                        fontSize: isMobile ? "14px" : "16px",
                        fontWeight: "500",
                      }}
                    >
                      {pr?.pdn ?? "N/A"}
                    </span>
                  </div>

                  <span
                    className="usd fz-16"
                    style={{
                      margin: "10px 0",
                      fontWeight: "bold",
                      fontSize: isMobile ? "14px" : "16px",
                    }}
                  >
                    {pr?.crn} {pr?.amt ?? "0.00"}
                  </span>

                  <div className="d-flex gap-2">
                    <Link
                      href={`/`}
                      className="cmn__btn flex-1"
                      style={{
                        minWidth: isMobile ? "80px" : "100px",
                        textAlign: "center",
                        padding: isMobile ? "6px" : "8px",
                        display: "block",
                        fontSize: isMobile ? "0.875rem" : "1rem",
                      }}
                    >
                      <span>Make Payment</span>
                    </Link>
                    <button
                      onClick={() => handleGenerateBarcode(pr)}
                      // fetchBarcode(pr?.Skuid ?? "", pr?.pdn ?? "")
                      className="cmn__btn flex-1"
                      type="button"
                      // disabled={fetchBarcodeLoader == pr?.Skuid}
                      style={{
                        minWidth: isMobile ? "80px" : "100px",
                        textAlign: "center",
                        padding: isMobile ? "6px" : "8px",
                        display: "block",
                        fontSize: isMobile ? "0.875rem" : "1rem",
                      }}
                    >
                      <span>
                        {" "}
                        {fetchBarcodeLoader == `${pr?.Skuid}${pr?.pdn}`
                          ? "Generating barcode..."
                          : "Generate Barcode"}
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <p>No packages available</p> // Fallback UI
        )}
      </div>
      {/* <AmtModal
        showModal={showModal}
        handleClose={() => toggle("close")}
        title="Payment Details"
        selectedPlan={selectedPlans}
        sendToServer={fetchBarcode}
      /> */}
    </>
  );
};

export default Packages;
