require('./config/config');

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

const {mongoose} = require('./db/mongoose');
const {TodoModel} = require('./models/Todo');
const {UserModel} = require('./models/User');

var app = express();

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

app.delete('/todos/:id', (req, res) => {
    let {id} = req.params;

    if(!ObjectID.isValid(id)) {
        return res.status(400).send(`Malformed input ${id}.`);
    }
    TodoModel.findByIdAndDelete(id).then((todo) => {
        if(!todo) {
            return res.send({"message": "No such todo found"});
        }
        res.status(204).send({todo});
    }).catch((e) => res.status(500).send({"message": "Fatal error!"}));
});

app.patch('/todos/:id', (req, res) => {
    let {id} = req.params;
    let body = _.pick(req.body, ['text', 'completed']);

    if(!ObjectID.isValid(id)) {
        return res.status(400).send(`Malformed input ${id}.`);
    }

    if(_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();
    } else {
        body.completed = false;
        body.completedAt = null;
    }

    TodoModel.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
        if(!todo) {
            return res.send({"message": "No such todo found"});
        }
        res.status(203).send({todo});
    }).catch((e) => res.status(500).send({"message": "Fatal error!"}));
});

app.listen(process.env.PORT, () => {
    console.log(`Started on port ${process.env.PORT}`);
});

module.exports = {app};

//mongoose.disconnect();