"use client";
import HomeFilterOptions from "@/components/common/HomeFilterOptions";
import Banner from "@/components/order/Banner";
import OrderMain from "@/components/order/OrderMain";
import withPrivateRoute from "@/hook/withPrivateRoute";

function Order() {
  return (
    <>
      {/* Banner Section Here  */}
      {/* <Banner /> */}
      {/* Order Main Section Here  */}
      <OrderMain />
    </>
  );
}

export default withPrivateRoute(Order);
