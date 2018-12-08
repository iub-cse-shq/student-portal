var mongoose = require('mongoose');

// Schema for user posts
var postSchema = mongoose.Schema({
    title:{
      type: String,
      required: true
    },
    author:{
      type: String,
      required: true
    },
    user:{
      type: String,
      required: true
    },
    privacy:{
      type: String,
      required: true
    },
    body:{
      type: String,
      required: true
    }
});

var Post = module.exports = mongoose.model('Post', postSchema);