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


app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use(express.static(path.join(__dirname + "/public")));


app.use(cookieParser());

var urlencodedParser = bodyParser.urlencoded({
    extended: true
})


//Routes
app.get('/', route.login);
app.get('/main', route.index);
app.get('/logout', route.logout);
app.get('/signup', route.create);
app.get('/login', route.login);
app.get('/edit', route.edit);
app.post('/create', urlencodedParser, route.createUser);
app.post('/login', urlencodedParser, route.loginUser);



//-End Routes


app.listen(3000);
