var express = require('express');
var modelBook = require('../models/Book');

var router = express.Router();

router.get('/search',async (req,res,err)=>{
    let text=req.query.search;
    const searchReslt=await modelBook.FulltextSearch(text);
    res.render('Search',{searchReslt})
});

module.exports = router;