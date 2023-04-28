const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Habit = require('./models/Habit');
const ejs = require('ejs');
const path = require('path');

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));
app.set('views', path.join(__dirname, 'views'));

// Connect to MongoDB
mongoose.connect('mongodb+srv://yvrjbhatiya57:ysb3atlas@yvrjdb.tpnfev8.mongodb.net/HabitTracker?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB', err);
    });


// Routes

app.get('/', (req, res) => {
    Habit.find()
        .then((habits) => {
            res.render('habit', { habits });
        })
        .catch((err) => {
            console.error('Error finding habits', err);
        });
});


app.post('/savehabit', (req, res) => {
    const habit = new Habit({
        name: req.body.name,
       
    });
    habit.save()
        .then(() => {
            res.redirect('/');
        })
        .catch((err) => {
            console.error('Error saving habit', err);
        });
});

app.post('/viewhabit', (req, res) => {
    const id=req.body.id;
    Habit.findById(id)
        .then((habit) => {
            res.render('viewhabit', { habit });
        }
        )
        .catch((err) => {
            console.error('Error finding habit', err);
        }
        );
});


app.post('/deletehabit', (req, res) => {
    const id=req.body.id;
    Habit.findByIdAndDelete(id)
        .then(() => {
            res.redirect('/');
        })
        .catch((err) => {
            console.error('Error deleting habit', err);
        });
});





app.listen(port, () => console.log(`Example app listening on port ${port}!`));