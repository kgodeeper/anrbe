const { response } = require('express');
const chapterDAO = require('../dao/chapter');

const get_chapter_number = (req,res)=>{
     id = req.params.id;
     chapterDAO.get_chapter_number(id)
     .then((data)=>{
          res.status(200).json(data)
     })
     .catch((error)=>{
          res.status(500).json({error});
     })
}

const get_chapter_list = (req,res)=>{
     id = req.params.id;
     chapterDAO.get_chapter_list(id)
     .then((data)=>{
          res.status(200).json({chapters:data});
     })
     .catch((error)=>{
          res.status(500).json({error});
     })
}

const get_chapter = (req,res)=>{
     creationid = req.params.creation_id;
     chapterid  = req.params.chapter;
     chapterDAO.get_chapter(creationid,chapterid)
     .then((data)=>{
          res.status(200).json(data);
     })
     .catch((error)=>{
          res.status(500).json({error});
     })
}

module.exports = {
     get_chapter_number,
     get_chapter_list,
     get_chapter
}