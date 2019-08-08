var mysql = require("mysql");
var inquirer = require("inquirer");
var managerFunction;


//********************CHALLENGE 2 ******************//

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
});

//call function start to prompt question from manager on what he wants the app to do.
start();

function start() {
    inquirer
        .prompt([
            {
                type: "list",
                name: "managerOptions",
                message: "What function do you want the app to run?",
                choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]
            }
        ]).then(function (manager) {
            managerFunction = manager.managerOptions;
            console.log(managerFunction);

            if (managerFunction === "View Products for Sale") {
                viewProducts();
            }
            else if (managerFunction === "View Low Inventory") {
                lowInventory();
            }
            else if (managerFunction === "Add to Inventory") {
                addInventory();
            }
            else if (managerFunction === "Add New Product") {
                addProduct();
            }
        });
}

function viewProducts(manager) {
    //select and display entire data from table "product" in bamazon.sql file.
    connection.query("SELECT * FROM products",
        function (err, res) {
            if (err) throw err;
            console.log("\n Database of products for sale \n");
            console.log(res);
        });
    //Calling start function again for next action 
    start();
}

function lowInventory() {
    //displaying products less than 5 in quantity
    connection.query('SELECT * FROM products WHERE stock_quantity < 5',
        function (err, res) {
            if (err) throw err;
            console.log('\n  All products with quantity lower than 5 \n');
            console.log(res);
        })

     //Calling start function again for next action 
     start();
}

function addInventory() {
    //inquirer to confirm product ID and quantity to be updates
    inquirer
        .prompt([
            {
                type: "input",
                name: "productID",
                message: "Please enter ID of the product to change it's inventory!"
            },
            {
                type: "input",
                name: "quantity",
                message: "How much quantity do you have?"
            }
        ])
        .then(function (answer) {
            //update the quantity on database
            connection.query(
                "UPDATE products SET ? WHERE ?",
                [
                    {
                        stock_quantity: answer.quantity
                    },
                    {
                        item_id: answer.productID
                    }
                ],
                function (err) {
                    if (err) throw err;
                    console.log("\n Inventory has been updated! \n");

                     //Calling start function again for next action 
                    start();
                }
            )
        })
}


function addProduct() {
    //inquirer on the new product and information required for the database
    inquirer
        .prompt([
            {
                name: "item",
                type: "input",
                message: "What is the product you would like to sell?"
            },
            {
                name: "department",
                type: "input",
                message: "Which department would you like to place your product in?"
            },
            {
                name: "price",
                type: "input",
                message: "What is the price of the product?"
            },
            {
                name: "quantity",
                type: "input",
                message: "How much quantity of the product do you have in stock?"
            }
        ])
        .then(function (answer) {
            connection.query(
                //insert new product in database products
                "INSERT INTO products SET?",
                {
                    product_name: answer.item,
                    department_name: answer.department,
                    price: answer.price,
                    stock_quantity: answer.quantity
                },
                function (err) {
                    if (err) throw err;
                    console.log("Your product has been added");
                     //Calling start function again for next action 
                    start();
                }
            );
        });
}


