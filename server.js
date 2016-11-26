//Standard express setup
var express = require('express'),
    app = express(),
    path = require('path'),
    appRoot = require('app-root-path');
//npm install body-parser --save
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(appRoot + '/client'));
app.use(express.static(appRoot + '/bower_components'));


require(appRoot + '/server/config/mongoose.js');
require(appRoot + '/server/config/routes.js')(app);

var port = 5000;
app.listen(port, function() {
  console.log('Server on port: ' + 5000);
});
