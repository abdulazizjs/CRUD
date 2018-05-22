const express = require('express');
const {mongoose} = require('../db/connection');
const router = express.Router();
const {Todo} = require('../model/todo');
const _ = require('lodash');

router.get('/', (req, res) => {
  Todo.find({}, (err, tasks) => {
    if(err) throw err;
      res.render('index', {
        title: 'CRUD',
        tasks: tasks
      })
  })
});


router.post('/add', (req, res) => {
  let body = _.pick(req.body, ['name', 'surname']);
  let sts = req.body.status;
  sts = false;
  var todo = new Todo(body, sts);
  todo.save().then((doc) => {
    res.redirect('/');
  })

})



router.get('/edit/:id', async (req, res) => {
  let body = _.pick(req.body, ['name', 'surname']);
  const { id } = req.params;
  await Todo.FindOneAndUpdate({_id: id}, {set: body}).then((tasks) => {
      if(!tasks){
        return res.status(404).send();
      }
      res.render('/edit', {
        title: 'CRUD',
        tasks: tasks
      })
  })
});


router.get('/delete/:id', (req, res) => {
  let id = req.params.id;
  Todo.findByIdAndRemove(id).then(() => {
    res.redirect('/');
  })
})


module.exports = {router};
