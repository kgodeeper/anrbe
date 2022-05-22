const voteDAO = require('../dao/vote');

const get_vote_info = (req,res)=>{
     id = req.params.id;
     voteDAO.get_vote_info(id)
     .then((data)=>{
          res.status(200).json(data);
     })
     .catch((error)=>{
          res.status(500).json({error});
     })
}

const user_like = (req,res)=>{
     token = req.get('Authorization').split(' ')[1];
     creation = req.params.creation;
     voteDAO.user_like(creation,token)
     .then((data)=>{
          res.status(200).json(data);
     })
     .catch((error)=>{
          res.status(500).json({error});
     })
}

const like_request = (req,res)=>{
     creation = req.body.creation;
     username = req.body.username;
     token = req.get('Authorization').split(' ')[1];
     voteDAO.like_request(creation,token,username)
     .then(()=>{
          res.status(200).json({username,creation});
     })
     .catch((error)=>{
          res.status(500).json({error});
     })
}

const add_vote = (req,res)=>{
     creation = req.body.creation;
     account  = req.body.account;
     vote     = req.body.vote;
     comment  = req.body.vote_comment;
     voteDAO.add_vote(creation,account,vote,comment)
     .then(()=>{
          res.status(200).json({
               creation,
               account,
               vote,
               comment
          });
     })  
     .catch((error)=>{
          res.status(500).json({error});
     })
}

const get_all_vote = (req,res)=>{
     id = req.params.id;
     voteDAO.get_all_vote(id)
     .then((data)=>{
          res.status(200).json(data);
     })
     .catch((error)=>{
          res.status(500).json({error});
     })
}

module.exports = {
     get_vote_info,
     user_like,
     like_request,
     add_vote,
     get_all_vote
}