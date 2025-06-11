'use client'

import { useState, ChangeEvent, useEffect } from 'react'
import Image, { StaticImageData } from 'next/image'
import Link from 'next/link'
import Select from '../select/Select'
import ata5g from '/public/img/payment/ata5g.png'
import { useSelector } from 'react-redux'

import MBB from '@/public/img/operators/bienestar.jpg'
import Bait from '@/public/img/operators/bienestar.jpg'
import TELEFONICA from '@/public/img/operators/finalAtt.jpg'
import TFESV from '@/public/img/operators/bienestar.jpg'

import axiosInstance from '@/lib/axiosInstance'

import { useAppSelector } from '@/hook/useAppSelector'
import { RootState } from '@/redux/store'
import withPrivateRoute from '@/hook/withPrivateRoute'
import AmtModal from './AmtModal'
import { useRouter } from 'next/navigation'

type PropType = {
  activeList: string
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

const imageStore: ImageStore = {
  MBB,
  Bait,
  TELEFONICA,
  TFESV,
}

interface Product {
  pdn: string
  amt: number
  Skuid: string
  crn: string
}

interface Operator {
  id: number
  name: string
  image: any
}

const userLoginBody = {
  username: 'sagar',
  password: 'B!N@ry10240569',
  user_uid: '27441322',
  dist_api: '50bf27e4a9cf6cab27e5d7015ce8b35646cb1ea888324270fb1b48d1a9d4fc40',
}

export const handleLogin = async () => {
  const response = await axiosInstance.post('/dislogin', {
    ...userLoginBody,
  })
  const { data } = response
  localStorage.setItem('access', data.access)
}
const Packages: React.FC<PropType> = ({ activeList }) => {
  const [fetchBarcodeLoader, setFetchPlanLoader] = useState<string | false>(
    false
  )
  const [showModal, setShowModal] = useState<boolean | false>(false)
  const [selectedPlans, setSelectedPlans] = useState<object>({})

  const [isMobile, setIsMobile] = useState<boolean>(false)
  const [isGenerateBarcode, setIsGenerateBarcode] = useState<boolean>(false)
  const [filteredList, setFilteredList] = useState<Product[]>([])

  const [showPDNModal, setShowPDNModal] = useState(false)
  const [fullPDNText, setFullPDNText] = useState<string | null>(null)

  const router = useRouter()

  const plansDetails = useAppSelector(
    (state: RootState) => state.plans.plansDetails
  )

  const fetchBarcode = async (details: BarcodeData) => {
    const { Skuid, pdn } = details
    const newTab = window.open('', '_blank')

    if (!newTab) {
      alert(
        'El bloqueador de ventanas emergentes impidió abrir una nueva pestaña. Por favor, permite las ventanas emergentes para este sitio.'
      )
      return
    }
    setFetchPlanLoader(`${Skuid}${pdn}`)
    try {
      setIsGenerateBarcode(true)
      // const accessToken = localStorage.getItem('access')
      // if (!accessToken) {
      //   await handleLogin()
      // }
      const res = await axiosInstance.post('/generate-barcode/', {
        Skuid,
        pdn,
        msisdn: plansDetails?.msisdn_info?.msisdn,
        ...(details.amount ? { amount: details.amount } : {}),
      })
      const { data } = res

      if (data.payment_response.url) {
        newTab.location.href = data.payment_response.url
      } else {
        alert('No se pudo generar la URL del código de barras.')
        newTab.close()
      }
    } catch (error) {
      alert('¡Algo salió mal!')
      console.error('Error generating barcode:', error)
      newTab.close()
    } finally {
      setIsGenerateBarcode(false)
      setFetchPlanLoader('')
    }
  }

  const toggle = (action: string) => {
    if (action == 'open') {
      setShowModal(true)
    } else {
      setShowModal(false)
      setSelectedPlans({})
    }
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
      setSelectedPlans({
        Skuid: row.Skuid,
        pdn: row.pdn,
        msisdn: plansDetails?.msisdn_info?.msisdn,
      })
      toggle('open')
    }
  }

  const products = plansDetails?.products ?? []

  useEffect(() => {
    setFilteredList(
      products.filter((prd: Product) => {
        if (activeList === 'Top-Up' && prd?.amt === 0) return prd
        else if (activeList === 'Plans' && prd?.amt > 0) return prd
      })
    )
  }, [activeList])

  return (
    <>
      <div className="row g-4">
        {products.length > 0 ? (
          products
            .filter(({ amt }: Product) => amt > 0)
            .map((pr: Product, index: number) => {
              const product = plansDetails?.msisdn_info?.product || 'MBB'

              return (
                <div key={`${pr?.pdn}-${index}`} className="col-md-6 col-12">
                  <div
                    className="valu__items"
                    style={{
                      padding: isMobile ? '10px' : '15px',
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
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      <div style={{ width: '20%' }}>
                        <Image
                          src={imageStore[product as keyof ImageStore] || MBB}
                          alt="img"
                          style={{
                            maxWidth: isMobile ? '40px' : '60px',
                            height: 'auto',
                            borderRadius: '3px',
                          }}
                        />
                      </div>
                      <div style={{ width: '80%' }}>
                        <span
                          className="fz-18 fw-200"
                          style={{
                            fontSize: isMobile ? '14px' : '16px',
                            fontWeight: '500',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            display: 'block',
                          }}
                        >
                          {pr?.pdn ?? 'N/A'}
                        </span>
                        {pr?.pdn && pr.pdn.length > 30 && (
                          <span
                            onClick={() => {
                              setFullPDNText(pr.pdn)
                              setShowPDNModal(true)
                            }}
                            style={{
                              color: '#007bff',
                              fontSize: '12px',
                              cursor: 'pointer',
                              marginTop: '4px',
                              display: 'inline-block',
                            }}
                          >
                            Ver más
                          </span>
                        )}
                      </div>
                    </div>

                    <span
                      className="usd fz-16"
                      style={{
                        margin: '10px 0',
                        fontWeight: 'bold',
                        fontSize: isMobile ? '14px' : '16px',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {pr?.crn} {pr?.amt ?? '0.00'}
                    </span>

                    <div className="d-flex gap-2">
                      <button
                        className="cmn__btn flex-1"
                        type="button"
                        style={{
                          minWidth: isMobile ? '80px' : '100px',
                          textAlign: 'center',
                          padding: isMobile ? '6px' : '8px',
                          display: 'block',
                          fontSize: isMobile ? '0.875rem' : '1rem',
                        }}
                      >
                        <span>Realizar pago</span>
                      </button>
                      <button
                        onClick={() => handleGenerateBarcode(pr)}
                        className="cmn__btn flex-1"
                        type="button"
                        style={{
                          minWidth: isMobile ? '80px' : '100px',
                          textAlign: 'center',
                          padding: isMobile ? '6px' : '8px',
                          display: 'block',
                          fontSize: isMobile ? '0.875rem' : '1rem',
                        }}
                      >
                        <span>
                          {fetchBarcodeLoader == `${pr?.Skuid}${pr?.pdn}`
                            ? 'Generando código de barras...'
                            : 'Generar código de pago'}
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              )
            })
        ) : (
          <div className="col-12">
            <p className="text-center fw-bold">
              No hay paquetes disponibles en esta categoría.
            </p>
          </div>
        )}
      </div>

      {/* Payment Modal */}
      <AmtModal
        showModal={showModal}
        handleClose={() => toggle('close')}
        title="Seleccionar tienda"
        selectedPlan={selectedPlans}
        sendToServer={fetchBarcode}
      />

      {/* Full PDN Modal */}
      {showPDNModal && fullPDNText && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
          }}
          onClick={() => {
            setShowPDNModal(false)
            setFullPDNText(null)
          }}
        >
          <div
            style={{
              background: '#fff',
              padding: '20px',
              borderRadius: '8px',
              maxWidth: '90%',
              maxHeight: '80%',
              overflowY: 'auto',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h5 style={{ marginBottom: '10px' }}>Detalles del paquete</h5>
            <p style={{ fontSize: '16px', margin: '10px' }}>{fullPDNText}</p>
            <button
              className="cmn__btn flex-1"
              type="button"
              style={{
                minWidth: isMobile ? '80px' : '100px',
                textAlign: 'center',
                padding: isMobile ? '6px' : '8px',
                display: 'block',
                fontSize: isMobile ? '0.875rem' : '1rem',
              }}
              onClick={() => {
                setShowPDNModal(false)
                setFullPDNText(null)
              }}
            >
              <span>Cerrar</span>
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default Packages
