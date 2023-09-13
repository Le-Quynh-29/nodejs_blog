const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');
const AutoIncrement = require('mongoose-plugin-autoinc');
;
const Schema = mongoose.Schema;

const Course = new Schema({
    name: { type: String, },
    description: { type: String, },
    image: { type: String, },
    videoId: { type: String, },
    slug: { type: String, },
}, {
    timestamps: true,
});

//Add plugins
Course.plugin(AutoIncrement.plugin, {
    model: 'Course', 
    field: '_id', 
    startAt: 1,
    incrementBy: 1, 
});

//Xóa mềm
Course.plugin(mongooseDelete, { 
    deletedAt: true,
    overrideMethods: 'all'
 });

module.exports = mongoose.model('Course', Course);