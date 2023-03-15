-- migrate:up
ALTER TABLE order_items MODIFY id INT NOT NULL AUTO_INCREMENT;

-- migrate:down

