const creationDAO = require('../dao/creation');

const get_creation = (req,res)=>{
     id = req.params.id;
     creationDAO.get_creation(id)
     .then((data)=>{
          creation = data[0];
          creationDAO.get_creation_category(id)
          .then((data)=>{
               res.status(200).json({
                    id: creation.id,
                    name: creation.name,
                    image: creation.image,
                    author:{
                         id: 0,
                         fullname: creation.author,
                         phone: null
                    },
                    description: creation.description,
                    category: data
               })
          })
          .catch((error)=>{
               res.status(500).json({error});
          })
     })
     .catch((error)=>{
          res.status(500).json({error});
     })
}

const get_all_creation = (req,res)=>{
     creationDAO.get_all_creation()
     .then((data)=>{
          res.status(200).json({
               creations: data
          })
     })
     .catch((error)=>{
          res.status(500).json({error});
     })
}

const get_top_update_creation = (req,res)=>{
     creationDAO.get_top_update()
     .then((data)=>{
          res.status(200).json({
               creations: data
          })
     })
     .catch((error)=>{
          res.status(500).json({error});
     })
}

const get_creation_category = (req,res)=>{
     id = req.params.id;
     creationDAO.get_creation_category(id)
     .then((data)=>{
          res.status(200).json({
              categories:data
          })
     })
     .catch((error)=>{
          res.status(500).json({error});
     })
}

const get_all_category = (req,res)=>{
     creationDAO.get_all_category()
     .then((data)=>{
          res.status(200).json({
               categories:data
           })
     })
     .catch((error)=>{
          res.status(500).json({error});
     })
}

const get_creation_by_category = (req,res)=>{
     id = req.params.id;
     creationDAO.get_creation_by_category(id)
     .then((data)=>{
          res.status(200).json({
               creations: data
          })
     })
     .catch((error)=>{
          res.status(500).json({error});
     })
}

const get_creation_like = (req,res)=>{
     id = req.params.id;
     creationDAO.get_creation_like(id)
     .then((data)=>{
          res.status(200).json(data)
     })
     .catch((error)=>{
          res.status(500).json(error)
     })
}

const get_creation_rank = (req,res)=>{
     creationDAO.get_creation_rank()
     .then((data)=>{
          res.status(200).json({creations:data})
     })
     .catch((error)=>{
          res.status(500).json(error)
     })
}

const creation_filter = (req,res)=>{
     keyword = req.params.keyword;
     creationDAO.creation_filter(keyword)
     .then((data)=>{
          res.status(200).json({creations:data})
     })
     .catch((error)=>{
          res.status(500).json(error)
     })
}

module.exports = {
     get_creation,
     get_all_creation,
     get_top_update_creation,
     get_creation_category,
     get_all_category,
     get_creation_by_category,
     get_creation_like,
     get_creation_rank,
     creation_filter
}