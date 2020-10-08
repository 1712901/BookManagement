const db=require('../utils/db');
const run=db.errorhandle;

exports.getByUsername = async (username) => {
    let sql = `SELECT * FROM admin WHERE USERNAME = "${username}"`;
    const rs = await db.load(sql);
    if (rs.length > 0)
        return rs[0];
    return null;
}

exports.addUser = async (user) =>{
    let sql = `INSERT INTO admin SET ?`;
    const id = await db.INSERT(sql, user);
    return id;
}

exports.getById = async (id) => {
    let sql = `SELECT * FROM admin WHERE IDADMIN = ${id}`;
    const rs = await db.load(sql);
    if (rs.length > 0)
        return rs[0];
    return null;
}