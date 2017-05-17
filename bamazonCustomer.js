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

var wallet = 2000;

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
        process.exit();
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
 
  		}]).then(function(answer) {

	    		connection.query("SELECT stock_quantity, price FROM product WHERE item_id = " + answer.item + ";", 
	    			function(err, res) {

	      				if (err) throw err;
	      				var totalAmount = res[0].stock_quantity;
                var priceTracker = function(){
                  var transaction = wallet - res[0].price;
                  wallet = transaction;
                  console.log("Your item was " + res[0].price + " dollars");
                  console.log("You have " + wallet + " dollars left");
                  console.log("There are " + res[0].stock_quantity + " items left");
                }
                
                if(wallet >= res[0].price){
                  priceTracker();
                } else {
                  console.log ("sorry, you don't have enough money.");
                }

	      				if(answer.howMany > totalAmount){
	      					console.log("Sorry we don't have that many");
	      					start();
	      				} else{


	      					var newAmount = parseInt(totalAmount) - parseInt(answer.howMany);

	      					connection.query("UPDATE product SET stock_quantity = " + 
	      						newAmount +" WHERE item_id = " + answer.item + ";", function(error, result){

	      							if(error) throw error;

                      start();
	      						})
	      				
                }

              
    				});
        });
  		};



start();