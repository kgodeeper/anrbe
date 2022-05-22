const express  = require('express');
const router   = express.Router();
const path     = require('path');

const creation = require('./controller/creation');
const chapter  = require('./controller/chapter');
const vote     = require('./controller/vote');
const user     = require('./controller/user');
const { login_require } = require('./controller/mdware');

router.get('/image/:image',(req,res)=>{
     image_name = req.params.image;
     res.sendFile(path.join(__dirname,path.join('image',image_name)));
})

router.get('/get-creation/:id',(req,res)=>{
     return creation.get_creation(req,res);
});

router.get('/get-all-creation',(req,res)=>{
     return creation.get_all_creation(req,res);
})

router.get('/get-top-update',(req,res)=>{
     return creation.get_top_update_creation(req,res);
})

router.get('/get-creation-category/:id',(req,res)=>{
     return creation.get_creation_category(req,res);
})

router.get('/get-all-category',(req,res)=>{
     return creation.get_all_category(req,res);
})

router.get('/get-creation-by-category/:id',(req,res)=>{
     return creation.get_creation_by_category(req,res);
})

router.get('/get-creation-like/:id',(req,res)=>{
     return creation.get_creation_like(req,res);
})

router.get('/get-chapter-number/:id',(req,res)=>{
     return chapter.get_chapter_number(req,res);
})

router.get('/get-vote-info/:id',(req,res)=>{
     return vote.get_vote_info(req,res);
})

router.get('/get-chapter-list/:id',(req,res)=>{
     return chapter.get_chapter_list(req,res);
})

router.get('/get-chapter/:creation_id/:chapter',(req,res)=>{
     return chapter.get_chapter(req,res);
})

router.get("/get-creation-rank",(req,res)=>{
     return creation.get_creation_rank(req,res);
})

router.get("/creation-filter/:keyword",(req,res)=>{
     return creation.creation_filter(req,res);
})

router.post("/user-login",(req,res)=>{
     return user.user_login(req,res);
})

router.post("/user-register",(req,res)=>{
     return user.user_register(req,res);
})

router.get("/user-like/:creation",login_require,(req,res)=>{
     return vote.user_like(req,res);
})

router.post('/like-request',login_require,(req,res)=>{
     return vote.like_request(req,res);
})

router.post('/user-vote',login_require,(req,res)=>{
     return vote.add_vote(req,res);
})

router.get('/get-vote/:id',(req,res)=>{
     return vote.get_all_vote(req,res);
})

module.exports = router