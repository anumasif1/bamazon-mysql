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
("Philips XL Airfryer", "Appliances", 560,120);

Select * from products;



