const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
    owner: { type: String },
    title: { type: String },
    company: { type: String },
    status: { type: String },
    color: { type: String },
    location: { type: String },
    salary: { type: Number },
    contact: { type: String },
    url: { type: String },
    timeline: { type: Array }
});

const JobModel = mongoose.model("jobs", JobSchema);

module.exports = JobModel;