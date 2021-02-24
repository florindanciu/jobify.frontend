import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import AuthService from "../../services/auth-service";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);

    this.state = {
      username: "",
      password: "",
      loading: false,
      message: "",
    };
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value,
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value,
    });
  }

  handleLogin(e) {
    e.preventDefault();

    this.setState({
      message: "",
      loading: true,
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      AuthService.login(this.state.username, this.state.password).then(
        () => {
          this.props.history.push("/");
          window.location.reload();
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          this.setState({
            loading: false,
            message: resMessage,
          });
        }
      );
    } else {
      this.setState({
        loading: false,
      });
    }
  }

  render() {
    return (
      <React.Fragment>
        <div className="row">
          <div className="col-lg-6 col-md-12 mb-4 mb-md-0">
            <img
              className="img-fluid"
              src={process.env.PUBLIC_URL + "/register.jpg"}
            />
          </div>
          <div className="col-lg-6 col-md-12 mb-4 mb-md-0" id="login-form">
            <Form
              style={{ width: "500px" }}
              className="form-signin"
              onSubmit={this.handleLogin}
              ref={(c) => {
                this.form = c;
              }}
            >
              <div style={{ marginBottom: "30px" }}>
                <h4 className="form-signin-heading">Welcome back!</h4>
              </div>
              {this.props.location.state !== undefined && (
                <div className="form-group">
                  <div className="alert alert-success" role="alert">
                    You are now registered. Please Login.
                  </div>
                </div>
              )}
              <p>
                <Input
                  type="text"
                  className="form-control"
                  name="username"
                  placeholder="Username or Company Name"
                  value={this.state.username}
                  onChange={this.onChangeUsername}
                  validations={[required]}
                />
              </p>
              <p>
                <Input
                  type="password"
                  className="form-control"
                  name="password"
                  placeholder="Password"
                  value={this.state.password}
                  onChange={this.onChangePassword}
                  validations={[required]}
                />
              </p>
              <button
                className="btn btn-primary btn-block"
                disabled={this.state.loading}
              >
                {this.state.loading && (
                  <span className="spinner-border spinner-border-sm"></span>
                )}
                <span>Login</span>
              </button>
              <a
                style={{ marginLeft: "10px" }}
                className="btn btn-danger"
                href="/"
              >
                Cancel
              </a>
              {this.state.message && (
                <div className="form-group">
                  <div className="alert alert-danger" role="alert">
                    Wrong username or password
                  </div>
                </div>
              )}
              <CheckButton
                style={{ display: "none" }}
                ref={(c) => {
                  this.checkBtn = c;
                }}
              />
            </Form>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
