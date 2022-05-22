const con = require('./db');

const strformat = (d)=>{
     d.setTime(d.getTime() + (7*60*60*1000));
     return(
          [
          d.getFullYear(),  
          d.getMonth()+1,
          d.getDate(),
          ].join('-')+' '+
          [d.getHours(),
          d.getMinutes(),
          d.getSeconds()].join(':')
          + '.' + d.getMilliseconds()
     )
}

const get_vote_info = (id)=>{
     return new Promise((rs,rj)=>{
          sql = `SELECT * FROM tbl_vote WHERE creation = ${id}`;
          con.query(sql,(error,result)=>{
               if(error) rj(error)
               else{
                    avg = 0;
                    num = 0;
                    for(let i = 0; i < result.length; i++){
                         avg = avg + (Number)(result[i].vote);
                         if(result[i].vote_comment != null){
                              num++;
                         }
                    }
                    avg = avg / result.length;
                    avg = Math.round(avg * 10)/10;
                    rs({
                         avg,
                         num
                    });
               }
          })
     })
}

const user_like = (creation,token)=>{
     return new Promise((rs,rj)=>{
          sql = `SELECT tbl_like.creation,tbl_like.username FROM tbl_like INNER JOIN tbl_user ON tbl_like.username = tbl_user.username WHERE tbl_like.creation = ${creation} AND tbl_user.token = '${token}'`;
          con.query(sql,(error,result)=>{
               if(error){
                    rj(error);
               }else{
                    if(result.length > 0){
                         rs(result[0]);
                    }else{
                         rs({
                              creation:-1,
                              username:''
                         })
                    }
               }
          })
     })
}

const like_request = (creation,token,username)=>{
     return new Promise((rs,rj)=>{
          user_like(creation,token)
          .then((data)=>{
               if(data.username == ""){
                    sql = `INSERT INTO tbl_like(creation,username) VALUES('${creation}','${username}')`;
                    con.query(sql,(error)=>{
                         if(error) rj(error);
                    })
               }else{
                    sql = `DELETE FROM tbl_like WHERE username='${username}' AND creation = '${creation}'`;
                    con.query(sql,(error)=>{
                         if(error) rj(error);
                    })
               }
               sql = `SELECT COUNT(*) as cnt FROM tbl_like WHERE creation='${creation}'`;
               con.query(sql,(error,result)=>{
                    if(error) rj(error);
                    else{
                         count = result[0].cnt;
                         sql = `UPDATE tbl_creation_like SET creation_like = ${count} WHERE creation=${creation}`;
                         con.query(sql,(error)=>{
                              if(error) rj(error);
                              else{
                                   rs({
                                        username,
                                        creation
                                   })
                              }
                         })
                    }
               })
          }).catch((error)=>rj(error));
     })
}

const add_vote = (creation,account,vote,comment)=>{
     return new Promise((rs,rj)=>{
          sql = `SELECT * FROM tbl_vote WHERE creation = ${creation} AND account='${account}'`;
          con.query(sql,(error,result)=>{
               if(error){
                    rj(error);
               }else{
                    if(result.length > 0){
                         sql = `UPDATE tbl_vote SET vote='${vote}',vote_comment='${comment}',
                         update_at = '${strformat(new Date())}'
                         WHERE creation = ${creation} AND account='${account}'`;
                         con.query(sql,(error)=>{
                              console.log({error});
                              error ? rj(error) : rs();
                         })
                    }else{
                         sql = `INSERT INTO tbl_vote(creation,account,vote,vote_comment,update_at) 
                         VALUES('${creation}','${account}','${vote}','${comment}','${strformat(new Date())}')`;
                         con.query(sql,(error)=>{
                              console.log({error});
                              error ? rj(error) : rs();
                         })
                    }
               }
          })
     })
}

const get_all_vote = (id)=>{
     return new Promise((rs,rj)=>{
          sql = `SELECT creation,account,vote,vote_comment,update_at FROM tbl_vote WHERE creation=${id}
          ORDER BY date(update_at) DESC`;
          con.query(sql,(error,result)=>{
               if(error) rj(error);
               else{
                    rs(result);
               }
          })
     })
}

module.exports = {
     get_vote_info,
     user_like,
     like_request,
     add_vote,
     get_all_vote
}