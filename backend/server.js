const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const moment = require('moment');
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

function mappingJobs(array)
{
    var jobs = {
        wishlist: [],
        applied: [],
        inProgress: [],
        offered: [],
        rejected: [],
        accepted: [],
        notAnswered: []
    };
    array.forEach((job) =>
    {
        switch(job.status)
        {
            case 'Wishlist':
                jobs.wishlist.push(job);
                break;
            case 'Applied':
                jobs.applied.push(job);
                break;
            case 'In Progress':
                jobs.inProgress.push(job);
                break;
            case 'Offered':
                jobs.offered.push(job);
                break;
            case 'Rejected':
                jobs.rejected.push(job);
                break;
            case 'Accepted':
                jobs.accepted.push(job);
                break;
            case 'Not Answered':
                jobs.notAnswered.push(job);
                break;
        }
    });
    return jobs;
}

// Add new job
app.post('/add-new-job', async (req, res) =>
{
    const newJob = new JobModel({
        owner: req.body.owner,
        title: req.body.title,
        company: req.body.company,
        status: req.body.status,
        location: '',
        salary: '',
        contact: '',
        url: '',
        timeline: [
            {
                action: 'Job created',
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
    var location = req.body.location;
    var salary = req.body.salary;
    var contact = req.body.contact;
    var url = req.body.url;
    JobModel.findByIdAndUpdate(id, 
        {
            title: title,
            company: company,
            location: location,
            salary: salary,
            contact: contact,
            url: url,
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
        }
    );
    // Add to timeline
    var newStep = 
    { 
        // action: status === 'Accepted' ? 'Accepted!' : `Moved to ${status}`,
        action: (status !== 'Accepted' && status !== 'Rejected') ? `Moved to ${status}` : (status === 'Accepted' ? "Accepted!" : "Rejected"),
        date: parseInt(new Date().getTime() / 1000)
    }
    JobModel.findByIdAndUpdate(id, 
        {$push: { timeline: newStep }},
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
                var jobs = mappingJobs(result);
                res.json(jobs);
            }
        }
    );
});

// Get all user's stats
app.get('/get-stats', async (req, res) =>
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
                var stats = {
                    jobs: [],       // array of jobs as is
                    mapped: {},     // object of mapped by states jobs
                    weeklyApplies: 0  // numbers of applications per week
                };
                stats.jobs = result.slice();
                stats.mapped = mappingJobs(result);

                const now = moment();
                const thisWeek = result.filter(job => moment.unix(job.timeline[0].date).isoWeek() === now.isoWeek());
                stats.weeklyApplies = thisWeek.length;

                console.log(stats);
                res.json(stats);
            }
        }
    );
});

app.listen(port, () => {
    console.log(`Listening at port ${port}`);
});

module.exports = router;