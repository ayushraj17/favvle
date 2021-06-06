import React from "react";

export default class Checkout extends React.Component {
	componentDidMount() {
		window.scrollTo(0, 0);
	}
	render() {
		return (
			<div className="checkout-page">
                <div className="container">
                    <div className="row row-link">
                        <div className="col">
                            <a href="#" className="back-link">
                                <img src="Images/logo/arrow-left.svg" className="mr-2" alt=""/>
                                <span className="text-white">Payment options</span>
                            </a>
                        </div>
                    </div>
                </div>

                <div className="options d-flex d-lg-none justify-content-start align-items-center col-12">
                    <a href="#">
                        <img className="mt-4" src="Images/login/arrow-icon.png" alt="..." />
                    </a>
                </div>

                <div className="container main">
                    <div className="row">
                        <div className="col options-two">
                            <a className="option-lk text-center" href="/Checkout">Checkout</a>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col d-none d-lg-flex flex-column justify-content-center align-items-center">
                            <h2 className="mt-5">Checkout</h2>
                            <p className="mt-3 mb-5 desc-p-two">Would you like to proceed with this checkout? Please check your details and confirm the checkout.</p>
                        </div>
                    </div>
                </div>

                <div className="inner-content">
                    <div className="container">
                        <div className="row row-one d-flex justify-content-center">
                            <div className="col-12 col-lg-4 d-flex flex-column d-lg-block justify-content-center align-items-start col-title">
                                <p className="d-block d-lg-none text-center desc-p-two">Would you like to proceed with the checkout of</p>
                                <h5 className="h-title-one">Fan Plan</h5>
                                <p className="desc-p">$5,99 per month</p>
                                <a href="#" className="option-link d-none d-lg-block">Change Plan <img src="Images/checkout/arrow-icon.png" alt="..." /></a>
                            </div>
                            <div className="col-10 d-flex flex-column d-lg-none justify-content-center align-items-start">
                                <h5 className="txt-sm">Card Details</h5>
                            </div>

                            <div className="col-12 card-detail d-flex flex-column d-lg-none justify-content-center align-items-start">
                                <div className="row">
                                    <div className="col">
                                        <h6 className="card-holder">Card holder: Daniel Shaw</h6>
                                        <h6>Card number: 000111000111</h6>
                                        <div className="d-flex justify-content-center align-items-center">
                                            <h6 className="uni">Expiry date: 03/2023</h6>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12">
                                        <a href="#" className="op-lk text-white d-flex justify-content-center align-items-center ml-auto">Change <img src="Images/checkout/arr-icon-2.png" className="ml-2" alt="..." /></a>
                                    </div>
                                </div>

                            </div>

                            <div className="col-10 d-block d-lg-none">
                                <div className="d-flex d-lg-none justify-content-center align-items-start ckbox">
                                    <input type="checkbox" id="agree" name="agree" value="true" />
                                    <span className="checkbox ml-2">Save this payment method as standard payment method.</span>
                                </div>
                            </div>

                            <div className="col-lg-8 d-none d-lg-block">
                                <h5 className="h-title-two">Chosen payment options card</h5>
                                <h6 className="card-holder">Card holder: Daniel Shaw</h6>
                                <h6>Card number: 000111000111</h6>
                                <div className="d-flex justify-content-between align-items-center">
                                    <h6 className="uni">Expiry date: 03/2023</h6>
                                    <a href="#" className="option-link-two">Change Payment <img src="Images/checkout/arrow-icon.png" alt="..." /></a>
                                </div>
                                <div className="d-flex justify-content-center align-items-start ckbox">
                                    <input type="checkbox" id="agree" name="agree" value="true" />
                                    <span className="checkbox ml-2">Use this payment method as standard payment method for future transactions.</span>
                                </div>
                            </div>
                        </div>


                        <div className="row mt-5">
                            <div className="col d-flex justify-content-center">
                                <a href="#" className="btn-login">Pay</a>
                            </div>
                        </div>

                    </div>
                </div>

                <footer>
                    <div className="container">
                        <div className="row justify-content-center align-items-center d-none d-md-flex">
                            <div className="col-md-5 col-lg-4 d-flex justify-content-center"><p>Terms and Conditions</p></div>
                            <div className="col-md-5 col-lg-4 d-flex justify-content-center align-items-center"><p>Follow us on: </p>
                                <div className="logo-group d-flex justify-content-center">
                                    <a href="#">
                                        <img src="Images/footer/facebook.svg" className="img-fluid mx-1" alt="..." />
                                    </a>
                                    <a href="#">
                                        <img src="Images/footer/twitter.svg" className="img-fluid mx-1" alt="..." />
                                    </a>
                                    <a href="#">
                                        <img src="Images/footer/instagram.svg" className="img-fluid mx-1" alt="..." />
                                    </a>
                                    <a href="#">
                                        <img src="Images/footer/whatsapp.svg" className="img-fluid mx-1" alt="..." />
                                    </a>
                                </div>
                            </div>
                            <div className="col-md-2 col-lg-4 d-flex justify-content-center"><p>Copyright</p></div>
                        </div>

                        <div className="row d-flex justify-content-center align-items-center d-block d-md-none"><p className="text-center mb-2">Follow us on: </p>
                            <div className="col-10 logo-group d-flex justify-content-around">
                                <a href="#">
                                    <img src="Images/footer/facebook.svg" className="img-fluid" alt="..." />
                                </a>
                                <a href="#">
                                    <img src="Images/footer/twitter.svg" className="img-fluid" alt="..." />
                                </a>
                                <a href="#">
                                    <img src="Images/footer/instagram.svg" className="img-fluid" alt="..." />
                                </a>
                                <a href="#">
                                    <img src="Images/footer/whatsapp.svg" className="img-fluid" alt="..." />
                                </a>
                            </div>
                        </div>

                        <div className="mt-3 row d-block d-md-none">
                            <div className="col d-flex justify-content-around align-items-center">
                                <div><p>Terms and Conditions</p></div>
                                <div><p>Copyright</p></div>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
		);
	}
}
