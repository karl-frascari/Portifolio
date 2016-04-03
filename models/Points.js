var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var pointSchema = new Schema({
  base64: String,
  position: String
});

module.exports = mongoose.model('Points', pointSchema);