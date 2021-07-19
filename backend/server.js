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

// 1. Add new job
app.post('/add-new-job', async (req, res) =>
{
    const newJob = new JobModel({
        owner: req.body.owner,
        title: req.body.title,
        company: req.body.company,
        status: req.body.status,
        date: req.body.date,
        archived: req.body.archived
    });
    await newJob.save();
    console.log(`${req.body.title} added successfully`);
    res.json({
        job_id: newJob._id,
        message: `${req.body.title} added successfully`
    });
});

// 2. Edit job
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

// 3. Update job status
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

// 4. Send to archive
app.get('/archive-job', async (req, res) =>
{
    var id = req.query.id;
    JobModel.findByIdAndUpdate(id, { archived: true },
        function(err, result)
        {
            if (err)
            {
                console.log(err);
                res.status(500).send(err);
            }
            else
            {
                console.log(`${result.title} archived`);
                res.json(`${result.title} archived`);
            }
        }
    );
});

// 5. Delete job
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

// 6. Get single job
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

// 7. Get all user's unarchived jobs
// 8. Get all user's archived jobs
app.get('/get-all-jobs', async (req, res) =>
{
    var email = req.query.email;
    var archived = req.query.archived;
    JobModel.find({"owner": email, "archived": archived}, 
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
                if (!(JSON.parse(archived)))
                {
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
                else
                    res.json(result);
            }
        }
    );
});

app.listen(port, () => {
    console.log(`Listening at port ${port}`);
});

module.exports = router;