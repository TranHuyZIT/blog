const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator');
const mongoose_delete = require('mongoose-delete');


const Course = new Schema({
  name: {type: String, minlength: 1},
  description: {type: String, maxlength: 600},
  image: {type: String},
  videoId :{type: String},
  createdAt: {type: Date, default: Date.now},
  updatedAt: {type: Date, default: Date.now},
  slug : {type: String, slug: 'name'}
}, {
  timestamps: true
});

// Add plugins
mongoose.plugin(slug);
Course.plugin(mongoose_delete, { 
  overrideMethods: 'all',
  deletedAt: true  
});


module.exports = mongoose.model('Course', Course);