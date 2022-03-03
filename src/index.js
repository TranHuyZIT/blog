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
  helpers: require('./helpers/handlebars')
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

// Use Custom Middleware
app.use(SortMiddleware);

// Routes Init
route(app);

app.listen(3000)