CREATE DATABASE arendor;


CREATE TABLE users (
   id uuid PRIMARY KEY DEFAULT 
   uuid_generate_v4(),
   name VARCHAR (255) UNIQUE NOT NULL,
   password VARCHAR (255) NOT NULL,
   email VARCHAR ( 100 ) UNIQUE NOT NULL,
   created_at TIMESTAMP,
   last_login TIMESTAMP,
   photoUrl VARCHAR,
   role VARCHAR
 );
 CREATE TABLE post (
    id SERIAL PRIMARY KEY
    user_id VARCHAR NOT NULL REFERENCES users(id)
    title VARCHAR (100),
    content VARCHAR,
    created_at VARCHAR,
    created_by VARCHAR,
    img_url VARCHAR,
 );

 CREATE TABLE comment (
    id SERIAL PRIMARY KEY,
    content VARCHAR,
    created_at TIMESTAMP,
    created_by VARCHAR,
    user_id VARCHAR NOT NULL REFERENCES users(id),
    post_id VARCHAR NOT NULL REFERENCES post(id)
 );

  CREATE TABLE rating (
     id SERIAL PRIMARY KEY,
     rating INT,
     user_id VARCHAR NOT NULL REFERENCES users(id),
     post_id VARCHAR NOT NULL REFERENCES post(id)
  );
