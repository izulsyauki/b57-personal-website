"use strict";
const { Model, DataTypes } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class projects extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  projects.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true, 
        primaryKey: true, 
        allowNull: false,  
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,   
      },
      startDate: {
        type: DataTypes.DATEONLY,
        allowNull: false, 
      },
      endDate: {
        type: DataTypes.DATEONLY,
        allowNull: false, 
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      technologies: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,   
      },
      image: {
        type: DataTypes.STRING,
        allowNull: true,   
      },
      duration: {
        type: DataTypes.STRING,
        allowNull: false, 
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        }
      }
    },
    {
      sequelize,
      modelName: "projects",
    }
  );

  projects.associate = function(models){
    projects.belongsTo(models.users, {
      foreignKey: "userId",
      as: 'user',
    })
  }

  return projects;
};
