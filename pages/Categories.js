import { withRouter } from "next/router";
import React from "react";
class Categories extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.router.query.name,
      category: "",
      error: "",
      popup: false,
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  handleClick = (event) => {
    this.setState({
      category: event.target.value,
    });
  };

  handlePopup = () => {
    this.setState({
      popup: true,
    });
  };

  handleContinue = () => {
    const { category, name } = this.state;
    if (!category) {
      this.setState({
        error: "Please select a category to continue the ranking process!",
      });
    } else {
      this.props.router.push({
        pathname: "/RankCreation",
        query: {
          category,
          name,
        },
      });
    }
  };

  render() {
    return (
      <div className="categories-page">
        {this.state.popup && (
          <div className="popup">
            <div className="popup-content">
              <button
                className="btn-close"
                onClick={() => {
                  this.setState({ popup: false });
                }}
              ></button>
              <h4>Coming Soon!</h4>
              <h5>The category will be available a bit later</h5>
              <button
                href="#"
                className="btn-popup"
                onClick={() => {
                  this.setState({ popup: false });
                }}
              >
                Okay
              </button>
            </div>
          </div>
        )}

        <section className="options d-flex justify-content-around align-items-center">
          <div className="row mt-4 mb-3">
            <div className="col d-none d-md-flex justify-content-center align-items-center">
              <div className="d-flex flex-column justify-content-start align-items-center">
                <img
                  src="Images/rank-creation/Oval Active.svg"
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
                  src="Images/rank-creation/Oval.png"
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

        <div className="inner-content">
          <div className="container">
            <div className="row d-flex justify-content-center">
              <div className="col-10 col-lg-6 d-flex flex-column justify-content-center align-items-center">
                <h2 className="mt-5">Categories</h2>
                <p className="desc-p mt-3 text-center d-none d-lg-block">
                  This is the first step of creating your own ranking! Please
                  choose a category for your ranking.
                </p>
                <p className="desc-p text-center d-block d-lg-none">
                  This is the first step of creating your own ranking list.
                  Please choose a category for your ranking.
                </p>
              </div>
            </div>

            <div className="row categories-box d-flex justify-content-center flex-wrap">
              <div className="col-6 col-md-3 d-flex justify-content-center">
                <button
                  className="box one"
                  value="Cinema"
                  onClick={this.handleClick}
                >
                  <img
                    src="Images/categories/cinema.svg"
                    className="img-fluid"
                    alt="..."
                  />
                  Cinema
                </button>
              </div>
              <div className="col-6 col-md-3 d-flex justify-content-center">
                <button
                  className="box two"
                  value="Music"
                  onClick={this.handleClick}
                >
                  <img
                    src="Images/categories/music-note.svg"
                    className="img-fluid"
                    alt="..."
                  />
                  Music
                </button>
              </div>
              <div className="col-6 col-md-3 d-flex justify-content-center">
                <button
                  className="box three"
                  value="Sports"
                  onClick={this.handleClick}
                >
                  <img
                    src="Images/categories/soccer-ball.svg"
                    className="img-fluid"
                    alt="..."
                  />
                  Sports
                </button>
              </div>
              <div className="col-6 col-md-3 d-flex justify-content-center">
                <button
                  className="box four"
                  value="Books"
                  onClick={this.handleClick}
                >
                  <img
                    src="Images/categories/book.svg"
                    className="img-fluid"
                    alt="..."
                  />
                  Books
                </button>
              </div>
              <div className="col-6 col-md-3 d-flex justify-content-center">
                <button
                  className="box five"
                  value="Games"
                  onClick={this.handleClick}
                >
                  <img
                    src="Images/categories/video-game.svg"
                    className="img-fluid"
                    alt="..."
                  />
                  Games
                </button>
              </div>
              <div className="col-6 col-md-3 d-flex justify-content-center">
                <button
                  className="box six"
                  value="Food"
                  onClick={this.handleClick}
                >
                  <img
                    src="Images/categories/cake.svg"
                    className="img-fluid"
                    alt="..."
                  />
                  Food
                </button>
              </div>
              <div className="col-6 col-md-3 d-flex justify-content-center">
                <button
                  className="box seven"
                  value="Travel"
                  onClick={this.handleClick}
                >
                  <img
                    src="Images/categories/luggage.svg"
                    className="img-fluid"
                    alt="..."
                  />
                  Travel
                </button>
              </div>
              <div className="col-6 col-md-3 d-flex justify-content-center">
                <button
                  className="box lamp eight"
                  value="Other"
                  onClick={this.handlePopup}
                >
                  <img
                    src="Images/categories/lamp.svg"
                    className="img-fluid img-lamp"
                    alt="..."
                  />
                  Other
                </button>
              </div>
            </div>

            <div className="row row-validation d-flex justify-content-center">
              <div className="col-md-7 col-md-5 d-flex justify-content-center">
                <p className="text-danger text-center">{this.state.event}</p>
              </div>
            </div>

            <div className="row mt-2">
              <div className="col d-flex justify-content-center">
                <button onClick={this.handleContinue} className="btn-login">
                  Continue
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default withRouter(Categories);
