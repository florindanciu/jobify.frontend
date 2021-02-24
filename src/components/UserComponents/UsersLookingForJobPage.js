import React, { useEffect, useState } from "react";
import axios from "axios";
import Loading from "../UtilComponents/Loading";

import Container from "@material-ui/core/Container";

export default function UsersLookingForJobPage() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [searchResults, setSearchResults] = React.useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/v1/users/lookingForJob")
      .then((res) => setUsers(res.data));

    const results = users.filter((u) =>
      u.username.toString().toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(results);
  }, [searchTerm]);

  const search = (
    <div className="mt-5">
      <form className="">
        <input
          className="form-control form-control-sm"
          placeholder="Search user"
          onChange={handleChange}
          value={searchTerm}
          type="text"
          name="search-job"
          style={{ width: "20%", margin: "auto" }}
        ></input>
      </form>
    </div>
  );

  const searchByExperience = (
    <div className="mt-5">
      <form className="">
        <select class="form-select" name="experience" onChange={handleChange}>
          <option selected value="1">
            Beginner
          </option>
          <option value="1">Junior</option>
          <option value="2">Experienced</option>
          <option value="3">Expert</option>
        </select>
        ;
      </form>
    </div>
  );

  const getSkills = (userId) => {
    return axios.get(`http://localhost:8080/api/v1/users/${userId}/skills`);
  };

  const displayUsers = (array) => {
    return array.map((user) => (
      <div className="mt-3 profile">
        <div class="img-box">
          <img
            src={user.image}
            class="img-responsive"
            style={{ width: "10%" }}
          />
          <ul class="text-center">
            <a href="#">
              <li>
                <i class="fa fa-facebook"></i>
              </li>
            </a>
            <a href="#">
              <li>
                <i class="fa fa-twitter"></i>
              </li>
            </a>
            <a href="#">
              <li>
                <i class="fa fa-linkedin"></i>
              </li>
            </a>
          </ul>
        </div>
        <h1>
          <a href={`/user/profile/${user.id}`}>{user.username}</a>
        </h1>
        <h2>{user.jobRole}</h2>
        <p>
          {user.experience}
          {user.experience === "1" ? " year" : " years"} of experience.
        </p>
        <hr />
      </div>
    ));
  };

  const content = isLoading ? (
    <Loading />
  ) : (
    <div>
      {searchResults.length > 0
        ? displayUsers(searchResults)
        : displayUsers(users)}
    </div>
  );

  return (
    <Container>
      {search}
      {/* {searchByExperience} */}
      <section class="team">
        <div class="container">
          <div class="row">
            <div class="col col-md-offset-1">
              <div class="col-lg-12">
                <h6 class="description">Ready to work</h6>
                <div class="row pt-md"></div>
                {content}
              </div>
            </div>
          </div>
        </div>
      </section>
    </Container>
  );
}
