const e = require('express');
const con = require('./db');

const get_creation = (id)=>{
     return new Promise((rs,rj)=>{
          sql = `SELECT tbl_creation.id, tbl_creation.image,tbl_creation.name, tbl_author.fullname AS author,tbl_creation.description FROM tbl_creation INNER JOIN tbl_author ON tbl_author.id = tbl_creation.author
          WHERE tbl_creation.id = ${id}`;
          con.query(sql,(error,result)=>{
               error ? rj(error) : rs(result);
          })
     })
}

const get_creation_category = (id)=>{
     return new Promise((rs,rj)=>{
          sql = `SELECT tbl_category.id,tbl_category.name FROM tbl_category INNER JOIN tbl_creation_category ON tbl_creation_category.category = tbl_category.id WHERE tbl_creation_category
          .creation = ${id}`;
          con.query(sql,(error,result)=>{
               error ? rj(error) : rs(result);
          })
     })
}

const get_all_creation = ()=>{
     return new Promise((rs,rj)=>{
          sql = `SELECT tbl_creation.id, tbl_creation.image,tbl_creation.name, tbl_author.fullname AS author,tbl_creation.description FROM tbl_creation INNER JOIN tbl_author ON tbl_author.id = tbl_creation.author LIMIT 0,5`;
          con.query(sql,(error,result)=>{
               if(error) return rj(error);
               for(let i = 0; i < result.length; i++){
                    result[i].author = {
                         id: 0,
                         fullname: result[i].author,
                         phone: ''
                    }
                    result[i].category = []
               }
               return rs(result);
          })
     })
}

const get_top_update = ()=>{
     return new Promise((rs,rj)=>{
          sql = `SELECT tbl_creation.id,tbl_creation.name,tbl_creation.image,tbl_author.fullname AS author,tbl_creation.description 
          FROM tbl_creation 
          INNER JOIN tbl_author ON tbl_author.id = tbl_creation.author 
          INNER JOIN tbl_creation_status ON tbl_creation_status.creation = tbl_creation.id 
          ORDER BY date(tbl_creation_status.update_at) DESC LIMIT 0,10`;
          con.query(sql,(error,result)=>{
               if(error) return rj(error);
               for(let i = 0; i < result.length; i++){
                    result[i].author = {
                         id: 0,
                         fullname: result[i].author,
                         phone: ''
                    }
                    result[i].category = []
               }
               return rs(result);
          })
     })
}

const get_all_category = ()=>{
     return new Promise((rs,rj)=>{
          sql = `SELECT * FROM tbl_category`;
          con.query(sql,(error,result)=>{
               error ? rj(error) : rs(result);
          })
     })
}

const get_creation_by_category = (id)=>{
     return new Promise((rs,rj)=>{
          sql = `SELECT tbl_creation.id, tbl_creation.name, tbl_creation.image, tbl_author.fullname as author FROM tbl_creation_category 
          INNER JOIN tbl_creation ON tbl_creation.id = tbl_creation_category.creation 
          INNER JOIN tbl_category ON tbl_creation_category.category = tbl_category.id 
          INNER JOIN tbl_author ON tbl_author.id = tbl_creation.author 
          WHERE tbl_creation_category.category = ${id}`;
          con.query(sql,(error,result)=>{
               if(error) rj(error);
               else{
                    for(let i = 0; i < result.length; i++){
                         result[i].author = {
                              id: 0,
                              fullname: result[i].author,
                              phone: ''
                         }
                         result[i].category = []
                    }
                    return rs(result);
               }
          })
     })
}

const get_creation_like = (id)=>{
     return new Promise((rs,rj)=>{
          sql = `SELECT creation_like as \`like\` FROM tbl_creation_like WHERE creation=${id}`;
          con.query(sql,(error,result)=>{
               if(error) rj(error);
               else rs(result[0]);
          })
     })
}

const get_creation_rank = ()=>{
     return new Promise((rs,rj)=>{
          sql = `SELECT tbl_creation.id, tbl_creation.image,tbl_creation.name, tbl_author.fullname AS author,tbl_creation.description 
          FROM tbl_creation 
          INNER JOIN tbl_author ON tbl_author.id = tbl_creation.author 
          INNER JOIN tbl_creation_like ON tbl_creation_like.creation = tbl_creation.id 
          ORDER BY tbl_creation_like.creation_like DESC
          LIMIT 0,10`;
          con.query(sql,(error,result)=>{
               if(error) rj(error);
               else{
                    for(let i = 0; i < result.length; i++){
                         result[i].author = {
                              id: 0,
                              fullname: result[i].author,
                              phone: ''
                         }
                         result[i].category = []
                    }
                    return rs(result);
               }
          })
     })
}

const creation_filter = (keyword)=>{
     return new Promise((rs,rj)=>{
          sql = `SELECT tbl_creation.id, tbl_creation.image,tbl_creation.name, tbl_author.fullname AS author,tbl_creation.description 
          FROM tbl_creation 
          INNER JOIN tbl_author ON tbl_author.id = tbl_creation.author 
          WHERE tbl_creation.name LIKE '%${keyword}%' OR tbl_author.fullname LIKE '%${keyword}%'`;
          con.query(sql,(error,result)=>{
               if(error) rj(error);
               else{
                    for(let i = 0; i < result.length; i++){
                         result[i].author = {
                              id: 0,
                              fullname: result[i].author,
                              phone: ''
                         }
                         result[i].category = []
                    }
                    return rs(result);
               }
          })
     })
}

module.exports = {
     get_creation,
     get_creation_category,
     get_all_creation,
     get_top_update,
     get_all_category,
     get_creation_by_category,
     get_creation_like,
     get_creation_rank,
     creation_filter
}