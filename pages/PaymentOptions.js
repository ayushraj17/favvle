import React from "react";
// import "../assets/css/PaymentOption.css";
// import "../assets/css/All.css";

export default class PaymentOptions extends React.Component {
  render() {
    return (
      <div className="paymentOption-page">
        <div className="options d-flex d-lg-none justify-content-between align-items-center col-8 col-md-7 my-4">
          <a href="#" className="d-flex align-items-center a-plans">
            <img src="Images/login/arrow-icon.png" className="ml-1" />
            <span className="d-none d-md-block">Back to Plans</span>
          </a>
        </div>

        <div className="options-two d-flex d-lg-none justify-content-center">
          <a className="option-lk" href="#">
            Payment Options
          </a>
        </div>

        <div className="container">
          <div className="row d-flex justify-content-end">
            <div className="col-lg-8 d-none d-lg-flex flex-column justify-content-start align-items-start">
              <h2 className="my-5 ml-5">Payment Options</h2>
            </div>
          </div>
        </div>

        <div className="inner-content">
          <div className="container">
            <div className="row row-one d-flex justify-content-center">
              <div className="col-12 col-lg-4 d-flex flex-column d-lg-none justify-content-center align-items-center">
                <p className="desc-p d-block d-lg-none text-center">
                  Fan Plan $5,99/mo
                </p>
                <h5 className="header-text">Pay with card</h5>
              </div>

              <div className="col-12 d-flex d-lg-none justify-content-center col-form">
                <form className="d-flex flex-column justify-content-center align-items-start">
                  <label for="number" className="mt-4">
                    Card holder
                  </label>
                  <input
                    type="text"
                    id="email"
                    className="input-login-sm name"
                  />

                  <label for="number" className="mt-4">
                    Card number
                  </label>
                  <input
                    type="text"
                    id="email"
                    className="input-login-sm number"
                  />

                  <label for="number" className="mt-4">
                    Expiry Date
                  </label>
                  <div className="d-flex">
                    <select className="custom-select mt-3">
                      <option selected disabled>
                        Month
                      </option>
                      <option value="1">January</option>
                      <option value="2">February</option>
                      <option value="3">March</option>
                      <option value="3">April</option>
                      <option value="3">May</option>
                      <option value="3">June</option>
                      <option value="3">July</option>
                      <option value="3">August</option>
                      <option value="3">September</option>
                      <option value="3">October</option>
                      <option value="3">November</option>
                      <option value="3">December</option>
                    </select>

                    <select className="custom-select mt-3">
                      <option selected disabled>
                        Year
                      </option>
                      <option value="1">2021</option>
                      <option value="2">2022</option>
                      <option value="2">2023</option>
                      <option value="2">2024</option>
                      <option value="2">2025</option>
                    </select>
                  </div>
                </form>
              </div>

              <div className="col-or col-12 d-flex d-lg-none justify-content-center align-items-center">
                <a href="#" className="btn-start mr-5">
                  Checkout
                </a>
              </div>

              <div className="col-12 d-flex d-lg-none justify-content-center align-items-center col-or">
                <h5 style={{ fontWeight: "bolder", fontSize: 20 }}>or</h5>
              </div>

              <div className="col-12 card-detail d-flex flex-column d-lg-none justify-content-center align-items-start">
                <div className="row">
                  <div className="col-12 d-flex justify-content-between align-items-center col-paypal-sm">
                    <a href="#" className=" d-flex align-items-center">
                      <img
                        src="Images/payment/paypal.png"
                        className="img-fluid img-paypal"
                      />
                      <h6 className="pay-pal">Pay with Paypal</h6>
                    </a>
                    <a
                      href="#"
                      className="op-lk text-white d-flex justify-content-center align-items-center ml-auto"
                    >
                      <img
                        src="Images/checkout/arr-icon-2.png"
                        className="ml-2"
                      />
                    </a>
                  </div>
                </div>
              </div>

              <div className="col-4 d-none d-lg-block text-white col-txt-3">
                <h4 className="mt-3">
                  You have chosen the <span className="bold">Fan Plan</span>
                </h4>
                <h3 className="mt-5">$5,99/mo</h3>
                <div className="ls-group">
                  <p className="list text-white">+ 5 new lists every month</p>
                  <p className="list text-white">+ unlimited size of lists </p>
                  <p className="list text-white">+ design your list</p>
                  <p className="list text-white">
                    + add personalized video to lists{" "}
                  </p>
                  <p className="list text-white">
                    + add personal notes to lists
                  </p>
                  <p className="list text-white">+ unlimited revisions</p>
                </div>
                <span className="instruction">
                  Select a payment option to continue
                </span>
              </div>

              <div className="col-7 d-none d-lg-flex flex-column justify-content-start align-items-start col-payment">
                <div className="row-hundred d-flex justify-content-between align-items-center">
                  <h4>Pay with card</h4>
                  <p>Please input your details</p>
                </div>

                <div className="col-12 d-none d-lg-flex justify-content-center col-form">
                  <form className="d-flex flex-column justify-content-start align-items-start">
                    <div className="d-flex">
                      <div className="d-flex flex-column one">
                        <label for="number" className="">
                          Card holder
                        </label>
                        <input type="text" id="email" className="input-login" />
                      </div>

                      <div className="d-flex flex-column two">
                        <label for="number" className="">
                          Card number
                        </label>
                        <input type="text" id="email" className="input-login" />
                      </div>
                    </div>

                    <label for="number" className="mt-5 three">
                      Expiry Date
                    </label>
                    <div className="d-flex three">
                      <select className="custom-select mt-3">
                        <option selected disabled>
                          Month
                        </option>
                        <option value="1">January</option>
                        <option value="2">February</option>
                        <option value="3">March</option>
                        <option value="3">April</option>
                        <option value="3">May</option>
                        <option value="3">June</option>
                        <option value="3">July</option>
                        <option value="3">August</option>
                        <option value="3">September</option>
                        <option value="3">October</option>
                        <option value="3">November</option>
                        <option value="3">December</option>
                      </select>

                      <select className="custom-select mt-3">
                        <option selected disabled>
                          Year
                        </option>
                        <option value="1">2021</option>
                        <option value="2">2022</option>
                        <option value="2">2023</option>
                        <option value="2">2024</option>
                        <option value="2">2025</option>
                      </select>
                    </div>
                    <a href="#" className="btn-login">
                      Checkout
                    </a>
                  </form>
                </div>

                <div className="col d-none d-lg-flex justify-content-between align-items-center col-paypal">
                  <div className="d-flex justify-content-center align-items-center">
                    <img src="Images/payment/paypal.png" />
                    <h6 className="pay-pal">Pay with Paypal</h6>
                  </div>
                  <a href="#" className="btn-ckout">
                    Checkout
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <footer>
          <div className="container">
            <div className="row justify-content-center align-items-center d-none d-md-flex">
              <div className="col-md-5 col-lg-4 d-flex justify-content-center">
                <p>Terms and Conditions</p>
              </div>
              <div className="col-md-5 col-lg-4 d-flex justify-content-center align-items-center">
                <p>Follow us on: </p>
                <div className="logo-group d-flex justify-content-center align-items-center">
                  <a href="#">
                    <img
                      src="Images/footer/facebook.svg"
                      className="img-fluid mx-1"
                      alt="..."
                    />
                  </a>
                  <a href="#">
                    <img
                      src="Images/footer/twitter.svg"
                      className="img-fluid mx-1"
                      alt="..."
                    />
                  </a>
                  <a href="#">
                    <img
                      src="Images/footer/instagram.svg"
                      className="img-fluid mx-1"
                      alt="..."
                    />
                  </a>
                  <a href="#">
                    <img
                      src="Images/footer/whatsapp.svg"
                      className="img-fluid mx-1"
                      alt="..."
                    />
                  </a>
                </div>
              </div>
              <div className="col-md-2 col-lg-4 d-flex justify-content-center">
                <p>Copyright</p>
              </div>
            </div>

            <div className="row d-flex justify-content-center align-items-center d-md-none">
              <p className="text-center mb-2">Follow us on: </p>
              <div className="col-10 logo-group d-flex justify-content-around">
                <a href="#">
                  <img
                    src="Images/footer/facebook.svg"
                    className="img-fluid"
                    alt="..."
                  />
                </a>
                <a href="#">
                  <img
                    src="Images/footer/twitter.svg"
                    className="img-fluid"
                    alt="..."
                  />
                </a>
                <a href="#">
                  <img
                    src="Images/footer/instagram.svg"
                    className="img-fluid"
                    alt="..."
                  />
                </a>
                <a href="#">
                  <img
                    src="Images/footer/whatsapp.svg"
                    className="img-fluid"
                    alt="..."
                  />
                </a>
              </div>
            </div>

            <div className="mt-3 row d-block d-md-none">
              <div className="col d-flex justify-content-around align-items-center">
                <div>
                  <p>Terms and Conditions</p>
                </div>
                <div>
                  <p>Copyright</p>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    );
  }
}
