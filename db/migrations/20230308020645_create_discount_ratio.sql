-- migrate:up
CREATE TABLE discount_ratio (
 id INT NOT NULL PRIMARY KEY,
 quantity INT NOT NULL,
 ratio DECIMAL(6, 2) NOT NULL,
 created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
 updated_at TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP
);

-- migrate:down
DROP TABLE discount_ratio;
