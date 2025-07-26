import React from "react";
import { useEffect } from "react";
import axios from 'axios';
import { useState } from "react";

const AddEmployee = () => {
    const [employee,setEmployee] = useState({
        name: '',
        email: '',
        password: '',
        salary: '',
        address: '',
        category_id: '',
        image: ''
    })
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
    },[])

    const handleSubmit=(e)=>{
        e.preventDefault()
        const formData = new FormData();
        formData.append('name',employee.name);
        formData.append('email',employee.email);
        formData.append('password',employee.password);
        formData.append('address',employee.address);
        formData.append('salary',employee.salary);
        formData.append('image',employee.image);
        formData.append('category_id',employee.category_id);
        axios.post('http://88.200.63.148:1411/auth/add_employee', formData)
        .then(result=>console.log(result.data))
        .catch(err => console.log(err))
    }
    return (
        <div className='d-flex justify-content-center align-items-center' style={{marginTop: '30px'}}>
            <div className='p-3 rounded border w-50' style={{width: '700px',textAlign: 'left',height: '100%'}}>
                <h2 style={{textAlign: 'center'}}>Add New Employee</h2>
                <form className="row g-1" onSubmit={handleSubmit}>
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
    )
}

export default AddEmployee