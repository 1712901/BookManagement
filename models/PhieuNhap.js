const db=require('../utils/db');
const tbnPhieuNhap="phieu_nhap_sach";
const tbnChiTietPhieu="lich_su_nhap_sach";
const run=db.errorhandle;

exports.ThemPhieuNhap=async()=>{
    const sql= `INSERT INTO ${tbnPhieuNhap}(THOIGIAN) VALUES (?)`;
    console.log(Date.now());
    let [id,err]=await run(db.INSERT(sql,Date.now()));
    if(err){
        console.log(err);
        throw createError(err.status);
    }
    return id;
}
exports.ThemChiTietPhieuNhap=async(ChiTietPhieu)=>{
    const sql= `INSERT INTO ${tbnChiTietPhieu} SET ?`;
    let [row,err]=await run(db.INSERT(sql,ChiTietPhieu));
    if(err){
        console.log(err);
        throw createError(err.status);
    }
    return row;
}
exports.getDanhSachPhieu=async()=>{
    const sql=`SELECT * FROM ${tbnPhieuNhap}`;
    let [row,err]=await run(db.load(sql));
    if(err){
        console.log(err);
        throw createError(err.status);
    }
    return row;
}
exports.getChiTietPhieu=async(idphieu)=>{
    const sql=`SELECT * FROM ${tbnChiTietPhieu} WHERE IDPHIEUNHAP=${idphieu}`;
    let [row,err]=await run(db.load(sql));
    if(err){
        console.log(err);
        throw createError(err.status);
    }
    return row;
}