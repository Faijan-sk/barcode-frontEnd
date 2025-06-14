import Breadcumnd from '../breadcumnd/Breadcumnd'
import SmallBanner from '../common/SmallBanner'

const Banner = () => {
  return (
    <SmallBanner title="Select Operator">
      {/* Breadcumnd Section  */}
      <Breadcumnd
        breadcrumbs={[
          ['Home', '/'],
          ['Recharge & Bill Payment', '/'],
          ['Order', '/'],
        ]}
      />
    </SmallBanner>
  )
}

export default Banner
