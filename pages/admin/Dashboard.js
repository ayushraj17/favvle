import React from "react";
// import "../../assets/css/styles.css";
import axios from "axios";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { withRouter } from "next/router";

function Alert(props) {
	return <MuiAlert elevation={6} variant="filled" {...props} />;
}

class Dashboard extends React.Component {
	constructor() {
		super();
		this.state = {
			plan1: "",
			plan2: "",
			plan3: "",
			plan_id1: 0,
			plan_id2: 1,
			plan_id3: 2,
			name1: "",
			name2: "",
			name3: "",
			item_limit1: "",
			item_limit2: "",
			item_limit3: "",
			rank_limit1: "",
			rank_limit2: "",
			rank_limit3: "",
			error1: "",
			error2: "",
			error3: "",
			open: false,
		};
	}
	handlePlanid1 = (event) => {
		this.setState({
			plan_id1: event.target.value,
		});
	};
	handlePlanid2 = (event) => {
		this.setState({
			plan_id2: event.target.value,
		});
	};
	handlePlanid3 = (event) => {
		this.setState({
			plan_id3: event.target.value,
		});
	};
	handlename1 = (event) => {
		this.setState({
			name1: event.target.value,
		});
	};
	handlename2 = (event) => {
		this.setState({
			name2: event.target.value,
		});
	};
	handlename3 = (event) => {
		this.setState({
			name3: event.target.value,
		});
	};
	handleItemlimit1 = (event) => {
		this.setState({
			item_limit1: event.target.value,
		});
	};
	handleItemlimit2 = (event) => {
		this.setState({
			item_limit2: event.target.value,
		});
	};
	handleItemlimit3 = (event) => {
		this.setState({
			item_limit3: event.target.value,
		});
	};
	handleRanklimit1 = (event) => {
		this.setState({
			rank_limit1: event.target.value,
		});
	};
	handleRanklimit2 = (event) => {
		this.setState({
			rank_limit2: event.target.value,
		});
	};
	handleRanklimit3 = (event) => {
		this.setState({
			rank_limit3: event.target.value,
		});
	};

	componentDidMount() {
		axios
			.get(process.env.NEXT_PUBLIC_BASE_URL + "/users/getplans")
			.then((response) => {
				this.setState({
					name1: response.data[0]? response.data[0].name:"",
					name2: response.data[1]? response.data[1].name:"",
					name3: response.data[2]? response.data[2].name:"",
					rank_limit1:response.data[0]? response.data[0].rank_limit:"",
					rank_limit2:response.data[1]? response.data[1].rank_limit:"",
					rank_limit3:response.data[2]? response.data[2].rank_limit:"",
					item_limit1:response.data[0]? response.data[0].item_limit:"",
					item_limit2:response.data[1]? response.data[1].item_limit:"",
					item_limit3:response.data[2]? response.data[2].item_limit:"",					
				});
				console.log(this.state.plan1);
			})
			.catch((err) => {
				if (err.status === 409) {
					console.log("something went wrong");
				} else {
					console.log(err);
				}
			});
	}

