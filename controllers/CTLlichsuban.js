var express=require('express');
var bookModel = require("../models/Book");
var hdModel = require("../models/HoaDon");
var khModel = require("../models/khachhang");
var lsbModel = require("../models/lichsuban");

var router=express.Router();

router.get('/LichSuBanSach', async (req,res,next)=>{
    const lsbs = await lsbModel.getAll();
    for (let lsb of lsbs){
        const tmp1 = await bookModel.getBook(lsb.IDSACH);
        const tmp3 = await hdModel.getHD(lsb.IDHOADON);
        const tmp2 = await khModel.getKH(tmp3.IDKHACHHANG);
        lsb.TenSach = tmp1.TEN;
        lsb.TheLoai = tmp1.THELOAI;
        lsb.TacGia = tmp1.TACGIA;
        lsb.TongTien = tmp3.TONGTIEN;
        lsb.ThoiGian =GetFormattedDate(tmp3.THOIGIAN);
        lsb.TenKH = tmp2.HOTEN;
        lsb.EmailKH = tmp2.EMAIL;
    }
    res.render('Lichsuban',{
        lsb: lsbs
    });
});

function GetFormattedDate(time) {
    let formatted_date = time.getDate() + "/" + (time.getMonth() + 1) + "/" + time.getFullYear()
    return formatted_date;
}
module.exports = router;