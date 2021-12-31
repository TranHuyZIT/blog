const newsRouter = require('./news');
const sitesRouter = require('./site');
const coursesRouter = require('./courses');
function route(app){
      
      app.use('/news', newsRouter);
      
      app.use('/courses', coursesRouter);

      app.use('/', sitesRouter);
      
}

module.exports = route;

