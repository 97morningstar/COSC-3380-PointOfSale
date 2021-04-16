const app = require('express').Router();
const pool = require("../services/db");
const authorize = require("../client/src/middleware/authorization");

  // get all customers
app.post("/view_all_employee", authorize, async (req, res) => {
    try {
      const all_customers = await pool.query("SELECT * FROM employee");
      res.json(all_customers);
    }catch (err) {
      console.log(err.message);
    }
})

// get a employee by id
app.get("/employee/:id", async (req, res) => {
    try {
  
      const {id} = req.params;
  
      const employee_by_id = await pool.query("SELECT * FROM employee WHERE employee_id = ?", [id]);
  
      res.json(employee_by_id);
    }catch (err) {
      console.log(err.message);
    }
  })
/*
  // update a customer by id
app.put("/customer/:id", async (req, res) => {
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
app.delete("/customer/:id", async (req, res) => {
    try {
      const {id} = req.params;
      const deleteCustomer = await pool.query("DELETE FROM customer WHERE customer_id = ?", [id]);
      res.json("Customer was deleted successfully");
    }catch (err) {
      console.log(err.message);
    }
});
*/
module.exports = app;
