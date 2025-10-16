DROP DATABASE IF EXISTS MyCo;
CREATE DATABASE MyCo;
USE MyCo;

DROP TABLE IF EXISTS sales_orders;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS customers;

CREATE TABLE customers (
  id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
  fullname VARCHAR(255),
  addressline VARCHAR(255)
);

INSERT INTO customers (fullname,addressline) VALUES ('Tony Stark','10880 Malibu Point,90265');
INSERT INTO customers (fullname,addressline) VALUES ('Natasha Romanoff','Stalingrad, Russia');
INSERT INTO customers (fullname,addressline) VALUES ('Scott Lang','840 Winter Street');
INSERT INTO customers (fullname,addressline) VALUES ('Bruce Banner','Rio de Janeiro');
INSERT INTO customers (fullname,addressline) VALUES ('Carol Danvers','Rambeau Residence');


CREATE TABLE products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  prod_name VARCHAR(255),
  brand VARCHAR(255),
  price DECIMAL(10,2)
);

INSERT INTO products (prod_name,brand,price) VALUES ('Samsung Galaxy Z Fold3','Samsung','998.0');
INSERT INTO products (prod_name,brand,price) VALUES ('Samsung Galaxy Z Flip3','Samsung','398.0');
INSERT INTO products (prod_name,brand,price) VALUES ('Apple iPhone 12','Apple','98.0');
INSERT INTO products (prod_name,brand,price) VALUES ('Apple iPhone 12 Pro Max','Apple','698.0');
INSERT INTO products (prod_name,brand,price) VALUES ('Huawei Mate 40 Pro','Huawei','188.0');


CREATE TABLE sales_orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  customer_id INT,
  product_id INT,
  sales_order_date DATE,
  FOREIGN KEY (customer_id) REFERENCES customers(id)
);

INSERT INTO sales_orders (customer_id, product_id, sales_order_date) VALUES ('1' , '1', '20210101');
INSERT INTO sales_orders (customer_id, product_id, sales_order_date) VALUES ('1' , '3', '20210303');
INSERT INTO sales_orders (customer_id, product_id, sales_order_date) VALUES ('2' , '5', '20210505');
