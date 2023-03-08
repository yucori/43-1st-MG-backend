-- migrate:up
CREATE TABLE products (
 id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
 name VARCHAR(200) NOT NULL,
 quantity INT NULL,
 stock INT NOT NULL DEFAULT 0,
 price DECIMAL(12, 2) NOT NULL DEFAULT 0,
 thumbnail VARCHAR(2000),
 category_id INT NOT NULL,
 created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
 updated_at TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,
 CONSTRAINT products_category_id_fk FOREIGN KEY (category_id) REFERENCES categories (id)
);

-- migrate:down
DROP TABLE products;
