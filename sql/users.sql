DROP TABLE IF EXISTS users;
CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    first VARCHAR NOT NULL CHECK (first != ''),
    last VARCHAR NOT NULL CHECK (last != ''),
    email VARCHAR NOT NULL UNIQUE CHECK (email != ''),
    hashedPass VARCHAR NOT NULL CHECK (hashedPass != ''),
    imageurl VARCHAR(300),
    bio TEXT
);
