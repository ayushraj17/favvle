import React from "react";
// import "../../assets/css/styles.css";
import axios from "axios";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { withRouter } from "next/router";

import Switch from "@material-ui/core/Switch";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

class HomePage extends React.Component {
  constructor() {
    super();
    this.state = {
      text1: "",
      text2: "",
      text3: "",
      text4: "",
      text5: "",
      error: "",
      switch: false,
      open: false,
    };
  }

  handleChange = () => {
    axios
    .post(process.env.NEXT_PUBLIC_BASE_URL + "/admin/updatehome", {
      home:!this.state.switch
    })
    .then((response) => {
      console.log("gethome",response.data);
      if (response.status == 200) {
        console.log("success");
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
    this.setState({
      switch:!this.state.switch
    })
    
  }

  handleText1 = (event) => {
    this.setState({
      text1: event.target.value,
    });
  };
  handleText2 = (event) => {
    this.setState({
      text2: event.target.value,
    });
  };
  handleText3 = (event) => {
    this.setState({
      text3: event.target.value,
    });
  };
  handleText4 = (event) => {
    this.setState({
      text4: event.target.value,
    });
  };
  handleText5 = (event) => {
    this.setState({
      text5: event.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({ error: "" });
    const { text1, text2, text3, text4, text5 } = this.state;
    console.log(text1, text2, text3, text4, text5);
    if (!text1 || !text2 || !text3 || !text4 || !text5) {
      this.setState({ error: "Please Fill all Fields" });
    } else {
      axios
        .post(process.env.NEXT_PUBLIC_BASE_URL + "/admin/settexts", {
          text1,
          text2,
          text3,
          text4,
          text5,
          page: "home",
        })
        .then((response) => {
          if (response.status == 200) {
            console.log("Sucessfully Updated");
            this.setState({ open: true });
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
  };

  componentDidMount() {
    window.scrollTo(0, 0);
    axios
    .get(process.env.NEXT_PUBLIC_BASE_URL + "/admin/gethome")
    .then((response) => {
      console.log("gethome",response.data);
      if (response.status == 200) {
        console.log("success");
        this.setState({
          switch:response.data.home!==undefined?response.data.home:true
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

  render() {
    return (
      <div class="sb-nav-fixed">
        <nav class="sb-topnav navbar navbar-expand navbar-dark bg-dark">
          <a
            class="navbar-brand"
            onClick={() => {
              this.props.router.push({ pathname: "/admin/Dashboard" });
            }}
          >
            Admin Dashboard
          </a>
          <button
            class="btn btn-link btn-sm order-1 order-lg-0"
            id="sidebarToggle"
            href="#"
          >
            <i class="fas fa-bars"></i>
          </button>
        </nav>
        <div id="layoutSidenav">
          <div id="layoutSidenav_nav">
            <nav
              class="sb-sidenav accordion sb-sidenav-dark"
              id="sidenavAccordion"
            >
              <div class="sb-sidenav-menu">
                <div class="nav">
                  <div class="sb-sidenav-menu-heading">Core</div>
                  <a
                    class="nav-link"
                    onClick={() => {
                      this.props.router.push({ pathname: "/admin/Dashboard" });
                    }}
                  >
                    <div class="sb-nav-link-icon">
                      <i class="fas fa-tachometer-alt"></i>
                    </div>
                    Dashboard
                  </a>
                  <div class="sb-sidenav-menu-heading">Interface</div>
                  <a
                    class="nav-link collapsed"
                    href="#"
                    data-toggle="collapse"
                    data-target="#collapseLayouts"
                    aria-expanded="false"
                    aria-controls="collapseLayouts"
                  >
                    <div class="sb-nav-link-icon">
                      <i class="fas fa-columns"></i>
                    </div>
                    Main Pages
                    <div class="sb-sidenav-collapse-arrow">
                      <i class="fas fa-angle-down"></i>
                    </div>
                  </a>
                  <div
                    class="collapse"
                    id="collapseLayouts"
                    aria-labelledby="headingOne"
                    data-parent="#sidenavAccordion"
                  >
                    <nav class="sb-sidenav-menu-nested nav">
                      <a
                        class="nav-link"
                        onClick={() => {
                          this.props.router.push({
                            pathname: "/admin/HomePage",
                          });
                        }}
                      >
                        Home
                      </a>
                      <a
                        class="nav-link"
                        onClick={() => {
                          this.props.router.push({
                            pathname: "/admin/AboutPage",
                          });
                        }}
                      >
                        About
                      </a>
                      <a
                        class="nav-link"
                        onClick={() => {
                          this.props.router.push({
                            pathname: "/admin/LibraryPage",
                          });
                        }}
                      >
                        Library
                      </a>
                    </nav>
                  </div>
                  <a
                    class="nav-link collapsed"
                    href="#"
                    data-toggle="collapse"
                    data-target="#collapsePages"
                    aria-expanded="false"
                    aria-controls="collapsePages"
                  >
                    <div class="sb-nav-link-icon">
                      <i class="fas fa-book-open"></i>
                    </div>
                    Credential Pages
                    <div class="sb-sidenav-collapse-arrow">
                      <i class="fas fa-angle-down"></i>
                    </div>
                  </a>
                  <div
                    class="collapse"
                    id="collapsePages"
                    aria-labelledby="headingTwo"
                    data-parent="#sidenavAccordion"
                  >
                    <nav class="sb-sidenav-menu-nested nav">
                      <a
                        class="nav-link"
                        onClick={() => {
                          this.props.router.push({
                            pathname: "/admin/LoginPage",
                          });
                        }}
                      >
                        Login
                      </a>
                      <a
                        class="nav-link"
                        onClick={() => {
                          this.props.router.push({
                            pathname: "/admin/SignupPage",
                          });
                        }}
                      >
                        Signup
                      </a>
                    </nav>
                  </div>
                  <div class="sb-sidenav-menu-heading">Addons</div>
                  <a
                    class="nav-link"
                    onClick={() => {
                      this.props.router.push({ pathname: "/admin/Getranks" });
                    }}
                  >
                    <div class="sb-nav-link-icon">
                      <i class="fas fa-chart-area"></i>
                    </div>
                    Rankings
                  </a>
                  <a
                    class="nav-link"
                    onClick={() => {
                      this.props.router.push({ pathname: "/admin/Tables" });
                    }}
                  >
                    <div class="sb-nav-link-icon">
                      <i class="fas fa-table"></i>
                    </div>
                    User Data
                  </a>
                </div>
              </div>
              <div class="sb-sidenav-footer">
                <div class="small">Logged in as:</div>
                Admin Dashboard
              </div>
            </nav>
          </div>
          <div id="layoutSidenav_content">
            <main>
              <div className="container" style={{ marginTop: 80 }}>
                <div>
                  Home1
                  <Switch
                    checked={this.state.switch}
                    onChange={this.handleChange}
                    color="primary"
                    name="checkedB"
                    inputProps={{ "aria-label": "primary checkbox" }}
                  />
                  Home2
                </div>

                <div class="card mb-4">
                  <div class="card-header">
                    <i class="fas fa-table mr-1"></i>
                    Home Page Texts Fields
                  </div>
                </div>
                <form>
                  <div class="form-group">
                    <label for="exampleTextarea"> Text 1</label>
                    <textarea
                      class="form-control"
                      id="exampleTextarea"
                      rows="2"
                      value={this.state.text1}
                      onChange={this.handleText1}
                    ></textarea>
                  </div>
                  <div class="form-group">
                    <label for="exampleTextarea"> Text 2</label>
                    <textarea
                      class="form-control"
                      id="exampleTextarea"
                      rows="2"
                      value={this.state.text2}
                      onChange={this.handleText2}
                    ></textarea>
                  </div>
                  <div class="form-group">
                    <label for="exampleTextarea"> Text 3</label>
                    <textarea
                      class="form-control"
                      id="exampleTextarea"
                      rows="2"
                      value={this.state.text3}
                      onChange={this.handleText3}
                    ></textarea>
                  </div>
                  <div class="form-group">
                    <label for="exampleTextarea"> Text 4</label>
                    <textarea
                      class="form-control"
                      id="exampleTextarea"
                      rows="2"
                      value={this.state.text4}
                      onChange={this.handleText4}
                    ></textarea>
                  </div>
                  <div class="form-group">
                    <label for="exampleTextarea"> Text 5</label>
                    <textarea
                      class="form-control"
                      id="exampleTextarea"
                      rows="2"
                      value={this.state.text5}
                      onChange={this.handleText5}
                    ></textarea>
                  </div>
                  <div style={{ color: "red" }}>{this.state.error}</div>
                  <button
                    type="submit"
                    class="btn btn-primary"
                    onClick={this.handleSubmit}
                  >
                    Submit
                  </button>
                </form>
              </div>
            </main>
            <footer class="py-4 bg-light mt-auto">
              <div class="container-fluid">
                <div class="d-flex align-items-center justify-content-between small">
                  <div class="text-muted">
                    Copyright &copy; Your Website 2020
                  </div>
                  <div>
                    <a href="#">Privacy Policy</a>
                    &middot;
                    <a href="#">Terms &amp; Conditions</a>
                  </div>
                </div>
              </div>
            </footer>
          </div>
          <Snackbar
            open={this.state.open}
            autoHideDuration={3000}
            onClose={() => this.setState({ open: false })}
          >
            <Alert
              onClose={() => this.setState({ open: false })}
              severity="success"
            >
              Updated Successfully!
            </Alert>
          </Snackbar>
        </div>
      </div>
    );
  }
}

export default withRouter(HomePage);
