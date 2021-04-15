const app = require('express').Router();
const pool = require("../services/db");
const authorize = require("../client/src/middleware/authorization");

// Get customer if authorized
app.post("/", authorize, async (req, res) => {
    try {
        console.log("info",req.body);
        
        const invoice = await pool.query("SELECT * FROM invoice WHERE customer_id_fk = ?", [req.body.user_id]);

      res.json(invoice);
    } catch (err) {hqf
      console.error(err.message);
      res.status(500).send("Server error");
    }
  });


module.exports = app;