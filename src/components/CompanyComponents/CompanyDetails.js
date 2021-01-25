import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import JobByCompany from "../JobComponents/JobByCompany.js";
import HoverRating from "../UtilComponents/HoverRating.js";

const CompanyImage = styled.img`
  width: 50%;
  margin: 5px;
`;

const CompanyContainer = styled.div`
  text-align: left;
  padding: 1%;
  border-radius: 10px;
  background-color: aliceblue;
`;

const CompanyDetails = (props) => {
  const [companies, setCompanies] = useState([]);
  const [jobs, setJobs] = useState([]);
  const {
    match: { params },
  } = props;
  const companyId = params.CompanyId;

  React.useEffect(() => {
    axios
      .get("http://localhost:8080/api/v1/companies")
      .then((res) => setCompanies(res.data));
  }, []);

  function deleteCompany() {
    axios.delete(`http://localhost:8080/api/v1/companies/${companyId}`);
  }

  return (
    <div style={{ marginTop: "10px", marginBottom: "10px" }}>
      {companies
        .filter((company) => company.id === params.CompanyId)
        .map((company) => (
          <CompanyContainer className="container">
            <div className="row">
              <div className="col-lg-6 col-md-12 mb-4 mb-md-0">
                <h1 key={company.id} style={{ marginTop: "2%" }}>
                  {company.name}
                </h1>
                <div
                  dangerouslySetInnerHTML={{ __html: company.description }}
                ></div>
                Available jobs:
                <JobByCompany companyId={company.id} />
              </div>
              <div
                style={{ textAlign: "center", marginTop: "" }}
                className="col-lg-6 col-md-12 mb-4 mb-md-0"
              >
                <CompanyImage src={company.companyLogo} alt="" />
                <br />
                <a href={company.websiteLink} target="_blank" rel="noreferrer">
                  Go to {company.name} official website.
                </a>
                <br />
                <br />
                <a
                  href={`/companies/${company.id}/jobs`}
                  className="btn btn-primary"
                  role="button"
                >
                  Add new job
                </a>
                <br />
                <br />
                <button className="btn btn-danger" onClick={deleteCompany}>
                  Delete Company
                </button>
                <br />
                <br />
                <b>Company Rating</b>
                <HoverRating />
                <br />
              </div>
            </div>
          </CompanyContainer>
        ))}
    </div>
  );
};

export default CompanyDetails;