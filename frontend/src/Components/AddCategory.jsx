import React, { useState } from "react";
import './style.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const AddCategory = () => {
    const [category,setCategory] = useState()
    const navigate = useNavigate()
    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('http://88.200.63.148:1411/auth/add_category', {category})
        .then(result => {
            if(result.data.Status){
                navigate('/dashboard/category')
            }
            else{
                alert(result.data.Error)
            }
        })
        .catch(err => console.log(err))
    }
    return (
         <div className='categoryPage'>
            <div className='categoryForm'>
                <h2>Add New Category</h2>
                <form onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor='category'><b>Category:</b></label>
                        <input type="text" name="category" autoComplete='off' placeholder='Enter Category:' className='form-control rounded-0'
                        onChange={(e)=>setCategory(e.target.value)}/>
                    </div>
                    <button className='btn btn-success w-100 rounded-0 mb-2'>Add category</button>
                </form>
            </div>
        </div>
    )
}
export default AddCategory