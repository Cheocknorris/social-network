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

exports.getUsersEmail = function(email) {
    return db.query(`SELECT * FROM users WHERE email=$1`, [email]);
};

exports.addCode = function(email, code) {
    return db.query(
        `INSERT INTO codes (email, code)
         VALUES ($1, $2)
         ON CONFLICT (email)
         DO UPDATE SET code =$2`,
        [email, code]
    );
};

exports.getCode = function(email) {
    return db.query(
        `SELECT code FROM codes WHERE email=$1`,
        [email]
    )
        .then(({ rows }) => rows);
};

exports.updateUsersPass = function(email, hashedPass) {
    return db.query(
        `UPDATE users
        hashedPass = $2
        WHERE email = $1`,
        [email, hashedPass]
    );
};
