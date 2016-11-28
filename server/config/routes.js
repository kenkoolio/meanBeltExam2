var Users = require('../controllers/users.js'),
    Buckets = require('../controllers/buckets.js');

module.exports = (function(app){
  app.get('/users', Users.index);
  app.post('/users', Users.create);
  app.post('/login', Users.login);
  app.post('/buckets', Buckets.create);
  app.get('/buckets/:id', Buckets.show);
  app.put('/buckets/:id', Buckets.update);
});
