import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


const EditAdmin= () => {
    const [category, setCategory] = useState([])
    const {id} = useParams()
    const navigate = useNavigate()
    useEffect(()=>{

         axios.get('http://88.200.63.148:1411/auth/admin/'+id)
        .then(result => {
           setAdmin({
            ...admin,
            email: result.data.Result[0].email,
            password: result.data.Result[0].password,
           })
        }).catch(err=>console.log(err))
    },[])
    
    const [admin,setAdmin] = useState({
        email: '',
        password: '',
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.put('http://88.200.63.148:1411/auth/edit_admin/'+id, admin)
        .then(result=>{
            if(result.data.Status){
                navigate('/dashboard')
            }
            else{
                alert(result.data.Error)
            }
        }).catch(err=>console.log(err))
    }

    return(
       <div className="container mt-5">
        <div className='d-flex mx-auto justify-content-center'>
            <div className='p-3 rounded border w-100' style={{maxWidth: '700px',textAlign: 'left'}}>
                <h2 style={{textAlign: 'center'}}>Edit Admin</h2>
                <form className="row g-1" onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor='inputEmail'><b>E-mail:</b></label>
                        <input type="email" value={admin.email} name="inputEmail" id="inputEmail" autoComplete='off' placeholder='Enter email:' className='form-control rounded-0'
                        onChange={(e)=>setAdmin({...admin, email: e.target.value})}/>
                    </div>
                    <div className='col-12'></div>
                    <div className='mb-3'>
                        <label htmlFor='inputAddress'><b>Password:</b></label>
                        <input type="text" name="inputAddress" value={admin.password} id="inputAddress" autoComplete='off' placeholder='Enter address:' className='form-control rounded-0'
                        onChange={(e)=>setAdmin({...admin, password: e.target.value})}/>
                    </div>
                    
                    <button type="submit" className='btn btn-primary w-100 rounded-0 mb-2'>Save</button>
                </form>
            </div>
        </div>
        </div>
    )
}

export default EditAdmin