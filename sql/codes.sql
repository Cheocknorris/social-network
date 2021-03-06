DROP TABLE IF EXISTS codes;

CREATE TABLE codes(
    id SERIAL PRIMARY KEY,
    email VARCHAR NOT NULL UNIQUE CHECK (email != ''),
    code VARCHAR NOT NULL UNIQUE CHECK (code != ''),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
