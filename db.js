const spicedPg = require("spiced-pg");

const db = spicedPg(
    process.env.DATABASE_URL ||
        "postgres:postgres:postgres@localhost:5432/socialnetwork"
);

exports.addUsers = function(first, last, email, hashedPass) {
    return db.query(
        `INSERT INTO users (first, last, email, hashedPass)
        VALUES ($1, $2, $3, $4)
        returning id`,
        [first, last, email, hashedPass]
    );
};
