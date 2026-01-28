import React, { useEffect, useState } from "react";
import "./AllEmployees.css";

function AllEmployees() {
  const [employees, setEmployees] = useState([]);

  

  useEffect(() => {
    fetch("http://localhost:5000/api/employees")
      .then((res) => res.json())
      .then((data) => setEmployees(data))
      .catch((err) => console.error("Error fetching employees:", err));
  }, []);

  const handleDelete = async (id) => {
  if (!window.confirm("Are you sure you want to delete this employee?")) return;

  try {
    const res = await fetch(`http://localhost:5000/api/employees/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) throw new Error("Failed to delete employee");

    // Remove employee from state to update UI
    setEmployees((prev) => prev.filter((emp) => emp._id !== id));
  } catch (err) {
    console.error(err);
    alert("Error deleting employee");
  }
};

  

  return (
    <div className="AllEmployees">
      <div className="employeeCard">
        {/* Header */}
        <div className="employeeCard-header">
          <p>Employee ID</p>
          <p>Name</p>
          <p>Email</p>
          <p>Department</p>
          <p>Delete Emp</p>
        </div>

        {/* Body */}
        {employees.map((emp) => (
          <div className="employeeCard-body" key={emp._id}>
            <p>{emp.employeeId}</p>
            <p>{emp.name}</p>
            <p>{emp.email}</p>
            <p>{emp.department}</p>
            <i
              style={{ color: "red", cursor: "pointer" }}
              className="fa-solid fa-circle-minus"
              onClick={() => handleDelete(emp._id)}
            ></i>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AllEmployees;
