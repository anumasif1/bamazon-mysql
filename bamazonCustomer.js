var mysql = require("mysql");
// var inquirer = require("inquirer");

//create the connection information for the sql database
var connection = mysql.createConnection({
    host: "localhost",
    //port, username, password and database name.
    port: 3306,
    user: "root",
    password: "root",
    database: "bamazon_DB"
});

function selectAll(){
    connection.query("SELECT * FROM products", function (err, res){
        if (err) throw err;
        console.log(res);
    });
}

connection.connect(function(err){
    if(err) throw err;
    console.log("connections id"+ " " + connection.threadId);
    connection.end();
    // createProduct();
});

selectAll();
// connect to the mysql server and sql database
// connection.connect(function(err){
//     if (err) throw err;
//     //calling readProducts to display all the products in database

//     // readProducts();
// });

// function readProducts(){
//     console.log("Selecting all products....\n");
//     connection.query("SELECT * FROM products", function (err,res){
//         if (Err) throw err;

//         //log all the results of select statement
//         console.log(res);
//         connection.end();
//     });
// }


