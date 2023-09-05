const path = require('path');
const express = require('express');
const morgan = require('morgan');
const handlebars = require('express-handlebars');

const app = express();
const port = 3000;

const route = require('./routes');
const db = require('./config/db');

//connect db
db.connect();

app.use(express.static(path.join(__dirname, 'public')));

app.use(
 express.urlencoded({
  extended: true,
 }),
);
app.use(express.json());

//HTTP logger
app.use(morgan('combined'));

//Template engine
app.engine(
 'hbs',
 handlebars.engine({
  extname: '.hbs',
 }),
);
app.set('view engine', 'hbs');
app.set('views', path.resolve(__dirname, 'resources/views'));

//req => request (giá trị truyển vào), res => response (giá trị trả về)
//Routes init
route(app);

app.listen(port, () => {
 console.log(`Example app listening on port ${port}`);
});
