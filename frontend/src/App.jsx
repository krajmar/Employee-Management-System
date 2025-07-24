import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import 'bootstrap/dist/css/bootstrap.min.css'
import Login from './Components/Login.jsx'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './App.css'
import Dashboard from './Components/Dashboard.jsx'
import Home from './Components/Home.jsx'
import Employee from './Components/Employee.jsx'
import Category from './Components/Category.jsx'
import Profile from './Components/Profile.jsx'
import AddCategory from './Components/AddCategory.jsx'

function App() {
  //const [count, setCount] = useState(0)

  return (
      <BrowserRouter>
        <Routes>
          <Route path='adminlogin' element={<Login/>}></Route>
          <Route path='/dashboard' element={<Dashboard/>}>
            <Route path='' element={<Home/>}></Route>
            <Route path='/dashboard/employee' element={<Employee/>}></Route>
            <Route path='/dashboard/category' element={<Category/>}></Route>
            <Route path='/dashboard/profile' element={<Profile/>}></Route>
            <Route path='/dashboard/add_category' element={<AddCategory/>}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
  )
}

export default App
