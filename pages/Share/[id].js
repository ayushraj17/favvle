import React from "react";
import axios from "axios";
import { BASE_URL } from "../../Constants";
import { withRouter } from "next/router";
import Head from "next/head";
import GetRanks from "../../assets/Components/GetRanks/GetRanks";

class LandingPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Ranking: [],
      category: "",
      name: "",
      backgroundColor: "",
      textcolor: "",
      nametoggle: "",
      ranktoggle: "",
      columns: "",
    };
    console.log(this.props.router.query);
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    axios
      .post(BASE_URL + "/users/getrankingbyid", {
        id: this.props.router.query.id,
      })
      .then((res) => {
        console.log(res);
        this.setState({
          Ranking: res.data.rank[0].ranking,
          category: res.data.rank[0].category,
          name: res.data.rank[0].name,
          backgroundColor: res.data.rank[0].backgroundcolor,
          textcolor: res.data.rank[0].textcolor,
          nametoggle: res.data.rank[0].nametoggle,
          ranktoggle: res.data.rank[0].ranktoggle,
          columns: res.data.rank[0].columns,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  handleHome = () => {
    this.props.router.push("/");
  };
  handleAbout = () => {
    this.props.router.push("/About");
  };

  handlePricing = () => {
    this.props.router.push("/Plans");
  };
  handleLogin = () => {
    this.props.router.push("/Login");
  };

  handleRankcreation = () => {
    this.props.router.push("/Categories");
  };

  render() {
    return (
      <>
        <Head>
          {/* description */}
          <meta name="description" content={this.props.metadata.description} />
          <meta
            property="og:description"
            content={this.props.metadata.description}
          />
          <meta
            name="twitter:description"
            content={this.props.metadata.description}
          />
          {/*  OG tags */}
          <meta property="og:image" content={this.props.metadata.ogimg} />
          <meta property="og:image:secure_url" content={this.props.metadata.ogimg} />
          <meta property="og:image:width" content="310" />
          <meta property="og:image:height" content="460" />
          <meta property="og:site_name" content="Favvle" />
          <meta property="og:type" content="website" />
          
        </Head>
        <div className="landingPage-page">
          <nav className="navbar navbar-expand-md navbar-dark bg-transparent">
            <div className="container">
              <a className="navbar-brand d-none d-md-flex justify-content-center">
                <img
                  src="/Images/home/logo.png"
                  className="img-fluid"
                  alt=".."
                />
              </a>
              <div
                className="collapse navbar-collapse d-none d-md-block"
                id="navbarNavAltMarkup"
              >
                <div className="navbar-nav d-flex justify-content-between">
                  <div className="d-flex justify-content-around align-items-center">
                    <a
                      className="nav-link active d-none d-md-block"
                      onClick={this.handleHome}
                    >
                      {" "}
                      Home <span className="sr-only">(current)</span>
                    </a>
                    <a className="nav-link" onClick={this.handleAbout}>
                      About
                    </a>
                    {/* <a className="nav-link" onClick={this.handlePricing}>
											Pricing
										</a> */}
                  </div>
                  <div className="d-flex justify-content-around align-items-center">
                    <a
                      className="nav-link d-block d-lg-none"
                      onClick={this.handleLogin}
                    >
                      <img
                        className="mr-1"
                        src="/Images/logo/login-user.svg"
                        alt=""
                      />
                      Login
                    </a>
                    <a
                      className="nav-link d-none d-lg-block ml-5"
                      onClick={this.handleLogin}
                    >
                      <img
                        className="mr-1"
                        src="/Images/logo/login-user.svg"
                        alt=""
                      />
                      Login
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </nav>

          <div className="container">
            <div className="row">
              <div className="col d-flex d-md-none justify-content-center">
                <img
                  src="/Images/home/logo.png"
                  className="img-fluid"
                  alt="..."
                />
              </div>
            </div>
          </div>

          <div className="options d-flex d-md-none justify-content-around align-items-center">
            <a className="option-link" onClick={this.handleAbout}>
              About
            </a>
            {/* <a className="option-link" onClick={this.handlePricing}>
							Pricing
						</a> */}
            <a className="option-link" onClick={this.handleLogin}>
              Login
            </a>
          </div>

          <div className="hero d-none d-md-block">
            <img
              src="/Images/landing-page/3.svg"
              className="img-fluid img-absol three"
              alt=".."
            />
            <img
              src="/Images/landing-page/2.svg"
              className="img-fluid img-absol four"
              alt=".."
            />
            <div className="jumbotron jumbotron-fluid bg-transparent">
              <div className="container">
                <div className="row d-flex justify-content-center">
                  <div className="col-12 col-md-11 col-ld-9 d-flex flex-column justify-content-center align-items-center">
                    <h3 className="text-uppercase text-white text-center hero-txt">
                      Ranked, create your own impressive rankings
                    </h3>
                    <p className="text-white text-center desc-p">
                      Start now to rank, share and compare. With our easy to use
                      ranking system and multiple customization options you can
                      set your individual style!
                    </p>
                    <button
                      className="btn-start btn-front mt-5"
                      onClick={this.handleRankcreation}
                    >
                      Start Ranking
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <section className="why-ranked customize">
            <img
              src="/Images/home/image_ranking_2_ek2.png"
              className="d-none img-fluid img-absol one"
              alt=".."
            />
            <img
              src="/Images/home/image_ranking_1_ek2.png"
              className="d-none img-fluid img-absol two"
              alt=".."
            />
            <div className="container">
              <div className="row">
                <div className="col d-flex flex-column justify-content-center align-items-center">
                  <h2 className="header-text text-center mt-3">Customize</h2>
                  <p className="desc-two text-center text-white mt-4 d-none d-md-block">
                    You like the ranking list you saw on social media but would
                    like to change the order? Just drag and drop the ranks to
                    change it into your own list and let everyone know what your
                    favourite ranks are.
                  </p>
                  <p className="desc-two text-center text-white mt-4 d-block d-md-none">
                    Change up this ranking list and re-post it in your favourite
                    order.
                  </p>
                </div>
              </div>

              <section className="section-lg inner-bg d-none d-lg-block">
                <div className="container" style={{ background: this.state.backgroundColor }}>
                  <div className="row d-flex justify-content-center">
                    <div
                      className="col-10 col-movie"
                      
                    >
                      <div className="row">
                        <div className="col-12">
                          <h4
                            style={{
                              color:
                                this.state.backgroundcolor === "#FCFCFC"
                                  ? "black"
                                  : "white",
                              textAlign: "center",
                            }}
                          >
                            {this.state.name}
                          </h4>
                          <GetRanks
                            Ranking={this.state.Ranking}
                            category={this.state.category}
                            name={this.state.name}
                            backgroundColor={this.state.backgroundColor}
                            textcolor={this.state.textcolor}
                            nametoggle={this.state.nametoggle}
                            ranktoggle={this.state.ranktoggle}
                            columns={this.state.columns}
                          />
                        </div>

                        <div className="col-12">
                          <div className="row d-flex justify-content-center"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-12 d-flex justify-content-center">
                      <a class="btn-post" onClick={this.handleRankcreation}>
                        Start Ranking
                      </a>
                    </div>
                  </div>
                </div>
              </section>

              <section className="inner-bg d-block d-lg-none">
                <div className="row row-movie" style={{ background: this.state.backgroundColor }}>
                  <h4 className="mt-4 text-white text-center"
                     style={{
                      color:
                        this.state.backgroundcolor === "#FCFCFC"
                          ? "black"
                          : "white",
                      textAlign: "center",
                    }}
                  >{this.state.name}    
                  </h4>
                  <div className="row">
                    <div className="col-12">
                      <div className="row d-flex justify-content-center">
                      <GetRanks
                            Ranking={this.state.Ranking}
                            category={this.state.category}
                            name={this.state.name}
                            backgroundColor={this.state.backgroundColor}
                            textcolor={this.state.textcolor}
                            nametoggle={this.state.nametoggle}
                            ranktoggle={this.state.ranktoggle}
                            columns={this.state.columns}
                          />
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-12 d-flex justify-content-center">
                      <a class="btn-post" onClick={this.handleRankcreation}>
                        Start Ranking
                      </a>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </section>

          <section className="why-ranked">
            <img
              src="/Images/landing-page/4.svg"
              className="d-block d-md-none img-fluid img-absol one"
              alt=".."
            />
            <img
              src="/Images/landing-page/5.svg"
              className="d-block d-md-none img-fluid img-absol two"
              alt=".."
            />
            <div className="container">
              <div className="row">
                <div className="col">
                  <h2 className="header-text-two text-center">Why Ranked</h2>
                </div>
              </div>
              <div className="row d-flex justify-content-center align-items-center mt-5">
                <div className="col-12 col-md-6 g-one">
                  <h4>Heading</h4>
                  <p className="desc-x">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </p>
                  <button
                    className="btn-start mt-5"
                    onClick={this.handleRankcreation}
                  >
                    Start Ranking
                  </button>
                </div>
                <div className="d-none d-md-block col-md-6">
                  <img
                    src="/Images/landing-page/4.svg"
                    className="two  imgdesc-one"
                    alt=".."
                  />
                </div>
              </div>
              <div className="row d-flex justify-content-center align-items-center mt-5">
                <div className="d-none d-md-block col-md-6 g-two">
                  <img
                    src="/Images/landing-page/5.svg"
                    className="two imgdesc-two"
                    alt=".."
                  />
                </div>
                <div className="col-12 col-md-6 d-flex flex-column align-items-end">
                  <h4>Heading</h4>
                  <p className="text-right desc-x">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </p>
                  <button
                    className="btn-start mt-5"
                    onClick={this.handleRankcreation}
                  >
                    Start Ranking
                  </button>
                </div>
              </div>
              <div className="row d-flex justify-content-center align-items-center mt-5">
                <div className="col-12 col-md-6 g-three">
                  <h4 className="heading-two">Heading</h4>
                  <p className="heading-two desc-x">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </p>
                  <button
                    className="btn-start mt-5"
                    onClick={this.handleRankcreation}
                  >
                    Start Ranking
                  </button>
                </div>
                <div className="col-12 col-md-6"></div>
              </div>
            </div>
          </section>

          <section>
            <div className="container">
              <div className="row">
                <div className="col-12">
                  <p className="text-white text-center desc-footer">
                    You always wanted an easy and fast tool to create amazing
                    rankings? With Ranked you can do all that and more! Start
                    your ranking now.You always wanted an easy and fast tool to
                    create amazing rankings? With Ranked you can do all that and
                    more! Start your ranking now.You always wanted an easy and
                    fast tool to create amazing rankings? With Ranked you can do
                    all that and more! Start your ranking now.You always wanted
                    an easy and fast tool to create amazing rankings? With
                    Ranked you can do all that and more! Start your ranking
                    now.You always wanted an easy and fast tool to create{" "}
                  </p>
                </div>
              </div>
            </div>
          </section>

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
                        src="/Images/footer/facebook.svg"
                        className="img-fluid mx-1"
                        alt="..."
                      />
                    </a>
                    <a>
                      <img
                        src="/Images/footer/twitter.svg"
                        className="img-fluid mx-1"
                        alt="..."
                      />
                    </a>
                    <a>
                      <img
                        src="/Images/footer/instagram.svg"
                        className="img-fluid mx-1"
                        alt="..."
                      />
                    </a>
                    <a>
                      <img
                        src="/Images/footer/whatsapp.svg"
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
                      src="/Images/footer/facebook.svg"
                      className="img-fluid"
                      alt="..."
                    />
                  </a>
                  <a>
                    <img
                      src="/Images/footer/twitter.svg"
                      className="img-fluid"
                      alt="..."
                    />
                  </a>
                  <a>
                    <img
                      src="/Images/footer/instagram.svg"
                      className="img-fluid"
                      alt="..."
                    />
                  </a>
                  <a>
                    <img
                      src="/Images/footer/whatsapp.svg"
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
      </>
    );
  }
}
const LandingPageComponent = withRouter(LandingPage);

export default LandingPageComponent;

export async function getServerSideProps(context) {
  let metadata = {
    status: 1,
    description: "default",
    ogimg: "http://localhost:4000/Gif/60ae7b3a21a4261a445649c4.gif",
    message: "successfull",
  };

  try {
    const res = await axios.post(BASE_URL + "/users/getmetadata", {
      id: context.params.id,
    });
    metadata = res.data;
  } catch (err) {
    if (err.status === 409) {
      console.log("something went wrong");
    } else {
      console.log(err);
    }
  }
  return { props: { metadata } };
}
