const express = require("express");
const app = express();
const compression = require("compression");
const cookieSession = require("cookie-session");
const db = require("./db");
const bcrypt = require("./bcrypt");
const csurf = require("csurf");
const ses = require("./ses");
const cryptoRandomString = require('crypto-random-string');
const secretCode = cryptoRandomString({
    length: 6
});
const s3 = require("./s3");
const { s3Url } = require("./config");
let cookie;

app.use(compression());

app.use(express.json());

app.use(express.static("./public"));

const multer = require("multer");
const uidSafe = require("uid-safe");
const path = require("path");

//// boiler plate for image upload. do not touch
const diskStorage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, __dirname + "/uploads");
    },
    filename: function(req, file, callback) {
        uidSafe(24).then(function(uid) {
            callback(null, uid + path.extname(file.originalname));
        });
    }
});

const uploader = multer({
    storage: diskStorage,
    limits: {
        fileSize: 2097152
    }
});

/////////////////////////////////

app.use(
    cookieSession({
        secret: "I'm always angry",
        maxAge: 1000 * 60 * 60 * 24 * 14
    })
);

app.use(csurf());

app.use(function(req, res, next){
    res.cookie('mytoken', req.csrfToken());
    next();
});

if (process.env.NODE_ENV != "production") {
    app.use(
        "/bundle.js",
        require("http-proxy-middleware")({
            target: "http://localhost:8081/"
        })
    );
} else {
    app.use("/bundle.js", (req, res) => res.sendFile(`${__dirname}/bundle.js`));
}


app.get('/user', function (req, res) {
    let id = req.session.userId;
    console.log("id", id);
    db.
        getUsers(id)
        .then(results => {
            console.log("results: ", results);
            // console.log("first: ", results[0].first);
            res.json({
                id: results[0].id,
                first: results[0].first,
                last: results[0].last,
                email: results[0].email,
                imageUrl: results[0].imageurl || '/skull.png',
                bio: results[0].bio
            });
        })
        .catch(err => {
            console.log("error in get user: ", err);
        });
});

