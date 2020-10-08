const db=require('../utils/db');
const tbnBook = 'sach';
const tbnDanhMuc='the_loai_sach';
const run=db.errorhandle;

exports.getListBook=async ()=>{
    const sql=`SELECT * FROM ${tbnBook}`;
    let [rows,err]=await run(db.load(sql));
    if(err){
        throw createError(err.status);
    }
    return rows;
}
exports.getBooksByCategory=async(idCategory,nLimit)=>{
    var sql='';
    if(nLimit==null){
        sql=`SELECT * FROM ${tbnBook} WHERE '${idCategory}'=THELOAI;`
    }else{
        sql=`SELECT * FROM ${tbnBook} WHERE '${idCategory}'=THELOAI  ORDER BY THELOAI DESC LIMIT ${nLimit};`
    }
    let [rows,err]=await run(db.load(sql));
    if(err){
        throw createError(err.status);
    }
    return rows;
}
