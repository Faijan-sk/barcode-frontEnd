'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image' // Ensure this import is present

import PayInfo from '@/components/stable-pay-cards/PayInfo'
import BarcodeCard from '@/components/stable-pay-cards/BarcodeCard'
import StoreCard from '@/components/stable-pay-cards/StoreCard'
import PaymentInfo from '@/components/stable-pay-cards/PaymentInfo'

// ** Logo
import latcom from '@/public/img/pay/latcom.png'

const StableStaticPay = () => {
  // State to store the extracted data
  const [plansDetails, setPlansDetails] = useState<any>(null)

  useEffect(() => {
    debugger
    // Get the stored data from sessionStorage
    const storedData = sessionStorage.getItem('plansDetails')

    if (storedData) {
      // Parse the data if it exists
      setPlansDetails(JSON.parse(storedData))
    } else {
      // Handle case where no data is found
      console.error('No plans details found in sessionStorage')
    }
  }, [])

  // If plansDetails is null or loading, you can show a loading message or spinner
  if (!plansDetails) {
    return <div>Loading...</div>
  }

  // Ensure proper data structure before rendering the components
  const { selected_product, payment_response } = plansDetails || {}

  return (
    <div className="row justify-content-center py-3">
      <div className="d-flex align-items-center justify-content-center border rounded">
        <Image
          src={latcom}
          alt={`Store logo`}
          width={200}
          height={200}
          style={{ objectFit: 'contain' }}
        />
      </div>
      <div className="col-sm-8 col-md-4">
        <PayInfo
          amount={selected_product?.amt ?? 'N/A'} // Use fallback if amount is missing
          exp={payment_response?.expiresAt ?? 'N/A'} // Use fallback if expiration date is missing
        />
        <BarcodeCard
          barcodeUrl={payment_response?.barcodeUrl ?? ''}
          reference={payment_response?.reference ?? ''}
        />
        <StoreCard />
        <PaymentInfo />
      </div>
    </div>
  )
}

export default StableStaticPay
