const exp = require('constants');
var mongoose = require('mongoose');
var schema = mongoose.Schema

var userSchema = new schema({
    email : { type: String, require : true},
    pwd : { type: String, require : true},
    createDate : {type: Date, default:Date.now} 

})

var user = mongoose.model('user', userSchema, 'user')
var exportSchema = {'user': user};

module.exports = exportSchema;
