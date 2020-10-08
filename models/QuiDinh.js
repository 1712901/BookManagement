const db=require('../utils/db');
const tbnQuiDinh="qui_dinh";
const run=db.errorhandle;

exports.getValueQuiDinh=async (id)=>{
    const sql=`SELECT * FROM ${tbnQuiDinh} WHERE '${id}'=IDQUIDINH`;
    let [rows,err]=await run(db.load(sql));
    if(err){
        throw createError(err.status);
    }
    return rows[0].GIATRIQD;
}
exports.getQuiDinh=async()=>{
    const sql=`SELECT * FROM ${tbnQuiDinh}`;
    let [rows,err]=await run(db.load(sql));
    if(err){
        throw createError(err.status);
    }
    return rows;
};
exports.UpdateQD=async(data)=>{
    const sql=`UPDATE ${tbnQuiDinh} SET GIATRIQD=? WHERE IDQUIDINH=? `;
    let [rows,err]=await run(db.UPDATE(sql,data));
    if(err){
        throw createError(err.status);
    }
    return rows;
}