var mongoose = require('mongoose'),
    User = mongoose.model('User');


function UsersController() {
    this.index = function(req, res) {
        User.find({}, function(err, data) {
            res.json(data);
        });
    };

    this.login = function(req, res){
      var email = req.body.email,
          password = req.body.password;

      User.findOne({email: email}, function(err, user){
        if(err){
          res.json({'error': err});
        } else if(user && user.validPassword(password)) {
          res.json({'user': user});
        } else {
          res.json({'error': {'errors': {'bad login': {'message': 'Invalid email or password'}}}});
        }
      });
    };

    this.create = function(req, res) {
        var newUser = new User();
        var pw_hash = newUser.generateHash(req.body.password);
        newUser.email = req.body.email;
        newUser.first_name = req.body.first_name;
        newUser.last_name = req.body.last_name;
        newUser.password = pw_hash;
        newUser.birthday = req.body.birthday;
        newUser.save(function(err, data){
          if(err){
            if(err.name == "MongoError"){
              res.json({'error': {'errors': {'Duplicate Key': {'message': "That email is already in use"}}}});
              console.log(err);
            } else if(err.name == "ValidationError"){
              res.json({'error': err});
              console.log(err);
            }
          } else {
            res.json({'user': data});
          }
        });
    };
}

module.exports = new UsersController();
