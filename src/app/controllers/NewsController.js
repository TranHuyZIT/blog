class NewsController{
    // GET /NEWS
    index(req, res){
        res.render('news');
    }
    show(req, res){
        res.send('NEWS DETAILS');
    }
}

module.exports = new NewsController;