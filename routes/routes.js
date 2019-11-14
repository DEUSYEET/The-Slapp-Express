var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/data');

var mdb = mongoose.connection;
mdb.on('error', console.error.bind(console, 'connection error:'));
mdb.once('open', function (callback) {

});

var userSchema = mongoose.Schema({
    name: String,
    password: String,
    email: String,
    age: String,
    ans1: String,
    ans2: String,
    ans3: String,
});


var User = mongoose.model('User_Collection', userSchema);



exports.index = (req, res) => {
    res.render('index', {});
};


exports.create = (req, res) => {
    res.render('signup', {
        title: 'Add Person'
    });
};


exports.createUser = (req, res) => {
    var user = new User({
        name: req.body.name,
        password: req.body.password,
        email: req.body.email,
        age: req.body.age,
        ans1: req.body.questionOne,
        ans2: req.body.questionTwo,
        ans3: req.body.questionThree
    });
    user.save((err, user) => {
        if (err) return console.error(err);
        console.log(req.body.name + ' added');
    });
    res.redirect('/');
};



exports.editUser = (req, res) => {
    User.findOne({
        name: req.params.name
    }, (err, person) => {
        if (err) {
            return console.error(err)
        }
        user.name = req.body.name,
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
                console.log(req.body.name + ' added');
            });
    });
    res.redirect('/');

};