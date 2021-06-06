import React from "react";
import axios from "axios";
import { withRouter } from "next/router";
import exportFromJSON from "export-from-json";

const fileName = "UsersTable";
const exportType = "xls";

class Tables extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Usernames: [],
      plans: "",
      Original: [],
      startDate: "",
      PlanDetail: "",
      searchinput: "",
    };
  }
  ExportToExcel = () => {
    let temp = this.state.Original.map((item) => {
      let obj = {
        ...item,
        plan: item.plan_id === 0 ? "Free" : item.plan_id === 1 ? "Fan" : "Pro",
      };
      delete obj["_id"];
      delete obj["plan_id"];
      return obj;
    });
    exportFromJSON({ data: temp, fileName, exportType });
  };

  componentDidMount() {
    axios
      .post(process.env.NEXT_PUBLIC_BASE_URL + "/admin/getusers")
      .then((response) => {
        console.log(response);
        if (response.status == 200) {
          this.setState({
            Usernames: response.data,
            Original: response.data,
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

  searchData = (input) => {
    console.log(this.state.U);
    let temp = this.state.Original.filter((item) => {
      if (
        (item.email && item.email.includes(input)) ||
        (item.name && item.name.includes(input)) ||
        (
          new Date(item.created_at).getDate() +
          "/" +
          (new Date(item.created_at).getMonth() + 1) +
          "/" +
          new Date(item.created_at).getFullYear()
        ).includes(input)
      )
        return true;
      return false;
    });
    this.setState({ Usernames: temp });
  };
  onChange = (e) => {
    this.searchData(e.target.value);
    this.setState({ searchinput: e.target.value });
  };

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
              <div class="container-fluid">
                <h1 class="mt-4" style={{ paddingLeft: "40%" }}>
                  User Table
                </h1>
                <div class="card mb-4 ">
                  <div
                    class="card-header d-flex justify-content-between"
                    style={{ paddingTop: 20 }}
                  >
                    <div>
                      <i class="fas fa-table mr-1"></i>
                      <label style={{ paddingRight: 20 }}>
                        {" "}
                        <h4>Search </h4>{" "}
                      </label>
                      <input
                        type="input"
                        value={this.state.searchinput}
                        onChange={this.onChange}
                      />
                    </div>
                    <button
                      onClick={this.ExportToExcel}
                      className="btn btn-success"
                    >
                      Download Excel
                    </button>
                  </div>

                  <div class="card-body">
                    <div class="table-responsive">
                      <table
                        class="table table-bordered"
                        id="dataTable"
                        width="100%"
                        cellspacing="0"
                      >
                        <thead>
                          <tr>
                            <th>Firstname</th>
                            <th>Email Id</th>
                            <th>PlanId</th>
                            <th>Sign In</th>
                            <th>Created Time</th>
                            <th>Ip Address</th>
                            <th>Country</th>
                          </tr>
                        </thead>
                        <tbody>
                          {this.state.Usernames.map((item, i) => {
                            return (
                              <tr
                                onClick={() =>
                                  this.props.router.push({
                                    pathname: "/admin/UserDetail",
                                    query: {
                                      id: item._id,
                                      name: item.name,
                                      email: item.email,
                                      plan_id: item.plan_id,
                                      IpAddress: item.ip,
                                      Country: item.country,
                                      type: item.type,
                                    },
                                  })
                                }
                              >
                                <td>{item.name}</td>
                                <td>{item.email}</td>
                                <td>{item.plan_id}</td>
                                <td>{item.type}</td>
                                <td>
                                  {new Date(item.created_at).getDate() +
                                    "/" +
                                    (new Date(item.created_at).getMonth() + 1) +
                                    "/" +
                                    new Date(item.created_at).getFullYear()}
                                </td>
                                <td>{item.ip}</td>
                                <td>{item.country}</td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
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
        </div>
      </div>
    );
  }
}

export default withRouter(Tables);
