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
let cookie;

app.use(compression());

app.use(express.json());

app.use(express.static("./public"));

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
    cookie = req.session;
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
            }
        }).catch(err => {
            console.log("err: ", err);
            res.json({ success: false });
        });


    // db
    //     .getUsersEmail(email)
    //     .then(results => {
    //         console.log("results: ", results);
    //         if (results.rows.length > 0) {
    //             bcrypt
    //                 .compare(password, results.rows[0].hashedpass)
    //                 .then(comparison => {
    //                     console.log("comparison:", comparison);
    //                     if (comparison) {
    //                         cookie.userId = results.rows[0].id;
    //                         res.json({ success: true });
    //                     } else {
    //                         console.log("comparison failed");
    //                         res.json({ success: false });
    //                     }
    //                 });
    //         } else {
    //             console.log("email not found");
    //             res.json({ success: false });
    //         }
    //     })
    //     .catch(err => {
    //         console.log("err: ", err);
    //         res.json({ success: false });
    //     });
});

// this route must always must be the last one

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
