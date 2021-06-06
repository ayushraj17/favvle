import React from "react";
// import "../assets/css/PostPreview.css";
// import "../assets/css/All.css";
import PostRanks from "../assets/Components/GetRanks/PostRanks";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  InstapaperShareButton,
} from "react-share";
import axios from "axios";
import { withRouter } from "next/router";
var gifshot = require("gifshot");

class PostPreview extends React.Component {
  constructor(props) {
    super(props);
    // console.log("post preview", props.router.query.ranking);
    this.state = {
      ranking: [],
      id: props.router.query.ranking?._id,
      gif: "",
      shareurl: "",
      intervalId: "",
      count: 0,
    };
  }
  componentDidMount() {
    window.scrollTo(0, 0);
    if (typeof window !== "undefined") {
      if (window.localStorage.getItem("rankingSignup") !== null) {
        this.setState(
          {
            ranking: JSON.parse(window.localStorage.getItem("rankingSignup")),
          },
          this.createPostPreview(
            JSON.parse(window.localStorage.getItem("rankingSignup"))
          )
        );
        

        
      } else if (window.localStorage.getItem("rankingFromLibrary") !== null) {
        this.setState(
          {
            ranking: JSON.parse(
              window.localStorage.getItem("rankingFromLibrary")
            ),
          },
          this.createPostPreview(
            JSON.parse(window.localStorage.getItem("rankingFromLibrary"))
          )
        );
      }
    }
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalId);
  }

  timer = () => {
    if (this.state.count == 1 || this.state.count == 0)
      this.setState({ count: this.state.ranking.ranking.length });
    else this.setState({ count: this.state.count - 1 });
  };

  createPostPreview = (arr) => {
    
    let imgarray = arr.ranking.reverse().map((item) => item.Poster);
    console.log("imgarray",imgarray);
    if (!localStorage.getItem("usertoken")) {
      axios
        .post(process.env.NEXT_PUBLIC_BASE_URL + "/users/addrankingpublic", {
          ranking: arr?.ranking,
          category: arr?.category,
          name: arr?.name,
          backgroundcolor: arr?.backgroundcolor,
          textcolor: arr?.textcolor,
          nametoggle: arr?.nametoggle,
          ranktoggle: arr?.ranktoggle,
          columns: arr?.columns,
        })
        .then((response) => {
          console.log(response.data.rank._id);
          if (response.data.status) {
            console.log("no login", response.data);
            localStorage.removeItem("rankingSignup");
            console.log(FRONTEND_URL + `/Share/${response.data.rank._id}`)
            this.setState({
              shareurl: FRONTEND_URL + `/Share/${response.data.rank._id}`,
              id: response.data.rank._id,
            });

            gifshot.createGIF(
              {
                images: imgarray,
                interval: "1",
                gifWidth: 310,
                gifHeight: 460,
              },
              (obj) => {
                if (!obj.error) {
                  var image = obj.image;
                  this.setState({ gif: image });
                  axios
                    .post(process.env.NEXT_PUBLIC_BASE_URL + "/users/uploadgif", {
                      gif: image,
                      gifname: response.data.rank._id,
                    })
                    .then((response) => {

                      this.setState({
                        count: imgarray.length,
                      });
                      var intervalId = setInterval(() => this.timer(), 1000);
                      this.setState({ intervalId });

                    })
                    .catch((err) => {
                      if (err.status === 409) {
                        console.log("something went wrong");
                      } else {
                        console.log(err);
                      }
                    });
                }
              }
            );
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
    } else {
      gifshot.createGIF(
        {
          images: imgarray,
          interval: "1",
          gifWidth: 310,
          gifHeight: 460,
        },
        (obj) => {
          if (!obj.error) {
            var image = obj.image;
            this.setState({ gif: image });
            axios
              .post(process.env.NEXT_PUBLIC_BASE_URL + "/users/uploadgif", {
                gif: image,
                gifname: this.state.id,
              })
              .then((response) => {
                this.setState({shareurl:FRONTEND_URL + `/Share/${this.state.ranking?._id}`});
                
                this.setState({
                  count: imgarray.length,
                });
                var intervalId = setInterval(() => this.timer(), 1000);
                this.setState({ intervalId });

              })
              .catch((err) => {
                if (err.status === 409) {
                  console.log("something went wrong");
                } else {
                  console.log(err);
                }
              });
          }
        }
      );
    }
  };

  handleSorting = (id1, id2) => {
    let temp = [...this.state.ranking?.ranking];
    temp[id2] = this.state.ranking?.ranking[id1];
    temp[id1] = this.state.ranking?.ranking[id2];
    this.setState({
      ranking: {
        ranking: temp,
      },
    });
  };

  UploadGif = () => {
    let form = new FormData();
    form.append("gif", this.state.gif);
    axios
      .post(process.env.NEXT_PUBLIC_BASE_URL + "/users/uploadgif")
      .then((response) => {
        console.log(response.data);
      })
      .catch((err) => {
        if (err.status === 409) {
          console.log("something went wrong");
        } else {
          console.log(err);
        }
      });
  };

  render() {
    return (
      <div className="postPreview-page">
        <div className="options d-none justify-content-center align-items-center">
          <a className="option-lk" href="#">
            Preview
          </a>
        </div>

        <div className="options-two d-none justify-content-start align-items-start">
          <a
            href="#"
            className="d-flex align-items-center a-plans"
            onClick={() => this.props.router.back()}
          >
            <img src="Images/login/arrow-icon.png" alt="..." />
          </a>
        </div>

        <section className="section-lg inner-bg d-none d-lg-block">
          <div className="container">
            <div className="row">
              <div className="col d-flex justify-content-end">
                <a
                  href="#"
                  className="btn-close"
                  onClick={() => this.props.router.back()}
                ></a>
              </div>
            </div>
            <div className="row">
              <div className="col d-flex flex-column justify-content-center align-items-center">
                <h2 className="d-none d-md-block">Preview</h2>
                <p className="desc-p mt-3 d-none d-md-block sp-green">
                  This is a preview of your post on [social media channel] and
                  shows how your ranking will be shown. To post this ranking
                  click on ‘Post’ under the preview.
                </p>
              </div>
            </div>

            <div className="row">
              <div className="col d-flex flex-column-reverse align-items-center justify-content-center">
                <ul
                  className="nav nav-pills mb-3"
                  id="pills-tab"
                  role="tablist"
                >
                  <li className="nav-item" role="presentation">
                    <a
                      className="nav-link color-white active tab-btn mx-2"
                      id="pills-home-tab"
                      data-toggle="pill"
                      href="#pills-home"
                      role="tab"
                      aria-controls="pills-home"
                      aria-selected="true"
                    >
                      View As List
                    </a>
                  </li>
                  <li className="nav-item" role="presentation">
                    <a
                      className="nav-link color-white tab-btn mx-2"
                      id="pills-profile-tab"
                      data-toggle="pill"
                      href="#pills-profile"
                      role="tab"
                      aria-controls="pills-profile"
                      aria-selected="false"
                    >
                      View As GIF
                    </a>
                  </li>
                </ul>
                <div
                  className="tab-content"
                  id="pills-tabContent"
                  style={{ width: "80%" }}
                >
                  <div
                    className="tab-pane fade show active"
                    id="pills-home"
                    role="tabpanel"
                    aria-labelledby="pills-home-tab"
                  >
                    <div className="row d-flex justify-content-center">
                      <div
                        className="col-10 col-movie"
                        style={{
                          background: this.state.ranking?.backgroundcolor,
                        }}
                      >
                        <div className="row">
                          <div className="col">
                            <img src="Images/signup/favvle-logo.svg" alt="" />
                          </div>
                        </div>

                        <div className="row row-fav">
                          <div className="col-12">
                            <h4
                              style={{
                                color:
                                  this.state.ranking?.backgroundcolor ===
                                  "#FCFCFC"
                                    ? "black"
                                    : "white",
                              }}
                            >
                              {this.state.ranking?.name}
                            </h4>
                          </div>

                          <div className="col-12">
                            <div className="row d-flex justify-content-center">
                              <PostRanks
                                Ranking={this.state.ranking?.ranking}
                                textcolor={this.state.ranking?.textcolor}
                                ranktoggle={this.state.ranking?.ranktoggle}
                                nametoggle={this.state.ranking?.nametoggle}
                                columns={this.state.ranking?.columns}
                                backgroundColor={
                                  this.state.ranking?.backgroundcolor
                                }
                                handleSorting={this.handleSorting}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="tab-pane fade"
                    id="pills-profile"
                    role="tabpanel"
                    aria-labelledby="pills-profile-tab"
                  >
                    <div
                      className="row d-flex row-gif justify-content-center"
                      style={{
                        background: this.state.ranking?.backgroundcolor,
                      }}
                    >
                      <div className="col">
                        <div className="row">
                          <div className="col">
                            <img src="Images/signup/favvle-logo.svg" alt="" />
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-12">
                            <h4
                              style={{
                                color:
                                  this.state.ranking?.backgroundcolor ===
                                  "#FCFCFC"
                                    ? "black"
                                    : "white",
                              }}
                            >
                              {this.state.ranking?.name}
                            </h4>
                          </div>
                          <div className="col-12 d-flex justify-content-center">
                            <img
                              src={this.state.gif}
                              style={{ borderRadius: 5 }}
                              alt=""
                            />
                          </div>
                          <div
                            className="col-12 d-flex justify-content-center"
                            style={{
                              color:
                                this.state.ranking?.backgroundcolor ===
                                "#FCFCFC"
                                  ? "black"
                                  : "white",
                            }}
                          >
                            <h1>{this.state.count}</h1>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-5 row d-flex justify-content-center">
              <div className="col-lg-5 col-md-7 d-flex justify-content-around logo-group">
                <a>
                  <FacebookShareButton
                    url={this.state.shareurl}
                    quote={this.state.ranking?.name}
                  >
                    <img
                      src="Images/postpreview/logo/facebook.svg"
                      className="img-fluid"
                      alt="..."
                    />
                  </FacebookShareButton>
                </a>
                <a>
                  <TwitterShareButton
                    url={this.state.shareurl}
                    title={this.state.ranking?.name}
                  >
                    <img
                      src="Images/postpreview/logo/twitter.svg"
                      className="img-fluid"
                      alt="..."
                    />
                  </TwitterShareButton>
                </a>
                <a>
                  <InstapaperShareButton
                    url={this.state.shareurl}
                    title="share link is==="
                    description="i found this link here"
                  >
                    <img
                      src="Images/postpreview/logo/insta.svg"
                      className="img-fluid"
                      alt="..."
                    />
                  </InstapaperShareButton>
                </a>
                <a>
                  <WhatsappShareButton
                    url={this.state.shareurl}
                    title={this.state.ranking?.name}
                  >
                    <img
                      src="Images/postpreview/logo/whats app.svg"
                      className="img-fluid"
                      alt="..."
                    />
                  </WhatsappShareButton>
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="inner-bg d-block d-lg-none">
          <div className="row d-flex flex-column justify-content-center align-items-center">
            <h3 className="txt-green">Post</h3>
            <p className="txt-green">
              This is a preview of your social media post.
            </p>
          </div>

          <div className="row">
            <div className="col d-flex flex-column-reverse justify-content-center align-items-center">
              <ul
                class="nav nav-for-sm nav-pills mb-3"
                id="pills-tab"
                role="tablist"
              >
                <li className="nav-item" role="presentation">
                  <a
                    className="nav-link color-white active tab-btn mx-2"
                    id="pills-home-tab"
                    data-toggle="pill"
                    href="#pills-home2"
                    role="tab"
                    aria-controls="pills-home2"
                    aria-selected="true"
                  >
                    View As List
                  </a>
                </li>
                <li className="nav-item" role="presentation">
                  <a
                    className="nav-link color-white tab-btn mx-2"
                    id="pills-profile-tab"
                    data-toggle="pill"
                    href="#pills-profile2"
                    role="tab"
                    aria-controls="pills-profile2"
                    aria-selected="false"
                  >
                    View As GIF
                  </a>
                </li>
              </ul>
              <div class="tab-content" id="pills-tabContent">
                <div
                  class="tab-pane fade show active"
                  id="pills-home2"
                  role="tabpanel"
                  aria-labelledby="pills-home-tab"
                  style={{width:"100%" }}
                >
                  <div
                    className="row row-movie"
                    style={{ background: this.state.ranking?.backgroundcolor, width:2000}}
                  >
                    <img src="Images/home/logo.png" className="img-logo" />
                    <h4
                      style={{
                        color:
                          this.state.ranking?.backgroundcolor === "#FCFCFC"
                            ? "black"
                            : "white",
                      }}
                    >
                      {this.state.ranking?.name}
                    </h4>
                    <div className="row">
                      <div className="col-12">
                        <div className="row d-flex justify-content-center">
                          <PostRanks
                            Ranking={this.state.ranking?.ranking}
                            textcolor={this.state.ranking?.textcolor}
                            ranktoggle={this.state.ranking?.ranktoggle}
                            nametoggle={this.state.ranking?.nametoggle}
                            columns={this.state.ranking?.columns}
                            backgroundColor={
                              this.state.ranking?.backgroundcolor
                            }
                            handleSorting={this.handleSorting}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="tab-pane fade"
                  id="pills-profile2"
                  role="tabpanel"
                  aria-labelledby="pills-profile-tab"
                >
                  <div className="row row-movie-gif">
                    <img src="Images/home/logo.png" className="img-logo" />
                    <h4
                      style={{
                        color:
                          this.state.ranking?.backgroundcolor === "#FCFCFC"
                            ? "black"
                            : "white",
                      }}
                    >
                      {this.state.ranking?.name}
                    </h4>
                    <div className="row">
                      <div className="col-12 d-flex justify-content-center">
                        <img src={this.state.gif} className="mt-2" alt="" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <footer className="d-block d-md-none">
          <div className="container">
            <div className="row d-flex justify-content-center align-items-center d-block d-md-none">
              <div className="col-10 logo-group d-flex justify-content-around">
                <a>
                  <FacebookShareButton
                    url={this.state.shareurl}
                    quote={this.state.ranking?.name}
                  >
                    <img
                      src="Images/footer/facebook.svg"
                      className="img-fluid"
                      alt="..."
                    />
                  </FacebookShareButton>
                </a>
                <a>
                  <TwitterShareButton
                    url={this.state.shareurl}
                    title={this.state.ranking?.name}
                  >
                    <img
                      src="Images/footer/twitter.svg"
                      className="img-fluid"
                      alt="..."
                    />
                  </TwitterShareButton>
                </a>
                <a>
                  <InstapaperShareButton
                    url={this.state.shareurl}
                    title="share link is==="
                    description="i found this link here"
                  >
                    <img
                      src="Images/footer/instagram.svg"
                      className="img-fluid"
                      alt="..."
                    />
                  </InstapaperShareButton>
                </a>
                <a>
                  <WhatsappShareButton
                    url={this.state.shareurl}
                    title={this.state.ranking?.name}
                  >
                    <img
                      src="Images/footer/whatsapp.svg"
                      className="img-fluid"
                      alt="..."
                    />
                  </WhatsappShareButton>
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    );
  }
}

export default withRouter(PostPreview);
