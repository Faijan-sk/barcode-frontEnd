import Image from 'next/image'
import Link from 'next/link'
import SuccessfulContent from '../successful/SuccessfulContent'

interface OrderSummaryProps {
  payment_response: {
    reference: string
    barcodeUrl: string
  }
  selected_product: {
    product: string
    amt: number
  }
  skuid: string
}

const OrderSummeryContent: React.FC<OrderSummaryProps> = (props) => {
  const { payment_response, selected_product, skuid } = props

  console.clear()
  console.table(payment_response)
  console.table(selected_product)

  return (
    <>
      <div className="order__summary__wrapper mb__30">
        <div className="over__responsive">
          <div className="order__table__fluid">
            <div className="order__table__items bg__add">
              <span>Recipient No</span>
              <span>Operator</span>
              <span>Amount</span>
            </div>
            <div className="order__table__items">
              <span>{payment_response.reference}</span>
              <span>{selected_product.product}</span>
              <span>{selected_product.amt.toFixed(2)}</span>
            </div>
          </div>
          <div className="order__table__box">
            <div className="order__graph">
              <ul>
                <li>
                  <span>Sub Total:</span>
                  <span className="bg">{selected_product.amt.toFixed(2)}</span>
                </li>
                <li>
                  <span>Promotional Code:</span>
                  <span className="bg">0</span>
                </li>
                <li>
                  <span>Total:</span>
                  <span className="bg">{selected_product.amt.toFixed(2)}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="recharge__numberbtn">
        <Link href="/" className="addanother" style={{ pointerEvents: 'none' }}>
          <span className="plus">
            <i className="material-symbols-outlined">add</i>
          </span>
          <span className="text fz-18 fw-600">Add another number Recharge</span>
        </Link>
        <Link
          href="/order-summary"
          className="addanother"
          style={{ pointerEvents: 'none' }}
        >
          <span className="plus">
            <i className="material-symbols-outlined">add</i>
          </span>
          <span className="text fz-18 fw-600">Add Promo Code</span>
        </Link>
      </div>
      <div
        style={{
          width: '300px',
          margin: '0 auto',
        }}
      >
        <h5 className="summary__title mt-5">Scan Barcode for Payment</h5>
        <div
          style={{
            justifyContent: 'start',
            marginTop: '50px',
            width: '500px',
            overflow: 'hidden',
          }}
        >
          <div style={{ marginLeft: '0' }}>
            <Image
              src={payment_response?.barcodeUrl}
              width={300}
              height={100}
              alt="barcode"
              layout="intrinsic"
            />
          </div>
          <div className="probtn text-start ms-4 pt__40">
            <Link href="/" className="cmn__btn">
              <span>Make Another payment</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default OrderSummeryContent
