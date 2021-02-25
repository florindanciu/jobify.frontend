import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import JobByCompany from "../JobComponents/JobByCompany.js";
import HoverRating from "../UtilComponents/HoverRating.js";
import AuthService from "../../services/auth-service";
import authHeader from "../../services/auth-header";

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
  const [company, setCompany] = useState({});
  const [currentUser, setcurrentUser] = useState();

  const {
    match: { params },
  } = props;
  const companyId = params.CompanyId;

  React.useEffect(() => {
    axios
      .get(`http://localhost:8080/api/v1/companies/${companyId}`)
      .then((res) => setCompany(res.data));

    const user = AuthService.getCurrentUser();
    setcurrentUser(user);
  }, []);

  const logOut = () => {
    AuthService.logout();
  };

  function deleteCompany() {
    axios.delete(`http://localhost:8080/api/v1/companies/${companyId}`, {
      headers: authHeader(),
    });
    logOut();
    props.history.push("/");
    window.location.reload();
  }

  return (
    <div class="row profile">
      <div class="col-md-3">
        <div class="profile-sidebar ">
          <div className="mt-5">
            <img
              src={company.companyLogo}
              class="img-responsive"
              style={{ width: "50%" }}
              alt=""
            />
          </div>

          <div class="profile-usertitle">
            <div class="profile-usertitle-name" style={{marginBottom: "60px"}}>
              <h3>
                <strong>{company.name}</strong>
              </h3>
            </div>
            {/* <div class="profile-usertitle-job">{company.jobRole}</div> */}
          </div>

          {currentUser &&
          currentUser.roles.includes("ROLE_USER" || "ROLE_COMPANY") &&
          currentUser.id != company.id ? (
            <div class="profile-userbuttons">
              <HoverRating />
            </div>
          ) : !currentUser ? (
            ""
          ) : currentUser.id === companyId ? (
            <div className="profile-userbuttons">
              <div>
                <a
                  className="btn btn-primary btn-sm"
                  type="button"
                  href={`/companies/${company.id}/jobs`}
                >
                  Add New Job
                </a>
                <a
                  href={`/companies/update/${companyId}`}
                  className="btn btn-success btn-sm"
                  role="button"
                >
                  Edit Company
                </a>
              </div>
              <div>
                <button
                  type="button"
                  class="btn btn-danger btn-sm"
                  onClick={deleteCompany}
                >
                  Delete company
                </button>
                <a
                  style={{ width: "93px" }}
                  className="btn btn-danger btn-sm"
                  href="/"
                >
                  Cancel
                </a>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
      <div class="col-md-9">
        <div class="profile-content">
          <h3>About us</h3>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
          ultricies ultricies nibh, vitae euismod turpis molestie in. Etiam
          viverra, nisi sed iaculis accumsan, felis leo interdum mi, eu
          dignissim magna dui quis mi. Praesent vitae mi tristique ex elementum
          lacinia. Pellentesque habitant morbi tristique senectus et netus et
          malesuada fames ac turpis egestas. Class aptent taciti sociosqu ad
          litora torquent per conubia nostra, per inceptos himenaeos. Mauris
          auctor, lacus ac varius mollis, enim sapien dignissim ex, eget
          venenatis nibh nunc at nisl. Maecenas elit lacus, sollicitudin vel
          euismod quis, tempus suscipit magna. Lorem ipsum dolor sit amet,
          consectetur adipiscing elit.
          <hr />
          <h3>What we do</h3>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
          ultricies ultricies nibh, vitae euismod turpis molestie in. Etiam
          viverra, nisi sed iaculis accumsan, felis leo interdum mi, eu
          dignissim magna dui quis mi. Praesent vitae mi tristique ex elementum
          lacinia. Pellentesque habitant morbi tristique senectus et netus et
          malesuada fames ac turpis egestas. Class aptent taciti sociosqu ad
          litora torquent per conubia nostra, per inceptos himenaeos. Mauris
          auctor, lacus ac varius mollis, enim sapien dignissim ex, eget
          venenatis nibh nunc at nisl. Maecenas elit lacus, sollicitudin vel
          euismod quis, tempus suscipit magna. Lorem ipsum dolor sit amet,
          consectetur adipiscing elit.
          <hr />
          <h3>Available jobs</h3>
          <JobByCompany companyId={companyId} />
        </div>
      </div>
    </div>
  );
};

export default CompanyDetails;
