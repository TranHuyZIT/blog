const Course = require('../models/Courses');

class CoursesController{
    // GET /NEW
    show(req, res, next){
        Course.findOne({slug: req.params.slug}).lean()
            .then((course) => {
                console.log(course);
                res.render('courses/show', {course : course});
            })
            .catch(next);
    }
}

module.exports = new CoursesController;