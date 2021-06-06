import React from "react";
// import "../assets/css/Password.css";
// import "../assets/css/All.css";
// import history from "./history";
import axios from "axios";
import { withRouter } from "next/router";

class ForgotPassword extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			email: "",
			error: "",
		};
	}
	componentDidMount() {
		window.scrollTo(0, 0);
	}
	handleLogin = () => {
		this.props.router.push("/Login");
		// window.location.reload();
	};

	handleEmail = (event) => {
		this.setState({
			email: event.target.value,
		});
	};

	handleSubmit = (e) => {
		e.preventDefault();
		const { email } = this.state;
		if (!email) {
			console.log("Field Empty");
		} else {
			axios
				.post(process.env.NEXT_PUBLIC_BASE_URL + "/users/forgotPassword", {
					email,
				})
				.then((response) => {
					if (response.data.status) {
						console.log(response.data);
						this.props.router.push({
							pathname: "/ResetPassword",
							usertoken: response.data.accessToken,
						});
					} else {
						this.setState({ error: "Error, we do not recognize the email!" });
					}
				})
				.catch((err) => {
					if (err.response.status === 404) {
						this.setState({ error: "Error, we do not recognize the email!" });
					} else {
						console.log(err);
					}
				});
		}
	};
	render() {
		return (
			<div className="password-page">
			<div className="container">
			  <div className="row row-link d-flex justify-content-center d-md-none">
				<div className="col">
				  <a className="back-link"   onClick={() => this.props.route.goBack()}>
					<img src="Images/logo/arrow-left.svg" alt="" />
				  </a>
				</div>
			  </div>
			</div>
	
			<div className="inner-content">
			  <div className="container">
				<div className="row row-link d-none d-md-block">
				  <div className="col">
					<a className="back-link" onClick={this.handleLogin}>
					  <img src="Images/logo/arrow-left.svg" alt="" />
					  <span className="text-white">Back to login</span>
					</a>
				  </div>
				</div>
	
				<div className="row mt-4 d-flex justify-content-center align-items-center">
				  <div className="col-12 col-lg-8 d-flex flex-column justify-content-center align-items-center column-content txt-box">
					<h3>Forgot Password?</h3>
					<h6>
					Enter your email address and press the Send button to go on with your password updating.
					</h6>
					<form className="d-flex flex-column justify-content-center align-items-center">
					  <label for="email" className="mt-4 d-none d-md-block">
						Enter your email address
					  </label>
					  <input
						style={{minWidth:120,}}
						type="text"
						id="email"
						placeholder="Email"
						className="input-login"
						onChange={this.handleEmail}
					  />
					  <p className="mt-5 invalid-text" style={{marginBottom:-30}}>{this.state.error}</p>
					  <button className="btn-login" onClick={this.handleSubmit}>
						Send
					  </button>
					</form>
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
					<p className="mr-3">Follow us on: </p>
					<div className="logo-group d-flex justify-content-center">
					  <a>
						<img
						  src="Images/footer/facebook.svg"
						  className="img-fluid mx-1"
						  alt="..."
						/>
					  </a>
					  <a>
						<img
						  src="Images/footer/twitter.svg"
						  className="img-fluid mx-1"
						  alt="..."
						/>
					  </a>
					  <a>
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
					<p>Copyright</p>
				  </div>
				</div>
	
				<div className="row d-flex justify-content-center align-items-center d-block d-md-none">
				  <div className="col-10 logo-group d-flex justify-content-around">
					<a>
					  <img
						src="Images/footer/facebook.svg"
						className="img-fluid"
						alt="..."
					  />
					</a>
					<a>
					  <img
						src="Images/footer/twitter.svg"
						className="img-fluid"
						alt="..."
					  />
					</a>
					<a>
					  <img
						src="Images/footer/instagram.svg"
						className="img-fluid"
						alt="..."
					  />
					</a>
					<a>
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

export default withRouter(ForgotPassword);
