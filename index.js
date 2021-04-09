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


/* try */
/*app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});*/

/*if(process.env.NODE_ENV === "production"){
  //serve static content
  //npm run build
  app.use(express.static(path.join(__dirname, "client/build")));
}*/

/*if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}*/

/* Prodcution
app.get('*', (request, response) => {
  response.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});
*/



//routes

// create a customer
app.post("/api/create_customer", async (req, res) => {
  try {
    const data = req.body;
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
      ]);

    res.json("A new customer was added. Success");
  } catch (err) {
    console.log(err.message);
  }
});


// get all items
app.get("/api/view_all_items", async (req, res) => {
  try {
    const all_items = await pool.query("SELECT * FROM item");

    res.json(all_items);
  } catch (err) {
    console.log(err.message);
  }
})



// get all customers
app.get("/api/view_all_customer", async (req, res) => {
  try {
    const all_customers = await pool.query("SELECT * FROM customer");
    res.json(all_customers);
  } catch (err) {
    console.log(err.message);
  }
})

// get a customer by id
app.get("/api/customer/:id", async (req, res) => {
  try {

    const { id } = req.params;

    const customers_by_id = await pool.query("SELECT * FROM customer WHERE customer_id = ?", [id]);

    res.json(customers_by_id);
  } catch (err) {
    console.log(err.message);
  }
})

// update a customer by id
app.put("/api/customer/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const updateCustomer = await pool.query("UPDATE customer SET first_name = ?, middle_initial = ?, last_name = ?, password = ?, email = ?, street_number = ?, street_name = ?, zip_code = ?, date_of_birth = ?, is_member = ? WHERE customer_id = ? ",
      [data.first_name,
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
  } catch (err) {
    console.log(err.message);
  }
});

// delete a customer by id
app.delete("/api/customer/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteCustomer = await pool.query("DELETE FROM customer WHERE customer_id = ?", [id]);
    res.json("Customer was deleted successfully");
  } catch (err) {
    console.log(err.message);
  }
});

/* Login */
// get a customer by email and password
app.post("/api/login", async (req, res) => {
  try {

    const data = req.body;

    console.log("request", data);

    const customer_login = await pool.query("SELECT * FROM customer WHERE email = ? AND password = ?", [data.email, data.password]);

    console.log("customer_login", customer_login);

    if (customer_login.length === 0) {
      return res.status(401).send("Invalid Credential");
    }

    res.json(customer_login);
  } catch (err) {
    console.log(err.message);
  }
})


app.get('*', (request, response) => {
  response.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});





/* Error handler middleware */
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  console.error("error", err.message, err.stack);
  res.status(statusCode).json({ 'message': err.message });


  return;
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});




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

// - get all by customer_id = ? [dashboard]
app.get("/api/invoice/:id", async (req, res) => {
  try {

    const { id } = req.params;

    const invoice_by_customer_id = await pool.query("SELECT * FROM invoice WHERE customer_id = ?", [id]);

    res.json(invoice_by_customer_id);
  } catch (err) {
    console.log(err.message);
  }
});

//get all [dashboard]
app.get("/api/view_all_invoice", async (req, res) => {
  try {
    const all_invoice = await pool.query("SELECT * FROM invoice");
    res.json(all_invoice);
  } catch (err) {
    console.log(err.message);
  }
});






/*invoice_item
    - update (quantity)
    - delete [customer deletes an item from cart]
    - get all by invoice_id = ? 
    -combine with the invoice gets to give full transaction history and cart
    - create a new invoice_item   [you need: quantity, item_id_fk]
    */

//  - update (quantity)
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
app.get("/api/invoice_item/:id", async (req, res) => {
  try {

    const { id } = req.params;

    const all_invoice_item_by_invoice_id = await pool.query("SELECT * FROM invoice_item WHERE invoice_id = ?", [id]);

    res.json(all_invoice_item_by_invoice_id);
  } catch (err) {
    console.log(err.message);
  }
});

//- create a new invoice_item
app.post("/api/create__invoice_item", async (req, res) => {
  try {
    const data = req.body;
    console.log(data);
    const newInvoiceItem = await pool.query("INSERT INTO invoice_item(invoice_item_id, quantity, total_cost, item_id_fk , invoice_id_fk) VALUES ( ?, ?, ?, ?, ?)",
      [data.invoice_item_id,
      data.quantity,
      data.total_cost,
      data.item_id_fk,
      data.invoice_id_fk,
      ]);

    res.json("A Invoice Item was added. Success");
  } catch (err) {
    console.log(err.message);
  }
});
