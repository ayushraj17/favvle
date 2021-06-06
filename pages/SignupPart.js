import { withRouter } from "next/router";
import React from "react";
// import "../assets/css/SignupPart2.css"
// import "../assets/css/All.css";
// import history from "./history";

class SignupPart2 extends React.Component {
  handleHome = () => {
    this.props.router.push("/");
    // window.location.reload();
  };
  componentDidMount() {
    window.scrollTo(0, 0);
  }
  render() {
    return (
      <div class="signup2-page">
        <div className="row">
          <div className="options d-flex d-md-none justify-content-between align-items-center col-7">
            <a href="#">
              <img src="Images/login/arrow-icon.png" className="ml-5" />
            </a>
            <a className="option-link" href="#">
              Sign Up
            </a>
          </div>
        </div>

        <div className="row hero">
          <div className="col-md-6 col-right row-login">
            <div className="row mt-4">
              <div className="col d-flex flex-column justify-content-center align-items-center">
                <h4 className="d-block">
                  Well done! You’ve created an account on Favvle!
                </h4>
                <a href="#" className="btn-login" onClick={this.handleHome}>
                  Continue
                </a>
              </div>
            </div>
          </div>

          <div className="col-md-6 d-none d-md-flex flex-column col-left">
            <nav className="navbar navbar-expand-md navbar-dark bg-transparent">
              <div className="container">
                <a
                  className="navbar-brand d-flex justify-content-center"
                  href="#"
                >
                  <img
                    src="Images/about/logo.png"
                    className="img-fluid img-logo"
                  />
                </a>
              </div>
            </nav>
            <h3 className="text-white mt-3">Create, share, rank, compare</h3>
            <ul>
              <li>
                <img src="Images/signup/ellipse.svg" alt="" />
                Create beautiful rankings, with up to 25 items in each ranking
              </li>
              <li>
                <img src="Images/signup/ellipse.svg" alt="" />
                Use simple Drag & Drop functionality to rank your lists
              </li>
              <li>
                <img src="Images/signup/ellipse.svg" alt="" />
                Easily and quickly share your rankings on social media
              </li>
              <li>Create and share a unique GIF-version of your ranking</li>
              <li>
                <img src="Images/signup/ellipse.svg" alt="" />
                Personalize your ranking with Favvle’s design tools
              </li>
              <li>
                <img src="Images/signup/ellipse.svg" alt="" />
                Save up to 10 unique rankings to your personal library
              </li>
            </ul>
            <img
              src="Images/login/2.png"
              className="img-fluid bg-signup img-one"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(SignupPart2);
