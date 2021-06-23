// setup for express
const express = require("express");
const app = express();

require('dotenv').config()

const port = 3000;

// require some data form your data.js file
let {students, instructors} = require('./data')

// just a simple middleware to show you how it works
// you will always see that console.log when you visit any page
app.use((req, res, next) => {
    console.log("Hello from the middleware");
    next();
});

// letting your middleware know where to find all static files
app.use(express.static(__dirname + "/public"));

app.set('view engine', 'hbs')
app.set('views', __dirname + '/views/')

const hbs = require('hbs')
hbs.registerPartials(__dirname + '/views/partials')

// ROUTES DEFINED BELOW

// '/landing'
app.get("/", (req, res) => {
    let myName = 'Ellen'
    console.log(process.env.PASSWORD)
    res.render('landing.hbs', {name: myName, age: 19})
});

// '/students'
app.get('/students', (req, res) => {
    let upperCaseNames = students.map((student) => {
        student.name = student.name.toUpperCase()
        return student
    })
    res.render('students.hbs', {students: upperCaseNames})
})

// '/instructors'
app.get('/instructors', (req, res) => {
    let filtered = instructors.filter((instructor) => {
        return instructor.name == 'George'
    })
    res.render('instructors.hbs', {instructors: filtered})
})

// Express setup to listen for all client requests on a certain port
app.listen(port, () =>
    console.log(`Example app listening at http://localhost:${port}`)
);