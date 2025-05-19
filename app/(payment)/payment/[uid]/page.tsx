export default function PaymentPage({ params }: { params: { uid: string } }) {
  return <h1>Payment ID: {params.uid}</h1>
}
