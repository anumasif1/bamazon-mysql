var mysql = require("mysql");
var inquirer = require("inquirer");
//var Table = require("cli-table");
//var table = new Table();
var customerPick;
var quantityRequired;
var stockRemaining;
var totalCost;

//********************CHALLENGE 1 ******************//

//create the connection information for the sql database
var connection = mysql.createConnection({
    host: "localhost",
    //port, username, password and database name.
    port: 3306,
    user: "root",
    password: "root",
    database: "bamazon_DB"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connections id" + " " + connection.threadId);

    //calling function select all to display the list of items in sql
    selectAll();

    //call askCustomer() to prompt inquirer
    askCustomer();
});


function selectAll() {

    //select entire data from table "product" in bamazon.sql file.
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        console.log(res);
    });
}


function askCustomer() {

    //inquirer to check which product does customer require
    inquirer
        .prompt([
            {
                type: "input",
                name: "productID",
                message: "What is the ID of the product you want to buy?"
            },
            {
                type: "input",
                name: "units",
                message: "How many units of product do you need?"
            }
        ])

        .then(function (customer) {
            customerPick = customer.productID;
            quantityRequired = customer.units;
            //console.log("Product ID:" + " " + customerPick);
            //console.log("Quantity:" + " " + quantityRequired);

            //call readProductID to display the item customer needs
            readProductID();
            // connection.end();

        })
}

function readProductID(customer) {
    //console.log("User's Cart...\n");
    connection.query(
        "SELECT * FROM PRODUCTS WHERE ?",
        {
            item_id: customerPick
        },

        function (err, res) {
            if (err) throw err;
            console.log("item displayed" + customerPick);
            console.log(res);
        }
    );

    //call checkAvailability() to check if required item is in stock and to update it's count if it is.
    checkAvailability();
}

function checkAvailability(customer) {
    //console.log("Checking if item is in stock.")
    connection.query(
        "SELECT * FROM products WHERE ?",
        {
            item_id: customerPick
        },
        function (err, res) {
            if (err) throw err;
            //console.log("item displayed" + customerPick);
            //console.log(res);

            //checking if the item is in stock
            if (quantityRequired <= res[0].stock_quantity) {
                console.log("Your order has been processed!");
                totalCost = res[0].price * quantityRequired;
                console.log("Total Cost:" + " " + "$" + totalCost);

                //calculating the stock quantity after sale
                stockRemaining = res[0].stock_quantity - quantityRequired;

                connection.query(

                    //updating the stock
                    "UPDATE products SET ? WHERE ?",
                    [
                        {
                            stock_quantity: stockRemaining
                        },
                        {
                            item_id: customerPick
                        }
                    ],
                    function (err, res) {
                        if (err) throw err;
                        //console.log("Item updated");
                        //console.log(res);
                    }
                );
            } else {
                console.log("Insufficient Quantity!")
            }
        }

    );
    productSales();
    //connection.end();
}

function productSales(customer) {
    connection.query(
        "SELECT * FROM products WHERE ?",
        {
            item_id: customerPick
        },
        function (err, res) {
            if (err) throw err;
            //console.log("item displayed" + customerPick);
            //console.log(res);

            //checking if the item is in stock
            if (totalCost > 0) {
                console.log("Product Sales = " + " " + totalCost);
                connection.query(

                    //updating the stock
                    "UPDATE products SET ? WHERE ?",
                    [
                        {
                            product_sales: totalCost
                        },
                        {
                            item_id: customerPick
                        }
                    ],
                    function (err, res) {
                        if (err) throw err;
                        //console.log("Item updated");
                        //console.log(res);
                    }
                );
            } else {
                console.log("0 sales")
            }
        }

    );
    //connection.end();
}



//********************CHALLENGE 1 ******************//

