const path = require('path');
const express = require('express');
const morgan = require('morgan');
const handlebars = require('express-handlebars');
const methodOverride = require('method-override');

const app = express();
const port = 3000;

const SortMiddleware = require('./app/middlewares/SortMiddleware');

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
app.use(methodOverride('_method'));

//HTTP logger
app.use(morgan('combined'));

//custom middlewares
app.use(SortMiddleware);

//Template engine
app.engine(
  'hbs',
  handlebars.engine({
    extname: '.hbs',
    helpers: {
      sum: (a, b) => a + b,
      sortable: (field, sort) => {
        const sortType = field === sort.column ? sort.type : 'default';
        const icons = {
          default: 'fas fa-sort',
          asc: 'fas fa-sort-up',
          desc: 'fas fa-sort-down',
        }

        const types = {
          default: 'desc',
          asc: 'desc',
          desc: 'asc',
        };

        const icon = icons[sortType];
        const type = types[sortType];

        return `<a href="?_sort&column=${field}&type=${type}"><i class="${icon}"></i></a>`;
      }
    }
  }),
);
app.set('view engine', 'hbs');
app.set('views', path.resolve(__dirname, 'resources/views'));

//req => request (giá trị truyển vào), res => response (giá trị trả về)
//Routes init
route(app);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
