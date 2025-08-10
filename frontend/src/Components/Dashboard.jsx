import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import './style_dashboard.css';
import './style.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate()
  axios.defaults.withCredentials = true
  const handleLogout = () => {
    axios.get('http://88.200.63.148:1411/auth/logout')
    .then(result=>{
      if(result.data.Status){
        navigate('/adminlogin')
      }
    })
  }
  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <div className="sidebar-header">
          <Link to="/dashboard" className="logo">
            EMS
          </Link>
        </div>
        <nav className="sidebar-nav">
          <ul>
            <li>
              <Link to="/dashboard">
                <i className="bi bi-speedometer2"></i>
                &nbsp;<span>Dashboard</span>
              </Link>
            </li>
            <li>
              <Link to="/dashboard/sort_employee">
                <i className="bi bi-people"></i>
                &nbsp;<span>Manage Employees</span>
              </Link>
            </li>
            <li>
              <Link to="/dashboard/category">
                <i className="bi bi-tags"></i>
                &nbsp;<span>Category</span>
              </Link>
            </li>
            <li>
              <Link to="/dashboard/employee_by_category">
                <i className="bi bi-person"></i>
                &nbsp;<span>Filter Employees</span>
              </Link>
            </li>
            <li onClick={handleLogout}>
              <Link to="/logout">
                <i className="bi bi-box-arrow-right"></i>
                &nbsp;<span>Logout</span>
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      <main className="dashboard-content">
        <h1>Employee Management System</h1>
        <Outlet />
      </main>
    </div>
  );
};

export default Dashboard;
