var express=require('express');
var khModel = require("../models/khachhang");
var hdModel = require("../models/HoaDon");
var pttModel = require("../models/PhieuThu");

var router=express.Router();

router.get('/PhieuThuTien',(req,res,next)=>{
    let KH = req.query;
    if (KH===undefined)
    res.render('PhieuThuTien', {
        TenKH: null,
        EmailKH: null,
        NgayThu: new Date().toJSON().slice(0,10).replace(/-/g,'/'),
    });
    else res.render('PhieuThuTien', {
        TenKH: KH.tenKH,
        EmailKH: KH.emailKH,
        NgayThu: new Date().toJSON().slice(0,10).replace(/-/g,'/'),
    });
});



router.post('/PhieuThuTien', async (req, res, next) => {
    const nameKH = req.body.Name;
    const emailKH = req.body.Email;
    const phoneKH = req.body.Phone;
    const addrKH = req.body.Address;
    const NgayThu = new Date(req.body.NgayThu);
    const money = req.body.Money;
    const temp = req.query;
    const tong = parseInt(temp.tongtien);
    let idHD = temp.idHD;
    const tiendu = tong - money;
    let KH = await khModel.searchKH(emailKH);
    if (idHD === undefined){
        KH.TIENNO = KH.TIENNO - money;
        const newKH = await khModel.updateKH(KH);
        idHD=null;
    }
    else{
    if (KH===null){
    const newKH = {
        HOTEN: nameKH,
        SODIENTHOAI: phoneKH,
        EMAIL: emailKH,
        DIACHI: addrKH,
        TIENNO: tiendu }
        const khID = await khModel.addKH(newKH);
        console.log(khID);
        let oldHD = await hdModel.getHD(idHD);
        oldHD.IDKHACHHANG = khID;
        const row = await hdModel.updateHD(oldHD);
    }
    else if (tiendu != 0){
        KH.TIENNO = KH.TIENNO + tiendu;
        const newKH = await khModel.updateKH(KH);
    }
    }
    const pttID = await pttModel.addPhieu({
        HOADONBANSACH: idHD,
        THOIGIAN: NgayThu,
        SOTIENTHU: money
    })
    res.render("PhieuThuTien", {
        NgayThu: new Date().toJSON().slice(0,10).replace(/-/g,'/'),
    });
});

module.exports=router;