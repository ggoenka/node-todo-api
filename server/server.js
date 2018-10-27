const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

const {mongoose} = require('./db/mongoose');
const {TodoModel} = require('./models/Todo');
const {UserModel} = require('./models/User');

var app = express();

const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
    
    var todo = new TodoModel({
        text: req.body.text
    });
    
    todo.save().then((doc) => {
        res.status(201).send(doc);
    }, (e) => {
        res.status(400).send(e);
    });
});

app.get('/todos', (req, res) => {

    TodoModel.find().then((todos) => {
        res.send({todos});
    }, (e) => {
        res.status(400).send(e);
    });
});

app.get('/todos/:id', (req, res) => {
    let {id} = req.params;
    
    if(!ObjectID.isValid(id)) {
        return res.status(400).send(`Invalid input ${id}`);
    }
    TodoModel.findById(id).then((todo) => {
        res.send(todo);
    }).catch((e) => res.status(500).send({}));
});

app.listen(port, () => {
    console.log(`Started on port ${port}`);
});

module.exports = {app};

//mongoose.disconnect();