import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import { User } from '@interfaces/users.interface';
export class UserModel extends Model implements User {
  public id: number;
  public email: string;
  public password: string;
  public first_name: string;
  public last_name: string;
  public mobile_number: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default function (sequelize: Sequelize) {
  UserModel.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.STRING(45),
      },
      email: {
        allowNull: false,
        type: DataTypes.STRING(45),
      },
      first_name: {
        allowNull: false,
        type: DataTypes.STRING(45),
      },
      last_name: {
        allowNull: false,
        type: DataTypes.STRING(45),
      },
      mobile_number:{
        allowNull: false,
        type: DataTypes.STRING(45),
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING(255),
      },
    },
    {
      tableName: 'users',
      sequelize,
      createdAt:true,
      updatedAt:true,
    },
  );

  return UserModel;
}
