const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator');
const mongoose_delete = require('mongoose-delete');


const CourseSchema = new Schema({
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

// Custom query helpers:
CourseSchema.query.sortable = function(req){
  if (req.query.hasOwnProperty('_sort')){
    const isValidType = ['asc', 'desc'].includes(req.query.type);
    if(!isValidType){
        req.query.type = 'desc'
    }
    return this.sort({
        [req.query.column] : [req.query.type]
    });
  }
  return this;
}


// Add plugins
mongoose.plugin(slug);
CourseSchema.plugin(mongoose_delete, { 
  overrideMethods: 'all',
  deletedAt: true  
});


module.exports = mongoose.model('Course', CourseSchema);