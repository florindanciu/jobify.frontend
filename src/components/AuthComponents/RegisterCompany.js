import React, { Component } from "react";

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";

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

const email = (value) => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        This is not a valid email.
      </div>
    );
  }
};

const vusername = (value) => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        The username must be between 3 and 20 characters.
      </div>
    );
  }
};

const vpassword = (value) => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        The password must be between 6 and 40 characters.
      </div>
    );
  }
};

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.handleRegister = this.handleRegister.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeImage = this.onChangeImage.bind(this);

    this.state = {
      username: "",
      email: "",
      password: "",
      image:
        "https://d1nhio0ox7pgb.cloudfront.net/_img/v_collection_png/512x512/shadow/office_building.png",
      successful: false,
      message: "",
    };
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value,
    });
  }

  onChangeImage(e) {
    this.setState({
      image: e.target.value,
    });
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value,
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value,
    });
  }

  handleRegister(e) {
    e.preventDefault();

    this.setState({
      message: "",
      successful: false,
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      AuthService.registerCompany(
        this.state.username,
        this.state.password,
        this.state.email,
        this.state.image
      ).then(
        (response) => {
          this.setState({
            message: response.data.message,
            successful: true,
          });
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          this.setState({
            successful: false,
            message: resMessage,
          });
        }
      );
    }
    this.props.history.push("/login", {
      response: "You are now registered. Please Login.",
    });
    window.location.reload();
  }

  render() {
    return (
      <React.Fragment>
        <div className="row">
          <div className="col-lg-6 col-md-12 mb-4 mb-md-0">
            <img
              className="img-fluid"
              src={process.env.PUBLIC_URL + "/companies.jpg"}
            />
          </div>
          <div
            className="col-lg-6 col-md-12 mb-4 mb-md-0"
            id="register-company-form"
          >
            <Form
              className="form-signin"
              onSubmit={this.handleRegister}
              ref={(c) => {
                this.form = c;
              }}
            >
              {!this.state.successful && (
                <div>
                  <h2 className="form-signin-heading">Register new Company</h2>
                  <p>
                    <Input
                      type="text"
                      className="form-control"
                      placeholder="Company name"
                      name="username"
                      value={this.state.username}
                      onChange={this.onChangeUsername}
                      validations={[required, vusername]}
                    />
                  </p>
                  <p>
                    <Input
                      type="text"
                      className="form-control"
                      placeholder="Company email"
                      name="email"
                      value={this.state.email}
                      onChange={this.onChangeEmail}
                      validations={[required, email]}
                    />
                  </p>
                  <p>
                    <Input
                      type="password"
                      className="form-control"
                      placeholder="password"
                      name="password"
                      value={this.state.password}
                      onChange={this.onChangePassword}
                      validations={[required, vpassword]}
                    />
                  </p>
                  <button
                    className="btn btn-lg btn-primary btn-block mt-3"
                    type="submit"
                  >
                    Sign up
                  </button>
                </div>
              )}
              {this.state.message && (
                <div className="form-group">
                  <div
                    className={
                      this.state.successful
                        ? "alert alert-success"
                        : "alert alert-danger"
                    }
                    role="alert"
                  >
                    {this.state.message}
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
