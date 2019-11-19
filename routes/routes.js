var mongoose = require('mongoose');
const bcrypt = require("bcrypt-nodejs");
var totallySecure;
var currentdate = new Date();
var dateString = ((currentdate.getMonth() + 1) + "_" + currentdate.getDate() + "_" + currentdate.getFullYear());

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/data');

var mdb = mongoose.connection;
mdb.on('error', console.error.bind(console, 'connection error:'));
mdb.once('open', function (callback) {

});

const makeHash = theStr =>{
    bcrypt.hash(theStr, null, null, (err,hash)=>{
        totallySecure = hash;
    });
}

var userSchema = mongoose.Schema({
    username: String,
    password: String,
    email: String,
    age: String,
    ans1: String,
    ans2: String,
    ans3: String,
});


var User = mongoose.model('User_Collection', userSchema);

exports.index = (req, res) => {
    User.findOne({}, (err,user) => {
        if(err) {
            console.log(err);
            res.redirect('login');
        }
        res.cookie('lastVisit', dateString);
        res.render('index',{
            currentUser:user,
            lastVisit:req.cookies.lastVisit
        });
    });
};

exports.login = (req, res) => {
    res.render('login');
};


exports.create = (req, res) => {
    res.render('signup', {
        title: 'Add Person'
    });
};


exports.createUser = (req, res) => {
    makeHash(req.body.password);
    var user = new User({
        username: req.body.username,
        password: totallySecure,
        email: req.body.email,
        age: req.body.age,
        ans1: req.body.questionOne,
        ans2: req.body.questionTwo,
        ans3: req.body.questionThree
    });
    user.save((err, user) => {
        if (err) return console.error(err);
        console.log(req.body.username + ' added');
    });
    res.redirect('/');
};

exports.logout = (req, res) => {
    req.session.destroy(err =>{
        if (err) {
            console.log(err);
        } else {
            res.redirect('login');
        }
    });
}

// exports.edit = (req,res)=>{
//     res.render('infoUpdate', {
//         person: 
//     })
// }

exports.editUser = (req, res) => {
    User.findOne({
        name: req.params.name
    }, (err, user) => {
        if (err) {
            return console.error(err)
        }
        
        user.username = req.body.username,
        user.password = req.body.password,
        user.email = req.body.email,
        user.age = req.body.age,
        user.ans1 = req.body.ans1,
        user.ans2 = req.body.ans2,
        user.ans3 = req.body.ans3,
        user.save((err, user) => {
            if (err) {
                return console.error(err)
            }
            console.log(req.body.username + ' added');
        });
    });
    res.redirect('login');
};


exports.passVerify = (req,res)=>{
    User.findOne({'username':req.body.username, 'password':req.body.password});
    
}