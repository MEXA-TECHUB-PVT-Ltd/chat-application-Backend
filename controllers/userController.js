
const UserModel = require("../models/usersModel")

exports.createUser = async (req, res) => {
    const {userName , first_name , last_name, phone_no , latest_verification_code , bio , image , online_status , admin_block_status , privacy , activity_status_id} = req.body;
    
    try {
      const newUser = await UserModel.create({
        userName,
        first_name,
        last_name,
        phone_no,
        latest_verification_code,
        bio,
        image,
        online_status,
        admin_block_status,
        privacy,
        activity_status_id

      });
  
      res.json(newUser);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };

  exports.getUsers = async(req,res)=>{

    const result= await UserModel.findByPk(req.params.userId, { include: ["status"] });
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

  exports.getAllUsers= async(req,res)=>{

    const result= await UserModel.findAll({ include: ["status"] });
    try{
      if(result){
        res.json({
          message:"All Users are fetched",
          result: result,
          statusCode:200
        })
      }
      else{
        res.json({
          message:"unable to fetch ,result is undefined",
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