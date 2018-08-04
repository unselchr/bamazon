CREATE DATABASE IF NOT EXISTS bamazon;

USE bamazon;

CREATE TABLE IF NOT EXISTS products(
	item_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    product_name VARCHAR(20) NOT NULL,
    department_name VARCHAR(20) NOT NULL,
    price DECIMAL(7,2),
    stock_quantity INT
);
INSERT INTO products (product_name,department_name,price,stock_quantity)
VALUES
	("hat","clothing",10,3),
    ("shirt","clothing",15,7),
    ("Halo","games",60,3),
    ("Skyrim","games",60,7),
    ("laptop","electronics",300,4),
    ("TV","electronics",250,5),
    ("4K monitor","electronics",350,1),
    ("belt","clothing",5,7),
    ("chair","furniture",150,3),
    ("table","furniture",400,2);

SELECT * FROM products;