/*const express = require('express');
const router = express.Router()

router.post('/adminlogin',(req,res)=>{
    console.log(req.body)
})
module.exports = { adminRouter: router };
*/
const express = require('express');
const router = express.Router();
const db = require('../dbConn');
const jwt = require('jsonwebtoken');

router.post('/adminlogin', (req, res) => {
  console.log('/adminlogin was hit!');
  const sql = "SELECT * FROM admin WHERE email = ? AND password = ?"
  db.query(sql,[req.body.email, req.body.password], (err,result)=>{
    if(err) return res.json({loginStatus: false, Error: "Query error"})
    if(result.length > 0){
      const email = result[0].email;
      const token = jwt.sign({role: "admin", email: email},
         "jwt_secret_key",
        {expiresIn: '1d'}
      );
      res.cookie('token',token)
      return res.json({loginStatus: true})
    }else{
      return res.json({loginStatus: false, Error: "Wrong Email or password"});
    }
  });
  //console.log(req.body);
  //res.json({ message: 'Login received', data: req.body }); // <-- send response!
});

router.get('/category',(req,res)=>{
  const sql = "SELECT * FROM category";
  db.query(sql,(err,result)=>{
     if(err) return res.json({Status: false, Error: "Query Error"})
    return res.json({Status: true, Result: result})
  })
})

router.post('/add_category', (req,res) => {
  const sql = "INSERT INTO category (`name`) VALUES (?)"
  db.query(sql,[req.body.category], (err,result)=>{
    if(err) return res.json({Status: false, Error: "Query Error"})
    return res.json({Status: true})
  })
})
module.exports = { adminRouter: router };
