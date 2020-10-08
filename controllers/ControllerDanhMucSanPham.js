var express = require('express');
var modelCategory = require('../models/Category');
var router = express.Router();

router.get('/DanhMucSanPham', async (req, res, next) => {

    const category=await modelCategory.getListCategory();
    res.render('DanhMucSanPham',{data:category});
});
router.post('/DanhMucSanPham/Update',async(req,res,next)=>{
    let danhMuc={
        ID:req.body.IDDanhMuc,
        TEN:req.body.TEN
    };
    console.log(danhMuc);
    const row=await modelCategory.updateCategory(danhMuc);
    res.redirect('/admin/DanhMucSanPham');
});
router.post('/DanhMucSanPham/Create',async(req,res,next)=>{
    let ten=req.body.TEN;
    const row=await modelCategory.createCategory(ten);
    res.redirect('/admin/DanhMucSanPham');
});
module.exports = router;