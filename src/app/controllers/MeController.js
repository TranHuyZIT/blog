const Course = require('../models/Courses');

class MeController{
    // GET /search
    storedCourses(req, res, next){

        Promise.all([Course.find({}).sortable(req).lean(),
            Course.countDocumentsDeleted().lean()])
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