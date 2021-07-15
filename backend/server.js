const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();

const port = 5000;

var router = express.Router();
app.use(cors());
app.use(express.urlencoded());
app.use(express.json());

// Connect to database
mongoose.connect('mongodb://localhost:27017/jobi', { useNewUrlParser: true });

app.listen(port, () => {
    console.log(`Listening at port ${port}`);
});

module.exports = router;