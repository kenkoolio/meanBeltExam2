var mongoose = require('mongoose'),
    db = 'mongodb://localhost/meanBeltDB2';

mongoose.connect(db);

mongoose.connection.on( 'connected', () => {
  console.log( `Mongoose default connection open to ${ db }` );
});

mongoose.connection.on( 'error', ( err ) => {
  console.error( `Mongoose default connection error: ${ err }` );
});

mongoose.connection.on( 'disconnected', () => {
  console.log( 'Mongoose default connection disconnected' );
});

process.on( 'SIGINT', () => {
  // If the Node process ends, close the Mongoose connection
  mongoose.connection.close( () => {
    console.log( 'Mongoose default connection disconnected through app termination' );
    process.exit( 0 );
  });
});

//
var path = require('path'),
    fs = require('fs'),
    appRoot = require('app-root-path'),
    models_path = path.join(appRoot.path, '/server/models'),
    findJs  = new RegExp( ".js$", "i" );

fs.readdirSync(models_path).forEach(function(file) {
  if( findJs.test( file ) ) {
    require( path.join( models_path, file ) );
  }
});
