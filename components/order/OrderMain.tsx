import Link from 'next/link'
import PaymetOptions from '../common/PaymetOptions'
import Pagination from '../pagination/Pagination'
import OrderContent from './OrderContent'
import Packages from './Packages'
import { useMemo, useState } from 'react'

import HomeFilterOptions from '@/components/common/HomeFilterOptions'

const OrderMain = () => {
  const [activeList, setActiveList] = useState<string>('Top-Up')

  const handleFilter = (p: string) => setActiveList(p)

  return (
    <section className="order__section pt__60 pb__60">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xxl-8 col-xl-10 col-lg-12">
            <div className="order__wrappers">
              {/* <div className="order__boxes"> */}

              <div className="my-5">
                <HomeFilterOptions
                  activeBtn={activeList}
                  handleFilter={handleFilter}
                />

                {/* Order Content Section */}
                {/* <OrderContent /> */}
              </div>

              <div className="choose__valu">
                {/* All Packages Here  */}
                <Packages activeList={activeList} />

                {/* Pagination Here */}
                {/* <Pagination clss="justify-content-center pt__40" /> */}
              </div>

              {/* <div className="probtn text-center pt__40">
                <Link href="/order-summary" className="cmn__btn">
                  <span>Proceesd to checkout</span>
                </Link>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default OrderMain
