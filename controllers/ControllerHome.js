var express = require('express');
var modelHome = require('../models/ModelHome');
var modelCategory = require('../models/Category');
var router = express.Router();

router.get('/',async (req, res, next)=>{
    
    const dataRow1=await modelHome.getBooksByCategory("1",4);
    const nameRow1=await modelCategory.getNameCategory("1");

    const dataRow2=await modelHome.getBooksByCategory("2",4);
    const nameRow2=await modelCategory.getNameCategory("2");

    const dataRow3=await modelHome.getBooksByCategory("3",4);
    const nameRow3=await modelCategory.getNameCategory("3");

    const data={
        dataCate1:dataRow1,
        nameCate1:nameRow1[0].TEN,
        dataCate2:dataRow2,
        nameCate2:nameRow2[0].TEN,
        dataCate3:dataRow3,
        nameCate3:nameRow3[0].TEN
    }
    res.render('home',data);
});

module.exports = router;