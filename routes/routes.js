var mongoose = require('mongoose');
const bcrypt = require("bcrypt-nodejs");
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/data');
var passHash = '';

var mdb = mongoose.connection;
mdb.on('error', console.error.bind(console, 'connection error:'));
mdb.once('open', function (callback) {

});

const makeHash = theStr =>{
    bcrypt.hash(theStr, null, null, (err,hash)=>{
        passHash = hash;
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
    User.findOne({'age':'420'},(err,user)=>{
        if(err){
            return console.error(err);
        }
        res.render('index',{
            currentUser:user
        });
        // console.log(user);
    })
};

exports.login = (req, res) => {
    res.render('login', {
        title: 'Login'
    });
}

exports.create = (req, res) => {
    res.render('signup', {
        title: 'Add Person'
    });
};


exports.createUser = (req, res) => {
    makeHash(req.body.Username);
    console.log(passHash);
    var user = new User({
        username: req.body.username,
        password: passHash,
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
    res.redirect('/');

};


exports.passVerify = (req,res)=>{
    User.findOne({'username':req.body.username})

}
