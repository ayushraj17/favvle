import React from "react";
// import "../assets/css/Profile.css";
// import "../assets/css/All.css";
import axios from "axios";
import { withRouter } from "next/router";

class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      name: "",
      editname: "",
      oldEmail: "",
      newEmail: "",
      oldPassword: "",
      newPassword: "",
      image: "",
      type: "website",
    };
  }

  handleLogout = () => {
    localStorage.clear("usertoken");
    this.props.router.push("/");
  };

  componentDidMount() {
    window.scrollTo(0, 0);
    const usertoken = localStorage.getItem("usertoken");
    axios
      .get(process.env.NEXT_PUBLIC_BASE_URL + "/users/getprofile", {
        headers: {
          authorization: `Bearer ${usertoken}`,
        },
      })
      .then((response) => {
        console.log("User Name", response.data);
        this.setState({
          name: response.data.profile.name,
          type: response.data.profile.type,
        });
        if (response.data.profile.profile_img) {
          this.setState({
            image: process.env.NEXT_PUBLIC_BASE_URL + "/" + response.data.profile.profile_img,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  handleImage = (event) => {
    const usertoken = localStorage.getItem("usertoken");
    let form = new FormData();
    form.append("profilepic", event.target.files[0]);
    axios
      .post(process.env.NEXT_PUBLIC_BASE_URL + "/users/updateprofilepic", form, {
        headers: {
          authorization: `Bearer ${usertoken}`,
        },
      })
      .then((response) => {
        console.log("User Name", response.data);
        this.setState({
          image: URL.createObjectURL(event.target.files[0]),
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handleProfile = () => {
    this.props.router.push("/Profile");
    // window.location.reload();
  };

  handleLibrary = () => {
    this.props.router.push("/Library");
    //  // window.location.reload();
  };

  handlePlan = () => {
    this.props.router.push("/Plans");
    // window.location.reload();
  };

  handleName = (event) => {
    this.setState({
      editname: event.target.value,
    });
    console.log();
  };

  handleoldEmail = (event) => {
    this.setState({
      oldEmail: event.target.value,
    });
    console.log();
  };

  handlenewEmail = (event) => {
    this.setState({
      newEmail: event.target.value,
    });
    console.log();
  };

  handleoldPassword = (event) => {
    this.setState({
      oldPassword: event.target.value,
    });
    console.log();
  };

  handlenewPassword = (event) => {
    this.setState({
      newPassword: event.target.value,
    });
    console.log();
  };

  handleSavename = () => {
    const usertoken = localStorage.getItem("usertoken");
    const name = this.state.editname;
    axios
      .post(
        process.env.NEXT_PUBLIC_BASE_URL + "/users/updateName",
        {
          name,
        },
        {
          headers: {
            authorization: `Bearer ${usertoken}`,
          },
        }
      )
      .then((response) => {
        console.log("profile", response);
        if (!response.data.status) {
          console.log("Cannot Change User Name");
        } else {
          this.setState({ name: response.data.name });
          console.log("Name Successfully Updated");
        }
      })
      .catch((err) => {
        if (err.response.status === 404) console.log("Something Went Wrong");
        else console.log(err);
      });
  };

  handleMail = () => {
    console.log(this.state.newEmail);
    console.log(this.state.oldEmail);
    const usertoken = localStorage.getItem("usertoken");
    const old_mail = this.state.oldEmail;
    const new_mail = this.state.newEmail;
    axios
      .post(
        process.env.NEXT_PUBLIC_BASE_URL + "/users/updateMail",
        {
          old_mail,
          new_mail,
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
          console.log("Sucessfully Password Updated");
        } else {
          console.log("Password does not Updated");
        }
      })
      .catch((err) => {
        if (err.response.status === 409) {
          console.log("something went wrong");
        } else {
          console.log(err);
        }
      });
  };

  handlePassword = () => {
    console.log(this.state.oldPassword);
    console.log(this.state.newPassword);
    const usertoken = localStorage.getItem("usertoken");
    const old_password = this.state.oldPassword;
    const new_password = this.state.newPassword;
    axios
      .post(
        process.env.NEXT_PUBLIC_BASE_URL + "/users/updatePassword",
        {
          old_password,
          new_password,
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
          console.log("updated password successfully");
        } else {
          console.log("Password does not Updated");
        }
      })
      .catch((err) => {
        if (err.response.status === 409) {
          console.log("Mail does not updated");
        } else {
          console.log(err);
        }
      });
  };

  handleMobileSave = () => {
    const usertoken = localStorage.getItem("usertoken");
    const old_password = this.state.oldPassword;
    const new_password = this.state.newPassword;
    const old_mail = this.state.oldEmail;
    const new_mail = this.state.newEmail;
    const name = this.state.editname;
    if (name) {
      axios
        .post(
          process.env.NEXT_PUBLIC_BASE_URL + "/users/updateName",
          {
            name,
          },
          {
            headers: {
              authorization: `Bearer ${usertoken}`,
            },
          }
        )
        .then((response) => {
          console.log("profile", response);
          if (!response.data.status) {
            console.log("Cannot Change User Name");
          } else {
            console.log("Name Successfully Updated");
          }
        })
        .catch((err) => {
          if (err.response.status === 404) console.log("Something Went Wrong");
          else console.log(err);
        });
    }
    if (old_mail || new_mail) {
      axios
        .post(
          process.env.NEXT_PUBLIC_BASE_URL + "/users/updateMail",
          {
            old_mail,
            new_mail,
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
            console.log("Mail Sucessfully Updated");
          } else {
            console.log("Mail Not Updated");
          }
        })
        .catch((err) => {
          if (err.response.status === 409) {
            console.log("something went wrong");
          } else {
            console.log(err);
          }
        });
    }
    if (old_password || new_password) {
      axios
        .post(
          process.env.NEXT_PUBLIC_BASE_URL + "/users/updatePassword",
          {
            old_password,
            new_password,
          },
          {
            headers: {
              Authorization: `Bearer ${usertoken}`,
            },
          }
        )
        .then((response) => {
          console.log(response);
          if (!response.data.status) {
            console.log("Paswword does not successfully");
          } else {
            console.log("Password Updated");
          }
        })
        .catch((err) => {
          if (err.response.status === 409) {
            console.log("Mail does not updated");
          } else {
            console.log(err);
          }
        });
    }
  };

  handleAbout = () => {
    this.props.router.push("/About");
    // window.location.reload();
  };

  handlePricing = () => {
    this.props.router.push("/Plans");
    // window.location.reload();
  };

  handleHome = () => {
    this.props.router.push("/");
    // window.location.reload();
  };

  handleLibrary = () => {
    this.props.router.push("/Library");
    //  // window.location.reload();
  };

  render() {
    return (
      <div className="profile-page">
        <nav className="navbar navbar-expand-md navbar-dark bg-transparent">
          <div className="container">
            <a
              className="navbar-brand d-flex justify-content-center"
              onClick={() => {
                this.props.history.push({ pathname: "/" });
              }}
            >
              <img
                src="Images/home/logo.png"
                className="d-none d-md-block img-fluid"
                alt="..."
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
                  {/* <a className="nav-link" onClick={this.handlePricing}>Pricing</a> */}
                  <a className="nav-link" onClick={this.handleLibrary}>
                    Library
                  </a>
                  <a className="nav-link active">Profile</a>
                </div>
                <div className="d-flex justify-content-around align-items-center">
                  <a
                    className="nav-link d-none d-md-block"
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
              </div>
            </div>
          </div>
        </nav>

        <div className="row">
          <div className="col d-flex d-md-none justify-content-center align-items-center col-logo">
            <img
              src="Images/home/logo.png"
              onClick={this.handleHome}
              className="img-fluid"
              alt="..."
            />
          </div>
        </div>

        <div className="options d-flex d-md-none justify-content-around align-items-center mb-3">
          <a
            className="option-link d-flex align-items-center"
            href="#"
            onClick={() => this.props.history.goBack()}
          >
            <img src="Images/login/arrow-icon.png" alt="..." />
            Profile
          </a>
          <a className="option-link" onClick={this.handleLogout}>
            Logout
          </a>
          <a className="option-link" onClick={this.handleLibrary} href="#">
            Library
          </a>
        </div>

        <div className="inner-content">
          <div className="container">
            <div className="row">
              <div className="col mt-4 d-flex flex-column justify-content-center align-items-center col-image">
                <div className="absol-border">
                  <a>
                    <div style={{ zIndex: 2 }}>
                      <label for="file-input">
                        <img
                          src="Images/profile/up-icon.png"
                          className="icon-up"
                          alt=""
                        />
                      </label>

                      <input
                        id="file-input"
                        type="file"
                        style={{ display: "none" }}
                        onChange={this.handleImage}
                      />
                    </div>
                  </a>
                </div>
                <div
                  style={{
                    position: "relative",
                    textAlign: "center",
                    color: "#577A79",
                    fontSize: 20,
                    fontWeight: "bold",
                    borderRadius: 200,
                    overflow: "hidden",
                  }}
                >
                  <img
                    src={
                      !this.state.image
                        ? "Images/profile/bg-image.svg"
                        : this.state.image
                    }
                    className="img-fluid mt-5"
                    style={{
                      width: 196,
                      height: 200,
                      borderRadius: "50%",
                      overflow: "hidden",
                      objectFit: "cover",
                      background: "white",
                    }}
                    alt=""
                  />
                  {!this.state.image ? (
                    <div
                      style={{ position: "absolute", top: "60%", left: "20%" }}
                    >
                      ADD YOUR
                      <br /> AVATAR
                    </div>
                  ) : null}
                </div>
              </div>
            </div>

            <div className="row mt-5">
              <div className="col d-flex flex-column justify-content-center align-items-center">
                <h2 className="mt-4">{this.state.name}</h2>
                <p className="mt-3">Last login 06.07.2020</p>
              </div>
            </div>

            <div className="row mt-5 d-flex justify-content-center">
              <div className="col-10 col-md-8 col-lg-7 d-flex flex-column justify-content-start align-items-center pb-5">
                <div className="input-g g-name">
                  <label for="name">Change Name</label>
                  <div className="d-flex justify-content-center align-items-center">
                    <input
                      type="text"
                      className="input-profile"
                      onChange={this.handleName}
                    />
                    <button
                      className="btn-login d-none d-md-block"
                      onClick={this.handleSavename}
                    >
                      Save
                    </button>
                  </div>
                </div>
                {this.state.type == "website" && (
                  <div className="input-g">
                    <label for="name">Change Email</label>
                    <input
                      type="text"
                      className="input-profile"
                      placeholder="Old Email"
                      onChange={this.handleoldEmail}
                    />
                    <div className="d-flex justify-content-center align-items-center">
                      <input
                        type="text"
                        className="input-profile"
                        placeholder="New Email"
                        onChange={this.handlenewEmail}
                      />
                      <button
                        className="btn-login d-none d-md-block"
                        onClick={this.handleMail}
                      >
                        Save
                      </button>
                    </div>
                  </div>
                )}
                {this.state.type == "website" && (
                  <div className="input-g">
                    <label for="name">Change Password</label>
                    <input
                      type="password"
                      className="input-pwd-one input-profile"
                      placeholder="Old Password"
                      onChange={this.handleoldPassword}
                    />
                    <div className="d-flex justify-content-center align-items-center">
                      <input
                        type="password"
                        className="input-pwd-two input-profile"
                        placeholder="New Password"
                        onChange={this.handlenewPassword}
                      />
                      <button
                        className="btn-login d-none d-md-block"
                        onClick={this.handlePassword}
                      >
                        Save
                      </button>
                    </div>
                  </div>
                )}
                <div className="input-g d-flex d-md-none justify-content-center">
                  <button
                    className="btn-save-two mt-3"
                    onClick={this.handleMobileSave}
                  >
                    Save
                  </button>
                </div>

                {/* <div className="input-g d-flex flex-column justify-content-center align-items-center change-plan">
                  <label>Change Plans</label>
                  <p className="mt-3 desc-p">
                    You are currently on the Free Plan. Select plans to see the
                    details of your plan or choose another one.
                  </p>
                  <button
                    className="d-none d-md-block btn-plans mt-3"
                    onClick={this.handlePlan}
                  >
                    Plans
                  </button>
                </div>
                <div className="d-flex justify-content-center">
                  <button
                    className="d-block d-md-none btn-plans mt-3"
                    onClick={this.handlePlan}
                  >
                    Plans
                  </button>
                </div> */}
              </div>
            </div>

            <div className="d-block d-md-none row row-absol">
              <div className="col-9 d-flex justify-content-center">
                <a>
                  <img
                    src="Images/login/pwd-icon.png"
                    className="see-password one"
                    alt="..."
                  />
                </a>
                <a>
                  <img
                    src="Images/login/pwd-icon.png"
                    className="see-password two"
                    alt="..."
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Profile);
