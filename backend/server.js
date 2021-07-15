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
mongoose.connect('mongodb://localhost:27017/jobi', { useNewUrlParser: true });

// Get single job
app.get('/get-single-job', async (req, res) => 
{
    var title = req.query.title;
    JobModel.findOne({"title": `${title}`}, (err, result) =>
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
                console.log(`Couldn't find ${title}`);
                res.json({});
            }
            else
            {
                console.log(`${title} has found`);
                res.json(result);
            }
        }
    });
});

app.listen(port, () => {
    console.log(`Listening at port ${port}`);
});

module.exports = router;