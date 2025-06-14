import HomeFilterOptions from "../common/HomeFilterOptions";
import RechargePaymentbox from "../common/RechargePaymentbox";
import RechargePaymentboxTwo from "../common/RechargePaymentboxTwo";
import PaymentSponsorSlider from "../slider/PaymentSponsorSlider";
import electricity from "/public/img/banner/electricity.jpg";

const sliderData = [
  { id: 1, img: electricity },
  { id: 2, img: electricity },
  { id: 3, img: electricity },
];

const Banner = () => {
  return (
    <section className="banner__section">
      {/* Container */}
      <div className="container">
        <div
          className="fasilities__wrapper pb__40 wow fadeInUp"
          data-wow-duration="2s"
        >
          {/* Home Filter Options */}
          {/*   */}
        </div>

        <div className="fasilities__body wow fadeInUp" data-wow-duration="3s">
          <div className="row g-4 justify-content-center">
            <div className="col-xxl-8 col-xl-8 col-lg-8 col-md-6">
              <div className="recharge__paymentbox">
                {/* Recharge Payment box */}
                <RechargePaymentboxTwo title="Pay your Electricity Bill" />
              </div>
            </div>
            <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6">
              {/* Payment Sponsor Slider */}
              <PaymentSponsorSlider sliderData={sliderData} />
            </div>
          </div>
        </div>
      </div>
      {/* Container */}
    </section>
  );
};

export default Banner;
