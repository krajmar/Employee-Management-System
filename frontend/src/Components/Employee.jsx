import React, { useEffect } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useState } from "react";

const Employee = () => {
    const [employee, setEmployee] = useState([])
    useEffect(()=>{
axios.get('http://88.200.63.148:1411/auth/employee')
        .then(result => {
            if(result.data.Status){
                setEmployee(result.data.Result);
            }
            else{
               alert(result.data.Error) 
            }
        }).catch(err=>console.log(err))
    },[])
    return (
        <div className="px-5 mt-3">
            <div className="d-flex justify-content-center">
                <h3>Employee List</h3>
            </div>
            <Link to="/dashboard/add_employee" className="btn btn-success">Add Employee</Link>
            <div className="mt-3">
                <table className="table" style={{marginTop: '50px'}}>
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Address</th>
                            <th>Salary</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            employee.map(e => (
                                <tr key={e.id}>
                                    <td><img src={'http:88.200.63.148:1411/Images/'+e.image} className="employee_image" alt="employee"/></td>
                                    <td>{e.name}</td>
                                    <td>{e.email}</td>
                                    <td>{e.address}</td>
                                    <td>{e.salary}</td>
                                    <td>
                                        <button>Update</button>
                                        <button>Delete</button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}
export default Employee