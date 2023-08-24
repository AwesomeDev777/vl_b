const express = require('express');
const bodyParser = require('body-parser');
const adminRouter = require("./route/admin");
const passport = require('passport');
const mongoose = require('mongoose');
const cors = require("cors");

const db = require("./config/keys").mongoURI;
// MongoDB connected
mongoose.connect(db).then(() => console.log("MongoDB connected")).catch(err => console.log(err));
require('./model/admin/Contact');

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(passport.initialize());
require('./config/passport')(passport);

app.use(adminRouter);

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});


