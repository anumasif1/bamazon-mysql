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
("Wing Chair", "Furniture", 750, 15), 
("Coffee Table", "Furniture", 300, 20), 
("Nightstand", "Furniture", 250, 25), 
("Twix Bars", "Grocery", 4.5, 350), 
("Lays Family Pack", "Grocery", 5, 500), 
("Truck", "Toys",  24, 50), 
("Jumpsuit", "Clothing", 65, 30), 
("Denim Leggings", "CLothing", 80, 400), 
("Samsung 65inch TV", "Electronics", 1100, 45), 
("Philips XL Airfryer", "Appliances", 560,120),
("Lego Set", "Toys", 150, 3),
("Basketball", "Sports", 35, 2);

Select * from products;

CREATE table departments(
departments_id INT NOT NULL auto_increment,
department_name varchar(50) NOT NULL,
over_head_costs INT not null,
primary key (departments_id)
);

select * from departments;


ALTER TABLE products
ADD COLUMN product_sales INT NOT NULL DEFAULT 0;
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'root';

SELECT 
    departments.departments_id,
    departments.department_name,
    departments.over_head_costs,
    products.product_sales,
    (products.product_sales - departments.over_head_costs) AS total_profit
FROM
    departments
        INNER JOIN
    products ON (departments.department_name = products.department_name);

SELECT * FROM departments;

select * from products;

insert into departments
(department_name, over_head_costs)
values ('Furniture',1000),
('Grocery', 1500),
('Clothing', 1200)


```

**Bamazon Customer**


