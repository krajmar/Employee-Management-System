import React from 'react'

const Login = () => {
    return (
        <div className='d-flex justify-content-center align-items-center vh-100 loginPage'>
            <div className='p-3 rounded w-25 border loginForm'>
                <h2>Employee Log In Page</h2>
                <form>
                    <div>
                        <label htmlFor='email'><b>Email:</b></label>
                        <input type="email" name="email" autoComplete='off' placeholder='Your Email:' className='form-control rounded-0'/>
                    </div>
                    <div>
                        <label htmlFor='password'><b>Password:</b></label>
                        <input type="password" name="password" placeholder='Your Password:' className='form-control rounded-0'/>
                    </div>
                    <button className='btn btn-success w-100 rounded-0'>Log In</button>
                </form>
            </div>
        </div>
    )
} 

export default Login