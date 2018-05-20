require('./config/config');
const path = require('path');
const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const _ = require('lodash');

const {mongoose} = require('./db/connection');
const {router} = require('./routes/route');
const {Todo} = require('./model/todo');

const app = express();
var port = process.env.PORT;


app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use('/', router);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.listen(port, () => {
  console.log(`Server is runnng on port ${port}`);
})
