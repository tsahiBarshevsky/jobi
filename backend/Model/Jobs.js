const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
    owner: { type: String },
    title: { type: String },
    company: { type: String },
    status: { type: String },
    date: { type: Date },
    archived: { type: Boolean }
});

const JobModel = mongoose.model("jobs", JobSchema);

module.exports = JobModel;