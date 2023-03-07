-- migrate:up
CREATE TABLE discount_ratio (
 quantity INT NOT NULL PRIMARY KEY,
 ratio FLOAT NOT NULL,
 created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
 updated_at TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP
);

-- migrate:down
DROP TABLE discount_ratio;
