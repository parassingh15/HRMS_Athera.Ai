import React, { useEffect, useState } from "react";
import './AttendanceList.css';

function AttendanceList() {
  const [employees, setEmployees] = useState([]);
  const [employeeId, setEmployeeId] = useState("");
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("Present");
  const [attendance, setAttendance] = useState([]);

  // Get all employees
  useEffect(() => {
    fetch("http://localhost:5000/api/employees")
      .then((res) => res.json())
      .then((data) => setEmployees(data));
  }, []);

  // Get attendance for selected employee
  useEffect(() => {
    if (!employeeId) return;

    fetch(`http://localhost:5000/api/attendance/${employeeId}`)
      .then((res) => res.json())
      .then((data) => setAttendance(data));
  }, [employeeId]);

  const submitAttendance = async () => {
    if (!employeeId || !date) {
      alert("Please select employee and date");
      return;
    }

    const res = await fetch("http://localhost:5000/api/attendance", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ employeeId, date, status }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message);
      return;
    }

    // Update UI instantly
    setAttendance((prev) => [data, ...prev]);
    alert("Attendance marked");
  };

  return (
    <div className="attendanceBox">
      {/* Controls */}
      <div className="attendanceControls">
        <select onChange={(e) => setEmployeeId(e.target.value)}>
          <option value="">Select Employee</option>
          {employees.map((emp) => (
            <option key={emp._id} value={emp._id}>
              {emp.name} ({emp.employeeId})
            </option>
          ))}
        </select>

        <input type="date" onChange={(e) => setDate(e.target.value)} />

        <select onChange={(e) => setStatus(e.target.value)}>
          <option value="Present">Present</option>
          <option value="Absent">Absent</option>
        </select>

        <button onClick={submitAttendance}>Mark Attendance</button>
      </div>

      {/* Attendance Table */}
      <table className="attendanceTable">
        <thead>
          <tr>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {attendance.length === 0 ? (
            <tr>
              <td colSpan="2">No records found</td>
            </tr>
          ) : (
            attendance.map((att) => (
              <tr key={att._id}>
                <td>{att.date}</td>
                <td
                  style={{
                    color: att.status === "Present" ? "green" : "red",
                    fontWeight: "bold",
                  }}
                >
                  {att.status}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default AttendanceList;
