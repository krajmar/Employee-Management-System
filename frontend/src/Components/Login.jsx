import React, { useState } from 'react'
import './style.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const [values, setValues] = useState({
        email: '',
        password: ''
    })

    const [error, setError] = useState(null)
    const navigate = useNavigate()
    axios.defaults.withCredentials = true;

    const handleSubmit = (event) => {
        event.preventDefault()
        axios.post('http://88.200.63.148:1411/auth/adminlogin', values,
             { withCredentials: true }
        ).then(result => {
            if(result.data.loginStatus)
                navigate('/dashboard');
            else{
                setError(result.data.Error)
            }
        })
        .catch(err => console.log(err))
    }
    return (
        <div className='loginPage'>
            <div className='loginForm'>
                <div className='text-danger'>
                    {error && error}
                </div>
                <h2>Employee Log In Page</h2>
                <form onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor='email'><b>Email:</b></label>
                        <input type="email" name="email" autoComplete='off' placeholder='Your Email:' className='form-control rounded-0'
                        onChange={(e)=>setValues({...values, email : e.target.value})}/>
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='password'><b>Password:</b></label>
                        <input type="password" name="password" placeholder='Your Password:' className='form-control rounded-0'
                        onChange={(e)=>setValues({...values, password : e.target.value})}/>
                    </div>
                    <div className='mb-1'>
                        <input type="checkbox" name="tick" id="tick"></input>
                        <label htmlFor='tick'><strong>I agree with the terms and conditions.</strong></label>
                    </div>
                    <button className='btn btn-success w-100 rounded-0 mb-2'>Log In</button>
                </form>
            </div>
        </div>
    )
} 

export default Login