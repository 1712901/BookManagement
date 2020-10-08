var express=require('express');
var modelBaoCao = require("../models/BaoCao");



var router=express.Router();

router.get('/TonSach',async(req,res,next)=>{



    res.render('BaoCaoTonKho');
});
router.post('/TonSach',async(req,res,next)=>{

    
    var date= new Date(req.body.date);
    var month=date.getMonth();
    var year=date.getFullYear();
    var nextMonth=month+1;
    var nextYear=year;
    if(nextMonth==12){
        nextMonth=1;
        nextYear+=1;
    }
    const earlyMonth=new Date(year,month,1);
    const endOfMonth=new Date(year,month+1,0);
    console.log(endOfMonth.getTime()+"-"+earlyMonth.getTime());
    const data= await modelBaoCao.getBaoCaoTonKho(earlyMonth.getTime(),endOfMonth.getTime());
    res.send(JSON.stringify(data));
});
module.exports = router;
