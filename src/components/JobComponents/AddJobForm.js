import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import authHeader from "../../services/auth-header";

export default function AddJobForm(props) {
  const history = useHistory();
  const [job, setJob] = useState({});
  const {
    match: { params },
  } = props;
  const companyId = params.companyId;
  const [locations, setlocations] = useState([
    "Bucharest",
    "London",
    "California",
    "Madrid",
    "Cluj",
  ]);

  function submitForm(e) {
    e.preventDefault();
    const data = new FormData(e.target);
    setJob({
      name: data.get("name"),
      desc: data.get("desc"),
      applyLink: data.get("applyLink"),
      type: data.get("type"),
      location: data.get("location"),
    });

    axios.post(
      `http://localhost:8080/api/v1/companies/${companyId}/jobs`,
      {
        name: data.get("name"),
        description: data.get("desc"),
        applyLink: data.get("applyLink"),
        type: data.get("type"),
        location: data.get("location"),
      },
      { headers: authHeader() }
    );
    props.history.push(`/company/${companyId}`);
    window.location.reload();
  }

  return (
    <div>
      <form
        style={{marginBottom:"5%", marginTop:"5%"}}
        className="form-signin"
        method="post"
        action="/login"
        onSubmit={submitForm}
      >
        <h2 style={{marginBottom:"20%"}} className="form-signin-heading">Add job</h2>
        <p>
          <input
            type="text"
            id="name"
            name="name"
            className="form-control"
            placeholder="Job name"
            required=""
            autoFocus=""
          />
        </p>
        <p>
          <textarea
            type="text"
            id="desc"
            name="desc"
            className="form-control"
            placeholder="Description"
            required=""
            autoFocus=""
          />
        </p>
        <p>
          <input
            type="text"
            id="applyLink"
            name="applyLink"
            className="form-control"
            placeholder="Link to apply"
            required=""
          />
        </p>
        <p>
          {/* <input
            type="text"
            id="type"
            name="type"
            className="form-control"
            placeholder="Fulltime/Parttime"
            required=""
          /> */}
          <select class="form-select" name="type">
            <option selected value="Full Time">
              Full Time
            </option>
            <option value="Part Time">Part Time</option>
            <option value="Remote">Remote</option>
            <option value="Project Based">Project Based</option>
          </select>
        </p>
        <p>
          <select
            aria-label="Select a location..."
            className="form-select form-select-sm mb-3"
            id="location"
            name="location"
          >
            <option defaultValue>Select location...</option>
            {Array.from(
              new Set(locations.map((location) => location.toLowerCase()))
            ).map((location) => (
              <option key={location} value={`${location.toLowerCase()}`}>
                {location.toUpperCase()}
              </option>
            ))}
          </select>
        </p>
        <button className="btn btn-primary" type="submit">
          Add job
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
  );
}
