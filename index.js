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

var urlencodedParser = bodyParser.urlencoded({
    extended: true
})


//Routes
app.get('/', route.index);
app.get('/create', route.create);
app.post('/create', urlencodedParser, route.createUser);

//-End Routes



app.listen(3000);