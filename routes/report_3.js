const app = require('express').Router();
const pool = require("../services/db");
const authorize = require("../client/src/middleware/authorization");

// Get customer if authorized
app.post("/get_top_10_items_by_quantity", authorize, async (req, res) => {
    try {
    
      if(req.body.is_employee !== "true"){
        return res.status(400).send("You are not an employee");
     }

        const top_10_items_by_quantity = await pool.query("SELECT item_id_fk, sum(quantity) as quantity, name, brand, selling_price, sum(total_cost) as total_cost FROM invoice_item INNER JOIN item ON invoice_item.item_id_fk = item.item_id GROUP BY item_id_fk ORDER by quantity DESC LIMIT 10", []);

      res.json(top_10_items_by_quantity);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  });

  // Get customer if authorized
app.post("/get_top_10_items_by_total_cost", authorize, async (req, res) => {
  try {
  
    if(req.body.is_employee !== "true"){
      return res.status(400).send("You are not an employee");
   }

      const top_10_items_by_total_cost = await pool.query("SELECT item_id_fk, sum(quantity) as quantity, name, brand, selling_price, sum(total_cost) as total_cost FROM invoice_item INNER JOIN item ON invoice_item.item_id_fk = item.item_id GROUP BY item_id_fk ORDER by total_cost DESC LIMIT 10", []);

    res.json(top_10_items_by_total_cost);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

  // Get customer if authorized
  app.post("/get_top_10_items_sales_by_Category", authorize, async (req, res) => {
    try {
    
      if(req.body.is_employee !== "true"){
        return res.status(400).send("You are not an employee");
     }
  
        const top_10_items_by_total_cost = await pool.query("SELECT item_id_fk, sum(quantity) as quantity, name, brand, selling_price, sum(total_cost) as total_cost FROM invoice_item INNER JOIN item ON invoice_item.item_id_fk = item.item_id GROUP BY item_id_fk ORDER by total_cost DESC LIMIT 10", []);
  
      res.json(top_10_items_by_total_cost);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  });





module.exports = app;