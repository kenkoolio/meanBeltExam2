var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var bucketSchema = new mongoose.Schema({
  _users: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],

  title: {
    type: String,
    minlength: 5,
    required: true
  },

  description: {
    type: String,
    minlength: 10,
    required: true
  },

  completed: {
    type: String
  }

}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

mongoose.model('Bucket', bucketSchema);
