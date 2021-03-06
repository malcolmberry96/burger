//import express and express.Router middleware to create get, put, and post paths
var express = require("express");

var router = express.Router();
//import burger.js functions
var burger = require("../models/burgers.js");

//Main page loads the data in the burgers table
router.get("/", function(req, res) {
    burger.all(function(data) {
      var hbsObject = {
        burgers: data
      };
      res.render("index", hbsObject);
    });
  });

//Add a new burger 
router.post("/api/burgers/create", function (req, res) {
    burger.insertOne(req.body.burger_name, function() {
        res.redirect("/index");
    });
});
  
//PUT route updates the 'devoured' column to 'true'
router.put("/api/burgers/:id", function(req, res) {
var condition = "id = " + req.params.id;
console.log("condition", condition);
    burger.update({
        devoured: req.body.devoured
    }, condition, function(result) {
            if (result.changedRows == 0) {
                // If no rows were changed, then the ID must not exist, so 404
                return res.status(404).end();
                } 
            else {
                res.status(200).end();
            }
        });
    });

//POST route takes the user's inputted burger and adds it to the 'burgers' table
router.post("/api/burgers", function(req, res) {
    burger.create([
        "burger_name"
    ], [
        req.body.burger_name
    ], function(result) {
        // Send back the ID of the new quote
        res.json({ id: result.insertId });
    });
});
  
//exports router so server can have access
module.exports = router;