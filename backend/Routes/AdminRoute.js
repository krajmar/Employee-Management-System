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
const bcrypt = require('bcrypt');
const multer = require('multer');
const path = require('path');

//image upload

const storage = multer.diskStorage({
  destination: (req, file, cb)=>{
    cb(null, 'Public/Images')
  }, 
  filename: (req,file, cb)=>{
    cb(null, file.fieldname+"_"+Date.now()+path.extname(file.originalname))
  }
})

const upload = multer({
  storage: storage
})

//end image upload


router.post('/adminlogin', (req, res) => {
  //console.log('/adminlogin was hit!');
  const sql = "SELECT * FROM admin WHERE email = ? AND password = ?"
  db.query(sql,[req.body.email, req.body.password], (err,result)=>{
    if (err) {
    console.error('MySQL error:', err);
  return res.json({ loginStatus: false, Error: err.code || err.message });
}

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
  const sql = "INSERT INTO category (name) VALUES (?)"
  db.query(sql,[req.body.category], (err,result)=>{
    if(err) return res.json({Status: false, Error: "Query Error"})
    return res.json({Status: true})
  })
})

router.post('/add_employee',upload.single('image'),(req,res)=>{
  const sql = "INSERT INTO employees (name,email,password,salary,address,image,category_id) VALUES (?)"
  bcrypt.hash(req.body.password, 10, (err, hash)=>{
    if(err) return res.json({Status: false, Error: "Query Error"})
      const values = [
        req.body.name,
        req.body.email,
        hash,
        req.body.salary,
        req.body.address,
        req.file.filename,
        req.body.category_id
      ]
      db.query(sql, [values], (err,result)=>{
        if(err) return res.json({Status: false, Error: "Query Error"})
        return res.json({Status: true})        
      })
  })

})

router.get('/employee',(req,res)=>{
  const sql = "SELECT * FROM employees";
  db.query(sql,(err,result)=>{
     if(err) return res.json({Status: false, Error: "Query Error"})
    return res.json({Status: true, Result: result})
  })
})

router.get('/employee/:id', (req,res)=>{
  const id = req.params.id;
  const sql = "SELECT * FROM employees WHERE id = ?";
  db.query(sql,[id], (err,result)=>{
     if(err) return res.json({Status: false, Error: "Query Error"})
    return res.json({Status: true, Result: result})
  })
})

router.put('/edit_employee/:id',(req,res)=>{
  const id = req.params.id;
  const sql = "UPDATE employees SET name = ?, email = ?, salary = ?, address = ?, category_id = ? WHERE id = ?"
  const values = [
        req.body.name,
        req.body.email,
        req.body.salary,
        req.body.address,
        req.body.category_id
      ]
  db.query(sql,[...values, id], (err,result)=>{
     if(err) return res.json({Status: false, Error: "Query Error"})
    return res.json({Status: true, Result: result})
  })
})

router.delete('/delete_employee/:id', (req,res)=>{
  const id = req.params.id;
  const sql = "DELETE FROM employees WHERE id = ?"
  db.query(sql,[id], (err,result)=>{
     if(err) return res.json({Status: false, Error: "Query Error"})
    return res.json({Status: true, Result: result})
  })
})

router.get('/admin_count',(req,res)=>{
  const sql = "SELECT COUNT(id) AS admin FROM admin";
    db.query(sql, (err,result)=>{
     if(err) return res.json({Status: false, Error: "Query Error"})
    return res.json({Status: true, Result: result})
  })
})

router.get('/employee_count',(req,res)=>{
  const sql = "SELECT COUNT(id) AS employee FROM employees";
    db.query(sql, (err,result)=>{
     if(err) return res.json({Status: false, Error: "Query Error"})
    return res.json({Status: true, Result: result})
  })
})

router.get('/salary_count',(req,res)=>{
  const sql = "SELECT SUM(salary) AS salary FROM employees";
    db.query(sql, (err,result)=>{
     if(err) return res.json({Status: false, Error: "Query Error"})
    return res.json({Status: true, Result: result})
  })
})

router.get('/admin_records', (req,res)=>{
  const sql = "SELECT * FROM admin"
  db.query(sql, (err,result)=>{
     if(err) return res.json({Status: false, Error: "Query Error"})
    return res.json({Status: true, Result: result})
})
})

router.get('/logout', (req,res)=>{
  res.clearCookie('token')
  return res.json({Status: true})
})

module.exports = { adminRouter: router };