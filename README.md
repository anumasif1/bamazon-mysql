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


**Bamazon Customer**


