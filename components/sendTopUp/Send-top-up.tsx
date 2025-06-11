'use client'
import Link from 'next/link'
import React, { useContext, useEffect, useState } from 'react'
import ReactPhoneInput from 'react-phone-input-2'
//** css import  */
import 'react-phone-input-2/lib/style.css'

//**images imports  */
import Image from 'next/image'
import earth from './../../public/img/pngFiles/earth.png'
import Bait from '@/public/img/operators/bienestar.jpg'
import Altan from '@/public/img/operators/finaltelcel5.jpg'
import Att from '@/public/img/operators/finalAtt.jpg'
import ThirdLogo from '@/public/img/operators/bienestar.jpg'

// ** Axios
import axiosInstance from '../../lib/axiosInstance'

// ** Routes Hook
import { useRouter } from 'next/navigation'

// ** Redux Action
import { addPlans } from '@/redux/plans'

// ** Reduxt Hook

import { useDispatch } from 'react-redux'
import parsePhoneNumberFromString, { CountryCode } from 'libphonenumber-js'
import axios, { AxiosError } from 'axios'
import withPrivateRoute from '@/hook/withPrivateRoute'
import { AuthContext } from '@/lib/context/AuthContext'
import { handleLogin } from '../order/Packages'

// ** interface
interface Country {
  name: string
  code: string
}
// ** Server Errors
interface CustomErrorResponse {
  error: string
}

