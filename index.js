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





if (process.env.NODE_ENV === 'production') {
    //serve static content
  //npm run build
	app.use(express.static('client/build'));
}

//routes

app.use("/auth", require("./client/src/routes/jwtAuth"));
app.use("/api", require("./routes/customer")); 
app.use("/api", require("./routes/item"));
app.use("/api", require("./routes/store"));
app.use("/api", require("./routes/search"));
app.use("/api", require("./routes/employee"));
/* Register Protect routes */
app.use("/get_profile", require("./routes/profile"));
app.use("/get_cart", require("./routes/cart"));
app.use("/", require("./routes/invoice_item_cart"));





/* Do not move from here */
app.get('*', (request, response) => {
	response.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});


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