import React from "react";
// import "../assets/css/Pricing.css"
// import "../assets/css/All.css";
import axios from "axios";
// import history from "./history";
import { withRouter } from "next/router";

class Plans extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			plan_id: "",
			name: "",
			item_limit: "",
			rank_limit: "",
			Popup: false,
			loggedIn: false,
			loggedOut: true,
		};
	}

	componentDidMount() {
		const usertoken = localStorage.getItem("usertoken");
		window.scrollTo(0, 0);
		if (usertoken) {
			this.setState({
				loggedIn: true,
				loggedOut: false,
			});
		}
	}

	handlePopup = () => {
		this.setState({
			Popup: true,
		});
	};

	handleLogout = () => {
		localStorage.clear("usertoken");
		this.props.router.push("/");
	};

	handleLogin = () => {
		this.props.router.push("/Login");
		// window.location.reload();
	};

	handleAbout = () => {
		this.props.router.push("/About");
		// window.location.reload();
	};

	handleHome = () => {
		this.props.router.push("/");
		// window.location.reload();
	};

	handleProfile = () => {
		this.props.router.push("/Profile");
		// window.location.reload();
	};

	handleLibrary = () => {
		this.props.router.push("/Library");
		// window.location.reload();
	};

	handleSubmit = () => {
		const usertoken = localStorage.getItem("usertoken");
		const { plan_id, name, item_limit, rank_limit } = this.state;
		if (!usertoken) {
			this.props.router.push({
				pathname: "/Signup",
				query: {
					plan_id,
					name,
					item_limit,
					rank_limit,
				},
			});
		} else {
			axios
				.get(process.env.NEXT_PUBLIC_BASE_URL+"/users/getplans", {
					plan_id,
					name,
					item_limit,
					rank_limit,
				})
				.then((response) => {
					if (!response.data.state) {
						console.log(response);
						this.props.router.push("/PaymentOptions");
					}
				})
				.catch((err) => {
					if (err.response.status === 404);
					else console.log(err);
				});
		}
	};

	render() {
		return (
			<div className="pricing-page">
			{/* <div className="cover-page stacked-cards d-block d-lg-none"></div> */}
	
			{this.state.Popup && (
			  <div className="popup">
				<div className="popup-content">
				  <button className="btn-close" onClick={this.closePopup}></button>
				  <h4>
					The Pro Plan <br></br> will be available soon!
				  </h4>
				  <h5>Stay tuned !</h5>
				  <button className="btn-popup" onClick={this.closePopup}>
					Okey
				  </button>
				</div>
			  </div>
			)}
	
			<nav className="navbar navbar-expand-md navbar-dark bg-transparent">
			  <div className="container">
				<a className="navbar-brand d-flex justify-content-center">
				  <img
					src="Images/home/logo.png"
					onClick={this.handleHome}
					className="img-fluid d-none d-md-block"
				  />
				</a>
				<div
				  className="collapse navbar-collapse d-none d-md-block"
				  id="navbarNavAltMarkup"
				>
				  <div className="navbar-nav d-flex justify-content-between">
					<div className="d-flex justify-content-around align-items-center">
					  <a
						className="nav-link d-none d-md-block"
						onClick={this.handleHome}
					  >
						Home
					  </a>
					  <a className="nav-link" onClick={this.handleAbout}>
						About
					  </a>
					  <a className="nav-link active">
						Pricing <span className="sr-only">(current)</span>
					  </a>
					  {this.state.loggedIn && (
						<a className="nav-link" onClick={this.handleLibrary}>
						  Library
						</a>
					  )}
					  {this.state.loggedIn && (
						<a className="nav-link" onClick={this.handleProfile}>
						  Profile
						</a>
					  )}
					</div>
					{this.state.loggedIn && (
					  <div className="d-flex justify-content-around align-items-center">
						<a
						  className="nav-link d-block d-lg-none"
						  onClick={this.handleLogout}
						>
						  <img
							className="mr-1"
							src="Images/library/logout_logo.svg"
							alt=""
						  />
						  Logout
						</a>
						<a
						  className="nav-link d-none d-lg-block ml-5"
						  onClick={this.handleLogout}
						>
						  <img
							className="mr-1"
							src="Images/library/logout_logo.svg"
							alt=""
						  />
						  Logout
						</a>
					  </div>
					)}
					{this.state.loggedOut && (
					  <div className="d-flex justify-content-around align-items-center">
						<a
						  className="nav-link d-block d-lg-none"
						  onClick={this.handleLogin}
						>
						  <img
							className="mr-1"
							src="Images/logo/login-user.svg"
							alt=""
						  />
						  Login
						</a>
						<a
						  className="nav-link d-none d-lg-block ml-5"
						  onClick={this.handleLogin}
						>
						  <img
							className="mr-1"
							src="Images/logo/login-user.svg"
							alt=""
						  />
						  Login
						</a>
					  </div>
					)}
				  </div>
				</div>
			  </div>
			</nav>
	
			<div className="options d-flex d-md-none justify-content-start align-items-center col-">
			  <a onClick={() => this.props.history.goBack()}>
				<img src="Images/login/arrow-icon.png" className="" />
			  </a>
			</div>
	
			<div className="options-2 d-flex d-md-none justify-content-center align-items-center col-">
			  <a className="option-link">Plans</a>
			</div>
	
			<div className="inner-content">
			  <div className="container">
				<div className="row">
				  <div className="col d-flex flex-column justify-content-center align-items-center">
					<h2 className="mt-5 d-none d-md-block">Plans</h2>
					<p className="mt-3 text-center desc-p d-none d-md-block">
					  Choose a plan that suits your needs and create your rankings.{" "}
					</p>
					<p className="mt-3 text-center desc-p d-block d-md-none">
					Choose a plan that suits your needs and create your rankings.{" "}
					  <span className="desc-bold">Fan Plan</span> or{" "}
					  <span className="desc-bold">Professional Plan</span>
					  <br></br> for more features!
					</p>
				  </div>
				</div>
	
				<div className="row mt-5 d-none d-lg-flex">
				  <div className="col-12 col-md-4 d-flex justify-content-center align-items-end">
					<div className="card-sm">
					  <h4 className="one">Get Started</h4>
					  <h3 className="mt-3">Free</h3>
					  <div className="ls-group">
						<p className="list">
						  <img src="Images/pricing/check-icon.png" />
						  Create and save 3 ranking lists
						</p>
						<p className="list">
						  <img src="Images/pricing/check-icon.png" />
						  30 ranks per list{" "}
						</p>
						<p className="list">
						  <img src="Images/pricing/check-icon.png" />
						  Turn list into GIF{" "}
						</p>
						<p className="list">
						  <img src="Images/pricing/check-icon.png" />
						  Directly share on social media
						</p>
					  </div>
					  <a className="btn-login" onClick={this.handleSubmit}>
						Choose
					  </a>
					</div>
				  </div>
				  <div className="col-12 col-md-4 d-flex justify-content-center align-items-end">
					<div className="card-sm lg">
					  <img
						src="Images/pricing/value-icon.svg"
						className="value-icon"
					  />
					  <h4 className="two">Fan Plan</h4>
					  <h3 className="mt-3">$5,99</h3>
					  <span className="span">per month</span>
					  <h5 className="text-salmon">Everything in the free plan +</h5>
					  <div className="ls-group">
						<p className="list">
						  <img src="Images/pricing/check-icon.png" />
						  Create and save 5 ranking lists every month
						</p>
						<p className="list">
						  <img src="Images/pricing/check-icon.png" />
						  Unlimited size of lists
						</p>
						<p className="list">
						  <img src="Images/pricing/check-icon.png" />
						  Include personalized video
						</p>
						<p className="list">
						  <img src="Images/pricing/check-icon.png" />
						  Include personalized note
						</p>
						<p className="list">
						  <img src="Images/pricing/check-icon.png" />
						  Unlimited revisions
						</p>
					  </div>
					  <a className="btn-login" onClick={this.handleSubmit}>
						Choose
					  </a>
					</div>
				  </div>
				  <div className="col-12 col-md-4 d-flex justify-content-center align-items-end">
					<div className="card-sm">
					  <h4 className="three">Professional Plan</h4>
					  <h3 className="mt-3">$12,99</h3>
					  <span className="span">per month</span>
					  <h5 className="text-salmon">Everything in the free plan +</h5>
					  <div className="ls-group">
						<p className="list">
						  <img src="Images/pricing/check-icon.png" />
						  Create and save unlimited lists
						</p>
						<p className="list">
						  <img src="Images/pricing/check-icon.png" />
						  Co-working lists
						</p>
						<p className="list">
						  <img src="Images/pricing/check-icon.png" />
						  Up to 5 user accounts
						</p>
						<p className="list">
						  <img src="Images/pricing/check-icon.png" />
						  Free branded website
						</p>
					  </div>
					  <a className="btn-login" onClick={this.handlePopup}>
						Choose
					  </a>
					</div>
				  </div>
				</div>
	
				<div className="row d-block d-lg-none">
				  <div className="col">
					<div
					  id="carouselExampleControls"
					  class="carousel slide"
					  data-ride="carousel"
					>
					  <div class="carousel-inner">
						<div class="carousel-item active">
						  <div className="card-sm">
							<h4 className="one-sm">Get Started</h4>
							<h3 className="mt-3">Free</h3>
							<div className="ls-group">
							  <p className="list">
								<img src="Images/pricing/check-icon.png" />
								Create and save 3 ranking lists
							  </p>
							  <p className="list">
								<img src="Images/pricing/check-icon.png" />
								30 ranks per list{" "}
							  </p>
							  <p className="list">
								<img src="Images/pricing/check-icon.png" />
								Turn list into GIF{" "}
							  </p>
							  <p className="list">
								<img src="Images/pricing/check-icon.png" />
								Directly share on social media
							  </p>
							</div>
							<a className="btn-login" onClick={this.handleSubmit}>
							  Choose
							</a>
						  </div>
						</div>
						<div class="carousel-item">
						  <div className="card-sm lg">
							<img
							  src="Images/pricing/value-icon.svg"
							  className="value-icon"
							/>
							<h4 className="mt-3">Fan Plan</h4>
							<h3 className="mt-3">$5,99</h3>
							<span className="span">per month</span>
							<h5 className="text-salmon">
							  Everything in the free plan +
							</h5>
							<div className="ls-group">
							  <p className="list">
								<img src="Images/pricing/check-icon.png" />
								Create and save 5 ranking lists every month
							  </p>
							  <p className="list">
								<img src="Images/pricing/check-icon.png" />
								Unlimited size of lists
							  </p>
							  <p className="list">
								<img src="Images/pricing/check-icon.png" />
								Include personalized video
							  </p>
							  <p className="list">
								<img src="Images/pricing/check-icon.png" />
								Include personalized note
							  </p>
							  <p className="list">
								<img src="Images/pricing/check-icon.png" />
								Unlimited revisions
							  </p>
							</div>
							<a className="btn-login">Choose</a>
						  </div>
						</div>
						<div class="carousel-item">
						  <div className="card-sm">
							<h4 className="mt-3">Professional Plan</h4>
							<h3 className="mt-3">$12,99</h3>
							<span className="span">per month</span>
							<h5 className="text-salmon">
							  Everything in the free plan +
							</h5>
							<div className="ls-group">
							  <p className="list">
								<img src="Images/pricing/check-icon.png" />
								Create and save unlimited lists
							  </p>
							  <p className="list">
								<img src="Images/pricing/check-icon.png" />
								Co-working lists
							  </p>
							  <p className="list">
								<img src="Images/pricing/check-icon.png" />
								Up to 5 user accounts
							  </p>
							  <p className="list">
								<img src="Images/pricing/check-icon.png" />
								Free branded website
							  </p>
							</div>
							<a className="btn-login" onClick={this.handlePopup}>
							  Choose
							</a>
						  </div>
						</div>
					  </div>
					  <a
						class="carousel-control-prev"
						href="#carouselExampleControls"
						role="button"
						data-slide="prev"
					  >
						<span class="carousel-control-prev-icon" aria-hidden="true">
						  <img src="Images/logo/icon_prev.svg" />
						</span>
						<span class="sr-only">Previous</span>
					  </a>
					  <a
						class="carousel-control-next"
						href="#carouselExampleControls"
						role="button"
						data-slide="next"
					  >
						<span class="carousel-control-next-icon" aria-hidden="true">
						  <img src="Images/logo/icon_next.svg" />
						</span>
						<span class="sr-only">Next</span>
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
					<div className="logo-group d-flex justify-content-center">
					  <a href="https://www.facebook.com/Favvle-104782561816961">
						<img
						  src="Images/footer/facebook.svg"
						  className="img-fluid mx-1"
						  alt="..."
						/>
					  </a>
					  <a href="https://t.co/ml7TVNcmcP&quot">
						<img
						  src="Images/footer/twitter.svg"
						  className="img-fluid mx-1"
						  alt="..."
						/>
					  </a>
					  <a href="https://www.instagram.com/favvle_official">
						<img
						  src="Images/footer/instagram.svg"
						  className="img-fluid mx-1"
						  alt="..."
						/>
					  </a>
					  <a>
						<img
						  src="Images/footer/whatsapp.svg"
						  className="img-fluid mx-1"
						  alt="..."
						/>
					  </a>
					</div>
				  </div>
				  <div className="col-md-2 col-lg-4 d-flex justify-content-center">
					<p>Privacy</p>
				  </div>
				</div>
	
				<div className="row d-flex justify-content-center align-items-center d-block d-md-none">
				  <p className="text-center mb-2">Follow us on: </p>
				  <div className="col-10 logo-group d-flex justify-content-around">
					<a href="https://www.facebook.com/Favvle-104782561816961">
					  <img
						src="Images/footer/facebook.svg"
						className="img-fluid mx-1"
						alt="..."
					  />
					</a>
					<a href="https://t.co/ml7TVNcmcP&quot">
					  <img
						src="Images/footer/twitter.svg"
						className="img-fluid mx-1"
						alt="..."
					  />
					</a>
					<a href="https://www.instagram.com/favvle_official">
					  <img
						src="Images/footer/instagram.svg"
						className="img-fluid mx-1"
						alt="..."
					  />
					</a>
					<a>
					  <img
						src="Images/footer/whatsapp.svg"
						className="img-fluid mx-1"
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

export default withRouter(Plans);
