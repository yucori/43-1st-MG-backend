-- migrate:up
CREATE TABLE cart (
 id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
 user_id INT NOT NULL,
 product_id INT NULL,
 quantity INT NULL,
 CONSTRAINT cart_product_id_fk FOREIGN KEY (product_id) REFERENCES products (id),
 CONSTRAINT cart_user_id_fk FOREIGN KEY (user_id) REFERENCES users (id)
);

-- migrate:down
DROP TABLE cart;

