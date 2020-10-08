const db=require('../utils/db');
const tbName="person";
const run=db.errorhandle;

exports.addKH=async (entity)=>{
    console.log(entity);
    const sql= `INSERT INTO ${tbName} SET ?`;
    let id= await db.INSERT(sql,entity);
    return id;
}

exports.getKH=async(id)=>{
    const sql=`SELECT * FROM ${tbName} WHERE '${id}'=IDPERSON`;
    let [rows,err]=await run(db.load(sql));
    if(err){
        throw createError(err.status);
    }
    return rows[0];
}


exports.searchKH = async (email) =>{
    const sql = `SELECT * FROM ${tbName} WHERE EMAIL = '${email}'`;
    let [rows,err]=await run(db.load(sql));
    if(err){
        throw createError(err.status);
    }
    if (rows.length > 0)
        return rows[0];
    return null;
}

exports.getAll = async()=>{
    const sql = `SELECT * FROM ${tbName}`;
    let [rows,err]=await run(db.load(sql));
    if(err){
        throw createError(err.status);
    }
    if (rows.length > 0)
        return rows;
    return null;
}

exports.updateKH = async (khachhang) =>{
    let sql = `UPDATE ${tbName} SET ? WHERE '${khachhang.IDPERSON}' = IDPERSON`;
    let [rows,err] = await run(db.UPDATE(sql,khachhang));
    if (err){
        throw createError(err.status);
        console.log('Create success.');
    }
    return rows[0];
}