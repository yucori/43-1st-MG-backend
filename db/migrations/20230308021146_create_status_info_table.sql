-- migrate:up
CREATE TABLE status_info (
 id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
 title VARCHAR(200) NOT NULL
);

-- migrate:down
DROP TABLE status_info;
