var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var pointSchema = new Schema({
  base64: String,
  position: {type: String, 'default': '[0,0]'},
  creationDate: {type: Date, 'default': Date.now},
});

module.exports = mongoose.model('Points', pointSchema);