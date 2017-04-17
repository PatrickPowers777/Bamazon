var mysql = require("mysql");
var inquirer = require("inquirer");
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  user: "root",

  password: "Siren_song123",
  database: "Bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
});


var start = function() {
  inquirer.prompt({
    name: "buyItem",
    type: "list",
    message: "Would you like to buy an item from the store?",
    choices: ["YES", "NO"]
      }).then(function(answer) {
  	if (answer.buyItem.toUpperCase() === "YES") {
  		buyItem();
  	}
   		else{
   			console.log("Sorry. Come back when you would like to purchase something.")
   			end();
   		}
    });
  }



var buyItem = function() {
  inquirer.prompt([{
    name: "item",
    type: "list",
    message: "Which item would you like to buy?",
    choices: ["1", "2", "3", "4", "5"]
  },  {
    name: "howMany",
    type: "input",
    message: "How many?",
    validate: function(value) {
      if (isNaN(value) === false) {
        return true;
      }
      return false;
    }
  }]).then(function(answer) {
    connection.query("INSERT INTO product VALUES ?", {
      item_id: answer.item,
    }, function(err) {
      if (err) throw err;

      start();
    });
  });
};

var soldOut = function() {
  connection.query("SELECT * FROM product", function(err, results) {
    
      }
}

start();