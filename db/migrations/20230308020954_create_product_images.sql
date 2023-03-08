-- migrate:up
CREATE TABLE product_images (
 id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
 url VARCHAR(2000),
 product_id INT NOT NULL,
 created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
 updated_at TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,
 CONSTRAINT product_images_fk FOREIGN KEY (product_id) REFERENCES products (id)
);

-- migrate:down
DROP TABLE product_images;
