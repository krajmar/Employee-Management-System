import React, { useEffect, useState } from 'react'
import './style.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'


const EmployeeDetail = () => {
    const [employee, setEmployee] = useState([])
    const {id} = useParams()
    const navigate = useNavigate()
    useEffect(()=>{
        axios.get('http://88.200.63.148:1411/auth/detail/'+id)
        .then(result=>{
            setEmployee(result.data[0])
        })
        .catch(err => console.log(err))
    },[])

    const handleLogout = () => {
        axios.get('http://88.200.63.148:1411/auth/logout_emp')
    .then(result=>{
      if(result.data.Status){
        navigate('/start')
      }
    })
    }

    return (
        <div>
            <div className='p-2 d-flex justify-content-center shadow' style={{color: 'white'}}>
                <h4>Employee Management System</h4>
            </div>
            <div className='d-flex justify-content-center flex-column align-items-center mt-5' style={{color: 'white'}}>
                <img src={'http://88.200.63.148:1411/Images/'+employee.image} style={{width: '300px', height: '300px',borderRadius: '50%'}}/>
                <div className='d-flex align-items-center flex-column mt-5'>
                    <h3>Name: {employee.name}</h3>
                    <h3>Email: {employee.email}</h3>
                    <h3>Salary: {employee.salary}$</h3>
                </div>
                <div>
                    <button className='btn btn-primary me-2'>Edit</button>
                    <button className='btn btn-danger' onClick={handleLogout}>Logout</button>
                </div>
            </div>
        </div>
    );
};

export default EmployeeDetail;