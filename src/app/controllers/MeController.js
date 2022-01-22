const Course = require('../models/Courses');

class MeController{
    // GET /search
    storedCourses(req, res, next){

        Promise.all([Course.find({}).lean(), Course.countDocumentsDeleted().lean()])
            .then(([courses, deletedCount]) => {
                res.render('me/stored-courses', {
                    deletedCount,
                    courses: courses
                })
            })

        // Course.countDocumentsDeleted().lean()
        //     .then((deletedCount) => {
        //         console.log(deletedCount);
        //     })
        //     .catch(next);

        // Course.find({}).lean()
        //     .then(courses => res.render('me/stored-courses', {
        //         courses: courses
        //     }))
        //     .catch(next);
        
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