app.get("/welcome", function(req, res) {
    if (req.session.userId) {
        res.redirect("/");
        console.log("user typed /welcome");
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});

app.post("/register", function(req, res) {
    console.log("req.body.first: ", req.body.first);
    console.log("req.body.last: ", req.body.last);
    console.log("req.body.email: ", req.body.email);
    console.log("req.body.password: ", req.body.password);

    let first = req.body.first;
    let last = req.body.last;
    let email = req.body.email;
    let password = req.body.password;
    let hashedPass;
    cookie = req.session;

    bcrypt
        .hash(password)
        .then(hashPass => {
            console.log("hashPass: ", hashPass);
            hashedPass = hashPass;
            return hashedPass;
        })
        .then(hash => {
            console.log(hash);
            return db.addUsers(first, last, email, hashedPass);
        })
        .then(results => {
            console.log("results: ", results);
            cookie.userId = results.rows[0].id;
            console.log("cookie.userId: ", cookie.userId);
            res.json({ success: true });
        })
        .catch(err => {
            console.log("err: ", err);
            res.json({ success: false });
        });
});

app.post("/login", (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    cookie = req.session;

    db
        .getUsersEmail(email)
        .then(results => {
            console.log("results: ", results);
            if (results.rows.length > 0) {
                bcrypt
                    .compare(password, results.rows[0].hashedpass)
                    .then(comparison => {
                        console.log("comparison:", comparison);
                        if (comparison) {
                            cookie.userId = results.rows[0].id;
                            res.json({ success: true });
                        } else {
                            console.log("comparison failed");
                            res.json({ success: false });
                        }
                    });
            } else {
                console.log("email not found");
                res.json({ success: false });
            }
        })
        .catch(err => {
            console.log("err: ", err);
            res.json({ success: false });
        });
});

app.post("/reset/start", (req, res) => {
    let email = req.body.email;
    let recipient = email;
    let message = "Your secret code: " + secretCode;
    let subject = "Social Network secret code";
    console.log("req.body: ", req.body);
    console.log("secretCode: ", secretCode);
    console.log("message: ", message);
    console.log("recipient", recipient);
    console.log("subject: ", subject);

    db.
        getUsersEmail(email)
        .then(results => {
            console.log("results from getUsersEmail: ", results);
            if (results.rows.length > 0) {
                ses.
                    sendEmail(recipient, message, subject);
                db.
                    addCode(email, secretCode);
                res.json({ success: true });
            } else {
                console.log("email not found");
                res.json({ success: false });
            }
        }).catch(err => {
            console.log("err: ", err);
            res.json({ success: false });
        });
});

app.post("/reset/update", (req, res) => {
    console.log("req.body in /reset/start: ", req.body);
    let email = req.body.email;
    let code = req.body.secretCode;
    let password = req.body.newPassword;
    let hashedPass;

    db
        .getCode(email)
        .then(results => {
            console.log("results from getCode: ", results);
            if (!results.length > 0) {
                console.log("email not found");
                res.json({ success: false });
            } else {
                console.log("code from results: ", results[0].code);
                if (results[0].code !== code) {
                    console.log("code doesn't match");
                    res.json({ success: false });
                } else {
                    bcrypt
                        .hash(password)
                        .then(hashPass => {
                            console.log("new hashPass: ", hashPass);
                            hashedPass = hashPass;
                            return hashedPass;
                        })
                        .then(hash => {
                            console.log(hash);
                            db.updateUsersPass(email, hashedPass).then(() => {
                                res.json({ success: true });
                            }).catch(err => {
                                console.log("err: in updateUsersPass", err);
                                res.json({ success: false });
                            });
                        })
                        .catch(err => {
                            console.log("err: ", err);
                            res.json({ success: false });
                        });
                }
            }
        });
});

app.post("/upload", uploader.single("file"), s3.upload, (req, res) => {
    let imageUrl = s3Url + req.file.filename;
    let id = req.session.userId;
    console.log("id: ", id);
    console.log("imageUrl: ", imageUrl);

    db.
        updateProfilePic(id, imageUrl).then(results => {
            console.log("upload results", results);
            res.json({
                newPic: imageUrl
            });
        })
        .catch(err => {
            console.log("error in upload", err);
        });
});

app.post("/bio", function(req, res) {
    let id = req.body.id;
    let bio = req.body.bio;
    console.log("req.body in bio post", req.body);
    console.log("id in bio", id);
    console.log("bio in bio", bio);
    db.
        updateBio(id, bio).then(results => {
            console.log("bio results", results[0].bio);
            res.json({
                newBio: results[0].bio
            });
        }).catch(err => {
            console.log("error in bio", err);
        });
});


app.get("/api/user/:id", function (req, res) {
    console.log("req.params: ", req.params);
    let id = req.params.id;
    console.log("id: ", id);
    db.
        getUsers(id)
        .then(results => {
            // let userId = req.session.userId;
            console.log("userd in other profile: ", req.session.userId);
            console.log("results is get other users: ", results);
            console.log("first in other users: ", results[0].first);
            console.log("last in other users: ", results[0].last);
            console.log("imageUrl in other users: ", results[0].imageurl);
            console.log("bio in other users: ", results[0].bio);
            res.json({
                first: results[0].first,
                last: results[0].last,
                imageUrl: results[0].imageurl || '/skull.png',
                bio: results[0].bio,
                userId: req.session.userId
            });
        }).catch(err => {
            console.log("error in get other user: ", err);
        });
});

//
// this route must always be the last one

app.get("*", function(req, res) {
    if (!req.session.userId) {
        res.redirect("/welcome");
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});

app.listen(8080, function() {
    console.log("I'm listening.");
});
