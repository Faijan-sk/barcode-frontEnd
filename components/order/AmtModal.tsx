import React, { SetStateAction, useState } from 'react'
import Input from 'react-select/dist/declarations/src/components/Input'

import oxxo from '@/public/img/operators/store/oxxo.jpeg'
import seven from '@/public/img/operators/store/seven-11.jpeg'
import Soriana from '@/public/img/operators/store/Soriana.webp'

import Image from 'next/image'
import axiosInstance from '@/lib/axiosInstance'
import { handleLogin } from './Packages'

// ** Routes Hook
import { useRouter } from 'next/navigation'
import { useDispatch } from 'react-redux'
import { removePlans } from '@/redux/plans'

const images = [
  {
    image: oxxo,
    value: 'oxxo_mx',
  },
  {
    image: seven,
    value: 'sipe_mx',
  },
  {
    image: Soriana,
    value: '',
  },
]

interface AmtModalProps {
  showModal: boolean
  handleClose: () => void
  title: string
  selectedPlan: object
  sendToServer: Function
}

const AmtModal: React.FC<AmtModalProps> = ({
  showModal,
  handleClose,
  title,
  selectedPlan,
  sendToServer,
}) => {
  // ** State
  const [amount, setAmount] = useState<any>() // Specify number type explicitly

  const router = useRouter()
  const dispatch = useDispatch()

  const handleSend = () => {
    if (!amount) {
      alert('Please Enter Amount')
      return
    }
    const data = {
      ...selectedPlan,
      amount,
    }
    handleClose()
    sendToServer(data)
  }

  const handleGenerateBarcode = async (tmid: string) => {
    debugger
    const newTab = window.open('', '_blank')

    if (!newTab) {
      alert(
        'El bloqueador de ventanas emergentes impidió abrir una nueva pestaña. Por favor, permite las ventanas emergentes para este sitio.'
        //'Popup blocker prevented opening a new tab. Please allow pop-ups for this site.'
      )
      return
    }
    try {
      // const accessToken = localStorage.getItem('access')
      // if (!accessToken) {
      //   await handleLogin()
      // }
      const res = await axiosInstance.post('/generate-barcode/', {
        ...selectedPlan,
        tmid,
      })
      const { data } = res

      if (data.payment_response.url) {
        newTab.location.href = data.payment_response.url
      } else {
        alert('No se pudo generar la URL del código de barras.')
        newTab.close()
      }
    } catch (error: unknown) {
      debugger
      if (
        typeof error === 'object' &&
        error !== null &&
        'response' in error &&
        typeof (error as any).response === 'object' &&
        (error as any).response?.status === 401
      ) {
        localStorage.removeItem('access')
        localStorage.removeItem('plansDetails')
        router.replace('/send-top-up/')
        dispatch(removePlans())
      }

      alert('¡Algo salió mal!')
      console.error('Error generating barcode:', error)
      newTab.close()
    }
  }

  return (
    <div
      className={`modal fade ${showModal ? 'show d-block' : ''}`}
      tabIndex={-1}
      role="dialog"
      style={{ background: showModal ? 'rgba(0,0,0,0.5)' : 'none' }}
    >
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{title}</h5>
            <button
              type="button"
              className="btn-close"
              onClick={handleClose}
            ></button>
          </div>
          <div className="modal-body">
            <div className="d-flex justify-content-center gap-3">
              {[
                { src: oxxo, alt: 'telcel_logo', value: 'oxxo_mx' },
                { src: seven, alt: 'att_logo', value: 'sipe_mx' },
                { src: Soriana, alt: 'moviestar', value: 'sipe_mx' },
              ].map((operator, index) => (
                <Image
                  key={index}
                  style={{
                    borderRadius: '10px',
                    padding: '5px',
                    width: '20%',
                    height: 'auto',
                    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
                    // border: opr === operator.value ? "3px solid black" : "none",
                    cursor: 'pointer',
                  }}
                  src={operator.src}
                  alt={operator.alt}
                  onClick={() => handleGenerateBarcode(operator.value)}
                />
              ))}
            </div>
          </div>
          <div className="modal-footer">
            {/* <button
              type="button"
              className="btn btn-primary"
              // onClick={() => }
            >
              Generate Barcode
            </button> */}
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleClose}
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AmtModal

/*

{
    "selected_product": {
        "Skuid": "0",
        "amt": 100,
        "pdn": "XOOM_100_MXN"
    },
    "payment_response": {
        "barcodeUrl": "https://static.muwe.mx/stable/referencia/barCode/20250328/db67f80a5ce54d1eac3763b13127c825.png",
        "expiresAt": 1743769381425,
        "identifier": "ENEFEVO",
        "mchId": 880924000000423,
        "nonceStr": "4tbVwwkMVKKJb7S0",
        "qrCodeUrl": "https://static.muwe.mx/stable/referencia/qrCode/20250328/06531ee21ce24e8f97b6c1c4c538dccd.png",
        "reference": "470423003052025040400100005426",
        "resCode": "SUCCESS",
        "sign": "376DC26DFFB3CF65AB94A4A796C93A91",
        "token": "pSNA7caextS4JFNA6WfjN2yKLPGuNrDoD++5Jg+9T48aSvFmX27Jls0uZWqLbLUUR1IpTutXNH11m1kyEd4FltbhDuMDBy3Hg3EuuNGNe5KXMWQezUkQb0GJw06tS8ihYLY+89MrCDPHUZt49XwFR3biZ3udvYm+5K/ob9Ae7661HupzvSiWCyiW2Yfc7zl6KBH7xkQ48a3kppsPpO5q8+hF6lfBeEe70nRwReqA8/TFk1zWRyYDWgpKW9VF/tg+JnCYH6Bg8fOF8nc5J0YBEDrQRgZdMcS4sGThOyBs837U0Lz5rMZ/zT2ibggozEbDd/V2FarvO9+cQmIPfQIW7g3dypDPO1JJLrgyzAM3j3qV7wiouzz/0PtsJt8LXPveP66yppRpqDFKqsrgu1Ogiot+PcZPWyxe4ziKvOdGFeJdBbQ6reA62Qlcx2vdBpRoibOC/JomwKqaWFFCHjfJyc6HPtrhCIgypzoSUTA+z6fflEl2e/lZxo7VtNvcEKQSYNNVx+Pvu4aK5S/jagYCv9hJlypq84QaLR1pMk1heVY=",
        "url": "https://stable-static-pay.sipelatam.mx?token=pSNA7caextS4JFNA6WfjN2yKLPGuNrDoD++5Jg+9T48aSvFmX27Jls0uZWqLbLUUR1IpTutXNH11m1kyEd4FltbhDuMDBy3Hg3EuuNGNe5KXMWQezUkQb0GJw06tS8ihYLY+89MrCDPHUZt49XwFR3biZ3udvYm+5K/ob9Ae7661HupzvSiWCyiW2Yfc7zl6KBH7xkQ48a3kppsPpO5q8+hF6lfBeEe70nRwReqA8/TFk1zWRyYDWgpKW9VF/tg+JnCYH6Bg8fOF8nc5J0YBEDrQRgZdMcS4sGThOyBs837U0Lz5rMZ/zT2ibggozEbDd/V2FarvO9+cQmIPfQIW7g3dypDPO1JJLrgyzAM3j3qV7wiouzz/0PtsJt8LXPveP66yppRpqDFKqsrgu1Ogiot+PcZPWyxe4ziKvOdGFeJdBbQ6reA62Qlcx2vdBpRoibOC/JomwKqaWFFCHjfJyc6HPtrhCIgypzoSUTA+z6fflEl2e/lZxo7VtNvcEKQSYNNVx+Pvu4aK5S/jagYCv9hJlypq84QaLR1pMk1heVY="
    }
}

*/
