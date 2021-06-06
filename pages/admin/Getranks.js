import React from "react";
import axios from "axios";
import { withRouter } from "next/router";
import RankModal from "../../assets/Components/Admin/RankModal";
import exportFromJSON from "export-from-json";

const fileName = "Rankings";
const exportType = "xls";

class Getranks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Rankings: [],
      Category: "",
    };
  }

  ExportToExcel = () => {
    let temp = this.state.Rankings.map((item) => ({
        Name:item.name,
		Category:item.category,
		RankSize:item.ranking.length,
		Created_at:item.created_at,
      })
    );
    exportFromJSON({ data: temp, fileName, exportType });
  };

  onHandleClick = (event) => {
    event.preventDefault();
    axios
      .post(process.env.NEXT_PUBLIC_BASE_URL + "/admin/getrankingbycategory", {
        category: this.state.Category,
      })
      .then((response) => {
        console.log(response.data);
        if (response.data.status) {
          this.setState({
            Rankings: response.data.ranks,			
			avg:response.data.average_length,
          });
        }
      })
      .catch((err) => {
        if (err.status === 409) {
          console.log("something went wrong");
        } else {
          console.log(err);
        }
      });
  };

  componentDidMount() {
    axios
      .post(process.env.NEXT_PUBLIC_BASE_URL + "/admin/getrankingbycategory", {
        category: this.state.Category,
      })
      .then((response) => {
        console.log(response.data);
        if (response.data.status) {
          this.setState({
            Rankings: response.data.ranks,
			avg:response.data.average_length,
          });
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
              <div className="container-fluid" style={{ marginTop: 20 }}>
                <ol className="breadcrumb mb-4">
                  <li className="breadcrumb-item active">
                    <h1 style={{ color: "Black" }}>Rankings</h1>
                  </li>
                </ol>
                <div
                  className="dropdown"
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <form className="dropdown menu">
                    <label htmlFor="Rankings">Select Category</label>
                    <select
                      name="Category"
                      style={{ margin: 20, width: 150 }}
                      onChange={(e) =>
                        this.setState({ Category: e.target.value })
                      }
                    >
                      <option value="">All</option>
                      <option value="Cinema">Cinema</option>
                      <option value="Music">Music</option>
                      <option value="Sports">Sports</option>
                      <option value="Books">Books</option>
                      <option value="Games">Games</option>
                      <option value="Food">Food</option>
                      <option value="Travel">Travel</option>
                    </select>
                    <input
                      onClick={this.onHandleClick}
                      type="submit"
                      value="Submit"
                    />
                  </form>
                  <div
                    style={{ marginRight: 50, marginTop: 20, fontWeight: 500 }}
                  >
                    Average Rank Size: {this.state.avg}
					<button
						style={{marginLeft:20}}
                      onClick={this.ExportToExcel}
                      className="btn btn-success"
                    >
                      Download Excel
                    </button>
                  </div>
                </div>

                <div className="card-body">
                  <div className="table-responsive">
                    <table
                      className="table table-bordered"
                      id="dataTable"
                      width="100%"
                      cellspacing="0"
                    >
                      <thead>
                        <tr>
                          <th>Ranking Name</th>
                          <th>Category</th>
                          <th>Rank Size</th>
                          <th>Create Time</th>
                          <th>Rank Modal</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.Rankings.map((item, i) => {
                          return (
                            <tr>
                              <td>{item.name}</td>
                              <td>{item.category}</td>
                              <td>{item.ranking.length}</td>
                              <td>
                                {new Date(item.created_at).getDate() +
                                  "/" +
                                  (new Date(item.created_at).getMonth() + 1) +
                                  "/" +
                                  new Date(item.created_at).getFullYear()}
                              </td>
                              <td>
                                <RankModal id={item._id} />
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </main>
            <footer className="py-4 bg-light mt-auto">
              <div className="container-fluid">
                <div className="d-flex align-items-center justify-content-between small">
                  <div className="text-muted">
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

export default withRouter(Getranks);
