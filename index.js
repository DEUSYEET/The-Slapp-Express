const express = require("express");
const pug = require("pug");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt-nodejs")
const expressSession = require("express-session");
const cookieParser = require("cookie-parser");
const path = require("path");
const route = require("./routes/routes.js");
const bodyParser = require('body-parser')

const app = express();

const checkAuth = (req, res, next) => {
    console.log(req.session.user);
    if(req.session.user && req.session.user.isAuthenticated) {
        next();
    } else {
        res.redirect('/login');
    }
}

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use(express.static(path.join(__dirname + "/public")));
app.use(cookieParser());
app.use(expressSession({
    secret: 'mY53cr3tPa$$word45',
    saveUninitialized: true,
    resave: true
}))

var urlencodedParser = bodyParser.urlencoded({
    extended: true
});

//Routes
app.get('/', route.login);
app.get('/index', checkAuth, route.index);
app.get('/logout', route.logout);
app.get('/create', route.create);
app.post('/create', urlencodedParser, route.createUser);
app.post('/login', urlencodedParser, route.loginUser);

//-End Routes


app.listen(3000);