	handleSubmit1 = () => {
		this.setState({ error1: "" });
		const { plan_id1, name1, item_limit1, rank_limit1 } = this.state;
		console.log(plan_id1, name1, item_limit1, rank_limit1)
		if ( !name1 || !item_limit1 || !rank_limit1) {
			this.setState({ error1: "Please Fill all the Fields" });
		} else
			axios
				.post(process.env.NEXT_PUBLIC_BASE_URL + "/admin/editplans", {
					plan_id: plan_id1,
					name: name1,
					item_limit: item_limit1,
					rank_limit: rank_limit1,
				})
				.then((response) => {
					if (response.status == 200) {
						console.log(response.data);
						console.log("Sucessfully Updated");
						this.setState({ open: true });
					} else {
						console.log("Data not Fetch");
					}
				})
				.catch((err) => {
					if (err.response.status == 409) {
						console.log("Something went wrong");
					} else {
						console.log(err);
					}
				});
	};
	handleSubmit2 = () => {
		this.setState({ error2: "" });
		const { plan_id2, name2, item_limit2, rank_limit2 } = this.state;
		if ( !name2 || !item_limit2 || !rank_limit2) {
			this.setState({ error2: "Please Fill all the Fields" });
		} else
			axios
				.post(process.env.NEXT_PUBLIC_BASE_URL + "/admin/editplans", {
					plan_id: plan_id2,
					name: name2,
					item_limit: item_limit2,
					rank_limit: rank_limit2,
				})
				.then((response) => {
					if (response.status == 200) {
						console.log(response.data);
						console.log("Sucessfully Updated");
						this.setState({ open: true });
					} else {
						console.log("Data not Fetch");
					}
				})
				.catch((err) => {
					if (err.response.status == 409) {
						console.log("Something went wrong");
					} else {
						console.log(err);
					}
				});
	};
	handleSubmit3 = () => {
		this.setState({ error3: "" });
		const { plan_id3, name3, item_limit3, rank_limit3 } = this.state;
		if (!name3 || !item_limit3 || !rank_limit3) {
			this.setState({ error3: "Please Fill all the Fields" });
		} else
			axios
				.post(process.env.NEXT_PUBLIC_BASE_URL + "/admin/editplans", {
					plan_id: plan_id3,
					name: name3,
					item_limit: item_limit3,
					rank_limit: rank_limit3,
				})
				.then((response) => {
					if (response.status == 200) {
						console.log(response.data);
						console.log("Sucessfully Updated");
						this.setState({ open: true });
					} else {
						console.log("Data not Fetch");
					}
				})
				.catch((err) => {
					if (err.response.status == 409) {
						console.log("Something went wrong");
					} else {
						console.log(err);
					}
				});
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
								<h1 class="mt-4">Dashboard</h1>
								<div class="card mb-4">
									<div class="card-header">
										<i class="fas fa-table mr-1"></i>
										Plans Details 
									</div>
								</div>
								<div id="layoutAuthentication">
									<div id="layoutAuthentication_content">
										<main>
											<div class="container">
												<div class="row justify-content-center">
													<div class="col-lg-4">
														<div class="card shadow-lg border-0 rounded-lg mt-4">
															<div class="card-header card bg-primary text-white">
																<h3 class="text-center font-weight-light my-3">
																	Free Plan
																</h3>
															</div>
															<div class="card-body">
																<form>
																	<div class="form-group">
																		<label
																			class="small mb-1"
																			for="inputEmailAddress"
																		>
																			Name Of Plan
																		</label>
																		<input
																			class="form-control py-4"
																			id="inputEmailAddress"
																			onChange={this.handlename1}
																			type="text"
																			placeholder="Enter Name of Plan"
																			value={this.state.name1}
																		/>
																	</div>
																	<div class="form-group">
																		<label
																			class="small mb-1"
																			for="inputEmailAddress"
																		>
																			Item Limit of Plan
																		</label>
																		<input
																			class="form-control py-4"
																			id="inputEmailAddress"
																			onChange={this.handleItemlimit1}
																			value={this.state.item_limit1}
																			type="number"
																			placeholder="Enter Item Limit"
																		/>
																	</div>
																	<div class="form-group">
																		<label
																			class="small mb-1"
																			for="inputEmailAddress"
																		>
																			Rank Limit of Plan
																		</label>
																		<input
																			class="form-control py-4"
																			id="inputEmailAddress"
																			onChange={this.handleRanklimit1}
																			value={this.state.rank_limit1}
																			type="number"
																			placeholder="Enter Rank Limit"
																		/>
																	</div>
																	<div class="form-group d-flex align-items-center justify-content-between mt-4 mb-0">
																		<a
																			class="btn btn-primary"
																			onClick={this.handleSubmit1}
																			type="Submit"
																		>
																			Submit
																		</a>
																	</div>
																</form>
															</div>
															<div class="card-footer text-center">
																<div class="small">
																	<a href=""></a>
																</div>
															</div>
															<div style={{ color: "red" }}>
																{this.state.error1}
															</div>
														</div>
													</div>
													<div class="col-lg-4">
														<div class="card shadow-lg border-0 rounded-lg mt-4">
															<div class="card-header card bg-warning text-white">
																<h3 class="text-center font-weight-light my-3">
																	Fan Plan
																</h3>
															</div>
															<div class="card-body">
																<form>
																	<div class="form-group">
																		<label
																			class="small mb-1"
																			for="inputEmailAddress"
																		>
																			Name Of Plan
																		</label>
																		<input
																			class="form-control py-4"
																			id="inputEmailAddress"
																			onChange={this.handlename2}
																			value={this.state.name2}
																			type="text"
																			placeholder="Enter Name of Plan"
																		/>
																	</div>
																	<div class="form-group">
																		<label
																			class="small mb-1"
																			for="inputEmailAddress"
																		>
																			Item Limit of Plan
																		</label>
																		<input
																			class="form-control py-4"
																			id="inputEmailAddress"
																			onChange={this.handleItemlimit2}
																			value={this.state.item_limit2}
																			type="number"
																			placeholder="Enter Item Limit"
																		/>
																	</div>
																	<div class="form-group">
																		<label
																			class="small mb-1"
																			for="inputEmailAddress"
																		>
																			Rank Limit of Plan
																		</label>
																		<input
																			class="form-control py-4"
																			id="inputEmailAddress"
																			onChange={this.handleRanklimit2}
																			value={this.state.rank_limit2}
																			type="number"
																			placeholder="Enter Rank Limit"
																		/>
																	</div>
																	<div class="form-group d-flex align-items-center justify-content-between mt-4 mb-0">
																		<a
																			class="btn btn-primary"
																			onClick={this.handleSubmit2}
																			type="Submit"
																		>
																			Submit
																		</a>
																	</div>
																</form>
															</div>
															<div class="card-footer text-center">
																<div class="small">
																	<a href=""></a>
																</div>
															</div>
															<div style={{ color: "red" }}>
																{this.state.error2}
															</div>
														</div>
													</div>
													<div class="col-lg-4">
														<div class="card shadow-lg border-0 rounded-lg mt-4">
															<div class="card-header card bg-success text-white">
																<h3 class="text-center font-weight-light my-3">
																	Pro Plan
																</h3>
															</div>
															<div class="card-body">
																<form>
																	<div class="form-group">
																		<label
																			class="small mb-1"
																			for="inputEmailAddress"
																		>
																			Name Of Plan
																		</label>
																		<input
																			class="form-control py-4"
																			id="inputEmailAddress"
																			onChange={this.handlename3}
																			type="text"
																			value={this.state.name3}
																			placeholder="Enter Name of Plan"
																		/>
																	</div>
																	<div class="form-group">
																		<label
																			class="small mb-1"
																			for="inputEmailAddress"
																		>
																			Item Limit of Plan
																		</label>
																		<input
																			class="form-control py-4"
																			id="inputEmailAddress"
																			onChange={this.handleItemlimit3}
																			value={this.state.item_limit3}
																			type="number"
																			placeholder="Enter Item Limit"
																		/>
																	</div>
																	<div class="form-group">
																		<label
																			class="small mb-1"
																			for="inputEmailAddress"
																		>
																			Rank Limit of Plan
																		</label>
																		<input
																			class="form-control py-4"
																			id="inputEmailAddress"
																			onChange={this.handleRanklimit3}
																			value={this.state.rank_limit3}
																			type="number"
																			placeholder="Enter Rank Limit"
																		/>
																	</div>
																	<div class="form-group d-flex align-items-center justify-content-between mt-4 mb-0">
																		<a
																			class="btn btn-primary"
																			onClick={this.handleSubmit3}
																			type="Submit"
																		>
																			Submit
																		</a>
																	</div>
																</form>
															</div>
															<div class="card-footer text-center">
																<div class="small">
																	<a href=""></a>
																</div>
															</div>
															<div style={{ color: "red" }}>
																{this.state.error3}
															</div>
														</div>
													</div>
												</div>
											</div>
										</main>
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
			</div>
		);
	}
}
export default withRouter(Dashboard);
