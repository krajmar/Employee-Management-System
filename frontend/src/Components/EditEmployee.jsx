import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import axios from 'axios'


const EditEmployee= () => {
    const [category, setCategory] = useState([])
    useEffect(()=>{
        axios.get('http://88.200.63.148:1411/auth/category')
        .then(result => {
            if(result.data.Status){
                setCategory(result.data.Result);
            }
            else{
               alert(result.data.Error) 
            }
        }).catch(err=>console.log(err))

         axios.get('http://88.200.63.148:1411/auth/employee'+id)
        .then(result => {
           console.log(result.data)
        }).catch(err=>console.log(err))
    },[])
    
    const [employee,setEmployee] = useState({
        name: '',
        email: '',
        password: '',
        salary: '',
        address: '',
        category_id: '',
        image: ''
    })
    const {id} = useParams()
    return(
       <div className="container mt-5">
        <div className='d-flex mx-auto justify-content-center'>
            <div className='p-3 rounded border w-100' style={{maxWidth: '700px',textAlign: 'left'}}>
                <h2 style={{textAlign: 'center'}}>Edit Employee</h2>
                <form className="row g-1">
                    <div className='mb-3 col-12'>
                        <label htmlFor='inputName'><b>Name and Surname:</b></label>
                        <input type="text" name="inputName" id="inputName" autoComplete='off' placeholder='Enter name and surname:' className='form-control rounded-0'
                        onChange={(e)=>setEmployee({...employee, name: e.target.value})}/>
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='inputEmail'><b>E-mail:</b></label>
                        <input type="email" name="inputEmail" id="inputEmail" autoComplete='off' placeholder='Enter email:' className='form-control rounded-0'
                        onChange={(e)=>setEmployee({...employee, email: e.target.value})}/>
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='inputPassword'><b>Password:</b></label>
                        <input type="password" name="inputPassword" id="inputPassword" autoComplete='off' placeholder='Enter password:' className='form-control rounded-0'
                        onChange={(e)=>setEmployee({...employee, password: e.target.value})}/>
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='inputAddress'><b>Address:</b></label>
                        <input type="text" name="inputAddress" id="inputAddress" autoComplete='off' placeholder='Enter address:' className='form-control rounded-0'
                        onChange={(e)=>setEmployee({...employee, address: e.target.value})}/>
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='inputSalary'><b>Salary:</b></label>
                        <input type="text" name="inputSalary" id="inputSalary" autoComplete='off' placeholder='Enter salary:' className='form-control rounded-0'
                        onChange={(e)=>setEmployee({...employee, salary: e.target.value})}/>
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='inputCategory'><b>Category:</b></label>
                        <select
                            name="category"
                            id="category"
                            className="form-select"
                            value={employee.category_id} // Add this to control it
                            onChange={(e) =>
                                setEmployee({ ...employee, category_id: e.target.value })
                            }
                            >
                            <option value="">-- Select a category --</option>
                            {category.map((c) => (
                                <option key={c.id} value={c.id}>
                                {c.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='inputImage'><b>Select Image:</b></label>
                        <input type="file" name="image" id="inputImage" autoComplete='off' placeholder='Enter name and surname:' className='form-control rounded-0'
                       onChange={(e) => setEmployee({ ...employee, image: e.target.files[0] })}/>
                    </div>
                    <button type="submit" className='btn btn-primary w-100 rounded-0 mb-2'>Add Employee</button>
                </form>
            </div>
        </div>
        </div>
    )
}

export default EditEmployee