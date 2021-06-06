import React from "react";
// import "../assets/css/Library.css";
// import "../assets/css/All.css";
import axios from "axios";
import GetRanks from "../assets/Components/GetRanks/GetRanks";
// import history from "./history";
import { withRouter } from "next/router";

class Library extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ranklist: [],
      unfilteredlist: [],
      number: true,
      name: true,
      columns: 5,
      text: false,
      counter: 0,
      open: false,
      currentCategory: "All",
      popup: false,
      image: "",
    };
  }

  handleSorting = (id1, id2) => {
    let temp = [...this.state.ranklist];
    temp[id2] = this.state.ranklist[id1];
    temp[id1] = this.state.ranklist[id2];
    this.setState({
      ranking: {
        ranklist: temp,
      },
    });
  };

  componentDidMount() {
    const usertoken = localStorage.getItem("usertoken");
    window.scrollTo(0, 0);
    axios
      .post(
        process.env.NEXT_PUBLIC_BASE_URL + "/users/getranking",
        {},
        {
          headers: {
            Authorization: `Bearer ${usertoken}`,
          },
        }
      )
      .then((response) => {
        console.log(response);
        if (response.data.status) {
          console.log(response.data.profile);
          this.setState({
            ranklist: response.data.ranks,
            unfilteredlist: response.data.ranks,
          });
          if (response.data.profile) {
            this.setState({
              image: process.env.NEXT_PUBLIC_BASE_URL + "/" + response.data.profile,
            });
          }
          console.log("library", response.data);
        } else {
          console.log("Rank not fetch");
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
      .get(process.env.NEXT_PUBLIC_BASE_URL + "/admin/gettexts", { params: { page: "library" } })
      .then((response) => {
        if (response.status == 200) {
          console.log("success");
          this.setState({
            text1: response.data.texts.text1,
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
        console.log("updated successfully");
        this.setState({
          image: URL.createObjectURL(event.target.files[0]),
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handleShare = () => {
    let ranking = this.state.ranklist[this.state.counter];
    typeof window !== "undefined" &&
      window.localStorage.setItem(
        "rankingFromLibrary",
        JSON.stringify(ranking)
      );
    this.props.router.push({
      pathname: "/PostPreview",
    });
  };

  handleCategory = (selected) => {
    if (selected === "All") {
      this.setState({
        ranklist: this.state.unfilteredlist,
        counter: 0,
        currentCategory: selected,
      });
    } else {
      let temp = this.state.unfilteredlist.filter((item, i) => {
        if (item.category === selected) return true;
        return false;
      });
      this.setState({ ranklist: temp, counter: 0, currentCategory: selected });
    }
  };

  handleLogout = () => {
    localStorage.clear("usertoken");
    this.props.router.push("/");
  };

  handleAbout = () => {
    this.props.router.push("/About");
    // window.location.reload();
  };

  handlePricing = () => {
    this.props.router.push("/Plans");
    // window.location.reload();
    setTimeout(function () {
      window.scrollTo(0, 0);
    });
  };

  handleHome = () => {
    this.props.router.push("/");
    // window.location.reload();
  };

  handleProfile = () => {
    this.props.router.push("/Profile");
    // window.location.reload();
  };

  render() {
    return (
      <div className="libraryMain-page">
        <nav className="navbar navbar-expand-md navbar-dark bg-transparent">
          <div className="container">
            <a
              className="navbar-brand d-none d-md-flex justify-content-center"
              onClick={() => {
                this.props.history.push({ pathname: "/" });
              }}
            >
              <img src="Images/home/logo.png" className="img-fluid" alt=".." />
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
                  {/* <a className="nav-link" onClick={this.handlePricing}>
                    Pricing
                  </a> */}
                  <a className="nav-link active d-none d-md-block">Library</a>
                  <a className="nav-link" onClick={this.handleProfile}>
                    Profile
                  </a>
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

        <div className="options-back d-flex d-md-none justify-content-start align-items-center">
          <a
            onClick={() => {
              this.props.history.push("/");
            }}
            className="option-lk-back"
          >
            <img src="Images/login/arrow-icon.png" />
          </a>
        </div>

        <div className="options d-flex d-md-none justify-content-center align-items-center">
          <a className="option-lk">Library</a>
        </div>

        <div className="options-two d-flex d-md-none justify-content-end align-items-center">
          <a className="option-lk" onClick={this.handleLogout}>
            <img src="Images/library/logout_logo.svg" alt="" />
            Logout
          </a>
        </div>

        <div className="inner-content">
          <div className="container">
            {this.state.popup && (
              <div className="popup">
                <div className="popup-content">
                  <button
                    className="close-popup btn-close"
                    style={{ marginTop: 100, marginRight: 10 }}
                    onClick={() => {
                      this.setState({ popup: false });
                    }}
                  ></button>
                  <h4>Create another list!</h4>
                  <h5>
                    You've reached the maximum of 5 lists<br></br>
                    for unlimited amount of lists for just $2.99 per month.
                    <br /> Click here!
                  </h5>
                  <div className="d-flex align-items-start button-g">
                    <button
                      className="close-popup btn-popup"
                      style={{ marginTop: -30 }}
                      onClick={this.handlePricing}
                    >
                      Upgrade
                    </button>
                  </div>
                </div>
              </div>
            )}

            <div className="row">
              <div className="col d-flex justify-content-end">
                <a className="d-none d-lg-block btn-close"></a>
              </div>
            </div>

            <div className="row">
              <div className="col mt-4 d-flex flex-column justify-content-center align-items-center col-image">
                <div className="absol-border">
                  <a className="d-none d-md-block">
                    <div>
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
                    fontSize: 15,
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
                    className="profile-img img-fluid mt-5"
                    style={{
                      overflow: "hidden",
                      objectFit: "cover",
                      background: "white",
                    }}
                    alt=""
                  />
                  {!this.state.image ? (
                    <div
                      style={{ position: "absolute", top: "60%", left: "15%" }}
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
                <h2 className="d-none d-md-block mt-4">Your Library</h2>
                <p className="desc-p mt-3 d-none d-md-block">
                  {this.state.text1
                    ? this.state.text1
                    : "Welcome, here in the library you can manage all your rankings. Share them on social media and continue creating new awesome lists."}
                </p>
                <p className="desc-p mt-3 d-block d-md-none">
                  Welcome to your library
                </p>
              </div>
            </div>

            <div className="row d-none d-md-flex justify-content-around align-items-center">
              <div className="col-md-11 col-lg-12">
                <div className="mt-4 category-list d-flex justify-content-around">
                  <a
                    className={this.state.currentCategory === "All" && "active"}
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      this.handleCategory("All");
                    }}
                  >
                    <img src="Images/library/all_icon.svg" alt="" />
                    All
                  </a>
                  <a
                    className={
                      this.state.currentCategory === "Cinema" && "active"
                    }
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      this.handleCategory("Cinema");
                    }}
                  >
                    <img src="Images/categories/cinema.svg" alt="" />
                    Cinema
                  </a>
                  <a
                    className={
                      this.state.currentCategory === "Music" && "active"
                    }
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      this.handleCategory("Music");
                    }}
                  >
                    <img src="Images/categories/music-note.svg" alt="" />
                    Music
                  </a>
                  <a
                    className={
                      this.state.currentCategory === "Sports" && "active"
                    }
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      this.handleCategory("Sports");
                    }}
                  >
                    <img src="Images/categories/soccer-ball.svg" alt="" />
                    Sports
                  </a>
                  <a
                    className={
                      this.state.currentCategory === "Books" && "active"
                    }
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      this.handleCategory("Books");
                    }}
                  >
                    <img src="Images/categories/book.svg" alt="" />
                    Books
                  </a>
                  <a
                    className={
                      this.state.currentCategory === "Games" && "active"
                    }
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      this.handleCategory("Games");
                    }}
                  >
                    <img src="Images/categories/video-game.svg" alt="" />
                    Games
                  </a>
                  <a
                    className={
                      this.state.currentCategory === "Food" && "active"
                    }
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      this.handleCategory("Food");
                    }}
                  >
                    <img src="Images/categories/cake.svg" alt="" />
                    Food
                  </a>
                  <a
                    className={
                      this.state.currentCategory === "Travel" && "active"
                    }
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      this.handleCategory("Travel");
                    }}
                  >
                    <img src="Images/categories/luggage.svg" alt="" />
                    Travel
                  </a>
                  <a
                    className={
                      this.state.currentCategory === "Other" && "active"
                    }
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      this.handleCategory("Other");
                    }}
                  >
                    <img src="Images/categories/lamp.svg" alt="" />
                    Other
                  </a>
                </div>
              </div>
            </div>

            <div className="row d-none d-md-flex justify-content-center">
              <div className="col-5">
                <div
                  className="row row-lists"
                  style={{ overflowY: "scroll", maxHeight: 380, marginTop: 30 }}
                >
                  {this.state.ranklist.map((item, i) => {
                    return (
                      <div
                        className={
                          "col-11 col-fav-sm " +
                          (this.state.counter === i ? "active" : "")
                        }
                        style={{ cursor: "pointer" }}
                        onClick={() => this.setState({ counter: i })}
                      >
                        <img
                          src={item.ranking[0].Poster}
                          className="img-fluid"
                          style={{ height: 100, width: 70 }}
                          alt="..."
                        />
                        <div className="d-flex flex-column justify-content-start align-items-start ml-3">
                          <h4>{item.name}</h4>
                          <span>
                            Created{" "}
                            {("0" + new Date(item.created_at).getDate()).slice(
                              -2
                            ) +
                              "." +
                              (
                                "0" +
                                (new Date(item.created_at).getMonth() + 1)
                              ).slice(-2) +
                              "." +
                              new Date(item.created_at).getFullYear()}
                          </span>
                          <div className="d-flex">
                            <a
                              className="btn-import"
                              style={{ cursor: "pointer" }}
                              onClick={() => {
                                this.props.history.push({
                                  pathname: "/RankCreation",
                                  ranking: item.ranking,
                                  _id: item._id,
                                  name: item.name,
                                  category: item.category,
                                });
                              }}
                            >
                              Edit Ranks
                            </a>
                            <a
                              className="btn-import ml-2"
                              style={{ cursor: "pointer" }}
                              onClick={() => {
                                this.props.history.push({
                                  pathname: "/Customization",
                                  ranking: item.ranking,
                                  _id: item._id,
                                  name: item.name,
                                  category: item.category,
                                });
                              }}
                            >
                              Edit Design
                            </a>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="row">
                  <div className="col-12 mt-1 d-flex justify-content-center">
                    <a
                      className="btn-login-sm"
                      onClick={() => {
                        if (this.state.ranklist.length > 4)
                          this.setState({ popup: true });
                        else
                          this.props.history.push({ pathname: "/Categories" });
                      }}
                    >
                      Create New List
                    </a>
                  </div>
                </div>
              </div>
              <div
                className="col-7 col-movie-lists"
                style={{
                  background: this.state.ranklist.length
                    ? this.state.ranklist[this.state.counter].backgroundcolor
                    : "",
                }}
              >
                <div className="row d-flex justify-content-center">
                  <div className="col">
                    <div className="tab-content" id="pills-tabContent">
                      <div
                        className="tab-pane fade show active"
                        id="pills-home"
                        role="tabpanel"
                        aria-labelledby="pills-home-tab"
                      >
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            fontWeight: "bold",
                            color: this.state.ranklist.length
                              ? this.state.ranklist[this.state.counter]
                                  .backgroundcolor === "#FCFCFC"
                                ? "black"
                                : "white"
                              : "white",
                          }}
                        >
                          {this.state.ranklist.length
                            ? this.state.ranklist[this.state.counter].name
                            : ""}
                        </div>
                        <div className="row row-movie d-flex justify-content-start align-items-center flex-wrap">
                          <GetRanks
                            Ranking={
                              this.state.ranklist.length
                                ? this.state.ranklist[this.state.counter]
                                    .ranking
                                : []
                            }
                            textcolor={
                              this.state.ranklist.length
                                ? this.state.ranklist[this.state.counter]
                                    .textcolor
                                : false
                            }
                            ranktoggle={
                              this.state.ranklist.length
                                ? this.state.ranklist[this.state.counter]
                                    .ranktoggle
                                : false
                            }
                            nametoggle={
                              this.state.ranklist.length
                                ? this.state.ranklist[this.state.counter]
                                    .nametoggle
                                : false
                            }
                            columns={
                              this.state.ranklist.length
                                ? this.state.ranklist[this.state.counter]
                                    .columns
                                : 4
                            }
                            backgroundColor={
                              this.state.ranklist.length
                                ? this.state.ranklist[this.state.counter]
                                    .backgroundcolor
                                : ""
                            }
                            handleSorting={this.handleSorting}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="row d-none d-md-flex justify-content-end col-social">
              <div className="col-7 d-flex justify-content-center">
                <a className="btn-login" onClick={this.handleShare}>
                  Share
                </a>
              </div>
            </div>

            <div className="row d-flex d-md-none flex-column">
              <div className="col d-flex justify-content-between align-items-center col-info-sm">
                <h4>Ranking Lists</h4>
                <select className="custom-select select-sort mt-3">
                  <option selected>Sort By</option>
                  <option value="1">January</option>
                  <option value="2">February</option>
                  <option value="3">March</option>
                  <option value="3">April</option>
                  <option value="3">May</option>
                  <option value="3">June</option>
                  <option value="3">July</option>
                  <option value="3">August</option>
                  <option value="3">September</option>
                  <option value="3">October</option>
                  <option value="3">November</option>
                  <option value="3">December</option>
                </select>
              </div>
            </div>

            <div className="row d-flex d-md-none flex-column">
              {this.state.ranklist.map((item, i) => {
                return (
                  <div
                    className="col-12"
                    onClick={() => this.setState({ counter: i })}
                  >
                    <div
                      className="row fav-sm"
                      style={{
                        overflow: "scroll",
                        maxHeight: 350,
                      }}
                      onClick={() => this.setState({ counter: i })}
                    >
                      <div
                        className={
                          "col-12 col-fav-sm active " +
                          (this.state.counter === i ? "active" : "")
                        }
                        style={{ cursor: "pointer" }}
                        onClick={() => this.setState({ counter: i })}
                      >
                        <img
                          src={item.ranking[0].Poster}
                          className="fav-sm img-fluid"
                          style={{ height: 100, width: 70 }}
                          alt="..."
                          onClick={() => this.setState({ counter: i })}
                        />
                        <div
                          className="fav-sm d-flex flex-column justify-content-start align-items-start ml-4"
                          onClick={() => this.setState({ counter: i })}
                        >
                          <h4
                            className="fav-sm"
                            onClick={() => this.setState({ counter: i })}
                          >
                            {item.name}
                          </h4>
                          <span
                            className="fav-sm"
                            onClick={() => this.setState({ counter: i })}
                          >
                            Created{" "}
                            {("0" + new Date(item.created_at).getDate()).slice(
                              -2
                            ) +
                              "." +
                              (
                                "0" +
                                (new Date(item.created_at).getMonth() + 1)
                              ).slice(-2) +
                              "." +
                              new Date(item.created_at).getFullYear()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}

              <div className="mt-5 col-12 d-flex justify-content-center">
                <a
                  className="btn-login"
                  onClick={() => {
                    this.props.history.push({ pathname: "/" });
                  }}
                >
                  New List
                </a>
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
                <p>Privacy</p>
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
                  <p>Privacy</p>
                </div>
              </div>
            </div>
          </div>
        </footer>

        <section className="section-absol">
          <div
            className="row header-absol d-flex align-items-center"
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <a
              onClick={() => {
                this.props.history.push("/");
              }}
              className="back-fav"
            >
              <img src="Images/login/arrow-icon.png" />
            </a>
            <h3 className="title">
              {this.state.ranklist.length
                ? this.state.ranklist[this.state.counter].name
                : ""}
            </h3>
          </div>

          <div className="row content-absol">
            <div className="col col-absol-edit d-flex justify-content-around align-items-center">
              <button
                className="absol-edit"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  this.props.history.push({
                    pathname: "/RankCreation",
                    ranking: this.state.ranklist.length
                      ? this.state.ranklist[this.state.counter].ranking
                      : [],
                    _id: this.state._id,
                    name: this.state.ranklist.length
                      ? this.state.ranklist[this.state.counter].name
                      : "",
                    category: this.state.ranklist.length
                      ? this.state.ranklist[this.state.counter].category
                      : "",
                  });
                }}
              >
                Edit Ranks
              </button>
              <button
                className="absol-edit"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  this.props.history.push({
                    pathname: "/Customization",
                    ranking: this.state.ranklist.length
                      ? this.state.ranklist[this.state.counter].ranking
                      : [],
                    _id: this.state._id,
                    name: this.state.ranklist.length
                      ? this.state.ranklist[this.state.counter].name
                      : "",
                    category: this.state.ranklist.length
                      ? this.state.ranklist[this.state.counter].category
                      : "",
                  });
                }}
              >
                Edit Design
              </button>
            </div>
          </div>

          <div
            className="row row-mv"
            style={{
              background: this.state.ranklist.length
                ? this.state.ranklist[this.state.counter].backgroundcolor
                : "",
            }}
          >
            <div className="col">
              <GetRanks
                Ranking={
                  this.state.ranklist.length
                    ? this.state.ranklist[this.state.counter].ranking
                    : []
                }
                textcolor={
                  this.state.ranklist.length
                    ? this.state.ranklist[this.state.counter].textcolor
                    : false
                }
                ranktoggle={
                  this.state.ranklist.length
                    ? this.state.ranklist[this.state.counter].ranktoggle
                    : false
                }
                nametoggle={
                  this.state.ranklist.length
                    ? this.state.ranklist[this.state.counter].nametoggle
                    : false
                }
                columns={
                  this.state.ranklist.length
                    ? this.state.ranklist[this.state.counter].columns
                    : 4
                }
              />
            </div>
          </div>

          <div className="row row-btn">
            <div className="col d-flex justify-content-center">
              <button className="btn-share" onClick={this.handleShare}>
                Share
              </button>
            </div>
          </div>
        </section>
      </div>
    );
  }
}
export default withRouter(Library);
