-- migrate:up
ALTER TABLE users ADD CONSTRAINT phone_number_unique UNIQUE KEY (phone_number);

-- migrate:down
ALTER TABLE users DROP CONSTRAINT phone_number_unique;
