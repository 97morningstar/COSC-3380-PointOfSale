const app = require('express').Router();
const pool = require("../services/db");
const authorize = require("../client/src/middleware/authorization");

// Get customer if authorized
app.get("/get_invoice_items/:customer",async (req, res) => {
    try {
        // console.log("information invoice item",req.body); 

         const {customer} = req.params;
        
       // const invoice_items = await pool.query("SELECT * FROM invoice_item WHERE invoice_id_fk = ?", [invoice_id]);
        const invoice_items = await pool.query("SELECT *, store_has_item.quantity as stock FROM store_has_item,invoice INNER JOIN invoice_item ON invoice.invoice_id = invoice_item.invoice_id_fk INNER JOIN customer ON invoice.customer_id_fk = customer.customer_id INNER JOIN item ON invoice_item.item_id_fk = item.item_id WHERE invoice.customer_id_fk = ? AND invoice.order_status = 'cart' AND store_has_item.item_id = item.item_id AND customer.store_id_fk = store_has_item.store_id", [customer]);

          
            res.json(invoice_items);
            

    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  });

  app.get("/get_payment/:customer_id",async (req, res) => {
    try {

         const {customer_id} = req.params;
         console.log(customer_id)
        
        const payment = await pool.query("SELECT * FROM payment WHERE customer_id_fk = ? AND is_deleted = 0", [customer_id]);

            res.json(payment);

    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  });

  app.post("/add_to_cart" , authorize ,async (req, res) => {
    try {
       

         const {invoice_id_fk} = req.body;
         const {item_id_fk} = req.body;
         const {quantity} = req.body;
         const {user_id} = req.body;
        
         const check_cart = await pool.query("SELECT * FROM invoice_item,invoice,customer WHERE invoice_item.invoice_id_fk = ? AND invoice.invoice_id = ? AND invoice.customer_id_fk = ? AND invoice.order_status = 'cart'",
         [
           invoice_id_fk,
           invoice_id_fk,
           user_id
         ])
         for (var i = 0; i < check_cart.length; i++){
            if (check_cart[0].item_id_fk === item_id_fk){
              const error = {
                validation: "This item aleady exists in your cart."
              }
               return res.status(401).send(error);
            }
         }
       // const invoice_items = await pool.query("SELECT * FROM invoice_item WHERE invoice_id_fk = ?", [invoice_id]);
        const invoice_added = await pool.query("INSERT INTO invoice_item(quantity, item_id_fk, invoice_id_fk) VALUES (?,?,?)", [
          quantity,
          item_id_fk,
          invoice_id_fk,
        ]);

            res.json("Purchased Done Succesfully");

    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  });


module.exports = app;