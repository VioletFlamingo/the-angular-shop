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
        if(err){return next(err);}

        res.json(data);
    });

});