# bamazon-mysql
Bamazon is a shopping app based on Amazon concept. It will take in orders from customers and deplete stock from the store's inventory using MySQL, Node.js and Inquirer.

**Node Packages used for this program:**
* Inquirer
* CLI-Table
* MySql

This app consists of three files for following users:
* Customer
* Manager
* Supervisor

Database is created and updated in MySql file bamazon.sql which is then connected to all three js files. 

![bamazonCustomer.js in Terminal](bamazon-customer.png)

```ruby
DROP DATABASE IF EXISTS bamazon_DB;
CREATE DATABASE bamazon_DB;
USE bamazon_DB;
CREATE table products(
item_id INT NOT NULL auto_increment,
product_name varchar(50) NOT NULL,
department_name varchar(50) NOT NULL,
price INT not null,
stock_quantity int not null,
PRIMARY KEY (item_id)
);
INSERT into products( product_name, department_name, price, stock_quantity)
VALUES 
--products entries goes here--
Select * from products;

CREATE table departments(
departments_id INT NOT NULL auto_increment,
department_name varchar(50) NOT NULL,
over_head_costs INT not null,
primary key (departments_id)
);

select * from departments;
```
It is then connected to all js files using standard method.

```ruby

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

    //calling function select all (defined below) to display the list of items in sql.
    selectAll();

    //call askCustomer()  (defined below) to prompt inquirer
    askCustomer();
});
```

**Bamazon Customer**
BamazonCustomer.js first displays the products database in terminal and then prompt inquirer to check what product would customer like to buy and how many units:

**Function SelectAll();**
```ruby

function selectAll() {

    //select entire data from table "product" in bamazon.sql file.
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        console.log(res);
    });
}
```

**Function askCustomer();**
```ruby
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
```
Once user selects the product and id the code then check for the item in sql database. It will process the order if the item is in stock, update the inventory in database and run message "Your order has been processed". In case product is out of strock, it will run message "Insufficient Quantity!".

```ruby

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
```

```ruby

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
}
```
Once the order is processed the code then calculates and display the total cost of the purchase. It is then updated in products database altered column "product_Sales"

'''ruby

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
 }
 ```

 ** bamazonCustomer.js in terminal**







