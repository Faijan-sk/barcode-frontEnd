'use client'
import HomeFilterOptions from '@/components/common/HomeFilterOptions'
import Banner from '@/components/order/Banner'
import OrderMain from '@/components/order/OrderMain'
import withPrivateRoute from '@/hook/withPrivateRoute'
import { useEffect, useState } from 'react'

function Order() {
  const [hasMounted, setHasMounted] = useState(false)

  useEffect(() => {
    setHasMounted(true)
  }, [])

  if (!hasMounted) return null // or skeleton
  return (
    <>
      {/* Banner Section Here  */}
      {/* <Banner /> */}
      {/* Order Main Section Here  */}
      <OrderMain />
    </>
  )
}

export default Order
