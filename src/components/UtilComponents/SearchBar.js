import React, { useContext, useState, useEffect } from "react";
import { JobContext } from "../JobComponents/JobsContext";
import { Row, Col, Container } from "react-bootstrap";
import Loading from "./Loading";
import { Link } from "react-router-dom";
import styled from "styled-components";
import BottomNav from "../NavigationComponents/BottomNav";
import Button from "@material-ui/core/Button";

const CardLinks = styled(Link)`
  color: black;
  text-decoration: none;
  :hover {
    color: #00b3e2;
    text-decoration: none;
  }
`;

export default function SearchBar() {
  const { jobs, loading } = useContext(JobContext);
  const [isLoading] = loading;
  const [loadedJobs] = jobs;

  const [searchResults, setSearchResults] = React.useState([]);

  const [jobName, setjobName] = useState("");
  const [jobLocation, setjobLocation] = useState("");

  const searchByName = (e) => {
    setjobName(e.target.value);
  };

  const searchByLocation = (e) => {
    setjobLocation(e.target.value);
  };

  const displayJobs = (array) => {
    if (array.length === 0) {
      return [];
    } else {
      return array.map((job) => (
        <CardLinks key={job.id} to={"/job/" + job.id}>
          <div className="card">
            <h4>{job.company.name}</h4>
            <img src={job.company.companyLogo} alt="" />
            <strong>
              <h5>{job.name}</h5>
            </strong>
            <p>Location: {job.location}</p>
            <p>
              Job type: <strong style={{ color: "green" }}>{job.type}</strong>
            </p>
          </div>
        </CardLinks>
      ));
    }
  };

  const search = (
    <Container>
      <Row>
        <Col>
          <input
            style={{ height: "60px" }}
            type="text"
            className="form-control"
            onChange={searchByName}
            placeholder="What job are you looking for?"
            pattern={2}
          />
        </Col>
        <Col>
          <select
            style={{ height: "60px" }}
            className="form-control"
            aria-label="Select a location..."
            // aria-label=".form-select-sm example"
            id="gender"
            name="gender"
            onChange={searchByLocation}
          >
            <option defaultValue>Search by location...</option>
            {loadedJobs.length > 0
              ? Array.from(
                  new Set(loadedJobs.map((j) => j.location.toLowerCase()))
                ).map((location) => (
                  <option key={location} value={`${location.toLowerCase()}`}>
                    {location.toUpperCase()}
                  </option>
                ))
              : ""}
          </select>
        </Col>
      </Row>
      <Row style={{ marginTop: "20px", marginLeft: "1px", marginRight: "1px" }}>
        {jobLocation.length > 0 ? (
          <Button
            variant="outlined"
            color="primary"
            href={`/jobs/name/${"undefined"}/location/${jobLocation}`}
          >
            See jobs
          </Button>
        ) : jobName.length > 3 && jobLocation.length === 0 ? (
          <Button
            variant="outlined"
            color="primary"
            href={`/jobs/name/${jobName}/location/${"undefined"}`}
          >
            See jobs
          </Button>
        ) : jobLocation.length > 0 && jobName.length > 3 ? (
          <Button
            variant="outlined"
            color="primary"
            href={`/jobs/name/${jobName}/location/${jobLocation}`}
          >
            See jobs
          </Button>
        ) : (
          ""
        )}
      </Row>
    </Container>
  );

  const content = isLoading ? (
    <Loading />
  ) : (
    <div className="cards">
      {searchResults.length > 0
        ? displayJobs(searchResults)
        : displayJobs(loadedJobs)}
    </div>
  );

  return (
    <React.Fragment>
      {search}
      {content}
      <BottomNav />
    </React.Fragment>
  );
}
