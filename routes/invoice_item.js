const app = require('express').Router();
const pool = require("../services/db")

/*invoice_item
    - update (quantity)
    - delete [customer deletes an item from cart]
    - get all by invoice_id = ? 
    -combine with the invoice gets to give full transaction history and cart
    - create a new invoice_item   [you need: quantity, item_id_fk]
    */

//  - update (quantity)
// RESULT - SUCCESS
app.put("/api/invoice_item/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const update_quantity = await pool.query("UPDATE invoice_item SET quantity = ? WHERE invoice_item_id = ? ",
      [
        data.quantity,
        id
      ]);

    res.json("Quantity was updated successfully!");
  } catch (err) {
    console.log(err.message);
  }
});


//- get all by invoice_id = ? 
// RESULT - SUCCESS
app.get("/api/invoice_item/:id", async (req, res) => {
  try {

    const { id } = req.params;

    const allInvoiceitem = await pool.query("SELECT * FROM invoice_item WHERE invoice_id = ?", [id]);

    res.json(allInvoiceitem);
  } catch (err) {
    console.log(err.message);
  }
});

//- delete [customer deletes an item from cart]
// RESULT - SUCCESS
app.delete("/api/invoice_item/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteCustomer = await pool.query("DELETE FROM invoice_item WHERE invoice_item_id = ?", [id]);
    res.json("item was deleted successfully");
  } catch (err) {
    console.log(err.message);
  }
});


//- create a new invoice_item
// RESULT: LOAD TIME (FAILED i guess...)
app.post("/api/invoice_item", async (req, res) => {
  try {
    const data = req.body;
    console.log(data);
    const newInvoiceitem = await pool.query("INSERT INTO invoice_item(invoice_item_id, quantity, total_cost, item_id_fk , invoice_id_fk) VALUES ( ?, ?, ?, ?, ?)",
      [data.invoice_item_id,
      data.quantity,
      data.total_cost,
      data.item_id_fk,
      data.invoice_id_fk,
      ]);

    res.json("An item was sucessfully added to your cart !");
  } catch (err) {
    console.log(err.message);
  }
});



//- get all cart items
// RESULT: LOAD TIME (FAILED i guess...)
app.get("/api/cart_invoice/", async (req, res) => {
  try {

    const { id } = req.params;

    const allInvoiceitem = await pool.query("SELECT * FROM invoice_item WHERE order_status = 'cart'");

    res.json(allInvoiceitem);
  } catch (err) {
    console.log(err.message);
  }
});


module.exports = app;
