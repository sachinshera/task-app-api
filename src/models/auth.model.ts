import { Sequelize, DataTypes, Model, Optional } from 'sequelize';

export class AuthModel extends Model {
    id: string;
    user_id: string;
    token: string;
    expire_at: string;
}

export default function (sequelize: Sequelize) {
  AuthModel.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.STRING(45),
      },
      user_id: {
        allowNull: false,
        type: DataTypes.STRING(45),
      },
      token: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      expire_at: {
        allowNull: false,
        type: DataTypes.STRING(100),
      },
    },
    {
      tableName: 'auth',
      sequelize,
      createdAt: true,
      updatedAt: true,
    },
  );

  AuthModel.sync({
    alter: true
  })

  return AuthModel;
}
