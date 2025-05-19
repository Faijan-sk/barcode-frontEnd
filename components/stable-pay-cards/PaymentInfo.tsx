import React from "react";

const PaymentInfo = () => {
  return (
    <div
      className="px-3 py-4 rounded my-4 rounded"
      style={{ boxShadow: `rgba(0, 0, 0, 0.16) 0px 1px 4px` }}
    >
      <div className="border-bottom mb-3">
        <h6 className="fw-bolder">Instrucciones</h6>
      </div>
      <ul className="list-unstyled">
        <li>
          1. Indica en caja que quieres realizar un pago de{" "}
          <strong>ENEFEVO</strong>.
        </li>
        <li>
          2. Dicta al cajero el número de referencia en esta ficha para que
          tecleé directamente en la pantalla de venta.
        </li>
        <li>3. Realiza el pago correspondiente con dinero en efectivo.</li>
        <li>
          4. Al confirmar tu pago, el cajero te entregará un comprobante
          impreso. En el podrás verificar que se haya realizado correctamente.
          Conserva este comprobante de pago.
        </li>
        <li>
          5. Si tienes problemas con tu pago, comunícate al correo{" "}
          <a href="mailto:contacto@sipelatam.mx">contacto@sipelatam.mx</a>.
        </li>
      </ul>
    </div>
  );
};

export default PaymentInfo;
