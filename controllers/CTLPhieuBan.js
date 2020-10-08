var express=require('express');
var bookModel = require("../models/Book");
var khModel = require("../models/khachhang");
var hdModel = require("../models/HoaDon");
var lsbModel = require("../models/lichsuban");
var catModel = require("../models/Category");

var router=express.Router();

router.get('/PhieuBan',(req,res,next)=>{
    res.render('PhieuBanSach');
});

function GetFormattedDate(time) {
    let formatted_date = time.getDate() + "/" + (time.getMonth() + 1) + "/" + time.getFullYear()
    return formatted_date;
}

router.get('/ListHoaDon', async (req,res,next)=>{
    const listHD = await hdModel.getAll();
    for (let list of listHD){
        let tmp1 = await lsbModel.getLSbyHD(list.IDHOADON);
        let nBook = [], cBook =[] , listSL = [];
        for (let tmp of tmp1){
            let x = await bookModel.getBook(tmp.IDSACH);
            let y = await catModel.getNameCategory(x.THELOAI);
            nBook.push(x.TEN);
            cBook.push(y[0].TEN);
            listSL.push(tmp.SOLUONG);
        }
        let tmp3 = await khModel.getKH(list.IDKHACHHANG);
        list.TENSACH = nBook;
        list.THELOAI = cBook;
        list.SOLUONG = listSL;
        list.TENKHACHHANG = tmp3.HOTEN;
        list.THOIGIAN = GetFormattedDate(list.THOIGIAN);
    }
    res.render('ListHoaDon', {
        listHDs: listHD
    })
})

router.post('/PhieuBan', async (req,res,next)=>{
    let str = JSON.stringify(req.body.mydiv);
    str = str.substring(1, str.length - 1);
    console.log(str + "abc");
    let keys = [], keyvalues = [];
    let start = 0, end = str.indexOf(" ");
    const tenKH = req.body.ten;
    const emailKH = req.body.Email;
    while (end != -1){
        keys.push(parseInt(str.substring(start, end)));
        start = end+1;
        end = str.indexOf(" ", start);
        keyvalues.push(parseInt(str.substring(start, end)));
        start = end+1;
        end = str.indexOf(" ", start);
    }
    let tong= 0;
    for ( let i = 0; i < keys.length ;i++ ){
        let book = await bookModel.getBook(parseInt(keys[i]));
        if (book.SOLUONG >= keyvalues[i]){
        book.SOLUONG = book.SOLUONG - keyvalues[i];
        const rows = await bookModel.updateBook(book);
        tong = tong + parseInt(book.GIA) * parseInt(keyvalues[i]);
        }
    }
    let KH= await khModel.searchKH(emailKH);
    let newHD = {
        THOIGIAN: new Date().toJSON().slice(0,10).replace(/-/g,'/'),
        TONGTIEN: tong,
        IDKHACHHANG: null
    }
    if (KH!=null)
        newHD.IDKHACHHANG = KH.IDPERSON;
    const idHD = await hdModel.addHD(newHD);
    for (let i = 0; i < keys.length; i++){
        const row = await lsbModel.addLS({
            IDHOADON: idHD,
            IDSACH: keys[i],
            SOLUONG: keyvalues[i]
        });
    }
    res.redirect(`/admin/PhieuThuTien?tenKH=${tenKH}&emailKH=${emailKH}&tongtien=${tong}&idHD=${idHD}`);
});


module.exports=router;