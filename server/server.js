const express = require('express');
const bodyParser = require("body-parser");


const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

const cookieParser = require("cookie-parser");
app.use(cookieParser());

const users = require("./users.js");
app.use("/api/users", users.routes);

const teams = require("./teams.js");
app.use("/api/teams", teams.routes);

// Since npm-run-serve uses the port 8080 as the default page,
// we use port 3002 to run our own server 
app.listen(3002, () => console.log('Server listening on port 3002!'));

