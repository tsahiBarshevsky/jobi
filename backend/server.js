const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const JobModel = require('./Model/Jobs');

const port = 5000;

var router = express.Router();
app.use(cors());
app.use(express.urlencoded());
app.use(express.json());

// Connect to database
mongoose.connect('mongodb://localhost:27017/jobi', { 
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useFindAndModify: false 
});

// Add new job
app.post('/add-new-job', async (req, res) =>
{
    const newJob = new JobModel({
        owner: req.body.owner,
        title: req.body.title,
        company: req.body.company,
        status: 'Applied',
        color: 'default',
        location: '',
        salary: '',
        contact: '',
        url: '',
        timeline: [
            {
                action: 'Applied',
                date: parseInt(new Date().getTime() / 1000)
            }
        ]
    });
    await newJob.save();
    console.log(`${req.body.title} added successfully`);
    res.json({
        job_id: newJob._id,
        message: `${req.body.title} added successfully`
    });
});

// Edit job
app.post('/edit-job', async (req, res) =>
{
    var id = req.query.id;
    var title = req.body.title;
    var company = req.body.company;
    JobModel.findByIdAndUpdate(id, 
        {
            title: title,
            company: company,
        },
        function(err)
        {
            if (err)
            {
                console.log(err);
                res.status(500).send(err);
            }
            else
            {
                console.log(`${title} edited successfully`);
                res.json(`${title} edited successfully`);
            }
        }
    );
});

// Update job status
app.post('/update-job-status', async (req, res) =>
{
    var id = req.query.id;
    var status = req.body.status;
    JobModel.findByIdAndUpdate(id, { status: status },
        function(err, result)
        {
            if (err)
            {
                console.log(err);
                res.status(500).send(err);
            }
            else
            {
                console.log(`${result.title}'s status has changed to ${status}`);
                res.json(`${result.title}'s status has changed to ${status}`);
            }
        }
    );
});

// Delete job
app.get('/delete-job', async (req, res) =>
{
    var id = req.query.id;
    JobModel.findByIdAndDelete(id,
        function(err, result)
        {
            if (err)
            {
                console.log(err);
                res.status(500).send(err);
            }
            else
            {
                console.log(`${result.title} deleted successfully`);
                res.json(`${result.title} deleted successfully`);
            }
        }
    );
});

// Get single job
app.get('/get-single-job', async (req, res) => 
{
    var id = req.query.id;
    JobModel.findById(id, (err, result) =>
    {
        if (err)
        {
            console.log("Error: " + err);
            res.send(err);
        }
        else
        {
            if (!result)
            {
                console.log(`Couldn't find a job with id ${id}`);
                res.json({});
            }
            else
            {
                console.log(`The job associated with this id is ${result.title}`);
                res.json(result);
            }
        }
    });
});

// Get all user's jobs
app.get('/get-all-jobs', async (req, res) =>
{
    var email = req.query.email;
    JobModel.find({"owner": email}, 
        function(err, result)
        {
            if (err)
            {
                console.log("Error: " + err)
                res.send(err);
            }
            else
            {
                console.log(`${result.length} jobs found`);
                var jobs = {
                    applied: [],
                    inProgress: [],
                    rejected: [],
                    notAnswered: []
                };
                result.forEach((job) =>
                {
                    switch(job.status)
                    {
                        case 'Applied':
                            jobs.applied.push(job);
                            break;
                        case 'In Progress':
                            jobs.inProgress.push(job);
                            break;
                        case 'Rejected':
                            jobs.rejected.push(job);
                            break;
                        case 'Not Answered':
                            jobs.notAnswered.push(job);
                            break;
                    }
                });
                res.json(jobs);
            }
        }
    );
});

app.listen(port, () => {
    console.log(`Listening at port ${port}`);
});

module.exports = router;