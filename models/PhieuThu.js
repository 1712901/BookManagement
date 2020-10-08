const db=require('../utils/db');
const tbName="phieu_thu";
const run=db.errorhandle;

exports.addPhieu=async (entity)=>{
    console.log(entity);
    const sql= `INSERT INTO ${tbName} SET ?`;
    let id= await db.INSERT(sql,entity);
    return id;
}


exports.getPhieu=async(id)=>{
    const sql=`SELECT * FROM ${tbName} WHERE '${id}'=IDPHIEU`;
    let [rows,err]=await run(db.load(sql));
    if(err){
        throw createError(err.status);
    }
    return rows[0];
}


