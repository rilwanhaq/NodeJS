const express = require('express');
const app = express();
const mongoose = require('mongoose');
var bodyParser = require('body-parser');
const methodOverride = require('method-override');
const User = require('./model/assignment_4');
mongoose.connect('mongodb://localhost:27017/assignment_4');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(methodOverride('_method'))

app.set('views', './views');
app.set('view engine', 'ejs');



app.get('/',async (req, res) => {
    const users = await User.find()
    res.render("index.ejs",{users})
});

app.get('/form', (req, res) => {
    res.render("form.ejs")
});

app.post('/add/user', async (req, res) => {
    const tasks = await User.create({
        name: req.body.name,
        email: req.body.email
    })
    res.redirect('/');
});

app.put('/users/:id/edit', async (req, res) => {
    await User.updateOne({ _id: req.params.id }, [
        { $set: { isPromoted: { $not: "$isPromoted" } } }
      ]);
    res.redirect('/');
});
app.delete('/users/:id/delete', async (req, res) => {
    await User.deleteOne({ _id: req.params.id })
    res.redirect('/');
});

app.listen(3000, () =>
    console.log('listening on port 3000'));