const db=require('../utils/db');
const tbnBook="sach";
const tbnTheLoaiSach='the_loai_sach';
const run=db.errorhandle;

exports.SaveBook=async (book)=>{
    console.log(book);
    const sql= `INSERT INTO ${tbnBook} SET ?`;
    let id= await db.INSERT(sql,book);
    return id;
}
exports.getBook=async(id)=>{
    const sql=`SELECT * FROM ${tbnBook} WHERE '${id}'=IDSACH`;
    let [rows,err]=await run(db.load(sql));
    if(err){
        throw createError(err.status);
    }
    return rows[0];
}

exports.UpdateBookNoImage=async (book)=>{
    const sql=`UPDATE ${tbnBook} SET TEN=?,THELOAI=?,TACGIA=?,MIEUTA=? WHERE IDSACH=?`
    let [row,err]=await run(db.UPDATE(sql,[book.TEN,book.THELOAI,book.TACGIA,book.MIEUTA,book.ID]));
    if(err){
        throw createError(err.status);
    }
    return row;
};

exports.getNextID = async () => {
    const sql = `SELECT AUTO_INCREMENT 
    FROM information_schema.tables
    WHERE table_name = '${tbnBook}'
         and table_schema = database();`;
    let [rows, err] = await run(db.load(sql));
    if (err) {
        throw createError(err.status);
    }
    return rows[0];
};

exports.updateBook= async(entity)=>{
    let sql = `UPDATE sach SET ? WHERE ${entity.IDSACH} = IDSACH`;
    let [rows,err] = await run(db.UPDATE(sql,entity));
    if (err){
        throw createError(err.status);
    }
    return rows[0];
}
exports.FulltextSearch=async(text)=>{
    const sql=`Select s.IDSACH,s.TEN,s.IMAGE from ${tbnBook} as s
    left join ${tbnTheLoaiSach} as tl On s.THELOAI=tl.IDLOAISACH
    where match(s.TEN,s.TACGIA) AGAINST("${text}") or
    match(tl.TEN) AGAINST("${text}");`;
    let [rows, err] = await run(db.load(sql));
     if (err) {
         throw createError(err.status);
     }
     return rows;
 }
 exports.getNumberOfBook=async(idBook)=>{
    const sql=`SELECT SOLUONG FROM ${tbnBook} WHERE '${idBook}'=IDSACH`;
    let [rows,err]=await run(db.load(sql));
    if(err){
        throw createError(err.status);
    }
    return rows[0];
}

exports.UpdateBook=async (book)=>{
    const sql=`UPDATE ${tbnBook} SET TEN=?,THELOAI=?,TACGIA=?,IMAGE=?,MIEUTA=? WHERE IDSACH=?`;
    let [row,err]=await run(db.UPDATE(sql,[book.TEN,book.THELOAI,book.TACGIA,book.IMAGE,book.MIEUTA,book.ID]));
    if(err){
        throw createError(err.status);
    }
    return row;
};

exports.UpdateNumberofBook=async(book)=>{
    const oldBook=await this.getNumberOfBook(book.IDSACH);
    oldBook.SOLUONG=parseInt(oldBook.SOLUONG)+parseInt(book.SOLUONG);
    console.log(oldBook.SOLUONG);
    const sql =`UPDATE  ${tbnBook} SET SOLUONG=? WHERE IDSACH=?`;
     let [row,err]=await run(db.UPDATE(sql,[oldBook.SOLUONG,book.IDSACH]));
    if(err){
        throw createError(err.status);
    }
    return row;
}
exports.getListBook=async()=>{
    const sql=`SELECT * FROM ${tbnBook}`;
    let [rows,err]=await run(db.load(sql));
    if(err){
        throw createError(err.status);
    }
    return rows;
}
exports.filter=async(option)=>{

    var sql=`SELECT * FROM ${tbnBook} WHERE `;
    if(option.SoLuong == -1){
        sql+=` 1`;
    }else if(option.SoLuong == 3){
        sql+=` SOLUONG > 100 `;
    }else{
        sql+=` SOLUONG <= ${option.SoLuong*50} `;
    }
    sql+=' and '
    if(option.TheLoai ==-1){
        sql+= `1 ;`
    }else{
        sql+=`THELOAI=${option.TheLoai};`
    }
    let [rows,err]=await run(db.load(sql));
    if(err){
        throw createError(err.status);
    }
    return rows;

}

