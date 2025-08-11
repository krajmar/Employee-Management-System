const express = require('express');
const router = express.Router();
const db = require('../dbConn');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


router.post('/employee_login', (req, res) => {
  //console.log('/adminlogin was hit!');
  const sql = "SELECT * FROM employees WHERE email = ?"
  db.query(sql,[req.body.email], (err,result)=>{
    if(err) return res.json({loginStatus: false, Error: "Query error"})
    if(result.length > 0){
      bcrypt.compare(req.body.password, result[0].password, (err, response)=>{
        if(err) return res.json({loginStatus: false, Error: "Wrong password"})
        if(response){
            const email = result[0].email;
            const token = jwt.sign({role: "employee", email: email},
            "employee_secret_key",
            {expiresIn: '1d'}
      );
        res.cookie('token', token)
      return res.json({loginStatus: true, id: result[0].id})
        }
      })
      
      
    }else{
      return res.json({loginStatus: false, Error: "Wrong Email or password"});
    }
  });
  //console.log(req.body);
  //res.json({ message: 'Login received', data: req.body }); // <-- send response!
});

router.get('/detail/:id', (req, res)=>{
    const id = req.params.id;
    const sql = "SELECT * FROM employees WHERE id = ?"
    db.query(sql, [id], (err, result)=>{
        if(err) return res.json({Status: false});
        return res.json(result)
    })
})

router.get('/logout_emp', (req,res) => {
    res.clearCookie('token')
  return res.json({Status: true})
})

router.put('/self_edit_employee/:id',(req,res)=>{
  const id = req.params.id;
  const sql = "UPDATE employees SET name = ?, email = ?, address = ? WHERE id = ?"
  const values = [
        req.body.name,
        req.body.email,
        req.body.address,
      ]
  db.query(sql,[...values, id], (err,result)=>{
     if(err) return res.json({Status: false, Error: "Query Error"})
    return res.json({Status: true, Result: result})
  })
})

module.exports = { employeeRouter: router };