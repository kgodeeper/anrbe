const con = require('./db');

const get_chapter_number = (id)=>{
     return new Promise((rs,rj)=>{
          sql = `SELECT COUNT(*) as number FROM tbl_chapter WHERE creation = ${id}`;
          con.query(sql,(err,res)=>{
               if(err) rj(err);
               else rs(res[0]);
          })
     })
}

const get_chapter_list = (id)=>{
     return new Promise((rs,rj)=>{
          sql = `SELECT chapter,name,content FROM tbl_chapter WHERE creation = ${id}`;
          con.query(sql,(err,res)=>{
               if(err) rj(err);
               else{
                    for(let i = 0; i < res.length; i++){
                         res[i].content = '';
                    }
                    rs(res);
               }
          })
     })
}

const get_chapter = (creationid,chapterid)=>{
     return new Promise((rs,rj)=>{
          sql = `SELECT chapter,name,content FROM tbl_chapter WHERE creation = ${creationid} AND chapter = ${chapterid}`;
          con.query(sql,(error,result)=>{
               if(error) rj(error);
               else{
                    data = result[0];
                    rs(data);
               }
          })
     })
}

module.exports = {
     get_chapter_number,
     get_chapter_list,
     get_chapter
}