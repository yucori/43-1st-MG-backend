-- migrate:up
CREATE TABLE address_book (
 id int NOT NULL AUTO_INCREMENT,
 user_id int NOT NULL,
 place_name varchar(200) NOT NULL,
 name varchar(200) NOT NULL,
 address varchar(3000) NOT NULL,
 phone_number varchar(200) NOT NULL,
 created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
 updated_at TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,
 PRIMARY KEY (id,user_id),
 CONSTRAINT address_book_user_id_fk FOREIGN KEY (user_id) REFERENCES users (id)
);

-- migrate:down
DROP TABLE address_book;
