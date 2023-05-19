"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);
var _app = require('../config/app'); var _app2 = _interopRequireDefault(_app);

 class UserPhoto extends _sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        original_name: {
          type: _sequelize2.default.STRING,
          defaultValue: '',
          validate: {
            notEmpty: {
              msg: 'Campo original name não pode ser vazio',
            },
          },
        },
        file_name: {
          type: _sequelize2.default.STRING,
          defaultValue: '',
          validate: {
            notEmpty: {
              msg: 'Campo file name não pode ser vazio',
            },
          },
        },
        url: {
          type: _sequelize2.default.VIRTUAL,
          get() {
            return `${_app2.default.url}/images/${this.getDataValue('file_name')}`;
          },
        },
      },
      {
        sequelize,
        tableName: 'user_photos',
      },
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Aluno, { foreignKey: 'student_id' });
  }
} exports.default = UserPhoto;
