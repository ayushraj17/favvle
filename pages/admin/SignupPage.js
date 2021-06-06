import React from "react";
// import "../../assets/css/styles.css";
import axios from "axios";

import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { withRouter } from "next/router";

function Alert(props) {
	return <MuiAlert elevation={6} variant="filled" {...props} />;
}

class SignupPage extends React.Component {
	constructor() {
		super();
		this.state = {
			list1: "",
			list2: "",
			list3: "",
			list4: "",
			list5: "",
			list6: "",
			text1: "",
			error: "",
			open: false,
		};
	}
	handleText1 = (event) => {
		this.setState({
			text1: event.target.value,
		});
	};

	handleList1 = (event) => {
		this.setState({
			list1: event.target.value,
		});
	};
	handleList2 = (event) => {
		this.setState({
			list2: event.target.value,
		});
	};
	handleList3 = (event) => {
		this.setState({
			list3: event.target.value,
		});
	};
	handleList4 = (event) => {
		this.setState({
			list4: event.target.value,
		});
	};
	handleList5 = (event) => {
		this.setState({
			list5: event.target.value,
		});
	};
	handleList6 = (event) => {
		this.setState({
			list6: event.target.value,
		});
	};

	handleSubmit = (e) => {
		e.preventDefault();
		this.setState({ error: "" });
		const { list1, list2, list3, list4, list5, list6, text1 } = this.state;
		if (!list1 || !list2 || !list3 || !list4 || !list5 || !list6 || !text1) {
			this.setState({ error: "Please fill all the fields" });
		} else {
			axios
				.post(BASE_URL + "/admin/settexts", {
					list: [list1, list2, list3, list4, list5, list6],
					text1,
					page: "signup",
				})
				.then((response) => {
					console.log(response);
					if (response.status == 200) {
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
			.get(process.env.NEXT_PUBLIC_BASE_URL + "/admin/gettexts", { params: { page: "signup" } })
			.then((response) => {
				console.log(response);
				if (response.status == 200) {
					console.log("SuccessFul");
					this.setState({
						list1: response.data.texts.list[0],
						list2: response.data.texts.list[1],
						list3: response.data.texts.list[2],
						list4: response.data.texts.list[3],
						list5: response.data.texts.list[4],
						list6: response.data.texts.list[5],
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
								<div class="card mb-4">
									<div class="card-header">
										<i class="fas fa-table mr-1"></i>
										Signup Page Texts Fields
									</div>
								</div>
								<form>
									<div class="form-group">
										<label for="exampleTextarea"> Heading text</label>
										<textarea
											class="form-control"
											id="exampleTextarea"
											rows="2"
											value={this.state.text1}
											onChange={this.handleText1}
										></textarea>
									</div>
									<div class="form-group">
										<label for="exampleTextarea"> List 1</label>
										<textarea
											class="form-control"
											id="exampleTextarea"
											rows="2"
											value={this.state.list1}
											onChange={this.handleList1}
										></textarea>
									</div>
									<div class="form-group">
										<label for="exampleTextarea"> List 2</label>
										<textarea
											class="form-control"
											id="exampleTextarea"
											rows="2"
											value={this.state.list2}
											onChange={this.handleList2}
										></textarea>
									</div>
									<div class="form-group">
										<label for="exampleTextarea"> List 3</label>
										<textarea
											class="form-control"
											id="exampleTextarea"
											rows="2"
											value={this.state.list3}
											onChange={this.handleList3}
										></textarea>
									</div>
									<div class="form-group">
										<label for="exampleTextarea"> List 4</label>
										<textarea
											class="form-control"
											id="exampleTextarea"
											rows="2"
											value={this.state.list4}
											onChange={this.handleList4}
										></textarea>
									</div>
									<div class="form-group">
										<label for="exampleTextarea"> List 5</label>
										<textarea
											class="form-control"
											id="exampleTextarea"
											rows="2"
											value={this.state.list5}
											onChange={this.handleList5}
										></textarea>
									</div>
									<div class="form-group">
										<label for="exampleTextarea"> List 6</label>
										<textarea
											class="form-control"
											id="exampleTextarea"
											rows="2"
											value={this.state.list6}
											onChange={this.handleList6}
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

export default withRouter(SignupPage);
