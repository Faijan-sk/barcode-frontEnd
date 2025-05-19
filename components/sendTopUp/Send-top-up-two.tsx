'use client'

import Image from 'next/image'
import Link from 'next/link'
import SignupImage from '@/public/img/working/workshape-main.png'
import mail from '/public/img/signup/mail.png'
import google from '/public/img/signup/google.png'
import facebook from '/public/img/signup/facebook.png'

import axiosInstance from '../../lib/axiosInstance'
import { useState } from 'react'

import { useRouter } from 'next/navigation'

import { addPlans } from '@/redux/plans'

// ** Reduxt Hook
import { useDispatch } from 'react-redux'
import SendTopUp from './Send-top-up'

const SignupMain = () => {
  // ** State
  const [phoneNumber, setPhoneNumber] = useState('1000244330')

  // ** Hook
  const dispatch = useDispatch()
  const router = useRouter()

  const handleSend = async () => {
    if (!phoneNumber) {
      alert('Please Enter Phone Number')

      return
    }
    try {
      const params = `api/get_product/`

      const res = await axiosInstance.post(params, { msisdn: phoneNumber })

      const { data } = res

      const { msisdn_info, products } = data

      dispatch(addPlans({ msisdn_info, products }))

      router.push('/order/')
    } catch (error) {
    } finally {
    }
  }

  return (
    <section className="signup__section bluar__shape">
      <div className="container">
        <div className="row align-items-center justify-content-between">
          <div className="col-xl-8 col-lg-6">
            <div className="topup__boxes d-flex flex-column align-items-center">
              <SendTopUp />
              <div className="row g-4 justify-content-center">
                {/* Center form elements */}

                <div className="col-lg-12"></div>
              </div>
            </div>
          </div>

          <div className="col-xl-4 col-lg-6">
            <div className="signup__thumb">
              <Image src={SignupImage} alt="img" className="h-100" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SignupMain
