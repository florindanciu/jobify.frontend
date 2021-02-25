import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import authHeader from "../../services/auth-header";

export default function UpdateCompanyDetails() {
  const history = useHistory();
  const { companyId } = useParams();

  const [company, setCompany] = useState({
    name: "",
    email: "",
    websiteLink: "",
    companyLogo: "",
  });

  const onChangeHandler = (e) => {
    setCompany({
      ...company,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/v1/companies/${companyId}`)
      .then((res) => {
        setCompany({
          name: res.data.name,
          email: res.data.email,
          websiteLink: res.data.websiteLink,
          companyLogo: res.data.companyLogo,
        });
      });
  }, [companyId]);

  const updateHandler = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:8080/api/v1/companies/${companyId}`, company, {
        headers: authHeader(),
      })
      .then((response) => {
        history.push(`/company/${companyId}`);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="row">
    <div className="col-lg-6 col-md-12 mb-4 mb-md-0">
        <img style={{marginBottom: "60px"}} 
          className="img-fluid"
          src={process.env.PUBLIC_URL + "/companyUpdate.png"}
        />
      </div>
      <div className="col-lg-6 col-md-12 mb-4 mb-md-0">
        <form style={{ marginTop:"5%"}} className="form-signin">
        <h3 style={{marginBottom:"10%"}}>Update Company</h3>
          <p>
            <input
              className="form-control"
              placeholder="Company Name"
              name="name"
              value={company.name}
              onChange={onChangeHandler}
              required
            />
          </p>
          <p>
            <input
              className="form-control"
              placeholder="Email"
              name="email"
              value={company.email}
              onChange={onChangeHandler}
              required
            />
          </p>
          <p>
            <input
              className="form-control"
              placeholder="Website Link"
              name="websiteLink"
              value={company.websiteLink}
              onChange={onChangeHandler}
              required
            />
          </p>
          <p>
            <input
              className="form-control"
              placeholder="Company Logo"
              name="companyLogo"
              value={company.companyLogo}
              onChange={onChangeHandler}
              required
            />
          </p>
          <button className="btn btn-primary" onClick={updateHandler}>
            Update
          </button>
          <button
            style={{marginLeft:"10px"}}
            className="btn btn-danger"
            onClick={() => history.push(`/company/${companyId}`)}
          >
            Cancel
          </button>
        </form>
        </div>
        </div>
  );
}
