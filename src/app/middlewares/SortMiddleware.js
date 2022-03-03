module.exports = function (req, res, next){
    // Store local variables within one req/res cycle.
    res.locals._sort = {
        enabled : false,
        type: 'default'
    };
    if (req.query.hasOwnProperty('_sort')){
        // res.locals._sort.enabled = true;
        // res.locals._sort.type = req.query.type;
        // res.locals._sort.column = req.query.column;
        const isValidType = ['asc', 'desc'].includes(req.query.type);
        Object.assign(res.locals._sort, {
            enabled : true,
            type: (isValidType ? req.query.type : 'desc'),
            column: req.query.column
        });
    }

    next();
}