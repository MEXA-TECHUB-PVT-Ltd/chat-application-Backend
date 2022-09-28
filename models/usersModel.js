

const DataTypes= require("sequelize")
const sequelize = require("../models/index.js").sequelize;

    const User = sequelize.define("User", {
      id: {
        type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
      },
      userName: {
        type: DataTypes.STRING
      },
      first_name: {
        type: DataTypes.STRING
      },
      last_name: {
        type: DataTypes.STRING
      },
      phone_no:{
        type: DataTypes.STRING,
      },
      latest_verification_code:{
        type:DataTypes.STRING
      },
      bio:{
        type: DataTypes.STRING
      },
      image:{
        type: DataTypes.STRING
      },
      online_status:{
        type: DataTypes.BOOLEAN
      },
      admin_block_status:{
        type: DataTypes.BOOLEAN
      },
      privacy:DataTypes.BOOLEAN,
      activity_status_id:{
        type: DataTypes.INTEGER
      }
      
    },{
        timestamps:true
      });

      User.associate = models=>{
        User.BelongsTo(models.status ,{
            foreignKey:{
                allowNull:false
            }
        })
      }
  
    
  module.exports=User;