const Course = require('../models/Courses');

class MeController{
    // GET /search
    storedCourses(req, res, next){
        let courseQuery = Course.find({});
        if (req.query.hasOwnProperty('_sort')){
            courseQuery = courseQuery.sort({
                [req.query.column] : [req.query.type]
            })
        }
        Promise.all([courseQuery.lean(), Course.countDocumentsDeleted().lean()])
            .then(([courses, deletedCount]) => {
                res.render('me/stored-courses', {
                    deletedCount,
                    courses: courses
                })
            })
    }

    //[GET] /trash-courses
    trashCourses(req, res, next){
        Course.findDeleted({}).lean()
            .then((courses) => 
                res.render('me/trash-courses', {
                    courses: courses
                }))
            .catch(next);
    }
}

module.exports = new MeController;