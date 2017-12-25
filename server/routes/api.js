const express = require('express');
const router = express.Router();
const mongojs = require('mongojs');
const db = mongojs('mongodb://admin:admin123@ds037827.mongolab.com:37827/ng2todoapp', ['todos']);

/* GET api listing. */
router.get('/', (req, res) => {
  res.send('api works');
});

/* Get all todos */
router.get('/todos', (req, res, next) => {
  /**
   * @param err
   * @param res
   */
  db.todos.find(
    (err, todos) => {
      if (err) {
        res.send(err)
      } else {
        res.json(todos)
      }
    }
  )
});

/* Get one todos with the provided ID */
router.get('/todo/:id', (req, res, next) => {
  db.todos.findOne({
      _id: mongojs.ObjectId(req.params.id)
    },
    (err, todo) => {
      if (err) {
        res.send(err)
      } else {
        res.json(todo)
      }
    }
  )
});


/* POST/SAVE save todos */
router.post('/todo', (req, res, next) => {
  let todo = req.body;
  if (!todo.text || todo.isCompleted === "undefined") {
    res.status(400);
    res.json({error: "Invalid Data", body: todo});
    return;
  }
  db.todos.save(todo,
    (err, todo) => {
      if (err) {
        res.send(err)
      } else {
        res.json(todo)
      }
    }
  )
});

/* PUT/UPDATE a todos */
router.put('/todo/:id', (req, res, next) => {
  let todo = req.body;
  let updObj = {};

  if (todo.isCompleted) {
    updObj.isCompleted = todo.isCompleted;
  }
  if (todo.text) {
    updObj.text = todo.text;
  }
  if (!updObj) {
    res.status(400);
    res.json({error: "Invalid Data"});
    return;
  }

  db.todos.update({
      _id: mongojs.ObjectId(req.params.id)
    }, updObj, {},
    (err, todo) => {
      if (err) {
        res.send(err)
      } else {
        res.json(todo)
      }
    }
  )

});

/* DELETE a todos */
router.delete('/todo', (req, res, next) => {
  const id = req.query._id;
  if (id === 'undefined') return;
  db.todos.remove({
      _id: mongojs.ObjectId(id)
    }, '',
    (err, resutl) => {
      if (err) {
        res.send(err)
      } else {
        res.json(resutl)
      }
    }
  )
});

module.exports = router;
