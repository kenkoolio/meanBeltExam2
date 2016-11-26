var Users = require('../controllers/users.js');

module.exports = (function(app){
  app.get('/users', Users.index);
  app.post('/users', Users.create);
  app.post('/login', Users.login);
});
