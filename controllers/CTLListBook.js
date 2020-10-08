var express = require('express');
var modelBook = require('../models/Book');
var modelCategory=require('../models/Category')
var router = express.Router();

router.get('/ListBook',async (req, res, next)=>{
    const listBook=await modelBook.getListBook();
    const listOption = await modelCategory.getListCategory();
    res.render('DanhSachSach',{listBook,listOption})
});

router.post('/ListBook',async(req,res,next)=>{

    const data =req.body;
    const row= await modelBook.filter(data);
    res.send(JSON.stringify(row));
});
module.exports = router;