var express=require('express');
var khModel = require("../models/khachhang");
var hdModel = require("../models/HoaDon");
var pttModel = require("../models/PhieuThu");

var router=express.Router();

router.get('/KhachHang', async (req,res,next)=>{
    const allKH = await khModel.getAll();
    res.render('KhachHang', {
        khachhang: allKH,
    });
});
router.post('/KhachHang/NewPerson',async(req,res,next)=>{
    var KH={
        HOTEN:req.body.name,
        SODIENTHOAI:req.body.phonenumber,
        EMAIL:req.body.email,
        DIACHI:req.body.address
    }
    const id=await khModel.addKH(KH);
    res.send("ok");
});
module.exports = router;