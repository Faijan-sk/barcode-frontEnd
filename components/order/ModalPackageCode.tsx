import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image, { StaticImageData } from 'next/image'
import Link from 'next/link'
import axiosInstance from '@/lib/axiosInstance'
import { useAppSelector } from '@/hook/useAppSelector' // Ensure the correct path
import { RootState } from '@/redux/store'
import AmtModal from './AmtModal'

import MBB from '@/public/img/operators/finaltelcel5.jpg'
import TELEFONICA from '@/public/img/operators/finalAtt.jpg'
import TFESV from '@/public/img/operators/finalthird2.jpg'

type SendAmtBody = {
  amount: number
  Skuid?: string | undefined
  pdn?: string | undefined
}
type RowType = {
  Skuid: string
  pdn: string
  amount?: number
}

interface BarcodeData {
  Skuid: string
  pdn: string
  amount?: number
}

interface ImageStore {
  [key: string]: StaticImageData
}

const imageStore: ImageStore = { MBB, TELEFONICA, TFESV }

const Packages = () => {
  const [fetchBarcodeLoader, setFetchPlanLoader] = useState<string | false>(
    false
  )
  const [showModal, setShowModal] = useState<boolean>(false)
  const [selectedPlans, setSelectedPlans] = useState<RowType>({
    Skuid: '',
    pdn: '',
    amount: undefined,
  })
  const [amount, setAmount] = useState<number | ''>('')

  const router = useRouter()

  const plansDetails = useAppSelector(
    (state: RootState) => state.plans.plansDetails
  )

  const fetchBarcode = async (details: BarcodeData) => {
    const { Skuid, pdn } = details

    setFetchPlanLoader(`${Skuid}${pdn}`)
    try {
      const res = await axiosInstance.post('/generate-barcode/', {
        Skuid,
        pdn,
        msisdn: plansDetails?.msisdn_info?.msisdn,
        ...(details.amount ? { amount: details.amount } : {}),
      })

      const { data } = res
      sessionStorage.setItem('plansDetails', JSON.stringify(data))
      router.push('/stable-static-pay')
    } catch (error) {
      alert('Something went wrong!')
      console.error('Error generating barcode:', error)
    } finally {
      setFetchPlanLoader(false)
    }
  }

  const toggle = (action: string) => {
    if (action === 'open') {
      setShowModal(true)
    } else {
      setShowModal(false)
      setSelectedPlans({ Skuid: '', pdn: '', amount: undefined })
      setAmount('')
    }
  }

  const handleSend = () => {
    if (!amount || amount <= 0) {
      alert('Please enter a valid amount.')
      return
    }

    const data: RowType = {
      Skuid: selectedPlans?.Skuid ?? '', // Ensure Skuid is always a string
      pdn: selectedPlans?.pdn ?? '', // Ensure pdn is always a string
      amount,
    }

    toggle('close')
    fetchBarcode(data)
  }

  const handleGenerateBarcode = (row: RowType) => {
    if (!row?.Skuid) {
      console.error('Invalid Skuid:', row)
      return
    }

    if (row.Skuid === '0') {
      setSelectedPlans(row)
      toggle('open')
    } else {
      fetchBarcode({ Skuid: row.Skuid, pdn: row.pdn })
    }
  }

  const products = plansDetails?.products ?? []

  return (
    <>
      <div className="row g-4">
        {products.length > 0 ? (
          products.map((pr: any, index: number) => {
            const product = plansDetails?.msisdn_info?.product || 'MBB'

            return (
              <div key={`${pr?.pdn}-${index}`} className="col-md-6 col-12">
                <div
                  className="valu__items"
                  style={{
                    padding: '15px',
                    borderRadius: '8px',
                    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <div
                    className="valu__usd"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      marginBottom: '10px',
                    }}
                  >
                    <Image
                      src={imageStore[product as keyof ImageStore] || MBB}
                      alt="img"
                      style={{
                        maxWidth: '60px',
                        height: 'auto',
                        borderRadius: '3px',
                      }}
                    />
                    <span className="fz-18 fw-500">{pr?.pdn ?? 'N/A'}</span>
                  </div>

                  <span className="usd fz-16" style={{ margin: '10px 0' }}>
                    {pr?.crn} {pr?.amt ?? '0.00'}
                  </span>

                  <div className="d-flex gap-2">
                    <Link href="/" className="cmn__btn flex-1">
                      <span>Make Payment</span>
                    </Link>
                    <button
                      onClick={() => handleGenerateBarcode(pr)}
                      className="cmn__btn flex-1"
                      type="button"
                    >
                      <span>
                        {fetchBarcodeLoader === `${pr?.Skuid}${pr?.pdn}`
                          ? 'Generating...'
                          : 'Generate Barcode'}
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            )
          })
        ) : (
          <p>No packages available</p>
        )}
      </div>

      {/* <AmtModal
        showModal={showModal}
        handleClose={() => toggle("close")}
        title="Plan Amount"
      >
        <div className="modal-body">
          <label>Enter Amount</label>
          <input
            type="number"
            value={amount}
            className="form-control"
            onChange={(e) =>
              setAmount(e.target.value ? parseFloat(e.target.value) : "")
            }
          />
        </div>
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => handleSend()}
          >
            Generate Barcode
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => toggle("close")}
          >
            Close
          </button>
        </div>
      </AmtModal> */}
    </>
  )
}

export default Packages
