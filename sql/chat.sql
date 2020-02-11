DROP TABLE IF EXISTS chat;

CREATE TABLE chat(
    message_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) NOT NULL,
    message VARCHAR,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
