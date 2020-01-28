const express = require("express");
const app = express();
const compression = require("compression");
const cookieSession = require("cookie-session");
const db = require("./db");
const bcrypt = require("./bcrypt");
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
