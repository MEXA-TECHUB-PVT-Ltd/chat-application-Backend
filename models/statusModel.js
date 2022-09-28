
const DataTypes= require("sequelize")
const sequelize = require("../models/index.js").sequelize;

const User = require("../models/usersModel")


    const Status = sequelize.define("status", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING
      },
      
    },{
        timestamps:true
      });

      Status.hasMany(User, {
        foreignKey: "activity_status_id",
        sourceKey: "id",
      });
      User.belongsTo(Status, {
        foreignKey: "activity_status_id",
        targetId: "id",
      });
  
    
  

    module.exports=Status;