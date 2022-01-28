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
            .then(res.redirect('/me/stored/courses'))
            .catch(next);
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

    // [DELETE] /courses/:id
    delete(req, res, next){
        Course.delete( {_id: req.params.id})
            .then(() => res.redirect('back'))
            .catch(next);
    }

    // [DELETE] /courses/:id/force
    forceDelete(req, res, next){
        Course.deleteOne( {_id: req.params.id})
            .then(() => res.redirect('back'))
            .catch(next);
    }

    // [DELETE] 
    deleteMultiple(req, res, next){
        Course.deleteMany()
    }

    // [PATCH] /courses/:id/restore
    restore(req, res, next){
        Course.restore({_id: req.params.id})
            .then(() => res.redirect('back'))
            .catch(next);
    }
    handleFormActions(req, res, next){
        switch(req.body.action){
            case 'delete':
                // $in in MongoDB
                Course.delete( {_id: {$in : req.body.courseIds}})
                    .then(() => res.redirect('back'))
                    .catch(next);
                break;
            default:
                res.json({message: 'Action is invalid'});
        }
    }
}

module.exports = new CoursesController;