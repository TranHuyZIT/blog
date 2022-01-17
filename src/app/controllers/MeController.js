const Course = require('../models/Courses');

class MeController{
    // GET /search
    storedCourses(req, res, next){
        Course.find({}).lean()
            .then(courses => res.render('me/stored-courses', {
                courses: courses
            }))
            .catch(next);
        
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