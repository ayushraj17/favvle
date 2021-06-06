import React from "react";
import { withRouter } from "next/router";

 class AdminLogin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email:"",
            password:"",
            error:"",
        };
      }

handleSubmit= () => {
    const {email,password} = this.state;
    if(!email || !password){
        this.setState({error:"Please Fill all the Fields"})
    }
    if(email == "admin" && password == "admin"){
        this.props.router.push({
        pathname:"/admin/Dashboard",
    })
    } else {
       this.setState({error:"Unauthorised Access"})
    }
}

  render() {
    return (
      <div className="bg-primary">
        <div id="layoutAuthentication">
          <div id="layoutAuthentication_content">
            <main>
              <div className="container">
                <div className="row justify-content-center">
                  <div className="col-lg-5">
                    <div className="card shadow-lg border-0 rounded-lg mt-5">
                      <div className="card-header">
                        <h1 className="text-center font-weight my-4">
                          Login
                        </h1>
                      </div>
                      <div className="card-body">
                        <form>
                          <div className="form-group">
                            <label
                              className="small mb-1"
                              for="inputEmailAddress"
                            >
                              Email
                            </label>
                            <input
                              className="form-control py-4"
                              id="inputEmailAddress"
                              type="email"
                              onChange={(event) => {this.setState({email:event.target.value})}}
                              placeholder="Enter email address"
                            />
                          </div>
                          <div className="form-group">
                            <label className="small mb-1" for="inputPassword">
                              Password
                            </label>
                            <input
                              className="form-control py-4"
                              id="inputPassword"
                              type="password"
                              onChange={(event) => {this.setState({password:event.target.value})}}
                              placeholder="Enter password"
                            />
                          </div>
                          <div className="form-group">
                            <div className="custom-control custom-checkbox">
                              <input
                                className="custom-control-input"
                                id="rememberPasswordCheck"
                                type="checkbox"
                              />
                            </div>
                          </div>
                          <div className="form-group d-flex align-items-center justify-content-between mt-4 mb-0">
                            <a className="btn btn-primary" onClick={this.handleSubmit}>
                              Login
                            </a>
                          </div>
                        </form>
                      </div>
                      <div className="card-footer text-center">
                        <div className="small">
                         <div style={{color:"red"}}>{this.state.error}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </main>
          </div>
          <div id="layoutAuthentication_footer">
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
export default withRouter(AdminLogin);