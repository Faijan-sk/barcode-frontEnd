import HomeFilterOptions from "../common/HomeFilterOptions";
import RechargePaymentbox from "../common/RechargePaymentbox";
import RechargePaymentboxTwo from "../common/RechargePaymentboxTwo";
import SendTopUp from "../sendTopUp/Send-top-up-two";
import PaymentSponsorSlider from "../slider/PaymentSponsorSlider";
import recharge_offer from "/public/img/banner/recharge-offer.jpg";
import SignUp from "./../../components/signup/SignupMain";
import LoginPage from "../login/loginPage";

const sliderData = [
  { id: 1, img: recharge_offer },
  { id: 2, img: recharge_offer },
  { id: 3, img: recharge_offer },
];

const Banner = () => {
  return (
    // <section className="banner__section">
    //   <div className="container">
    //     <div
    //       className="fasilities__wrapper pb__40 wow fadeInUp"
    //       data-wow-duration="2s"
    //     >
    //       {/* Home Filter Options */}
    //
    //     </div>

    //     <div className="fasilities__body wow fadeInUp" data-wow-duration="3s">
    //       <div className="row g-4 justify-content-center">
    //         <div className="col-xxl-8 col-xl-8 col-lg-8 col-md-6">
    //           <div className="recharge__paymentbox">
    //             {/* Recharge Payment box */}
    //             {/* <RechargePaymentboxTwo title="Mobile Recharge or Bill Payment" /> */}
    //             <SendTopUp />
    //           </div>
    //         </div>
    //         {/* <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6">
    //           <PaymentSponsorSlider sliderData={sliderData} />
    //         </div> */}
    //       </div>
    //     </div>
    //   </div>
    // </section>
    <>
      {/* <SignUp /> */}
      {/* <SendTopUp /> */}
      <LoginPage />
    </>
  );
};

export default Banner;
