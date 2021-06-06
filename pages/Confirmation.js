import React from "react";

export default class Confirmation extends React.Component {

	componentDidMount() {
		window.scrollTo(0, 0);
	}

	render() {
		return (
			<div className="confirmation-page">
			<div className="inner-content">
				<div className="container">

					<div className="row mt-5 d-flex justify-content-center align-items-center">
						<div className="col-10 col-md-8 d-flex flex-column justify-content-center align-items-center column-content txt-box">
							<h3>Congratulations</h3>
							<p>You have successfully booked the Fan plan</p>
							<h6>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud </h6>
							<a href="#" className="btn btn-login">Continue</a>
						</div>
					</div>
				</div>
			</div>

			<footer className="d-none d-md-block">
				<div className="container">
					<div className="row justify-content-center align-items-center d-none d-md-flex">
						<div className="col-md-5 col-lg-4 d-flex justify-content-center"><p>Terms and Conditions</p></div>
						<div className="col-md-5 col-lg-4 d-flex justify-content-center align-items-center"><p className="mr-3">Follow us on: </p>
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
