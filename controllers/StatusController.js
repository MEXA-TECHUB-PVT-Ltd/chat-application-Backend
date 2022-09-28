
 

 const StatusModel= require("../models/statusModel")


 exports.getStatusById = async(req,res)=>{

    const result= await StatusModel.findByPk(req.params.statusId, { include: ["Users"] });
    try{
      if(result){
        res.json({
          message:"Result has fetched",
          result: result
        })
      }
    }
    catch(err){
      res.json({
        message:"error occurred while fetching",
        Error:err,
        errorMessage:err.message,
        statusCode:404
      })
    }
    
  }

    
    exports.createStatus = async (req, res) => {
        const {name} = req.body;
        console.log(name)
        try {
          const newStatus = await StatusModel.create({
            name:name
          });
      
          res.json(newStatus);
        } catch (error) {
          return res.status(500).json({ message: error.message });
        }
      };
    

