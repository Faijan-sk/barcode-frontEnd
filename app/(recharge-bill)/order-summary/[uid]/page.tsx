import Banner from '@/components/orderSummary/Banner'
import OrderSummeryMain from '@/components/orderSummary/OrderSummeryMain'

export default function OrderSummary({ params }: { params: { uid: string } }) {
  return (
    <>
      {/* Banner Section Here  */}
      <Banner />

      {/* Order Summery Main Section Here  */}

      <OrderSummeryMain skuid={params.uid} />
    </>
  )
}
