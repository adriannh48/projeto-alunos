import { Sequelize } from 'sequelize';
import databaseConfig from '../config/database';
import Aluno from '../models/Aluno';
import User from '../models/User';
import UserPhoto from '../models/UserPhoto';

const models = [Aluno, User, UserPhoto];
const connection = new Sequelize(databaseConfig);

models.forEach((model) => model.init(connection));
models.forEach((models) => models.associate && models.associate(connection.models));
