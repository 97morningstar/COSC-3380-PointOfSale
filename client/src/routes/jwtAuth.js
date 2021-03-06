const router = require("express").Router()
const pool = require("../../../services/db")
const bcrypt = require("bcrypt")
const jwtGenerator = require("../utils/jwtGenerator")
const validInfo = require("../middleware/validInfo");
const authorize = require("../middleware/authorization");

//registering
router.post("/create_employee", validInfo ,async (req, res) => {
    try {
        //destruct
      const data  = req.body;
      var user = await pool.query("SELECT * FROM customer WHERE email = ?",[
          data.email
      ]); 
      if (user.length !== 0){
        return res.status(401).send("Email Already in use")
     }
      user = await pool.query("SELECT * FROM employee WHERE email = ?",[
        data.email
    ]); 
     if (user.length !== 0){
        return res.status(401).send("Email Already in use")
     }
     const saltRound = 10;
     const salt = await bcrypt.genSalt(saltRound);
     //console.log(data.email);

     const bcryptPassword = await bcrypt.hash(data.password,salt);

      
      console.log(data);
      const newEmployee = await pool.query("INSERT INTO employee(first_name, middle_initial, last_name,employment_date,date_of_birth, email,password, salary,street_number, street_name,city ,zip_code, phone_number,store_store_id) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?,?,?,?)",
       [data.first_name, 
        data.middle_initial,
        data.last_name,
        data.employment_date,
        data.date_of_birth,
        data.email,
        bcryptPassword,  
        data.salary,      
        data.street_number,
        data.street_name,
        data.city,
        data.zip_code,
        data.phone_number,
        data.store_store_id
      ] );
      const token = jwtGenerator(newEmployee.employee_id,true);

      res.json("A new employee was added. Success");

    }catch (err){
      console.log(err.message);
      res.status(500).send("Server Error");
    }
  });
// create a customer
router.post("/create_customer", validInfo, async (req, res) => {
    try {
        //destruct

      const data  = req.body;
      data.street_number = data.street_number.toString();
      data.zip_code = data.zip_code.toString();
      console.log("auth create custoemr");
      var users_with_same_email = await pool.query("SELECT * FROM customer WHERE email = ?",[
        data.email
    ]); 
    if (users_with_same_email.length !== 0){
      const error = {
        email_address: "This Email is already in use"
      }
       return res.status(401).send(error);
    }
    users_with_same_email = await pool.query("SELECT * FROM employee WHERE email = ?",[
      data.email
  ]); 
  if (users_with_same_email.length !== 0){
    const error = {
      email_address: "This Email is already in use"
    }
     return res.status(401).send(error);
  }
    if (data.password.length < 6){
      const error = {
        password: "password must be atleast 6 characters"
      }
       return res.status(401).send(error);
    }
    if (data.middle_initial.length !== 1){
      const error = {
        middle_initial: "Middle Initial must be one character long"
      }
       return res.status(401).send(error);
    }
    if (data.street_number.match(/^[0-9]+$/) === null){
      const error = {
        street_number: "Street Number should only contain digits"
      }
       return res.status(401).send(error);
    }
    if (data.zip_code.match(/^[0-9]+$/) === null){
      const error = {
        zip_code: "Zip Code should only contain digits"
      }
       return res.status(401).send(error);
    }
    
   
     const saltRound = 10;
     const salt = await bcrypt.genSalt(saltRound);
     //console.log(data.email);

     const bcryptPassword = await bcrypt.hash(data.password,salt);

     var now = new Date();
     var d = now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate();
      console.log(bcryptPassword.length);
      const newCustomer = await pool.query("INSERT INTO customer(first_name, middle_initial, last_name, password, email, street_number, street_name, zip_code, date_of_birth, is_member, store_id_fk, join_date) VALUES ( ?,?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
       [data.first_name, 
        data.middle_initial,
        data.last_name,
        bcryptPassword,
        data.email,
        data.street_number,
        data.street_name,
        data.zip_code,
        data.date_of_birth,
        data.is_member,
        data.store_id_fk,
        d
      ] );
      console.log("data",data);
      const cust = await pool.query("SELECT * FROM customer WHERE email = ?",[data.email]);
      console.log("customer",cust);
      const token = jwtGenerator(cust[0].customer_id,false);
      const newInvoice = await pool.query("INSERT INTO invoice(customer_id_fk,store_id_fk) VALUES (?,?)",
      [
        cust[0].customer_id,
        cust[0].store_id_fk
      ]);
      res.send(cust);
        
    }catch (err){
      console.log(err.message);
      res.status(500).send("Server Error");
    }
  });
  
  //login
  router.post("/login", validInfo, async (req,res) =>{
      try{
        const data  = req.body;

    console.log("request",data);
    var is_employee = false;
    var user = await pool.query("SELECT * FROM customer WHERE email = ?", [data.email]);
    var found = false;
    if (user.length === 0){
        found = false
    }
    else {
        found = true;
    }
    if (found === false){
        user = await pool.query("SELECT * FROM employee WHERE email = ?", [data.email]);
        if (user.length === 0){
            return res.status(401).json("Invalid Credentials");
        }
        else {
            is_employee = true;
        }
    }
console.log("is_employee", is_employee);
    await bcrypt.compare(data.password,user[0].password,function(err,result){
        if (err){
            console.log(err);
        }else {
            if (result){
                console.log("Valid password and email");
                const token = jwtGenerator(user[0].user_id,is_employee);
                console.log("user",user[0]);
                res.json({token, is_employee, user: user[0]});
            } else{
                return res.status(401).json("Invalid Credentials");
            }
        }
    });


 //   res.send({token, is_employee: false, user_id: newCustomer.customer_id});

    
      }catch(err){
          console.error(err.message);
      }
  })

  router.post("/verify", authorize, (req, res) => {
    try {
      res.json(true);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  });


module.exports = router;