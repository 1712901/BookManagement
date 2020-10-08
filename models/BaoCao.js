const db = require('../utils/db');
const tbnQuiDinh = "qui_dinh";
const tbnPNS="phieu_nhap_sach";
const tbnLS="lich_su_nhap_sach";
const tbnBook = "sach";
const run = db.errorhandle;

exports.getBaoCaoTonKho = async (earlyMonth, endOfMonth) => {
    var eaMonth=new Date(earlyMonth);
    var enMonth=new Date(endOfMonth)
    var today=new Date();
    var strEaMonth=eaMonth.getFullYear()+'-'+(eaMonth.getMonth()+1)+'-'+eaMonth.getDate();
    var strEnMonth=enMonth.getFullYear()+'-'+(enMonth.getMonth()+1)+'-'+enMonth.getDate();
    //var strEnMonth=enMonth.getFullYear()+'-'+(enMonth.getMonth()+2)+'-01'
    var strTodayMonth=today.getFullYear()+'-'+(today.getMonth()+1)+'-'+(today.getDate()+1);

    const sql = `
    Select s.IDSACH,s.TEN,s.TACGIA,s.SOLUONG, coalesce(ps.PhatSinh,0) as PhatSinh,(s.SOLUONG - coalesce(psc.PhatSinh,0)) as TonCuoi,(s.SOLUONG- coalesce(psd.PhatSinh,0)) as TonDau from Sach as s
    left join 
        (Select  ns.IDSACH ,(coalesce(ns.SLNHAP,0)-coalesce(bs.SLBan,0)) as PhatSinh FROM (Select ls.IDSACH , sum(ls.SOLUONG) as  SLNhap from phieu_nhap_sach as pns , lich_su_nhap_sach as ls where pns.IDPHIEU=ls.IDPHIEUNHAP and  pns.THOIGIAN >= ${earlyMonth} and  pns.THOIGIAN < ${endOfMonth}  group by ls.IDSACH) as ns 
        left outer join
        (Select ls.IDSACH ,sum(ls.SOLUONG) as SLBan from hoa_don_ban_sach as hd , lich_su_ban_sach as ls where hd.IDHOADON=ls.IDHOADON and  hd.THOIGIAN >= '${strEaMonth}' and hd.THOIGIAN < '${strEnMonth}'  group by ls.IDSACH) as bs on ns.IDSACH=bs.IDSACH
        union
        Select  bs.IDSACH ,(coalesce(ns.SLNHAP,0)-coalesce(bs.SLBan,0)) as PhatSinh FROM (Select ls.IDSACH , sum(ls.SOLUONG) as  SLNhap from phieu_nhap_sach as pns , lich_su_nhap_sach as ls where pns.IDPHIEU=ls.IDPHIEUNHAP and  pns.THOIGIAN >=  ${earlyMonth} and pns.THOIGIAN < ${endOfMonth}  group by ls.IDSACH) as ns 
        right outer join
        (Select ls.IDSACH ,sum(ls.SOLUONG) as SLBan from hoa_don_ban_sach as hd , lich_su_ban_sach as ls where hd.IDHOADON=ls.IDHOADON and  hd.THOIGIAN >= '${strEaMonth}' and hd.THOIGIAN < '${strEnMonth}'  group by ls.IDSACH) as bs on ns.IDSACH=bs.IDSACH) 
        as ps on ps.IDSACH=s.IDSACH
    left join 
        (Select  ns.IDSACH ,(coalesce(ns.SLNHAP,0)-coalesce(bs.SLBan,0)) as PhatSinh FROM (Select ls.IDSACH , sum(ls.SOLUONG) as  SLNhap from phieu_nhap_sach as pns , lich_su_nhap_sach as ls where pns.IDPHIEU=ls.IDPHIEUNHAP and  pns.THOIGIAN >= ${endOfMonth} and pns.THOIGIAN < ${today.getTime()}  group by ls.IDSACH) as ns 
        left outer join
        (Select ls.IDSACH ,sum(ls.SOLUONG) as SLBan from hoa_don_ban_sach as hd , lich_su_ban_sach as ls where hd.IDHOADON=ls.IDHOADON and  hd.THOIGIAN >= '${strEnMonth}' and hd.THOIGIAN < '${strTodayMonth}'  group by ls.IDSACH) as bs on ns.IDSACH=bs.IDSACH
        union
        Select  bs.IDSACH ,(coalesce(ns.SLNHAP,0)-coalesce(bs.SLBan,0)) as PhatSinh FROM (Select ls.IDSACH , sum(ls.SOLUONG) as  SLNhap from phieu_nhap_sach as pns , lich_su_nhap_sach as ls where pns.IDPHIEU=ls.IDPHIEUNHAP and  pns.THOIGIAN >= ${endOfMonth} and pns.THOIGIAN < ${today.getTime()}  group by ls.IDSACH) as ns 
        right outer join
        (Select ls.IDSACH ,sum(ls.SOLUONG) as SLBan from hoa_don_ban_sach as hd , lich_su_ban_sach as ls where hd.IDHOADON=ls.IDHOADON and  hd.THOIGIAN >= '${strEnMonth}' and hd.THOIGIAN <'${strTodayMonth}'  group by ls.IDSACH) as bs on ns.IDSACH=bs.IDSACH)
        as psc on psc.IDSACH=s.IDSACH
    left join
        (Select  ns.IDSACH ,(coalesce(ns.SLNHAP,0)-coalesce(bs.SLBan,0)) as PhatSinh FROM (Select ls.IDSACH , sum(ls.SOLUONG) as  SLNhap from phieu_nhap_sach as pns , lich_su_nhap_sach as ls where pns.IDPHIEU=ls.IDPHIEUNHAP and  pns.THOIGIAN >= ${earlyMonth} and pns.THOIGIAN < ${today.getTime()}  group by ls.IDSACH) as ns 
        left outer join
        (Select ls.IDSACH ,sum(ls.SOLUONG) as SLBan from hoa_don_ban_sach as hd , lich_su_ban_sach as ls where hd.IDHOADON=ls.IDHOADON and  hd.THOIGIAN >= '${strEaMonth}' and hd.THOIGIAN < '${strTodayMonth}'  group by ls.IDSACH) as bs on ns.IDSACH=bs.IDSACH
        union
        Select  bs.IDSACH ,(coalesce(ns.SLNHAP,0)-coalesce(bs.SLBan,0)) as PhatSinh FROM (Select ls.IDSACH , sum(ls.SOLUONG) as  SLNhap from phieu_nhap_sach as pns , lich_su_nhap_sach as ls where pns.IDPHIEU=ls.IDPHIEUNHAP and  pns.THOIGIAN >= ${earlyMonth} and pns.THOIGIAN < ${today.getTime()}  group by ls.IDSACH) as ns 
        right outer join
        (Select ls.IDSACH ,sum(ls.SOLUONG) as SLBan from hoa_don_ban_sach as hd , lich_su_ban_sach as ls where hd.IDHOADON=ls.IDHOADON and  hd.THOIGIAN >= '${strEaMonth}' and hd.THOIGIAN < '${strTodayMonth}'  group by ls.IDSACH) as bs on ns.IDSACH=bs.IDSACH)
        as psd on psd.IDSACH=s.IDSACH;`;
        console.log(sql);
        let [rows,err]=await run(db.load(sql));
        if(err){
            throw createError(err.status);
        }
        return rows;
}