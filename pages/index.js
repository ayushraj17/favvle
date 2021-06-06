import React from "react";
// import "../assets/css/Home.css";
// import history from "./history";
import axios from "axios";
import { withRouter } from "next/router";

class Home extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			name: "",
			loggedIn: false,
			loggedOut: true,
			home:false,
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
		axios
			.get(process.env.NEXT_PUBLIC_BASE_URL + "/admin/gethome")
			.then((response) => {
				console.log("gethome",response.data);
				if (response.status == 200) {
					console.log("success");
					this.setState({
						home:response.data.home!==undefined?response.data.home:true
					});
				} else {
					console.log("Data Not Fetch");
				}
			})
			.catch((err) => {
				if (err.status === 409) {
					console.log("something went wrong");
				} else {
					console.log(err);
				}
			});
		axios
			.get(process.env.NEXT_PUBLIC_BASE_URL + "/admin/gettexts", { params: { page: "home" } })
			.then((response) => {
				console.log(response);
				if (response.status == 200) {
					console.log("success");
					this.setState({
						text1: response.data.texts.text1,
						text2: response.data.texts.text2,
						text3: response.data.texts.text3,
						text4: response.data.texts.text4,
						text5: response.data.texts.text5,
					});
				} else {
					console.log("Data Not Fetch");
				}
			})
			.catch((err) => {
				if (err.status === 409) {
					console.log("something went wrong");
				} else {
					console.log(err);
				}
			});

	}

	handleHome = () => {
		this.props.router.push("/");
		// window.location.reload();
	};

	handleAbout = () => {
		this.props.router.push("/About");
		// window.location.reload();
	};
	handlePricing = () => {
		this.props.router.push("/Plans");
		// window.location.reload();
	};

	handleRanking = () => {
		this.handleSubmit();
	};

	handleLogin = () => {
		this.props.router.push("/Login");
		// window.location.reload();
	};

	handleLibrary = () => {
		this.props.router.push("/Library");
		// window.location.reload();
	};

	handleProfile = () => {
		this.props.router.push("/Profile");
		// window.location.reload();
	};

	handleInput = (event) => {
		this.setState({
			name: event.target.value,
		});
	};

	handleLogout = () => {
		localStorage.clear("usertoken");
		this.props.router.push("/");
		window.location.reload();
	};

	handleSubmit = () => {
		const name = this.state.name;
		this.props.router.push({
			pathname: "/Categories",
			query: { name },
		});
	};

	render() {
		return (
			<div className="home-page">
			<nav className="navbar navbar-expand-md navbar-dark bg-transparent">
			  <div className="container">
				<a className="d-none d-md-flex navbar-brand justify-content-center">
				  <img
					src="Images/home/logo.png"
					onClick={this.handleHome}
					className="img-fluid"
					alt="..."
				  />
				</a>
				<div
				  className="collapse navbar-collapse d-none d-md-block"
				  id="navbarNavAltMarkup"
				>
				  <div className="navbar-nav d-flex justify-content-between">
					<div className="d-flex justify-content-around align-items-center">
					  <a className="nav-link active " onClick={this.handleHome}>
						Home{" "}
					  </a>
					  <a className="nav-link" onClick={this.handleAbout}>
						About
					  </a>
					  {/* <a className="nav-link" onClick={this.handlePricing}>Pricing</a> */}
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
	
					{/* Guest - Start */}
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
					{/* Guest - End */}
	
					{/* Registered - Start */}
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
					{/* Registered - End */}
				  </div>
				</div>
			  </div>
			</nav>
	
			<div className="container">
			  <div className="row">
				<div className="col d-flex d-md-none justify-content-center">
				  <img
					src="Images/home/logo.png"
					onClick={this.handleHome}
					className="logo-sm"
					alt="..."
				  />
				</div>
			  </div>
			</div>
	
			<div className="options d-flex d-md-none justify-content-around align-items-center">
			  <a className="option-link active" onClick={this.handleHome}>
				Home
			  </a>
			  <a className="option-link" onClick={this.handleAbout}>
				About
			  </a>
			  {/* <a className="option-link" onClick={this.handlePricing}>Pricing</a> */}
			  {this.state.loggedIn && (
				<a className="option-link" onClick={this.handleLibrary}>
				  Library
				</a>
			  )}
			  {this.state.loggedIn && (
				<a className="option-link" onClick={this.handleProfile}>
				  Profile
				</a>
			  )}
			  {this.state.loggedOut && (
				<a className="option-link" onClick={this.handleLogin}>
				  Login
				</a>
			  )}
			  {!this.state.loggedOut && (
				<a className="option-link" onClick={this.handleLogout}>
				  Logout
				</a>
			  )}
			</div>
	
			<div className="hero">
			  <div className="container">
				<div className="row">
				  <div className="col-12 col-md-8">
					<h3 className="hero-txt text-white text-uppercase">
					  Create your own, impressive rankings with{" "}
					  <span className="text-grad">Ranked</span>
					</h3>
					<p className="text-white">
					  {this.state.text1
						? this.state.text1
						: "You always wanted an easy and fast tool to create amazing rankings? With Ranked you can do all that and more! Start your ranking now."}
					</p>
				  </div>
				  <div className="col-md-4">
					<img
					  src="Images/home/home-hero.svg"
					  className="img-hero"
					  alt="..."
					/>
					<img
					  src="Images/home/home-hero.svg"
					  className="img-alter d-none"
					  alt="..."
					/>
				  </div>
				</div>
				<div className="row">
				  <div className="col-md-8 col-lg-6 d-flex flex-column justify-content-start align-items-start">
					{this.state.home&&<input
					  type="text"
					  className="input-search"
					  onChange={this.handleInput}
					  placeholder="Enter the title of your Ranking, like ‘My Favorite Movies This Year’"
					/>}
					<button className="btn-start mt-3" onClick={this.handleSubmit}>
					  Start Ranking
					</button>
				  </div>
				</div>
			  </div>
			</div>
	
			<section className="why-ranked">
			  <img
				src="Images/home/image_ranking_2_ek2.png"
				className="d-block d-md-none img-fluid img-absol one"
				alt="..."
			  />
			  <img
				src="Images/home/image_ranking_1_ek2.png"
				className="d-block d-md-none img-fluid img-absol two"
				alt="..."
			  />
			  <div className="container">
				<div className="row d-flex justify-content-center align-items-center mt-5">
				  <div className="col-12 col-md-6">
					<p className="desc-p text-white one">
					  {this.state.text2
						? this.state.text2
						: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."}
					</p>
					<button className="btn-start mt-5" onClick={this.handleRanking}>
					  Start Ranking
					</button>
				  </div>
				  <div className="d-none d-md-block col-md-6">
					<img
					  src="Images/home/home_1.svg"
					  className="img-fluid"
					  alt="..."
					/>
				  </div>
				</div>
				<div className="row d-flex justify-content-center align-items-center mt-5">
				  <div className="d-none d-md-block col-md-6">
					<img
					  src="Images/home/home_2.svg"
					  className="img-fluid two"
					  alt="..."
					/>
					<img src="" alt="" />
				  </div>
				  <div className="col-12 col-md-6 d-flex flex-column align-items-end">
					<p className="text-right desc-p green">
					  {this.state.text3
						? this.state.text3
						: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."}
					</p>
					<button className="btn-start mt-5" onClick={this.handleRanking}>
					  Start Ranking
					</button>
				  </div>
				</div>
				<div className="row d-flex justify-content-center align-items-center mt-5">
				  <div className="col-12 col-md-6">
					<p className="desc-p green">
					  {this.state.text4
						? this.state.text4
						: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."}
					</p>
					<button className="btn-start mt-5" onClick={this.handleRanking}>
					  Start Ranking
					</button>
				  </div>
				  <div className="d-none d-md-block col-md-6">
					<img
					  src="Images/home/home_3.svg"
					  className="img-fluid two"
					  alt="..."
					/>
				  </div>
				</div>
	
				<div className="row">
				  <div className="col-12">
					<p className="text-white text-center desc-two">
					  {this.state.text5
						? this.state.text5
						: "You always wanted an easy and fast tool to create amazing rankings? With Ranked you can do all that and more! Start your ranking now.You always wanted an easy and fast tool to create amazing rankings? With Ranked you can do all that and more! Start your ranking now.You always wanted an easy and fast tool to create amazing rankings? With Ranked you can do all that and more! Start your ranking now.You always wanted an easy and fast tool to create amazing rankings? With Ranked you can do all that and more! Start your ranking now.You always wanted an easy and fast tool to create "}
					</p>
				  </div>
				</div>
			  </div>
			</section>
	
			<section className="content-sm">
			  <div className="row my-3">
				<div className="col">
				  <div
					id="carouselExampleIndicators"
					className="carousel slide"
					data-ride="carousel"
				  >
					<ol className="carousel-indicators">
					  <li
						data-target="#carouselExampleIndicators"
						data-slide-to="0"
						className="active"
					  ></li>
					  <li
						data-target="#carouselExampleIndicators"
						data-slide-to="1"
					  ></li>
					  <li
						data-target="#carouselExampleIndicators"
						data-slide-to="2"
					  ></li>
					  <li
						data-target="#carouselExampleIndicators"
						data-slide-to="3"
					  ></li>
					</ol>
					<div className="carousel-inner">
					  <div className="carousel-item active first">
						<div className="row mb-2">
						  <div className="col d-flex justify-content-center align-items-center">
							<h3 className="hero-txt text-center text-white text-uppercase">
							  Create your own,<br></br> impressive rankings with
							  <br></br> Ranked
							</h3>
						  </div>
						</div>
						<div className="row">
						  <div className="col">
							<img
							  src="Images/home/carousel/home_4.svg"
							  className="img-fluid"
							  alt="..."
							/>
						  </div>
						</div>
						<div className="row carousel-absol">
						  <div className="col">
							<p className="carousel-p">
							  {this.state.text2
								? this.state.text2
								: "You always wanted an easy and fast tool to create amazing rankings? With Ranked you can do all that and more! Start your ranking now."}
							</p>
						  </div>
						</div>
					  </div>
					  <div className="carousel-item">
						<div className="row">
						  <div className="col col-car-img">
							<img
							  src="Images/home/carousel/home_1.svg"
							  className="img-fluid"
							  alt="..."
							/>
						  </div>
						</div>
						<div className="row carousel-absol">
						  <div className="col">
							<p className="carousel-p">
							  {this.state.text3
								? this.state.text3
								: "Create stunning lists using an easy-to-use interface and simple Drag & Drop. Just name your ranking, create a list, rank the items on your list and voila… your ranking is ready!"}
							</p>
						  </div>
						</div>
					  </div>
					  <div className="carousel-item">
						<div className="row">
						  <div className="col col-car-img">
							<img
							  src="Images/home/carousel/home_2.svg"
							  className="img-fluid"
							  alt="..."
							/>
						  </div>
						</div>
						<div className="row carousel-absol">
						  <div className="col">
							<p className="carousel-p">
							  {this.state.text4
								? this.state.text4
								: "Easily and quickly share your unique ranking on Facebook, Twitter and other social channels. Or choose to embed your personalized ranking on your website or in an email to friends."}
							</p>
						  </div>
						</div>
					  </div>
					  <div className="carousel-item">
						<div className="row">
						  <div className="col col-car-img">
							<img
							  src="Images/home/carousel/home_3.svg"
							  className="img-fluid"
							  alt="..."
							/>
						  </div>
						</div>
						<div className="row carousel-absol">
						  <div className="col">
							<p className="carousel-p">
							  {this.state.text3
								? this.state.text3
								: "Compare your ranking with friends, family, colleagues and dates. Instantly see what you have in common or… Start the debate!"}
							</p>
						  </div>
						</div>
					  </div>
					</div>
					<a
					  class="carousel-control-prev"
					  href="#carouselExampleControls"
					  role="button"
					  data-slide="prev"
					>
					  <span
						class="carousel-control-prev-icon"
						aria-hidden="true"
					  ></span>
					  <span class="sr-only">Previous</span>
					</a>
					<a
					  class="carousel-control-next"
					  href="#carouselExampleControls"
					  role="button"
					  data-slide="next"
					>
					  <span
						class="carousel-control-next-icon"
						aria-hidden="true"
					  ></span>
					  <span class="sr-only">Next</span>
					</a>
				  </div>
				</div>
			  </div>
			</section>
	
			<section className="content-sm">
			  <div className="container">
				<div className="row mb-5">
				  <div className="col-12 d-flex flex-column justify-content-center align-items-center">
				  {this.state.home&&<input
					  type="text"
					  className="input-search"
					  onChange={this.handleInput}
					  placeholder="Enter rank title like ‘Best Movies’"
					/>}
					<button className="btn-start mt-3" onClick={this.handleSubmit}>
					  Start
					</button>
				  </div>
				</div>
	
				<div className="row">
				  <div className="col">
					<p className="paragraph-seo">
					  {this.state.text5
						? this.state.text5
						: "Test for SEO, Test for SEO, Test for SEO, Test for SEO, Test for SEO, Test for SEO, Test for SEO, Test for SEO, Test for SEO, Test for SEO, Test for SEO, Test for SEO, Test for SEO, "}
					</p>
				  </div>
				</div>
			  </div>
			</section>
	
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
					  <p>Privacy</p>
					</div>
				  </div>
				</div>
			  </div>
			</footer>
		  </div>
		);
	}
}

export default withRouter(Home);
