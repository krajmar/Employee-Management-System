import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';

const EmployeeSortable = () => {
    const [employee, setEmployee] = useState([]);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

    useEffect(() => {
        axios.get('http://88.200.63.148:1411/auth/employee')
            .then(result => {
                if (result.data.Status) {
                    setEmployee(result.data.Result);
                } else {
                    alert(result.data.Error);
                }
            })
            .catch(err => console.log(err));
    }, []);

    const handleDelete = (id) => {
        axios.delete('http://88.200.63.148:1411/auth/delete_employee/' + id)
            .then(result => {
                if (result.data.Status) {
                    setEmployee(prev => prev.filter(e => e.id !== id)); // no reload needed
                } else {
                    alert(result.data.Error);
                }
            });
    };

    const requestSort = (key) => {
        let direction = "asc";
        if (sortConfig.key === key && sortConfig.direction === "asc") {
            direction = "desc";
        }
        setSortConfig({ key, direction });
    };

    const sortedEmployees = [...employee].sort((a, b) => {
        if (!sortConfig.key) return 0;

        let aValue = a[sortConfig.key];
        let bValue = b[sortConfig.key];

        // Handle salary as number
        if (sortConfig.key === "salary") {
            aValue = Number(aValue);
            bValue = Number(bValue);
        }

        if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
    });

    const sortArrow = (key) => {
        if (sortConfig.key !== key) return "";
        return sortConfig.direction === "asc" ? " ↑" : " ↓";
    };

    return (
        <div className="px-5 mt-3">
            <div className="d-flex justify-content-center">
                <h3>Employee List (Sortable)</h3>
            </div>
            <Link to="/dashboard/add_employee" className="btn btn-success">Add Employee</Link>
            <div className="mt-3">
                <table className="table" style={{ marginTop: '50px' }}>
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th onClick={() => requestSort("name")} style={{ cursor: "pointer" }}>
                                Name{sortArrow("name")}
                            </th>
                            <th onClick={() => requestSort("email")} style={{ cursor: "pointer" }}>
                                Email{sortArrow("email")}
                            </th>
                            <th onClick={() => requestSort("address")} style={{ cursor: "pointer" }}>
                                Address{sortArrow("address")}
                            </th>
                            <th onClick={() => requestSort("salary")} style={{ cursor: "pointer" }}>
                                Salary{sortArrow("salary")}
                            </th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedEmployees.map(e => (
                            <tr key={e.id}>
                                <td>
                                    <img
                                        src={`http://88.200.63.148:1411/Images/${e.image}`}
                                        className="employee_image"
                                        alt="employee"
                                    />
                                </td>
                                <td>{e.name}</td>
                                <td>{e.email}</td>
                                <td>{e.address}</td>
                                <td>{e.salary}</td>
                                <td>
                                    <Link to={`/dashboard/edit_employee/${e.id}`} className="btn btn-info btn-sm me-2">Edit</Link>
                                    <button className="btn btn-warning btn-sm" onClick={() => handleDelete(e.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default EmployeeSortable;
