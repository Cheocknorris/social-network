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
         DO UPDATE SET code =$2,
         created_at = now()`,
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

exports.updateUsersPass = function(email, password) {
    return db.query(
        `UPDATE users SET hashedpass =$2
        WHERE email = $1`,
        [email, password]
    );
};

exports.getUsers = function(id) {
    return db.query(
        `SELECT * FROM users WHERE id=$1`, [id]
    )
        .then(({ rows }) => rows);
};

exports.updateProfilePic = function(id, imageurl) {
    return db.query(
        `UPDATE users SET imageurl = $2
        WHERE id = $1
        returning imageurl`,
        [id, imageurl]
    ).then(({ rows }) => rows);
};

exports.updateBio = function(id, bio) {
    return db.query(
        `UPDATE users SET bio = $2
        WHERE id = $1
        returning bio`,
        [id, bio]
    ).then(({ rows }) => rows);
};

exports.getLatestUsers = function() {
    return db
        .query(`SELECT id, first, last, imageurl FROM users ORDER BY id DESC LIMIT 3`)
        .then(({ rows }) => rows);
};


exports.getUserToSearch = function(userToSearch) {
    return db.query(
        `SELECT id, first, last, imageurl FROM users WHERE first ILIKE $1;`,
        [userToSearch + '%']
    ).then(({ rows }) => rows);
};

exports.getFriendsStatus = function(recipientId, senderId) {
    return db.query(
        `SELECT * FROM friendships
        WHERE (recipient_id = $1 AND sender_id = $2)
        OR (recipient_id = $2 AND sender_id = $1);`,
        [recipientId, senderId]
    ).then(({ rows }) => rows);
};

exports.sendRequest = function(senderId, recipientId) {
    return db.query(
        `INSERT into friendships (sender_id, recipient_id)
        VALUES ($1, $2)
        returning accepted`,
        [senderId, recipientId]
    );
};

exports.acceptRequest = function(senderId, recipientId) {
    return db.query(
        `UPDATE friendships
        SET accepted = true
        WHERE sender_id = $1 AND recipient_id = $2`,
        [senderId, recipientId]
    );
};

exports.endFrienship = function(senderId, recipientId) {
    return db.query(`DELETE FROM friendships
        WHERE (sender_id = $1 AND recipient_id = $2)
            OR (recipient_id = $1 AND sender_id = $2);`,
    [senderId, recipientId]
    );
};


exports.getFriendsWannabes = function(recipientId) {
    return db.query(`SELECT users.id, first, last, imageurl, accepted
      FROM friendships
      JOIN users
      ON (accepted = false AND recipient_id = $1 AND sender_id = users.id)
      OR (accepted = true AND recipient_id = $1 AND sender_id = users.id)
      OR (accepted = true AND sender_id = $1 AND recipient_id = users.id);`,
    [recipientId]
    );
};
