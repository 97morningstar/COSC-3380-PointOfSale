const express = require('express');
const app = express();
const port = process.env.PORT || 4000;
const cors = require("cors");
const pool = require("./services/db")
const path = require("path");

// process.env.NODE_ENV => production or undefined



//middleware
app.use(cors());
app.use(express.json()); // allow us to access request body req.body

app.use(express.static(path.join(__dirname, "client/build")));

if(process.env.NODE_ENV === "production"){
  //serve static content
  //npm run build
  app.use(express.static(path.join(__dirname, "client/build")));
}


console.log(path.join(__dirname, "client/build"));


//routes

// create a customer
app.post("/api/create_customer", async (req, res) => {
  try {
    const data  = req.body;
    console.log(data);
    const newCustomer = await pool.query("INSERT INTO customer(first_name, middle_initial, last_name, password, email, street_number, street_name, zip_code, date_of_birth, is_member) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
     [data.first_name, 
      data.middle_initial,
      data.last_name,
      data.password,
      data.email,
      data.street_number,
      data.street_name,
      data.zip_code,
      data.date_of_birth,
      data.is_member
    ] );
    
    res.json("A new customer was added. Success");
  }catch (err){
    console.log(err.message);
  }
});



// get all customers
app.get("/api/view_all_customer", async (req, res) => {
    try {
      const all_customers = await pool.query("SELECT * FROM customer");
      res.json(all_customers);
    }catch (err) {
      console.log(err.message);
    }
})

// get a customer by id
app.get("/api/customer/:id", async (req, res) => {
  try {

    const {id} = req.params;

    const customers_by_id = await pool.query("SELECT * FROM customer WHERE customer_id = ?", [id]);

    res.json(customers_by_id);
  }catch (err) {
    console.log(err.message);
  }
})

// update a customer by id
app.put("/api/customer/:id", async (req, res) => {
    try {
      const {id} = req.params;
      const data  = req.body;

      const updateCustomer = await pool.query("UPDATE customer SET first_name = ?, middle_initial = ?, last_name = ?, password = ?, email = ?, street_number = ?, street_name = ?, zip_code = ?, date_of_birth = ?, is_member = ? WHERE customer_id = ? ", 
      [ data.first_name, 
      data.middle_initial,
      data.last_name,
      data.password,
      data.email,
      data.street_number,
      data.street_name,
      data.zip_code,
      data.date_of_birth,
      data.is_member,
      id
      ]);
      
      res.json("Customer was updated successfully!");
    }catch (err) {
      console.log(err.message);
    }
});

// delete a customer by id
app.delete("/api/customer/:id", async (req, res) => {
    try {
      const {id} = req.params;
      const deleteCustomer = await pool.query("DELETE FROM customer WHERE customer_id = ?", [id]);
      res.json("Customer was deleted successfully");
    }catch (err) {
      console.log(err.message);
    }
});

/* Login */
// get a customer by email and password
app.post("/api/login", async (req, res) => {
  try {

    const data  = req.body;

    console.log("request",data);

    const customer_login = await pool.query("SELECT * FROM customer WHERE email = ? AND password = ?", [data.email, data.password]);

    console.log("customer_login",customer_login);

    if(customer_login.length === 0){
      return res.status(401).send("Invalid Credential");
    }

    res.json(customer_login);
  }catch (err) {
    console.log(err.message);
  }
})



/* Error handler middleware */
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  console.error("error",err.message, err.stack);
  res.status(statusCode).json({'message': err.message});


  return;
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});