const app = require('express').Router();
const pool = require("../services/db");
const authorize = require("../client/src/middleware/authorization");

// Get customer if authorized
app.get("/get_invoice_items/:customer",async (req, res) => {
    try {
        // console.log("information invoice item",req.body); 

         const {customer} = req.params;
        
       // const invoice_items = await pool.query("SELECT * FROM invoice_item WHERE invoice_id_fk = ?", [invoice_id]);
        const invoice_items = await pool.query("SELECT * FROM invoice INNER JOIN invoice_item ON invoice.invoice_id = invoice_item.invoice_id_fk INNER JOIN customer ON invoice.customer_id_fk = customer.customer_id INNER JOIN item ON invoice_item.item_id_fk = item.item_id WHERE invoice.customer_id_fk = ?", [customer]);

            res.json(invoice_items);

    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  });


module.exports = app;