const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator');
mongoose.plugin(slug);

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
module.exports = mongoose.model('Course', Course);