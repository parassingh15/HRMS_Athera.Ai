import React from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';


function Navbar() {
    return (
        <div className='Navbar'>
            <div className="addEmployeeCard">
                <div className="adminName">
                    <i class="fa-regular fa-circle"></i>
                    <div>
                        <p>Admin</p>
                        <p>Administrator</p>
                    </div>
                </div>
                <Link to='/addEmployee'style={{ textDecoration: 'none' }}>
                <button className='addEmployeeBtn'>
                         + Add Employee
                </button></Link>
                
            </div>

            <div className="menuLinks">
                 <Link to="/" style={{ textDecoration: 'none' }}><p className='menuLinkList'>Dashboard</p></Link>
                 <Link to="/employees" style={{ textDecoration: 'none' }}><p className='menuLinkList'>Employees</p></Link>
                 <Link to="/attendance" style={{ textDecoration: 'none' }}><p className='menuLinkList'>Attendance</p></Link>
                <p className='menuLinkList' >Leave Management</p>
                <p className='menuLinkList'>Payroll</p>
                <p className='menuLinkList'>Advance HR Features</p>
            </div>

        </div>
    );
}

export default Navbar;