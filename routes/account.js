const app = require('express').Router();
const pool = require("../services/db");
const authorize = require("../client/src/middleware/authorization");

// Get customer if authorized
app.post("/get_account", authorize, async (req, res) => {
    try {
    
      if(req.body.is_employee !== "false"){
        return res.status(400).send("You are not an employee");
     }

        const payment = await pool.query("SELECT * FROM payment WHERE customer_id_fk = ? AND is_deleted = 0", [req.body.user_id]);

      res.json(payment);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  });

  app.put("/account/update_payment", authorize, async (req, res) => {
    try {
       
        const data = req.body;
        console.log("DATA",data);
        data.card_number = data.card_number.toString();
        data.expiration_month = data.expiration_month.toString();
        data.expiration_year = data.expiration_year.toString();
        data.security_code = data.security_code.toString();
        console.log("STRING DATA",data);
        if (data.card_number.match(/^[0-9]+$/) === null){
          console.log("Cardnumber not digits");
          const error = {
            validation: "card Number must only contain digits"
          }
           return res.status(401).send(error);
        }
        if (data.card_number.length < 10){
          console.log("Card number too short",data.card_number);
          const error = {
            validation: "card Number must be at least 10 digits"
          }
           return res.status(401).send(error);
        }
        
        if (data.expiration_month.match(/^[0-9]+$/) === null){
          const error = {
            validation: "Expiration month must only contain digits"
          }
           return res.status(401).send(error);
        }
        if (data.expiration_month > 12){
          const error = {
            validation1: "Expiration month must be a number between 1 and 12"
          }
           return res.status(401).send(error);
        }
        if ( data.expiration_year.match(/^[0-9]+$/) === null){
          const error = {
            validation: "expiration year must only contain digits"
          }
           return res.status(401).send(error);
        }
        if (data.expiration_year.length !== 4){
          console.log("exp year lenght:",data.expiration_year.length );
          const error = {
            validation: "expiration year must be exactly 4 digits"
          }
           return res.status(401).send(error);
        }
        if (data.security_code.match(/^[0-9]+$/) === null){
          const error = {
            validation: "Security Code must only contain digits"
          }
           return res.status(401).send(error);
        }
        if (data.security_code.length !== 3){
          const error = {
            validation: "Security Code must be exactly 3 digits"
          }
           return res.status(401).send(error);
        }
        const payment = await pool.query("UPDATE payment SET card_number = ?, expiration_month = ?, expiration_year = ?, security_code = ? WHERE payment_id = ?", [
          data.card_number, 
          data.expiration_month,
          data.expiration_year,
          data.security_code,
          data.id
        ]);

        console.log("server",payment);


        const data2 = {
          card_number: data.card_number, 
          expiration_month: data.expiration_month,
          expiration_year: data.expiration_year,
          security_code: data.security_code,
          payment_id: data.id
        }
    
      res.send(data2);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  });

  app.post("/account/add_payment", authorize, async (req, res) => {
    try {
       
        const data = req.body;
        console.log("Data",data);
        if (data.card_number.match(/^[0-9]+$/) === null){
          console.log("Cardnumber not digits");
          const error = {
            validation: "card Number must only contain digits"
          }
           return res.status(401).send(error);
        }
        if (data.card_number.length < 10){
          console.log("Card number too short",data.card_number);
          const error = {
            validation: "card Number must be at least 10 digits"
          }
           return res.status(401).send(error);
        }
        
        if (data.expiration_month.match(/^[0-9]+$/) === null){
          const error = {
            validation: "Expiration month must only contain digits"
          }
           return res.status(401).send(error);
        }
        if (data.expiration_month > 12){
          const error = {
            validation1: "Expiration month must be a number between 1 and 12"
          }
           return res.status(401).send(error);
        }
        if (data.expiration_year.match(/^[0-9]+$/) === null){
          const error = {
            validation: "expiration year must only contain digits"
          }
           return res.status(401).send(error);
        }
        if (data.expiration_year.length !== 4){
          const error = {
            validation: "expiration year must be exactly 4 digits"
          }
           return res.status(401).send(error);
        }
        if (data.security_code.match(/^[0-9]+$/) === null){
          const error = {
            validation: "Security Code must only contain digits"
          }
           return res.status(401).send(error);
        }
        if (data.security_code.length !== 3){
          const error = {
            validation: "Security Code must be exactly 3 digits"
          }
           return res.status(401).send(error);
        }
        
        const payments = await pool.query("INSERT INTO payment (card_number,expiration_month,expiration_year,security_code, customer_id_fk) VALUES (?,?,?,?,?)", [
          data.card_number, 
          data.expiration_month,
          data.expiration_year,
          data.security_code,
          data.user_id
        ]);
        
        const payment = await pool.query("SELECT * FROM payment WHERE customer_id_fk = ? AND is_deleted = 0", [req.body.user_id]);

      res.json(payment);
    
    
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  });


  app.put("/account/delete_payment/:id", authorize, async (req, res) => {
    try {
      const {id} = req.params;
        const data = req.body;
        console.log("why",data.id)
        
        const payments = await pool.query("UPDATE payment SET is_deleted = 1 WHERE payment_id = ?", [
          id
        ]);

        

       
      res.json("Payment Method deleted");
    
    
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  });


module.exports = app;