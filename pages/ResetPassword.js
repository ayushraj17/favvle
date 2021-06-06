import React from "react";
// import "../assets/css/Password.css";
// import "../assets/css/All.css";
import axios from "axios";
// import history from "./history";
import { withRouter } from "next/router";

class ResetPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      confirmPassword: "",
      usertoken: props.router.query.usertoken,
      error: "",
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  handlePassword = (event) => {
    this.setState({
      password: event.target.value,
    });
  };

  handleLogin = () => {
    this.props.router.push("/Login");
    //window.location.reload();
  };

  handleConfirmPassword = (event) => {
    this.setState({
      confirmPassword: event.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { password, confirmPassword, usertoken } = this.state;
    console.log(password, confirmPassword);
    if (password !== confirmPassword) {
      console.log("Password does not match");
    } else if (!password || !confirmPassword) {
      console.log("Field Empty");
    } else {
      axios
        .post(
          process.env.NEXT_PUBLIC_BASE_URL + "/users/Resetpassword",
          {
            password,
          },
          {
            headers: {
              Authorization: `Bearer ${usertoken}`,
            },
          }
        )
        .then((response) => {
          console.log(response);
          if (response.data.status) {
            console.log("Password Sucessfully Updated");
            localStorage.clear("usertoken");
            this.props.router.push(`/Login`);
          } else {
            console.log("Password is not Updated");
          }
        })
        .catch((err) => {
          if (err.response.status === 409) {
            this.setState({ error: "Error, the passwords are not matching!" });
          } else {
            console.log(err);
          }
        });
    }
  };

  render() {
    return (
      <div className="password-page reset-pass">
        <div className="container">
          <div className="row row-link d-flex justify-content-center d-md-none">
            <div className="col">
              <a
                className="back-link"
                onClick={() => this.props.history.goBack()}
              >
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
                <h3>Reset Password</h3>
                <h6>Please choose a new password. </h6>
                <form className="mt-4 d-flex flex-column justify-content-center align-items-center">
                  <input
                    type="password"
                    id="email"
                    placeholder="Password"
                    onChange={this.handlePassword}
                    className="input-login input-pwd-one"
                  />
                  <input
                    type="password"
                    id="email1"
                    placeholder="Confirm Password"
                    onChange={this.handleConfirmPassword}
                    className="input-login input-pwd-two mt-3"
                  />
                  <button className="btn btn-reset" onClick={this.handleSubmit}>
                    Reset
                  </button>
                  <div className="row row-absol">
                    <div className="col-9 d-flex justify-content-center">
                      <a>
                        <img
                          src="/Images/password/icon_open.svg"
                          className="one see-password"
                          alt="..."
                        />
                      </a>
                      <a>
                        <img
                          src="/Images/password/icon_open.svg"
                          className="two see-password"
                          alt="..."
                        />
                      </a>
                    </div>
                  </div>
                </form>
              </div>
            </div>

            <div className="row row-invalid">
              <div className="col d-flex justify-content-center">
                <p className="mt-2 invalid-text">{this.setState.error}</p>
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
              <p className="text-center mb-2">Follow us on: </p>
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

export default withRouter(ResetPassword);
