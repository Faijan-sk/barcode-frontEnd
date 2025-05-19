'use client'

import Image from 'next/image'
import Link from 'next/link'
import signup from '/public/img/signup/signup.png'
import mail from '/public/img/signup/mail.png'
import google from '/public/img/signup/google.png'
import facebook from '/public/img/signup/facebook.png'

import axiosInstance from '../../lib/axiosInstance'
import { useState } from 'react'

import { useRouter } from 'next/navigation'

import { addPlans } from '@/redux/plans'

// ** Reduxt Hook
import { useDispatch } from 'react-redux'

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
          <div className="col-xl-6 col-lg-6">
            <div className="signup__boxes d-flex flex-column justify-content-center align-items-center">
              {/* Center only the form content */}
              <h4 className="text-center">Let’s get you signed in</h4>
              <p
                style={{
                  fontSize: '15px',
                }}
                className="head__pra text-center"
              >
                Enter your mobile number
              </p>
              {/* <form
                action="/order"
                className="signup__form pt__40 w-100 d-flex justify-content-center"
              > */}
              <div className="row g-4 justify-content-center">
                {/* Center form elements */}
                <div className="col-lg-12">
                  <div className="input__grp">
                    <input
                      type="number"
                      id="fname"
                      value={phoneNumber}
                      onChange={({ target }) => setPhoneNumber(target.value)}
                      placeholder="Enter here"
                      required
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="input__grp mt-3">
                    <button
                      onClick={handleSend}
                      className="btn btn-primary w-100"
                    >
                      <span>Login</span>
                    </button>
                  </div>
                </div>
              </div>
              {/* </form> */}
              <hr />
              <center>
                <hr />
                <div className="social-icons mt-4">
                  <p className="text-center mb-3">Or sign up with</p>
                  <div className="d-flex justify-content-center mb-5">
                    <Link href="#">
                      <Image
                        src={facebook}
                        alt="Facebook"
                        width={40}
                        height={40}
                        className="mx-2"
                      />
                    </Link>
                    <Link href="#">
                      <Image
                        src={google}
                        alt="Google"
                        width={40}
                        height={40}
                        className="mx-2"
                      />
                    </Link>
                    <Link href="#">
                      <Image
                        src={mail}
                        alt="Mail"
                        width={40}
                        height={40}
                        className="mx-2"
                      />
                    </Link>
                  </div>
                </div>
                <p>
                  By continuing, you agree to our Terms and Conditions and
                  acknowledge our use of your information in accordance with our
                  Privacy Notice.
                </p>
              </center>
            </div>
          </div>

          <div className="col-xl-5 col-lg-6">
            <div className="signup__thumb">
              <Image src={signup} alt="img" className="h-100" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SignupMain

/*
{
    "msisdn": "1000244330",
    "opr": "MVNO",
    "cuy": "Mexico"
}
*/
