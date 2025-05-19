'use client' // Mark as Client Component

import { useEffect, useState } from 'react'
import axiosInstance from '@/lib/axiosInstance'
import OrderSummeryContent from './OrderSummeryContent'

interface PaymentResponse {
  reference: string
  barcodeUrl: string
}

interface SelectedProduct {
  product: string
  amt: number
}

interface OrderSummeryMainProps {
  skuid: string
}

const OrderSummeryMain: React.FC<OrderSummeryMainProps> = ({ skuid }) => {
  // ** State with proper types
  const [payment_response, setPayment_response] =
    useState<PaymentResponse | null>(null)
  const [selected_product, setSelected_product] =
    useState<SelectedProduct | null>(null)

  useEffect(() => {
    const fetchBarcode = async () => {
      try {
        const res = await axiosInstance.post('api/generate-barcode/', {
          Skuid: skuid,
        })
        const { data } = res
        const { payment_response, selected_product } = data
        setPayment_response(payment_response)
        setSelected_product(selected_product)
      } catch (error) {
        console.error('Error generating barcode:', error)
      }
    }

    fetchBarcode()
  }, [skuid]) // Runs when `skuid` changes

  if (!payment_response || !selected_product) {
    return <div>Loading...</div>
  }

  return (
    <section className="order__section pt__60 pb__60 mt-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xxl-8 col-xl-10 col-lg-12">
            <div className="order__wrappers">
              <div className="order__boxes order__boxestwo">
                <OrderSummeryContent
                  skuid={skuid} // ✅ Corrected prop name
                  payment_response={payment_response}
                  selected_product={selected_product}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default OrderSummeryMain
