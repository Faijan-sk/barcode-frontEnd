import React from "react";
interface PayInfoProps {
  amount: string | number;
  exp: number | number;
}

const PayInfo = ({ amount, exp }: PayInfoProps) => {
  const rendeDate = (num: number) => {
    if (!num) return null;

    const expirationDate = new Date(num);

    // Format it to return only the date (e.g., MM/DD/YYYY or similar based on locale)
    return expirationDate.toLocaleDateString();
  };

  return (
    <div
      className="px-3 py-4 rounded my-4"
      style={{
        background: "linear-gradient(180deg, #699ff0 0%, #4a75cb 100%)",
        color: "#fff",
      }}
    >
      <div className="d-flex justify-content-between mb-3 text-white">
        <h5 style={{ color: "#fff" }}>Monto:</h5>
        <h5 style={{ color: "#fff" }}>
          <span className="fw-bolder">{Number(amount).toFixed(2)}</span> MXN
        </h5>
      </div>

      <p className="mb-3">
        Esta referencia expirará:{" "}
        <span className="fw-bolder">{rendeDate(exp)}</span>, realiza tu depósito
        antes de esta fecha.
      </p>
      {/* <small>
        Indica en caja que quieres realizar un pago de{" "}
        <span className="fw-bolder">ENEFEVO</span>.
      </small> */}
    </div>
  );
};

export default PayInfo;
