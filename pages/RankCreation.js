import React from "react";
// import "../assets/css/RankCreation.css";
// import "../assets/css/All.css";
import Searchbox from "../assets/Components/Searchbox/Searchbox";
import CreateRank from "../assets/Components/CreateRank/CreateRank";
import Recommendation from "../assets/Components/Recommendation/Recommendation";
import RecommendationSmall from "../assets/Components/Recommendation/RecommendationSmall";
import { TextField, withStyles } from "@material-ui/core";
import { withRouter } from "next/router";

const CssTextField = withStyles({
	root: {
		"& label.Mui-focused": {
			color: "#E2826F",
		},
		"& .MuiInput-underline:after": {
			borderBottomColor: "#E2826F",
		},
		"& .MuiInputBase-root": {
			color: "white",
		},
		"& .MuiFormLabel-root": {
			color: "white",
		},
	},
})(TextField);

class RankCreation extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			_id: props.router.query._id,
			name: props.router.query.name ? props.router.query.name : "",
			Title: props.Title,
			Ranking: props.router.query.ranking ? props.router.query.ranking : [],
			category: props.router.query.category,
			error: "",
		};
	}

	componentDidMount() {
		window.scrollTo(0, 0);
	}

	handleChange = (Title) => {
		this.setState({
			Title,
		});
	};

	handleAddition = (obj) => {
		let flag = -1;
		this.state.Ranking.map((item, i) => {
			if (item.imdbID === obj.imdbID) flag = i;
		});
		if (flag === -1) {
			let temp = [...this.state.Ranking];
			temp.push(obj);
			this.setState({ Ranking: temp, error: "" });
		}
	};

	handleRemoval = (obj) => {
		let temp = this.state.Ranking.filter((item) => {
			if (item.imdbID === obj.imdbID) return false;
			return true;
		});
		this.setState({
			Ranking: temp,
		});
	};

	handleSorting = (id1, id2) => {
		let temp = [...this.state.Ranking];
		temp[id2] = this.state.Ranking[id1];
		temp[id1] = this.state.Ranking[id2];
		this.setState({
			Ranking: temp,
		});
	};

	handleSortingRecom = (id1, id2) => {
		let temp = [...this.state.Ranking];
		temp[id2] = this.state.Ranking[id1];
		temp[id1] = this.state.Ranking[id2];
		this.setState({
			Ranking: temp,
		});
	};

	handleClickPlace = (event, otherVal) => {
		this.setState({
			place: otherVal !== undefined ? otherVal : event.target.value,
		});
	};

	handleSubmit = () => {
		const { _id, Ranking, category, name } = this.state;
		localStorage.setItem("ranking", JSON.stringify(Ranking ?? []));
		if (!_id) {
			if (!name) {
				this.setState({ error: "Please Enter a Rank name" });
			} else if (Ranking.length < 5) {
				window.scroll(0, 0);
				this.setState({
					error: "Please Add Some Items To the Rank. (Min. 5 Ranks)",
				});
			} else {
				this.props.router.push({
					pathname: "/Customization",
					query: {
						// ranking: Ranking,
						name,
						category,
					},
				});
			}
		} else {
			this.props.router.push({
				pathname: "/Customization",
				query: {
					// ranking: Ranking,
					name,
					category,
					_id,
				},
			});
		}
	};

	render() {
		return (
			<div className="rankCreation-page">
				{this.state.error.length ? (
					<div className="popup">
						<div className="popup-content">
							<button
								className="btn-close"
								onClick={() => {
									this.setState({ error: "" });
								}}
							></button>
							<h4>Error!</h4>
							<h5>{this.state.error}</h5>
							<button
								className="btn-popup"
								onClick={() => {
									this.setState({ error: "" });
								}}
							>
								Okay
							</button>
						</div>
					</div>
				) : null}

				<section className="recom-sm non">
					<h5>Recommendations</h5>
					<RecommendationSmall
						rankingList={this.state.Ranking}
						handleAddition={this.handleAddition}
						handleSorting={this.handleSortingRecom}
						style={{ zIndex: 999 }}
					/>
				</section>

				<section className="absol-btn-group">
					<button className="btn-open-recom">+</button>
				</section>

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
									src="Images/rank-creation/Oval Active.png"
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

						<div className="row">
							<div className="col d-flex flex-column justify-content-center align-items-center">
								<h2 className="text-center">Rank Creation</h2>
								<p className="desc-p text-center mt-5 d-none d-md-block">
									You’re halfway there already! In this step of the process you
									add the items you would like to rank to your list. Once you’ve
									added all the items, click Continue.
								</p>
							</div>
						</div>

						<div className="row mt-5 d-flex justify-content-center align-items-start">
							<div className="col-md-5 d-block d-md-none">
								<div className="row d-flex justify-content-around align-items-center">
									<Searchbox
										place={this.state.Title}
										category={this.state.category}
										handleAddition={this.handleAddition}
									/>
								</div>
							</div>
							{this.state.Ranking.length ? (
								<div
									className="col-md-7 col-movie mt-3"
									onDrop={(e) => {
										e.preventDefault();
										var data = e.dataTransfer.getData("Text/html");
										this.handleAddition(JSON.parse(data));
									}}
									onDragOver={(e) => {
										e.stopPropagation();
										e.preventDefault();
									}}
								>
									<div className="row">
										<div className="col">
											<h4 className="movie-title">
												<CssTextField
													color="error"
													label="Rank Name"
													value={this.state.name}
													onChange={(e) =>
														this.setState({ name: e.target.value })
													}
												/>
											</h4>
										</div>
									</div>
									<CreateRank
										Ranking={this.state.Ranking}
										handleRemoval={this.handleRemoval}
										handleSorting={this.handleSorting}
									/>
								</div>
							) : null}

							{!this.state.Ranking.length && (
								<div className="col-md-7 d-flex flex-column justify-content-start align-items-center col-icon-items">
									<img
										src="Images/rank-creation/1.svg"
										className="img-bg-rc"
										alt="..."
									/>
									<h5 className="text-white text-center d-none d-md-block">
										<CssTextField
											value={this.state.name}
											label="Rank Name"
											onChange={(e) => this.setState({ name: e.target.value })}
										/>
									</h5>

									<div className="d-flex flex-column justify-content-center align-items-center">
										<h5 className="text-white text-center mb-4 pt-2 d-block d-md-none">
											<CssTextField
												value={this.state.name}
												label="Rank Name"
												onChange={(e) =>
													this.setState({ name: e.target.value })
												}
											/>
										</h5>
										<h6 className="text-white text-center d-none d-md-block">
											Please create your first rank by entering a rank title or
											importing a picture.{" "}
										</h6>
										<img
											src="Images/rank-creation/Icon.svg"
											className="img-fluid img-rc-icon"
											alt="..."
										/>
									</div>
								</div>
							)}

							<div className="col-md-4 d-none d-md-block">
								<div className="row d-md-flex justify-content-center align-items-center">
									{/* <button className="btn btn-add">Add</button> */}
									<Searchbox
										category={this.state.category}
										place={this.state.Title}
										handleAddition={this.handleAddition}
									/>
								</div>

								<div className="row">
									<div className="col col-txt">
										<p className="desc-p">Recommendations</p>
										<h6>
											After you’ve chosen your first few items, a recommendation
											list
										</h6>
										<Recommendation
											rankingList={this.state.Ranking}
											handleAddition={this.handleAddition}
											handleSorting={this.handleSortingRecom}
										/>
									</div>
								</div>
							</div>
						</div>

						<div className="row mt-5">
							<div className="col d-flex justify-content-center">
								<a className="btn btn-login" onClick={this.handleSubmit}>
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

export default withRouter(RankCreation);
