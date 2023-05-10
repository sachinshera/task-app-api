import Sequelize from 'sequelize';
import { NODE_ENV, DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE, DB_PORT,DB_SSL } from '@config';
import UserModel from '@models/users.model';
import { logger } from '@utils/logger';
import  AuthModel  from '@/models/auth.model';
import  TaskModel  from '@/models/task.model';

const sequelize = new Sequelize.Sequelize(DB_DATABASE, DB_USER, DB_PASSWORD, {
  dialect: 'postgres',
  host: DB_HOST,
  port: 5432,
  timezone: '+09:00',
  dialectOptions:{
    Options:DB_SSL?{
      ssl: {
        require: DB_SSL === 'true',
      }
    }:null
  },
  define: {
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
    underscored: true,
    freezeTableName: false,
  },
  pool: {
    min: 0,
    max: 5,

 },
  logQueryParameters: NODE_ENV === 'development',
  logging: (query, time) => {
    logger.info(time + 'ms' + ' ' + query);
  },
  benchmark: true,
});

sequelize.authenticate();

export const DB = {
  Users: UserModel(sequelize),
  AuthModel: AuthModel(sequelize),
  TaskModel:TaskModel(sequelize),
  sequelize, // connection instance (RAW queries)
  Sequelize, // library
};
