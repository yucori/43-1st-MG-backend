-- migrate:up
ALTER TABLE products ADD description VARCHAR(3000) NULL AFTER name

-- migrate:down

