// Import the ORM to create functions that will interact with the database.
var orm = require("../config/orm.js");

//Using the functions from orm.js and inserting 'burgers' table in place of the table parameter
var burger = {
  all: function(cb) {
    orm.selectAll("burgers", function(res) {
      cb(res);
    });
  },
  update: function(objColVals, condition, cb) {
    orm.updateOne("burgers", objColVals, condition, function(res) {
      cb(res);
    });
  },
  create: function(cols, vals, cb) {
    orm.insertOne("burgers", cols, vals, function(res) {
      cb(res);
    });
  }
};
// Export the database functions for the controller (burgers_ontroller.js).
module.exports = burger;