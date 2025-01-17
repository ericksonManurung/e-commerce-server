'use strict';
const { Model } = require('sequelize');
const bcrypt = require('bcryptjs');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  User.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Nama tidak boleh kosong"
        }
      }
    },
    
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Email tidak boleh kosong"
        },
        isEmail:{
          args:true,
          msg: "Format email salah"
        }
      }
    },
    
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Password tidak boleh kosong"
        }
      }
    },
    
    role: {
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    hooks: {
      beforeCreate(user){
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(user.password, salt);
        user.password = hash
        user.role = 'Customer'
      }
    },
    modelName: 'User',
  });
  return User;
};