const app = require('express').Router();
const pool = require("../services/db")

// create an item
app.post("/create_item", async (req, res) => {
    try {
      const data  = req.body;
      console.log(data);
      const newItem = await pool.query("INSERT INTO item(name, manufacture_cost, selling_price, category, brand) VALUES ( ?, ?, ?, ?, ?)",
       [data.name, 
        data.manufacture_cost,
        data.selling_price,
        data.category,
        data.brand
      ] );
      
      res.json("A new item was added. Success");
    }catch (err){
      console.log(err.message);
    }
  });

  // get all items
app.get("/view_all_items", async (req, res) => {
    try {
      const all_items = await pool.query("SELECT * FROM item");
  
      res.json(all_items);
    }catch (err) {
      console.log(err.message);
    }
  })

  // get item by id
app.get("/item/:item_id", async (req, res) => {
    try {
  
      const {item_id} = req.params;
  
      const item_by_id = await pool.query("SELECT * FROM item WHERE item_id = ?", [item_id]);
  
      res.json(item_by_id);
    }catch (err) {
      console.log(err.message);
    }
  })

  // get items by category
app.get("/item/:category", async (req, res) => {
    try {
  
      const {category} = req.params;
  
      const items_by_category = await pool.query("SELECT * FROM item WHERE category = ?", [category]);
  
      res.json(items_by_category);
    }catch (err) {
      console.log(err.message);
    }
  })

  // get items by search (name)
app.get("/item/:name", async (req, res) => {
    try {
  
      const {name} = req.params;
  
      const items_by_name = await pool.query("SELECT * FROM item WHERE name = ?", [name]);
  
      res.json(items_by_name);
    }catch (err) {
      console.log(err.message);
    }
  })

  // update an item
app.put("/item/:item_id", async (req, res) => {
    try {
      const {item_id} = req.params;
      const data  = req.body;

      const updateItem = await pool.query("UPDATE item SET name = ?, manufacture_cost = ?, selling_price = ?, category = ?, selling_price = ? WHERE item_id = ?" , 
      [ data.name,
        data.manufacture_cost,
        data.selling_price,
        data.category,
        data.selling_price,
        item_id
      ]);
      
      res.json("Item was updated successfully!");
    }catch (err) {
      console.log(err.message);
    }
});

module.exports = app;