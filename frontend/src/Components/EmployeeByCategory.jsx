import React, { useEffect, useState } from "react";
import axios from "axios";

const EmployeeByCategory = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [employees, setEmployees] = useState([]);

  // Fetch categories on mount
  useEffect(() => {
    axios.get("http://88.200.63.148:1411/auth/category")
      .then(res => {
        if (res.data.Status) {
          setCategories(res.data.Result);
        } else {
          alert(res.data.Error);
        }
      })
      .catch(console.error);
  }, []);

  // Fetch employees when selectedCategoryId changes
  useEffect(() => {
    if (!selectedCategoryId) return;

    axios.get("http://88.200.63.148:1411/auth/employee_by_category", {
      params: { category_id: selectedCategoryId }
    })
      .then(res => {
        if (res.data.Status) {
          setEmployees(res.data.Result);
        } else {
          alert(res.data.Error);
        }
      })
      .catch(console.error);
  }, [selectedCategoryId]);

  return (
    <div className="px-5 mt-3">
      <h3>Filter Employees by Category</h3>

      <div className="mb-3">
        {categories.map(c => (
          <button
            key={c.id}
            className={`btn me-2 mb-2 ${selectedCategoryId === c.id ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={() => setSelectedCategoryId(c.id)}
          >
            {c.name}
          </button>
        ))}
      </div>

      <h4>Employees in: {categories.find(c => c.id === selectedCategoryId)?.name || "None"}</h4>

      <table className="table">
        <thead>
          <tr>
            <th>Name</th><th>Email</th><th>Address</th><th>Salary</th>
          </tr>
        </thead>
        <tbody>
          {employees.map(e => (
            <tr key={e.id}>
              <td>{e.name}</td>
              <td>{e.email}</td>
              <td>{e.address}</td>
              <td>{e.salary}</td>
            </tr>
          ))}
          {employees.length === 0 && selectedCategoryId && (
            <tr><td colSpan="4">No employees found in this category</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeByCategory;
