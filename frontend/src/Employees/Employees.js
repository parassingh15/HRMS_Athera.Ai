import React from "react";
import "./Employees.css";
import Navbar from "../Navbar/Navbar";
import AllEmployees from "../AllEmployees/AllEmployees";
import { Link } from "react-router-dom";

function Employees() {
  return (
    <div className="Employees">
      <Navbar />
      <div className="MainDashboard">
        <div className="welcomeDiv">
          <h1>Company Employees</h1>
          <Link to="/addEmployee" style={{ textDecoration: "none" }}>
            <button className="newEmployeeBtn">
              <i class="fa-solid fa-plus"></i> New Employee
            </button>
          </Link>
        </div>

        <p className="allEmployeesTitle">All Employees</p>
        <AllEmployees />
      </div>
    </div>
  );
}

export default Employees;
