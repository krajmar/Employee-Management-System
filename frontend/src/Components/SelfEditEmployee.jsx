import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import axios from 'axios'
import './style.css'
import { useNavigate } from 'react-router-dom'


const SelfEditEmployee= () => {
    const [category, setCategory] = useState([])
    const {id} = useParams()
    const navigate = useNavigate()
    useEffect(()=>{
        /*axios.get('http://88.200.63.148:1411/auth/category')
        .then(result => {
            if(result.data.Status){
                setCategory(result.data.Result);
            }
            else{
               alert(result.data.Error) 
            }
        }).catch(err=>console.log(err))*/

         axios.get('http://88.200.63.148:1411/auth/employee/'+id)
        .then(result => {
           setEmployee({
            ...employee,
            name: result.data.Result[0].name,
            email: result.data.Result[0].email,
            address: result.data.Result[0].address,
           })
        }).catch(err=>console.log(err))
    },[])
    
    const [employee,setEmployee] = useState({
        name: '',
        email: '',
        address: '',
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.put('http://88.200.63.148:1411/auth/self_edit_employee/'+id, employee)
        .then(result=>{
            if(result.data.Status){
                navigate('/detail/'+id)
            }
            else{
                alert(result.data.Error)
            }
        }).catch(err=>console.log(err))
    }

    return(
       <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
        <div className='d-flex mx-auto justify-content-center'>
            <div className='p-3 rounded border w-100' style={{maxWidth: '700px',textAlign: 'left', backgroundColor: 'white'}}>
                <h2 style={{textAlign: 'center'}}>Self Edit Employee</h2>
                <form className="row g-1" onSubmit={handleSubmit}>
                    <div className='mb-3 col-12'>
                        <label htmlFor='inputName'><b>Name and Surname:</b></label>
                        <input type="text" value={employee.name} name="inputName" id="inputName" autoComplete='off' placeholder='Enter name and surname:' className='form-control rounded-0'
                        onChange={(e)=>setEmployee({...employee, name: e.target.value})}/>
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='inputEmail'><b>E-mail:</b></label>
                        <input type="email" value={employee.email} name="inputEmail" id="inputEmail" autoComplete='off' placeholder='Enter email:' className='form-control rounded-0'
                        onChange={(e)=>setEmployee({...employee, email: e.target.value})}/>
                    </div>
                    <div className='col-12'></div>
                    <div className='mb-3'>
                        <label htmlFor='inputAddress'><b>Address:</b></label>
                        <input type="text" name="inputAddress" value={employee.address} id="inputAddress" autoComplete='off' placeholder='Enter address:' className='form-control rounded-0'
                        onChange={(e)=>setEmployee({...employee, address: e.target.value})}/>
                    </div>
                    
                    <button type="submit" className='btn btn-primary w-100 rounded-0 mb-2'>Save</button>
                </form>
            </div>
        </div>
        </div>
    )
}

export default SelfEditEmployee