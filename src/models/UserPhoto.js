import Sequelize, { Model } from 'sequelize';
import app from '../config/app';

export default class UserPhoto extends Model {
  static init(sequelize) {
    super.init(
      {
        original_name: {
          type: Sequelize.STRING,
          defaultValue: '',
          validate: {
            notEmpty: {
              msg: 'Campo original name não pode ser vazio',
            },
          },
        },
        file_name: {
          type: Sequelize.STRING,
          defaultValue: '',
          validate: {
            notEmpty: {
              msg: 'Campo file name não pode ser vazio',
            },
          },
        },
        url: {
          type: Sequelize.VIRTUAL,
          get() {
            return `${app.url}/images/${this.getDataValue('file_name')}`;
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
}
