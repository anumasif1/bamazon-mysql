var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require('cli-table');


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

    start();
});


function start() {
    inquirer
        .prompt([
            {
                type: "list",
                name: "supervisorOptions",
                message: "What function do you want the app to run?",
                choices: ["View Product Sales by Department", "Create New Department"]
            }
        ]).then(function (supervisor) {
            supervisorFunction = supervisor.supervisorOptions;
            console.log(supervisorFunction);
            var query;
            if (supervisorFunction === "View Product Sales by Department") {
                viewProducts(); 
            } else if (supervisorFunction === "Create New Department"){
                addDepartment();
            }

        });
}

function viewProducts() {
    query = "SELECT departments.departments_id, departments.department_name, departments.over_head_costs, products.product_sales, (products.product_sales-departments.over_head_costs) as total_profit";
    query += " FROM departments INNER JOIN products ON (departments.department_name = products.department_name)";




    //console.log(query);
    connection.query(query,
        function (err, res) {
            var table = new Table({
                head: ['departments_id', "department_name", "over_head_costs", 'product_sales', 'total_profit']
            });
            //console.log(res.length);
            for (var i = 0; i < res.length; i++) {
                table.push([res[i].departments_id, res[i].department_name, res[i].over_head_costs, res[i].product_sales, res[i].total_profit]);
            }
            /*res.foreach(function(data){
                table.push({'Department ID':data.departments_id});
            });*/
            console.log(table.toString());
        });
        start();
}

function addDepartment() {
    //inquirer on the new product and information required for the database
    inquirer
        .prompt([
            {
                name: "department_name",
                type: "input",
                message: "Which department would you like to add?"
            },
            {
                name: "over_head_costs",
                type: "input",
                message: "What is the over head cost?"
            }
        ])
        .then(function (answer) {
            connection.query(
                //insert new product in database products
                "INSERT INTO departments SET?",
                {
                    department_name: answer.department_name,
                    over_head_costs: answer.over_head_costs,
                },
                function (err) {
                    if (err) throw err;
                    console.log("Your department has been added");
                    //Calling start function again for next action 
                    start();
                }
            );
        });
}

