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

    // [GET] /courses/create
    create(req, res, next){
        res.render('courses/create');
    }

    // [POST] /courses/store
    store(req, res, next){
        const formData = req.body;
        // formData.image = `https://img.youtube.com/vi/${formData.videoId}/sddefault.jgp`;
        const course = new Course(formData);
        course.save()
            .then(res.redirect('/'))
            .catch( () =>{

            })
        res.send('Saved');
    }

    // [GET] /courses/:id/edit
    edit(req, res, next){
        Course.findById(req.params.id).lean()
            .then(course => res.render('courses/edit', {
                course: course
            }))
            .catch(next);
    }

    // [PUT] /courses/:id
    update(req, res, next){
        Course.updateOne( {_id: req.params.id}, req.body)
            .then(() => res.redirect('/me/stored/courses'))
            .catch(next);
    }
}

module.exports = new CoursesController;