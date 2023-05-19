"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize');
var _database = require('../config/database'); var _database2 = _interopRequireDefault(_database);
var _Aluno = require('../models/Aluno'); var _Aluno2 = _interopRequireDefault(_Aluno);
var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);
var _UserPhoto = require('../models/UserPhoto'); var _UserPhoto2 = _interopRequireDefault(_UserPhoto);

const models = [_Aluno2.default, _User2.default, _UserPhoto2.default];
const connection = new (0, _sequelize.Sequelize)(_database2.default);

models.forEach((model) => model.init(connection));
models.forEach((models) => models.associate && models.associate(connection.models));
