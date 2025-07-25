import React from "react";

const Employee = () => {
    return (
        <div className="px-5 mt-3">
            <div className="d-flex justify-content-center">
                <h3>Employee List</h3>
            </div>
            <Link to="/dashboard/add_employee" className="btn btn-success">Add Employee</Link>
            <div></div>
        </div>
    )
}
export default Employee