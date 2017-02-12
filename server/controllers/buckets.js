var mongoose = require('mongoose'),
    User = mongoose.model('User'),
    Bucket = mongoose.model('Bucket');

function BucketsController(){

  this.show = function(req, res){
    User.findOne({_id: req.params.id}).populate('buckets').exec(function(err, user){
      if(err){
        console.log(err);
      } else {
        res.json(user);
      };
    });
  };

  this.create = function(req, res){
    var newBucket = new Bucket();
    var creator = req.body.user1;
    User.findOne({_id: creator}, function(err, user){
      if(err){
        console.log(err);
      } else {
        newBucket._users.push(user);
        newBucket.title = req.body.title;
        newBucket.description = req.body.description;
        newBucket.completed = 'false';

        console.log("First time: DEBUG USER 2 START HERE --------", typeof(req.body.user2), req.body.user2);
        if(req.body.user2){
          User.findOne({_id: req.body.user2}, function(err, user2){

            console.log("I shouldn't be here if I am null: ", user2);

            if(err){
              console.log(err);
            } else {
              newBucket._users.push(user2);
              newBucket.save(function(err, bucket){
                if(err){
                  res.json({'Error': err});
                } else {
                  user.buckets.push(newBucket);
                  user.save(function(err, resData1){
                    if(err){
                      res.json({'Error': err});
                    } else {
                      user2.buckets.push(newBucket);
                      user2.save(function(err, resData2){
                        if(err){
                          res.json({'Error': err});
                        } else {
                          res.json({
                            'Success':
                              {
                                'creator' : resData1,
                                'taggedFriend' : resData2,
                                'bucket' : bucket
                              }
                          });
                        };
                      });
                    };
                  });
                };
              });
            };
          });
        } else {
          console.log("Second time: DEBUG USER 2 START HERE --------", typeof(req.body.user2), req.body.user2);

          newBucket.save(function(err, bucket){
            if(err){
              res.json({'Error': err});
              console.log('Error 1', err);
            } else {
              user.buckets.push(newBucket);
              user.save(function(err, resData){
                if(err){
                  res.json({'Error': err});
                  console.log('Error 2', err);
                } else {
                  res.json({
                    'Success':
                    {
                      'creator' : resData,
                      'bucket' : bucket
                    }
                  });
                };
              });
            };
          });
        };
      };
    });
  };

  this.update = function(req, res){
    var bucketId = req.params.id;
    Bucket.update({_id: bucketId}, {$set: {'completed': 'true'}}, function(err){
      if(err){
        res.json({"Error": err})
      } else {
        res.json({"Success": "Successful update"});
      };
    });
  };


};

module.exports = new BucketsController();
