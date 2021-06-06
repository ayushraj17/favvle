import React from "react";
import axios from "axios";
import GetRanks from "../assets/Components/GetRanks/GetRanks";
import { withRouter } from "next/router";

class Customization extends React.Component {
  constructor(props) {
    super(props);
    console.log("customization", props.router.query.ranking);
    this.state = {
      _id: props.router.query._id,
      ranking: [],
      category: props.router.query.category,
      listname: props.router.query.name,
      nametoggle: true,
      ranktoggle: true,
      columns: 5,
      textcolor: false,
      backgroundcolor: "#79A9A6",
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    if (typeof window !== "undefined") {
      this.setState({
        ranking: JSON.parse(window.localStorage.getItem("ranking") ?? []),
      });
    }
  }

  handleRank = () => {
    const {
      ranking,
      category,
      listname,
      backgroundcolor,
      textcolor,
      nametoggle,
      ranktoggle,
      columns,
      _id,
    } = this.state;
    const usertoken = localStorage.getItem("usertoken");
    if (!_id) {
      if (!usertoken) {
        let ranking = {
          ranking: this.state.ranking,
          category,
          name: listname,
          backgroundcolor,
          textcolor,
          nametoggle,
          ranktoggle,
          columns,
        };
        localStorage.setItem("rankingSignup", JSON.stringify(ranking));
        this.props.router.push({
          pathname: "/Signup",
          query: {
            ranking,
            category,
            listname,
          },
        });
      } else {
        axios
          .post(
            process.env.NEXT_PUBLIC_BASE_URL + "/users/addranking",
            {
              ranking,
              category,
              name: listname,
              backgroundcolor,
              textcolor,
              nametoggle,
              ranktoggle,
              columns,
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
              console.log("Sucessfully Rank Created");
              this.props.router.push("/Library");
            } else {
              console.log("Rank is not Created");
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
    } else {
      axios
        .post(
          process.env.NEXT_PUBLIC_BASE_URL + "/users/editranking",
          {
            _id,
            ranking,
            category,
            name: listname,
            backgroundcolor,
            textcolor,
            nametoggle,
            ranktoggle,
            columns,
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
            console.log("Sucessfully Rank Updated");
            this.props.router.push("/Library");
          } else {
            console.log("Rank is not Created");
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

  handleSorting = (id1, id2) => {
    let temp = [...this.state.ranking];
    temp[id2] = this.state.ranking[id1];
    temp[id1] = this.state.ranking[id2];
    this.setState({
      ranking: temp,
    });
  };

  render() {
    return (
      <div className="customization-page">
        <section className="options d-flex justify-content-around align-items-center">
          <div className="row mt-4 mb-3">
            <div className="col d-none d-md-flex justify-content-center align-items-center">
              <div className="d-flex flex-column justify-content-start align-items-center">
                <img
                  src="Images/rank-creation/Oval.png"
                  className="img-fluid"
                  alt="..."
                />
                <p className="text-white mt-2">Categories</p>
              </div>
              <img
                src="Images/rank-creation/Line.svg"
                className="img-fluid img-opline"
                alt="..."
              />
              <div className="d-flex flex-column justify-content-center align-items-center">
                <img
                  src="Images/rank-creation/Oval.png"
                  className="img-fluid"
                  alt="..."
                />
                <p className="text-white op-rankCreation">Rank Creation</p>
              </div>
              <img
                src="Images/rank-creation/Line.svg"
                className="img-fluid img-opline"
                alt="..."
              />
              <div className="d-flex flex-column justify-content-center align-items-center">
                <img
                  src="Images/rank-creation/Oval Active.svg"
                  className="img-fluid"
                  alt="..."
                />
                <p className="text-white op-customization">Customization</p>
              </div>
            </div>
            <div className="col d-flex d-md-none justify-content-center align-items-center">
              <div className="d-flex flex-column justify-content-center align-items-center">
                <img
                  src="Images/rank-creation/Oval Active.svg"
                  className="img-fluid"
                  alt="..."
                />
              </div>
              <img
                src="Images/rank-creation/Line.svg"
                className="img-fluid"
                alt="..."
              />
              <div className="d-flex flex-column justify-content-center align-items-center">
                <img
                  src="Images/rank-creation/Oval.png"
                  className="img-fluid"
                  alt="..."
                />
              </div>
              <img
                src="Images/rank-creation/Line.svg"
                className="img-fluid"
                alt="..."
              />
              <div className="d-flex flex-column justify-content-center align-items-center">
                <img
                  src="Images/rank-creation/Oval.png"
                  className="img-fluid"
                  alt="..."
                />
              </div>
            </div>
          </div>
        </section>

        <div className="inner-content sm d-block d-lg-block">
          <div className="container d-none d-lg-block">
            <div className="row row-info">
              <div className="col d-flex justify-content-end">
                <a className="btn-close show-info info-rankCreation"></a>
                <div className="info-popup">
                  <button className="btn-close-info"></button>
                  <h3>Asking for details</h3>
                  <p>
                    You’ve chosen a name and category for your ranking, so the
                    next step is to add items to your list. For example, you’re
                    making a ranking of your favorite 60’s bands: in this
                    section you add The Turtles, The Beach Boys and The Kinks.
                    You can do so by typing the name of the bands in the
                    ‘Add’-field. You can add up to 25 items to your list. Once
                    you’ve added all the items you want to add, click on
                    Continue and finalize your ranking.
                  </p>
                </div>
              </div>
            </div>

            <div className="row d-flex justify-content-center">
              <div className="col-7 d-flex flex-column justify-content-center align-items-center">
                <h2 className="mt-5">Design</h2>
                <p className="mt-3 d-none d-md-block text-center text-center desc-p">
                  You’re almost there, well done! In this last step of the
                  process you can choose how your ranking looks. You can choose
                  the right color and lay-out and make it all yours.
                </p>
              </div>
            </div>

            <div className="row row-cards mt-5 d-flex justify-content-center align-items-stretch">
              <div className="col-lg-9 col-cards">
                <div className="row row-movie d-flex justify-content-center flex-wrap">
                  <GetRanks
                    Ranking={this.state.ranking}
                    textcolor={this.state.textcolor}
                    ranktoggle={this.state.ranktoggle}
                    nametoggle={this.state.nametoggle}
                    columns={this.state.columns}
                    backgroundcolor={this.state.backgroundcolor}
                    cardcolor={this.state.backgroundcolor}
                    handleSorting={this.handleSorting}
                  />
                </div>
              </div>

              <div className="col-lg-3 col-txt2 d-none d-lg-block">
                <div className="row d-flex flex-column justify-content-center align-items-stretch">
                  <div className="col">
                    <h5>Colors</h5>
                    <p>Background</p>
                    <div className="color-group one">
                      <a>
                        <div
                          className="color-box bgc one active"
                          onClick={() =>
                            this.setState({ backgroundcolor: "#298C82" })
                          }
                        ></div>
                      </a>
                      <a>
                        <div
                          className="color-box bgc two"
                          onClick={() =>
                            this.setState({ backgroundcolor: "#101010" })
                          }
                        ></div>
                      </a>
                      <a>
                        <div
                          className="color-box bgc three"
                          onClick={() =>
                            this.setState({ backgroundcolor: "#36454F" })
                          }
                        ></div>
                      </a>
                      <a>
                        <div
                          className="color-box bgc four"
                          onClick={() =>
                            this.setState({ backgroundcolor: "#251E3E" })
                          }
                        ></div>
                      </a>
                      <a>
                        <div
                          className="color-box bgc five"
                          onClick={() =>
                            this.setState({ backgroundcolor: "#FCFCFC" })
                          }
                        ></div>
                      </a>
                      <a>
                        <div
                          className="color-box bgc six"
                          onClick={() =>
                            this.setState({ backgroundcolor: "#05144A" })
                          }
                        ></div>
                      </a>
                      <a>
                        <div
                          className="color-box bgc seven"
                          onClick={() =>
                            this.setState({ backgroundcolor: "#183F0D" })
                          }
                        ></div>
                      </a>
                      <a>
                        <div
                          className="color-box bgc eight"
                          onClick={() =>
                            this.setState({ backgroundcolor: "#73234E" })
                          }
                        ></div>
                      </a>
                    </div>
                  </div>

                  <div className="col">
                    <p>Text</p>
                    <div className="color-group two">
                      <a onClick={() => this.setState({ textcolor: false })}>
                        <div className="text-color color-box five active"></div>
                      </a>
                      <a onClick={() => this.setState({ textcolor: true })}>
                        <div className="text-color color-box two"></div>
                      </a>
                    </div>
                  </div>

                  <div className="col">
                    <p className="columns">Columns</p>
                    <div className="column-group d-flex justify-content-around col-settings">
                      <div className="row">
                        <div
                          className={
                            "col-choice col-4 d-flex justify-content-center " +
                            (this.state.columns === 5 ? "active-item" : "")
                          }
                        >
                          <a onClick={() => this.setState({ columns: 5 })}>
                            <div className="column-box one d-flex flex-column justify-content-center align-items-center">
                              <h6>5</h6>
                              <img
                                src="Images/customization/col-5.png"
                                alt="..."
                              />
                            </div>
                          </a>
                        </div>
                        <div
                          className={
                            "col-choice col-4 d-flex justify-content-center " +
                            (this.state.columns === 4 ? "active-item" : "")
                          }
                        >
                          <a onClick={() => this.setState({ columns: 4 })}>
                            <div className="column-box one d-flex flex-column justify-content-center align-items-center">
                              <h6>4</h6>
                              <img
                                src="Images/customization/col-4.png"
                                alt="..."
                              />
                            </div>
                          </a>
                        </div>
                        <div
                          className={
                            "col-choice col-4 d-flex justify-content-center " +
                            (this.state.columns === 3 ? "active-item" : "")
                          }
                        >
                          <a onClick={() => this.setState({ columns: 3 })}>
                            <div className="column-box one d-flex flex-column justify-content-center align-items-center">
                              <h6>3</h6>
                              <img
                                src="Images/customization/col-3.png"
                                alt="..."
                              />
                            </div>
                          </a>
                        </div>
                      </div>
                    </div>

                    <div className="col d-flex justify-content-start">
                      <div className="switch-name">
                        <p className="columns">Name</p>
                        <label className="switch">
                          <input
                            type="checkbox"
                            defaultChecked={true}
                            onChange={() =>
                              this.setState({
                                nametoggle: !this.state.nametoggle,
                              })
                            }
                          />
                          <span className="slider round"></span>
                        </label>
                      </div>

                      <div className="switch-rank">
                        <p className="columns">Rank</p>
                        <label className="switch">
                          <input
                            type="checkbox"
                            defaultChecked={true}
                            onChange={() =>
                              this.setState({
                                ranktoggle: !this.state.ranktoggle,
                              })
                            }
                          />
                          <span className="slider round"></span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="row mt-5">
              <div className="col d-flex justify-content-center">
                <a className="btn btn-login" onClick={this.handleRank}>
                  Continue
                </a>
              </div>
            </div>
          </div>

          <div className="d-block d-lg-none">
            <div className="row d-flex justify-content-center">
              <div className="col-7 d-flex flex-column justify-content-center align-items-center">
                <h2 className="mt-5 text-">Design</h2>
                <p className="mt-3 d-none d-md-block text-center desc-p">
                  You’re almost there, well done! In this last step of the
                  process you can choose how your ranking looks. You can choose
                  the right color and lay-out and make it all yours.
                </p>
              </div>
            </div>

            <div
              className="row row-cards mt-5 d-flex justify-content-center align-items-center"
              style={{ border: "solid 1px black" }}
            >
              <div
                className="col-md-12 col-cards"
                style={{ border: "solid 1px black" }}
              >
                <div
                  className="row row-movie d-flex justify-content-center flex-wrap"
                  style={{ border: "solid 1px white" }}
                >
                  <GetRanks
                    Ranking={this.state.ranking}
                    textcolor={this.state.textcolor}
                    ranktoggle={this.state.ranktoggle}
                    nametoggle={this.state.nametoggle}
                    columns={this.state.columns}
                    backgroundcolor={this.state.backgroundcolor}
                  />
                </div>
              </div>
              <div className="col-md-3 col-txt2 d-none d-lg-block">
                <div className="row d-flex flex-column justify-content-start align-items-start">
                  <h5>Colors</h5>
                  <p>Background</p>
                  <div className="color-group">
                    <a>
                      <div
                        className="color-box bgc one active-item"
                        onClick={() =>
                          this.setState({ backgroundcolor: "#298C82" })
                        }
                      ></div>
                    </a>
                    <a>
                      <div
                        className="color-box bgc two"
                        onClick={() =>
                          this.setState({ backgroundcolor: "#101010" })
                        }
                      ></div>
                    </a>
                    <a>
                      <div
                        className="color-box bgc three"
                        onClick={() =>
                          this.setState({ backgroundcolor: "#36454F" })
                        }
                      ></div>
                    </a>
                    <a>
                      <div
                        className="color-box bgc four"
                        onClick={() =>
                          this.setState({ backgroundcolor: "#251E3E" })
                        }
                      ></div>
                    </a>
                    <a>
                      <div
                        className="color-box bgc five"
                        onClick={() =>
                          this.setState({ backgroundcolor: "#FCFCFC" })
                        }
                      ></div>
                    </a>
                    <a>
                      <div
                        className="color-box bgc six"
                        onClick={() =>
                          this.setState({ backgroundcolor: "#05144A" })
                        }
                      ></div>
                    </a>
                    <a>
                      <div
                        className="color-box bgc seven"
                        onClick={() =>
                          this.setState({ backgroundcolor: "#183F0D" })
                        }
                      ></div>
                    </a>
                    <a>
                      <div
                        className="color-box bgc eight"
                        onClick={() =>
                          this.setState({ backgroundcolor: "#73234E" })
                        }
                      ></div>
                    </a>
                  </div>
                </div>
                <div className="row d-flex flex-column justify-content-start align-items-start">
                  <p>Text</p>
                  <div className="color-group two">
                    <a onClick={() => this.setState({ text: false })}>
                      <div className="text-color color-box five active-item"></div>
                    </a>
                    <a onClick={() => this.setState({ text: true })}>
                      <div className="text-color color-box two"></div>
                    </a>
                  </div>
                </div>
                <div className="row d-flex flex-column justify-content-start align-items-start">
                  <p className="columns">Columns</p>
                  <div className="column-group d-flex justify-content-around">
                    <div className="row col-settings">
                      <div className="col-4 col-choice active-item d-flex justify-content-center">
                        <a
                          className="col-choice active-item d-flex justify-content-center"
                          onClick={() => this.setState({ columns: 5 })}
                        >
                          <div className="col-choice active column-box one d-flex flex-column justify-content-center align-items-center">
                            <h6>5</h6>
                            <img
                              src="Images/customization/col-5.png"
                              alt="..."
                            />
                          </div>
                        </a>
                      </div>
                      <div
                        className={
                          "col-4 col-choice d-flex justify-content-center" +
                          (this.state.columns === 4 ? "active-item" : "")
                        }
                      >
                        <a onClick={() => this.setState({ columns: 4 })}>
                          <div className="column-box one d-flex flex-column justify-content-center align-items-center">
                            <h6>4</h6>
                            <img
                              src="Images/customization/col-4.png"
                              alt="..."
                            />
                          </div>
                        </a>
                      </div>
                      <div className="col-4 col-choice d-flex justify-content-center">
                        <a onClick={() => this.setState({ columns: 3 })}>
                          <div className="column-box one d-flex flex-column justify-content-center align-items-center">
                            <h6>3</h6>
                            <img
                              src="Images/customization/col-3.png"
                              alt="..."
                            />
                          </div>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="row d-block d-lg-none row-tab">
              <div class="col">
                <ul
                  class="nav nav-tabs d-flex justify-content-center"
                  id="myTab"
                  role="tablist"
                >
                  <li class="nav-item" role="presentation">
                    <a
                      class="nav-link one link-tab active"
                      id="home-tab"
                      data-toggle="tab"
                      href="#home"
                      role="tab"
                      aria-controls="home"
                      aria-selected="true"
                    >
                      Color
                    </a>
                  </li>
                  <li class="nav-item" role="presentation">
                    <a
                      class="nav-link link-tab middle"
                      id="profile-tab"
                      data-toggle="tab"
                      href="#profile"
                      role="tab"
                      aria-controls="profile"
                      aria-selected="false"
                    >
                      Column
                    </a>
                  </li>
                  <li class="nav-item" role="presentation">
                    <a
                      class="nav-link three link-tab"
                      id="contact-tab"
                      data-toggle="tab"
                      href="#contact"
                      role="tab"
                      aria-controls="contact"
                      aria-selected="false"
                    >
                      Styles
                    </a>
                  </li>
                </ul>
                <div class="tab-content" id="myTabContent">
                  <div
                    class="tab-pane fade show active pl-3"
                    id="home"
                    role="tabpanel"
                    aria-labelledby="home-tab"
                  >
                    <div class="row d-flex justify-content-between">
                      <div class="col-5">
                        <p class="mt-4">Background</p>
                        <div class="color-group">
                          <a>
                            <div
                              className="color-box bgc one active"
                              onClick={() =>
                                this.setState({ backgroundcolor: "#298C82" })
                              }
                            ></div>
                          </a>
                          <a>
                            <div
                              className="color-box bgc two"
                              onClick={() =>
                                this.setState({ backgroundcolor: "#101010" })
                              }
                            ></div>
                          </a>
                          <a>
                            <div
                              className="color-box bgc three"
                              onClick={() =>
                                this.setState({ backgroundcolor: "#36454F" })
                              }
                            ></div>
                          </a>
                          <a>
                            <div
                              className="color-box bgc four"
                              onClick={() =>
                                this.setState({ backgroundcolor: "#251E3E" })
                              }
                            ></div>
                          </a>
                          <a>
                            <div
                              className="color-box bgc five"
                              onClick={() =>
                                this.setState({ backgroundcolor: "#FCFCFC" })
                              }
                            ></div>
                          </a>
                          <a>
                            <div
                              className="color-box bgc six"
                              onClick={() =>
                                this.setState({ backgroundcolor: "#05144A" })
                              }
                            ></div>
                          </a>
                          <a>
                            <div
                              className="color-box bgc seven"
                              onClick={() =>
                                this.setState({ backgroundcolor: "#183F0D" })
                              }
                            ></div>
                          </a>
                          <a>
                            <div
                              className="color-box bgc eight"
                              onClick={() =>
                                this.setState({ backgroundcolor: "#73234E" })
                              }
                            ></div>
                          </a>
                        </div>
                      </div>
                      <div class="col-5">
                        <p class="mt-4">Text</p>
                        <div class="color-group d-flex justify-content-start">
                          <a onClick={() => this.setState({ text: false })}>
                            <div className="text-color color-box five active-item"></div>
                          </a>
                          <a onClick={() => this.setState({ text: true })}>
                            <div className="text-color color-box two"></div>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    class="tab-pane fade"
                    id="profile"
                    role="tabpanel"
                    aria-labelledby="profile-tab"
                  >
                    <div class="mt-4 column-group d-flex justify-content-around">
                      <div class="row col-settings">
                        <div
                          className={
                            "col-4 size-five col-choice d-flex justify-content-center " +
                            (this.state.columns === 5 ? "active-item" : "")
                          }
                        >
                          <a onClick={() => this.setState({ columns: 5 })}>
                            <div className="column-box one d-flex flex-column justify-content-center align-items-center">
                              <h6>5</h6>
                              <img
                                src="Images/customization/col-5.png"
                                alt="..."
                              />
                            </div>
                          </a>
                        </div>
                        <div
                          className={
                            "col-4 col-choice d-flex justify-content-center " +
                            (this.state.columns == 4 ? "active-item" : "")
                          }
                          onClick={() => this.setState({ columns: 4 })}
                        >
                          <a
                            onClick={() => {
                              this.setState({ columns: 4 });
                            }}
                          >
                            <div className="column-box one d-flex flex-column justify-content-center align-items-center">
                              <h6>4</h6>
                              <img
                                src="Images/customization/col-4.png"
                                alt="..."
                              />
                            </div>
                          </a>
                        </div>
                        <div
                          className={
                            "col-4 col-choice d-flex justify-content-center " +
                            (this.state.columns === 3 ? "active-item" : "")
                          }
                        >
                          <a
                            onClick={() => {
                              this.setState({ columns: 3 });
                            }}
                          >
                            <div className="column-box one d-flex flex-column justify-content-center align-items-center">
                              <h6>3</h6>
                              <img
                                src="Images/customization/col-3.png"
                                alt="..."
                              />
                            </div>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    class="tab-pane fade"
                    id="contact"
                    role="tabpanel"
                    aria-labelledby="contact-tab"
                  >
                    <div class="row d-flex justify-content-center pl-4">
                      <div class="col-6 mt-4 d-flex justify-content-around">
                        <div>
                          <p>Name</p>
                          <label className="switch">
                            <input
                              type="checkbox"
                              defaultChecked={true}
                              onChange={() =>
                                this.setState({
                                  nametoggle: !this.state.nametoggle,
                                })
                              }
                            />
                            <span className="slider round"></span>
                          </label>
                        </div>
                        <div>
                          <p>Rank</p>
                          <label className="switch">
                            <input
                              type="checkbox"
                              defaultChecked={true}
                              onChange={() =>
                                this.setState({
                                  ranktoggle: !this.state.ranktoggle,
                                })
                              }
                            />
                            <span className="slider round"></span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="row mt-5">
              <div className="col d-flex justify-content-center">
                <a className="btn btn-login" onClick={this.handleRank}>
                  Continue
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Customization);
