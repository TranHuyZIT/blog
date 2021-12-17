const express = require('express');
const morgan = require('morgan');
const path = require('path');
const handlebars = require('express-handlebars');
const app = express()


app.use(express.static(path.join(__dirname, 'public')));
// HTTP Logger
app.use(morgan('combined'))

// Template Engine
app.engine('hbs', handlebars.engine({
  extname: '.hbs'
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

app.get('/', (req, res) => {
    res.render('home');
});
app.get('/news', (req, res) => {
  res.render('news');
});
 
app.listen(3000)