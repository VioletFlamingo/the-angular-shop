var express = require('express');
var router = express.Router();

module.exports = router;
var mongo = require('mongojs');
var db = mongo('shop');
var coll  = db.collection('products');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'SHOP' });
});

router.get('/products', function(req, res, next) {
    coll.find(function(err, data) {
        if(err){ return next(err); }

        res.json(data);
    });

});

router.get('/products/:product', function(req, res) {
    var id = req.params.product;
    coll.find({_id: parseInt(id)}, function(err, data) {
        res.json(data);
    });
});

router.get('/tags', function(req, res) {
    coll.aggregate(
    {'$unwind':'$tags'},
        {'$project':{
            '_id':0,
            'tagi':'$tags'
            }},
            {'$group':{
                '_id':'',
                'tags':{'$addToSet':'$tagi'}
                }}
    , function(err, data) {
        res.json(data[0].tags);
    });
});