const getCountryCode = (
  phoneNumber: string,
  defaultCountry: CountryCode = 'MX' // Default to 'MX' for Mexico
): string | null => {
  if (!phoneNumber) return null // Ensure phoneNumber is not empty

  const parsedNumber = parsePhoneNumberFromString(phoneNumber, defaultCountry)

  return parsedNumber ? parsedNumber.countryCallingCode : null
}
const SendTopUp: React.FC = () => {
  // ** States
  const [msisdn, setMsisdn] = useState<string>('')
  const [cuy, setCuy] = useState<string>('MX') // Set Mexico as default country
  const [opr, setOpr] = useState<string | null>(null)
  const [serverErrors, setSetServerErrors] = useState<string | null>(null)
  const [fetchPlanLoader, setFetchPlanLoader] = useState<string>('Recargar')
  const [errors, setErrors] = useState({
    msisdn: '',
    opr: '',
    cuy: '',
  })

  // ** Hook

  const dispatch = useDispatch()

  const router = useRouter()

  const { login } = useContext(AuthContext)

  const countries: Country[] = [{ name: 'Mexico', code: 'MX' }].sort((a, b) =>
    a.name.localeCompare(b.name)
  )

  const handleSend = async () => {
    const countryCode = getCountryCode(msisdn, cuy as CountryCode)

    if (!countryCode) {
      setErrors((prev) => ({
        ...prev,
        msisdn: 'Número de teléfono no válido',
      }))
      return
    }

    const body = {
      msisdn: msisdn.replace(new RegExp(`^${countryCode}`), ''), // Remove country code
      cuy,
      opr,
    }

    let hasError = false

    // ** Validate Input Fields
    Object.keys(body).forEach((key) => {
      const typedKey = key as keyof typeof body
      if (!body[typedKey]) {
        hasError = true
        setErrors((prev) => ({
          ...prev,
          [typedKey]: 'Este campo es obligatorio',
        }))
      }
    })

    if (hasError) return
    setFetchPlanLoader('Validando número...')
    try {
      setSetServerErrors('')
      const accessToken = localStorage.getItem('access')
      if (!accessToken) {
        await handleLogin()
      }
      const params = `/get_product/`
      const res = await axiosInstance.post(params, body)

      const { data } = res
      const { msisdn_info, products } = data

      setFetchPlanLoader('Obteniendo planes...')

      setTimeout(() => {
        dispatch(
          addPlans({
            msisdn_info: {
              ...msisdn_info,
              msisdn: msisdn.replace(new RegExp(`^${countryCode}`), ''),
            },
            products,
          })
        )
        router.push('/order/')
      }, 2000)
    } catch (error: unknown) {
      const axiosError = error as AxiosError<CustomErrorResponse>
      console.error('Error fetching product:', error)
      if (axiosError?.response?.status === 401) {
        handleRegenerateToken()
      }
      if (axiosError?.response?.status === 400) {
        setSetServerErrors('Teléfono Inválido')
      }
    } finally {
      setFetchPlanLoader('Planes de recarga')
    }
  }

  const handleRegenerateToken = async () => {
    try {
      await handleLogin()
      await handleSend()
    } catch (error) {
      console.log(error)
    }
  }

  // ** Handle Input Change and Remove Error Message
  const handlePhoneChange = (value: string) => {
    setMsisdn(value)
    setErrors((prev) => ({ ...prev, msisdn: '' })) // Remove error
  }

  const handleCountryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCuy(event.target.value)
    setErrors((prev) => ({ ...prev, cuy: '' })) // Remove error
  }

  const handleOperatorClick = (operator: string) => {
    setOpr(operator)
    setErrors((prev) => ({ ...prev, opr: '' })) // Remove error
  }

  useEffect(() => {}, [])

  return (
    <section className="top-up-section mt-10">
      <div
        className="container col-lg-9 text-center"
        style={{ height: '50vh' }}
      >
        <div
          style={{
            display: 'flex',
            width: '100%',
          }}
        >
          <div style={{ width: '30%', paddingRight: '10px' }}>
            <Image
              src={Altan}
              alt="Altan Logo"
              style={{
                width: '100%',
                borderRadius: '10px',
                height: '90%',
                boxShadow: '0px 4px 10px rgba(1, 1, 1, 0.2)',
              }}
            />
          </div>
          <div
            className="d-flex col-lg-9 align-items-center border rounded-pill px-3 py-2 bg-white mx-auto"
            style={{ width: '60%' }}
          >
            <Image
              style={{ height: '40px', width: '40px', marginRight: '5px' }}
              src={earth}
              alt="Earth"
            />
            <select
              className="border-0 bg-transparent fw-bold w-100"
              value={cuy}
              onChange={handleCountryChange}
              style={{ outline: 'none', cursor: 'pointer' }}
            >
              <option value="">Realiza tu recarga</option>
              {countries.map((country) => (
                <option key={country.code} value={country.code}>
                  {country.name}
                </option>
              ))}
            </select>
          </div>
          {errors.cuy && <p className="text-danger">{errors.cuy}</p>}
        </div>
        <div
          className="border rounded-3  text-center p-4 mt-3 mx-auto"
          style={{
            maxWidth: '600px',
            background: 'rgba(255, 255, 255, 0.75)',
          }}
        >
          <p className="fw-bold fs-5">Realiza tu recarga</p>
          <div
            className="custom-phone-input"
            style={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: 'rgba(240, 242, 255, 1)',
              borderRadius: '15px',
              padding: '8px',
              border: '1px solid #ccc',
              position: 'relative',
              outline: 'none',
              boxShadow: 'none',
            }}
          >
            <ReactPhoneInput
              country={cuy.toLowerCase()}
              value={msisdn}
              onChange={handlePhoneChange}
              inputClass="custom-phone-input-box"
              containerClass="custom-phone-container"
              disableDropdown={true}
              buttonStyle={{
                position: 'absolute',
                left: '10px',
                top: '50%',
                transform: 'translateY(-50%)',
                border: 'none',
                background: 'transparent',
              }}
              inputStyle={{
                paddingLeft: '50px',
                border: 'none',
                borderRadius: '1px',
                backgroundColor: 'rgba(240, 242, 255, 1)',
                fontSize: '16px',
                color: '#6c757d',
                width: '100%',
                outline: 'none',
                boxShadow: 'none',
              }}
              placeholder="Enter phone number here"
            />
          </div>
          <div style={{ height: '8px' }}>
            {errors.msisdn && <p className="text-danger">{errors.msisdn}</p>}
          </div>
          <p className="text-danger my-3 fw-bold">
            {serverErrors ? serverErrors : null}
          </p>
          <div
            className="operator__texts d-flex flex-column align-items-center text-center mt-3"
            style={{ width: '100%' }}
          >
            <p className="fw-bold fs-5"> Selecciona un operador</p>
            <div className="d-flex justify-content-center gap-3">
              {[
                { src: Bait, alt: 'telcel_logo', value: 'MVNO' },
                // { src: Att, alt: 'att_logo', value: 'TELEFONICA' },
                // { src: ThirdLogo, alt: 'moviestar', value: 'TFESV' },
              ].map((operator, index) => (
                <Image
                  key={index}
                  style={{
                    borderRadius: '10px',
                    padding: '5px',
                    width: '30%',
                    height: 'auto',
                    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
                    border: opr === operator.value ? '3px solid black' : 'none',
                    cursor: 'pointer',
                  }}
                  src={operator.src}
                  alt={operator.alt}
                  onClick={() => handleOperatorClick(operator.value)}
                />
              ))}
            </div>
            <div
              style={{
                height: '12px',
              }}
            >
              {errors.opr && <p className="text-danger">{errors.opr}</p>}
            </div>
          </div>

          <div className="mt-3 sigin__grp d-flex justify-content-center">
            <button
              className="cmn__btn no-underline"
              onClick={handleSend}
              style={{ outline: 'none', border: 'none' }}
            >
              <span>{fetchPlanLoader}</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SendTopUp
