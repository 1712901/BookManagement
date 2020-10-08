const db=require('../utils/db');
const tbName="lich_su_ban_sach";
const run=db.errorhandle;

exports.addLS=async (entity)=>{
    console.log(entity);
    const sql= `INSERT INTO ${tbName} SET ?`;
    let id= await db.INSERT(sql,entity);
    return id;
}

exports.getLSbySach=async(id)=>{
    const sql=`SELECT * FROM ${tbName} WHERE '${id}'=IDHOADON`;
    let [rows,err]=await run(db.load(sql));
    if(err){
        throw createError(err.status);
    }
    return rows;
}

exports.getLSbyHD=async(id)=>{
    const sql=`SELECT * FROM ${tbName} WHERE '${id}'=IDHOADON`;
    let [rows,err]=await run(db.load(sql));
    if(err){
        throw createError(err.status);
    }
    return rows;
}

exports.getAll= async() =>{
    const sql=`SELECT * FROM ${tbName}`;
    let [rows,err]=await run(db.load(sql));
    if(err){
        throw createError(err.status);
    }
    return rows;
}