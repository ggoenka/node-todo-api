const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {TodoModel} = require('./../models/Todo');

const todos = [
    {
        _id: new ObjectID(),
        text: 'First todo'
    },
    {
        _id: new ObjectID(),
        text: 'Second todo'
    }
];

beforeEach((done) => {
    TodoModel.remove({}).then(() => {
        return TodoModel.insertMany(todos);
    }).then(() => done());
});

describe('Post /todos', () => {
    it('should create a new todo', (done) => {
        let text = 'Testing text';

        request(app)
            .post('/todos')
            .send({text})
            .expect(201)
            .expect((res) => {
                expect(res.body.text).toBe(text);
            })
            .end((err, res) => {
                if(err) {
                    return done(err);
                }
                TodoModel.find({text}).then((todos) => {
                    expect(todos.length).toBe(1);                    
                    expect(todos[0].text).toBe(text);
                    done();
                }).catch((e) => done(e));
            });
    });

    it('should not create todo on bad input', (done) => {
        request(app)
            .post('/todos')
            .send({})
            .expect(400)
            .end((err, res) => {
                if(err) {
                    return done(err);
                }
                TodoModel.find().then((todos) => {
                    expect(todos.length).toBe(todos.length);
                    done();
                }).catch((e) => done(e));
            });
    });
});

describe('GET /todos', () => {
    it('should get all todos', (done) => {
        request(app)
            .get('/todos')
            .send({})
            .expect(200)
            .expect((res) => {
                expect(res.body.todos.length).toBe(todos.length);
            })
            .end((err, res) => {
                if(err) {
                    return done(err);
                }
                TodoModel.findOne({text: todos[0].text}).then((todo) => {
                    expect(todo.text).toBe(todos[0].text);
                    done();
                }).catch((e) => done(e));
            });
    });
});

describe('GET /todos/:id', () => {
    it('should return todo doc', (done) => {
        request(app)
            .get(`/todos/${todos[0]._id.toHexString()}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.text).toBe(todos[0].text);
            })
            .end(done);
    });

    it('should return 400 for invalid input id', (done) => {
        request(app)
            .get('/todos/123')
            .expect(400)
            .end(done);
    });
});

describe('DELETE /todos/:id', () => {

    it('should remove a todo successfully', (done) => {
        let id = todos[0]._id.toHexString();
        request(app)
            .delete(`/todos/${id}`)
            .expect(204)
            .end((err, res) => {
                if(err) {
                    return done(err);
                }
                TodoModel.findById(id).then((todo) => {
                    expect(todo).toBeFalsy();
                    done();
                }).catch((e) => done(e));
            });
    });

    it('should fail to remove a todo on bad id input', (done) => {
        request(app)
            .delete(`/todos/${todos[0]._id.toHexString() + '1'}`)
            .expect(400)
            .expect((res) => {
                expect(res.text).toBe(`Malformed input ${todos[0]._id.toHexString() + '1'}.`);
            })
            .end(done);
    });
});