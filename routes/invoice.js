const app = require('express').Router();
const pool = require("../services/db")

/*invoice 
- update (time of transaction = 'current timestamp', order status = 'purchased') [when the customer clicks on button 'BUY']
- delete [when the employee clicks on button 'DELETE'] ?
-instead of delete update order_status = 'refunded'
- get all [dashboard]
- get (total_cost,time_of_transaction) by and order_status=purchased and customer_id=? [Order history of a specific customer]
- get (total_cost) by and order_status=cart and customer_id=? [cart of specific customer]
-these two gets will be combinded with the invoice_item gets in order to show entire histories and carts
- get all by customer_id = ? [dashboard]
*/

//- update (time of transaction = 'current timestamp', order status = 'purchased') [when the customer clicks on button 'BUY']
// RESULT - FAILED
app.put("/api/invoice_transition/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const invoiceTransaction = await pool.query("UPDATE invoice SET time_of_transaction = 'current timestamp' , order_status = 'purchased'",
      [data.time_of_transaction,
      data.order_status,
        id
      ]);

    res.json("Transaction was Sucessful !");
  } catch (err) {
    console.log(err.message);
  }
});

// delete [when the employee clicks on button 'DELETE'] ?
// RESULT: FAILED
app.delete("/api/invoice/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteInvoice = await pool.query("DELETE invoice FROM invoice WHERE invoice_id = ?", [id]);
    res.json("Invoice was deleted successfully");
  } catch (err) {
    console.log(err.message);
  }
});

//-instead of delete update order_status = 'refunded'
// RESULT: FAILED
app.put("/api/invoice_refund/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const invoiceRefund = await pool.query("UPDATE invoice SET order_status = 'refunded' WHERE order_status = 'purchased'",
      [data.order_status,
        id
      ]);

    res.json("Transaction was Sucessfully Refunded !");
  } catch (err) {
    console.log(err.message);
  }
});

//get all [dashboard]
// RESULT: SUCCESS
app.get("/api/view_all_invoice", async (req, res) => {
  try {
    const allInvoice = await pool.query("SELECT * FROM invoice");
    res.json(allInvoice);
  } catch (err) {
    console.log(err.message);
  }
});


//get (total_cost,time_of_transaction) by and order_status=purchased and customer_id=? [Order history of a specific customer]
// RESULT: LOAD TIME (FAILED i guess...)
app.get("/api/invoice_history/:id", async (req, res) => {
  try {

    const { id } = req.params;

    const invoiceHistory = await pool.query("SELECT total_cost, time_of_transaction FROM invoice WHERE order_status='purchased', customer_id = ?", [id]);

    res.json(invoiceHistory);
  } catch (err) {
    console.log(err.message);
  }
})


// get (total_cost) by and order_status=cart and customer_id=? [cart of specific customer]
// RESULT: LOAD TIME (FAILED i guess...)
app.get("/api/invoice_cart/:id", async (req, res) => {
  try {

    const { id } = req.params;

    const invoiceCart = await pool.query("SELECT total_cost FROM invoice WHERE order_status='cart', customer_id = ?", [id]);

    res.json(invoiceCart);
  } catch (err) {
    console.log(err.message);
  }
})

module.exports = app;
