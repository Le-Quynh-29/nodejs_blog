const Course = require('../models/Course');
const { mutipleMongooseToOject } = require('../../util/mongoose.js');

class SiteController {
    //GET /
    index(req, res, next) {
        Promise.all([Course.find({}), Course.countWithDeleted({deleted:true})])
        .then(([courses, deleteCount]) => {
            res.render('home', {
                deleteCount: deleteCount,
                courses: mutipleMongooseToOject(courses)
            });
        }).catch((err) => { next(err) });
    }

    //GET /search
    search(req, res) {
        return res.render('search');
    }
}

module.exports = new SiteController();
