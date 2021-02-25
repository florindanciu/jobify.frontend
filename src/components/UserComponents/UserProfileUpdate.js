import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import { Card } from "react-bootstrap";
import authHeader from "../../services/auth-header";
import { colors } from "@material-ui/core";

export default function UserProfileUpdate() {
  const history = useHistory();
  const { userId } = useParams();
  const [skillsToAdd, setskillsToAdd] = useState(["Ruby", "Python", "Java"]);
  const [userSkills, setuserSkills] = useState([]);

  const [user, setUser] = useState({
    username: "",
    email: "",
    experience: "",
    age: "",
    image: "",
    jobRole: "",
  });

  const onChangeHandler = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const getUserSkills = async () => {
    const userResponse = axios.get(
      `http://localhost:8080/api/v1/user/${userId}/skills`
    );
    setuserSkills((await userResponse).data);
  };

  useEffect(() => {
    axios.get(`http://localhost:8080/api/v1/users/${userId}`).then((res) => {
      setUser({
        username: res.data.username,
        email: res.data.email,
        experience: res.data.experience,
        age: res.data.age,
        image: res.data.image,
        jobRole: res.data.jobRole,
      });
    });
    getUserSkills();
  }, [userId]);

  const updateHandler = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:8080/api/v1/users/${userId}`, user, {
        headers: authHeader(),
      })
      .then((response) => {
        history.push(`/user/myProfile/${userId}`);
      })
      .catch((error) => console.log(error));
  };

  const addSkill = (e) => {
    axios.post(
      `http://localhost:8080/api/v1/skills/${userId}`,
      {
        name: e.target.value,
        user: user,
      },
      { headers: authHeader() }
    );
  };

  return (
    <div className="row">
      <div className="col-lg-6 col-md-12 mb-4 mb-md-0" id="register-form">
        <Card.Body>
          <Card.Title style={{ textAlign: "center" }}>Update User</Card.Title>
          <form className="form-signin">
            <p>
              <input
                className="form-control"
                placeholder="Username"
                name="username"
                value={user.username}
                onChange={onChangeHandler}
                required
              />
            </p>
            <p>
              <input
                className="form-control"
                placeholder="Email"
                name="email"
                value={user.email}
                onChange={onChangeHandler}
                required
              />
            </p>
            <p>
              <input
                className="form-control"
                placeholder="User Experience"
                name="experience"
                value={user.experience}
                onChange={onChangeHandler}
                required
              />
            </p>
            <p>
              <input
                className="form-control"
                placeholder="User Age"
                name="age"
                value={user.age}
                onChange={onChangeHandler}
                required
              />
            </p>
            <p>
              <select
                class="form-select"
                name="jobRole"
                onChange={onChangeHandler}
              >
                <option selected value="Software Engineer">
                  Working as ...
                </option>
                <option value="Software Engineer">Software Engineer</option>
                <option value="Fullstack Developer">Fullstack Developer</option>
                <option value="Frontend Developer">Frontend Developer</option>
                <option value="Backend Developer">Backend Developer</option>
                <option value="Database Administration">
                  Database Administration
                </option>
                <option value="IT Architect">IT Architect</option>
              </select>
            </p>
            <p>
              <select class="form-select" name="skills" onChange={addSkill}>
                <option selected value="Software Engineer">
                  Add skill
                </option>
                <option id="option" value="Ruby">
                  Ruby
                </option>
                <option id="option" value="Python">
                  Python
                </option>
                <option id="option" value="Java">
                  Java
                </option>
                <option id="option" value="Javascript">
                  Javascript
                </option>
                <option id="option" value=" Node JS">
                  Node JS
                </option>
                <option id="option" value="C++">
                  C++
                </option>
                <option id="option" value="C#">
                  C#
                </option>
              </select>
            </p>
            <p>
              <input
                className="form-control"
                placeholder="User Profile Picture"
                name="image"
                value={user.image}
                onChange={onChangeHandler}
                required
              />
            </p>
            <button className="btn btn-success" onClick={updateHandler}>
              Update
            </button>
            <button
              style={{ marginLeft: "10px" }}
              className="btn btn-danger"
              onClick={() => history.push(`/user/myProfile/${userId}`)}
            >
              Cancel
            </button>
          </form>
        </Card.Body>
      </div>
      <div className="col-lg-6 col-md-12 mb-4 mb-md-0">
        <img
          className="img-fluid"
          src={process.env.PUBLIC_URL + "/updatePage.jpg"}
        />
      </div>
    </div>
  );
}
