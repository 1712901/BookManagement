var express=require('express');
var modelQuiDinh = require("../models/QuiDinh");
var modelBook=require("../models/Book");
const QDSLTonKhoCanNhap=2;
const QDSLNhapToiThieu=1;
const QDSLToiThieuSauKhiBan=3;
var router=express.Router();

router.post('/SLCanNhap',async(req,res,next)=>{
    const id=req.body.ID;
    const book=await modelBook.getBook(id);
    const quiDinh=await modelQuiDinh.getValueQuiDinh(QDSLTonKhoCanNhap);

    console.log(book.SOLUONG+"-"+quiDinh);
    if(book.SOLUONG<quiDinh){
        const quiDinh=await modelQuiDinh.getValueQuiDinh(QDSLNhapToiThieu);
        res.send(JSON.stringify({status:true,mess:'Success',min:quiDinh}));
    }else{
        res.send(JSON.stringify({status:false,mess:'fail'}))
    }
});
router.post('/SLToiThieuSauKhiBan',async(req,res,next)=>{
    const id=req.body.ID;
    const book=await modelBook.getBook(id);
    const quiDinh=await modelQuiDinh.getValueQuiDinh(QDSLToiThieuSauKhiBan);

    console.log(book.SOLUONG+"-"+quiDinh);
    if(book.SOLUONG>quiDinh){
        //const quiDinh=await modelQuiDinh.getValueQuiDinh(QDSLNhapToiThieu);
        res.send(JSON.stringify({status:true,mess:'Success',max:(book.SOLUONG-quiDinh)}));
    }else{
        res.send(JSON.stringify({status:false,mess:'fail'}))
    }
});
router.get('/MinSLNhap',async(req,res,next)=>{
    const quiDinh=await modelQuiDinh.getValueQuiDinh(QDSLNhapToiThieu);
    res.send(JSON.stringify({value:quiDinh}));
});
router.get('/',async(req,res,next)=>{
    const QuiDinh=await modelQuiDinh.getQuiDinh();
    res.render('QuiDinh',{QuiDinh});
});
router.post('/UpdateQD',async(req,res,next)=>{
    const data=req.body;
    for(var key in data) {
        var value = data[key];
        await modelQuiDinh.UpdateQD([value,key]);
        console.log(key+"-"+value);
    }
    
    res.send(data);
})

module.exports=router;