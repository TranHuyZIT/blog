const express = require('express');
const morgan = require('morgan');
const path = require('path');
const handlebars = require('express-handlebars');
const route = require('./routes/index');
const app = express()
const db = require('./config/db/index');
const methodOverride = require('method-override');
const SortMiddleware = require('./app/middlewares/SortMiddleware');

// Connect to DB
db.connect();

app.use(express.static(path.join(__dirname, 'public')));
// HTTP Logger
app.use(morgan('combined'))

app.use(express.urlencoded());
app.use(express.json());

// Method-Overidden 
app.use(methodOverride('_method'));

// Template Engine
app.engine('hbs', handlebars.engine({
  extname: '.hbs',
  helpers: {
    sum : (a, b) => a + b,
    sortable : (field, sort) => {

      const sortType = field === sort.column ? sort.type : 'default';

      const icons = {
        default: 'oi oi-elevator',
        desc: 'oi oi-sort-descending',
        asc: 'oi oi-sort-ascending'
      }

      const types = {
        default: 'desc',
        desc : 'asc',
        asc: 'desc'
      }
      
      const icon = icons[sortType];
      const type = types[sortType];

      return `<a href="?_sort&column=${field}&type=${type}">
      <span class="${icon}"></span>
    </a>`
    }
  }
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

// Use Custom Middleware
app.use(SortMiddleware);

// Routes Init
route(app);

app.listen(3000)