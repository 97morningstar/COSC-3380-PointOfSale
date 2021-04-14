const app = require('express').Router();
const pool = require("../services/db");
const authorize = require("../client/src/middleware/authorization");

// Get customer if authorized
app.get("/get_invoice_items/:invoice_id",async (req, res) => {
    try {
         console.log("information invoice item",req.body); 

         const {invoice_id} = req.params;
        
        const invoice_items = await pool.query("SELECT * FROM invoice_item WHERE invoice_id_fk = ?", [invoice_id]);
        console.log("invoice_items",invoice_items);
      res.json(invoice_items);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  });


module.exports = app;