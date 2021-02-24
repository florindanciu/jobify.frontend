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
    this.onChangeJobRole = this.onChangeJobRole.bind(this);
    this.onChangeGender = this.onChangeGender.bind(this);
    // this.setUserImage = this.setUserImage.bind(this);

    this.state = {
      username: "",
      email: "",
      password: "",
      jobRole: "",
      gender: "",
      image:
        "https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png",
      successful: false,
      message: "",
    };
  }
  

  // setUserImage() {
  //   this.setState({
  //     image:
  //       "https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/girl_female_woman_avatar-512.png",
  //   });
  // }

  onChangeGender(e) {
    this.setState({
      gender: e.target.value,
    });
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value,
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

  onChangeJobRole(e) {
    this.setState({
      jobRole: e.target.value,
    });
    console.log(this.state.jobRole);
  }

  handleRegister(e) {
    e.preventDefault();

    this.setState({
      message: "",
      successful: false,
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      AuthService.registerUser(
        this.state.username,
        this.state.email,
        this.state.password,
        this.state.jobRole,
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
              src={process.env.PUBLIC_URL + "/register.jpg"}
            />
          </div>
          <div className="col-lg-6 col-md-12 mb-4 mb-md-0" id="register-form">
            <Form
              className="form-signin"
              onSubmit={this.handleRegister}
              ref={(c) => {
                this.form = c;
              }}
            >
              {!this.state.successful && (
                <div>
                  <h4 className="form-signin-heading">Create a New Account</h4>
                  <div style={{ marginTop: "40px" }}>
                    <p>
                      <Input
                        type="text"
                        className="form-control"
                        placeholder="username"
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
                        placeholder="email"
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
                    <p>
                      <select
                        class="form-select"
                        name="jobRole"
                        onChange={this.onChangeJobRole}
                      >
                        <option selected defaultValue value="Software Engineer">
                          Software Engineer
                        </option>
                        <option value="Fullstack Developer">
                          Fullstack Developer
                        </option>
                        <option value="Frontend Developer">
                          Frontend Developer
                        </option>
                        <option value="Backend Developer">
                          Backend Developer
                        </option>
                        <option value="Database Administration">
                          Database Administration
                        </option>
                        <option value="IT Architect">IT Architect</option>
                      </select>
                    </p>
                    <p>
                      <select
                        class="form-select"
                        name="gender"
                        onChange={this.onChangeGender}
                      >
                        <option selected value="Male">
                          Male
                        </option>
                        <option value="Female">Female</option>
                      </select>
                    </p>
                    <hr />
                    <p>
                      <label for="avatar">Choose a profile picture:</label>
                      <input
                        className="mt-4"
                        type="file"
                        id="image"
                        name="image"
                        accept="image/png, image/jpeg"
                      ></input>
                    </p>
                    {/* <p>
                <input
                  type="text"
                  id="image"
                  name="image"
                  className="form-control"
                  placeholder="User image"
                  required
                />
              </p> */}
                    <button
                      className="btn btn-primary"
                      type="submit"
                    >
                      Sign up
                    </button>
                    <a style={{marginLeft: "10px"}} className="btn btn-danger" href="/">Cancel</a>
                  </div>
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
