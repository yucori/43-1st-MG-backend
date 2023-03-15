-- migrate:up
ALTER TABLE users ADD CONSTRAINT email_unique UNIQUE KEY (email);

-- migrate:down
ALTER TABLE users DROP CONSTRAINT email_unique;
