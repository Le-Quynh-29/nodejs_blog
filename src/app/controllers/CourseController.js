const Course = require('../models/Course');
const { mutipleMongooseToOject, mongooseToObject } = require('../../util/mongoose.js');

class CourseController {
    //GET /courses/:slug
    show(req, res) {
        Course.findOne({ slug: req.params.slug }).then((course) => {
            res.render('course/show', { course: mongooseToObject(course) });
        }).catch((err) => { next(err) });
    }

    //GET /courses/create
    create(req, res) {
        res.render('course/create');
    }

    //POST /courses/store
    store(req, res, next) {
        const formData = req.body;
        const course = new Course(formData);
        course.save().then(() => {
            res.redirect('/');
        }).catch((err) => { next(err) });
    }

    //GET /courses/edit/:id
    edit(req, res, next) {
        Course.findById(req.params.id).then((course) => {
            res.render('course/edit', { course: mongooseToObject(course) });
        }).catch((err) => { next(err) });
    }

    //PUT /courses/upadte/:id
    update(req, res, next) {
        const id = req.params.id;
        const formData = req.body;
        Course.updateOne({ _id: id }, formData).then((course) => {
            res.redirect('/');
        }).catch((err) => { next(err) });
    }

    //DELETE /courses/destroy/:id
    destroy(req, res, next) {
        const id = req.params.id;
        Course.delete({ _id: id }).then((course) => {
            res.redirect('back');
        }).catch((err) => { next(err) });
    }

    //GET /courses/trash
    trash(req, res, next) {
        let courseQuery = Course.findWithDeleted({ deleted: true });
        const column = req.query.column;
        const type = req.query.type;
        
        if (req.query.hasOwnProperty('_sort')) {
            courseQuery = courseQuery.sort({
                [column]: type
            });
        }

        courseQuery.then((courses) => {
            res.render('course/trash', { courses: mutipleMongooseToOject(courses) });
        }).catch((err) => { next(err) });
    }

    //PATCH /courses/restore/:id
    restore(req, res, next) {
        const id = req.params.id;
        Course.restore({ _id: id }).then((course) => {
            res.redirect('back');
        }).catch((err) => { next(err) });
    }

    //DELETE /courses/force/:id
    forceDelete(req, res, next) {
        const id = req.params.id;
        Course.deleteOne({ _id: id }).then((course) => {
            res.redirect('back');
        }).catch((err) => { next(err) });
    }

    //POST /courses/delete-all
    deleteAll(req, res, next) {
        switch (req.body.action) {
            case 'delete':
                Course.delete({ _id: { $in: req.body.courseIds}}).then((course) => {
                    res.redirect('back');
                }).catch((err) => { next(err) });
                break;
            default:
                res.json({ message: 'Action is invalid' });
                break;
        }
    }
}

module.exports = new CourseController();
