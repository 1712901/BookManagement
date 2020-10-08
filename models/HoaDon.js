const db=require('../utils/db');
const tbName="hoa_don_ban_sach";
const run=db.errorhandle;

exports.addHD=async (entity)=>{
    console.log(entity);
    const sql= `INSERT INTO ${tbName} SET ?`;
    let id= await db.INSERT(sql,entity);
    return id;
}

exports.updateHD = async (hoadon) =>{
    let sql = `UPDATE ${tbName} SET ? WHERE ${hoadon.IDHOADON} = IDHOADON`;
    let [rows,err] = await run(db.UPDATE(sql,hoadon));
    if (err){
        throw createError(err.status);
        console.log('Create success.');
    }
    return rows[0];
}


exports.getHD=async(id)=>{
    const sql=`SELECT * FROM ${tbName} WHERE '${id}'=IDHOADON`;
    let [rows,err]=await run(db.load(sql));
    if(err){
        throw createError(err.status);
    }
    return rows[0];
}

exports.getAll= async()=>{
    const sql=`SELECT * FROM ${tbName}`;
    let [rows,err]=await run(db.load(sql));
    if(err){
        throw createError(err.status);
    }
    return rows;
}