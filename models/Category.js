const db=require('../utils/db');
const tbnDanhMuc='the_loai_sach';
const run=db.errorhandle;

exports.getNameCategory=async(idCategory)=>{
    const sql=`SELECT * FROM ${tbnDanhMuc} WHERE '${idCategory}'=IDLOAISACH;`
    let [rows,err]=await run(db.load(sql));
    if(err){
        throw createError(err.status);
    }
    return rows;
}
exports.getListCategory=async()=>{
    const sql=`SELECT * FROM ${tbnDanhMuc}`
    let [rows,err]=await run(db.load(sql));
    if(err){
        throw createError(err.status);
    }
    return rows;
}
exports.updateCategory=async(DanhMuc)=>{
    const sql=`UPDATE ${tbnDanhMuc} SET TEN=? WHERE IDLOAISACH=?`
    let [row,err]=await run(db.UPDATE(sql,[DanhMuc.TEN,DanhMuc.ID]));
    if(err){
        throw createError(err.status);
    }
    return row;
};
exports.createCategory=async(Ten)=>{
    const sql= `INSERT INTO ${tbnDanhMuc} SET ?`;
    let id= await db.INSERT(sql,{TEN:Ten});
    return id;
}
