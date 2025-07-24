import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import './style.css';
import './style_dashboard.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <div className="sidebar-header">
          <Link to="/dashboard" className="logo">
            CWC
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
              <Link to="/dashboard/employee">
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
              <Link to="/dashboard/profile">
                <i className="bi bi-person"></i>
                &nbsp;<span>Profile</span>
              </Link>
            </li>
            <li>
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
