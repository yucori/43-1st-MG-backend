-- migrate:up
CREATE TABLE orders (
 id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
 user_id INT NOT NULL,
 order_number VARCHAR(100) NOT NULL,
 address_id INT NULL,
 delivery_request VARCHAR(2000),
 created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
 updated_at TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,
 status_info_id INT NOT NULL,
 CONSTRAINT orders_user_id_fk FOREIGN KEY (user_id) REFERENCES users (id),
 CONSTRAINT orders_address_id_fk FOREIGN KEY (address_id) REFERENCES address_book (id),
 CONSTRAINT orders_status_info_id_fk FOREIGN KEY (status_info_id) REFERENCES status_info (id)
);

-- migrate:down
DROP TABLE orders;
