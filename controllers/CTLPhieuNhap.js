var express=require('express');
var modelBook = require('../models/Book');
var modelCategory=require('../models/Category')
var modelPhieuNhap=require('../models/PhieuNhap')

var router=express.Router();


router.get('/PhieuNhap',async(req,res,next)=>{
    const listOption = await modelCategory.getListCategory();
    res.render('PhieuNhapSach',{listOption});
});
router.post('/addPhieu',async(req,res,next)=>{
    let data=req.body.Phieu;
    console.log(data);
    const idPhieu=await modelPhieuNhap.ThemPhieuNhap();
    //const idPhieu=1;
    data.forEach(item => {
        // Cập nhật số sách hiện có 
        modelBook.UpdateNumberofBook(item);
        // Thêm vào data chi tiết phiếu nhập
        item.IDPHIEUNHAP=idPhieu;
        modelPhieuNhap.ThemChiTietPhieuNhap({IDPHIEUNHAP:idPhieu,IDSACH:item.IDSACH,SOLUONG:item.SOLUONG});
    });
    res.send(JSON.stringify({status:200,mess:"success"}));
});
router.get('/LichSuNhapSach',async(req,res,next)=>{
    const danhSachPhieu=await modelPhieuNhap.getDanhSachPhieu();
    res.render('LichSuPhieuNhap',{danhSachPhieu});
});
router.get('/LichSuNhapSach/idPhieu=:idPhieu',async(req,res,next)=>{
    //const idPhieu=JSON.parse();;
    const idPhieu=req.params.idPhieu;
    console.log(idPhieu);
    const chiTiet=await modelPhieuNhap.getChiTietPhieu(idPhieu);
    console.log(chiTiet);
    chiTiet.forEach(async e => {
        const sach=await modelBook.getBook(e.IDSACH);
        e.TEN=sach.TEN;
        console.log(e);
    });
    for(let i=0;i<chiTiet.length;i++){
        const sach=await modelBook.getBook(chiTiet[i].IDSACH);
        chiTiet[i].TEN=sach.TEN;
        console.log(chiTiet[i]);
    }
    res.send(JSON.stringify(chiTiet));
});

module.exports=router;