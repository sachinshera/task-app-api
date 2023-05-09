import { Sequelize, DataTypes, Model, Optional } from 'sequelize';

export class TaskModel extends Model {
    public id!: string;
    public user_id!: string;
    public label!: string;
    public content!: string;
    public status!: boolean;
    public lock!: boolean;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

export default function (sequelize: Sequelize) {
  TaskModel.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.STRING(45),
      },
      user_id: {
        allowNull: false,
        type: DataTypes.STRING(45),
      },
      label: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      content: {
        allowNull: true,
        type: DataTypes.TEXT,
      },
      status: {
        allowNull: true,
        type: DataTypes.BOOLEAN,
        defaultValue:true
      },
      lock:{
        allowNull: true,
        type: DataTypes.BOOLEAN,
        defaultValue:false
      }
    },
    {
      tableName: 'task',
      sequelize,
      createdAt: true,
      updatedAt: true,
    },
  );

  TaskModel.sync({
    alter: true,
  });

  return TaskModel;
}
