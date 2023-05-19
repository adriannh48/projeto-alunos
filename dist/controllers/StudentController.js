"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _Aluno = require('../models/Aluno'); var _Aluno2 = _interopRequireDefault(_Aluno);
var _UserPhoto = require('../models/UserPhoto'); var _UserPhoto2 = _interopRequireDefault(_UserPhoto);

class StudentController {
  async index(req, res) {
    const students = await _Aluno2.default.findAll({
      attributes: ['id', 'nome', 'sobrenome', 'email', 'idade', 'peso', 'altura'],
      order: [['id', 'DESC'], [_UserPhoto2.default, 'id', 'DESC']],
      include: {
        model: _UserPhoto2.default,
        attributes: ['file_name', 'url'],
      },
    });

    return res.json(students);
  }

  async show(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(422).json({
          errors: ['Falta de parametros na requisição'],
        });
      }

      const student = await _Aluno2.default.findByPk(id, {
        attributes: ['id', 'nome', 'sobrenome', 'email', 'idade', 'peso', 'altura'],
        order: [['id', 'DESC'], [_UserPhoto2.default, 'id', 'DESC']],
        include: {
          model: _UserPhoto2.default,
          attributes: ['file_name', 'url'],
        },
      });

      if (!student) {
        return res.status(401).json({
          errors: ['Aluno não encontrado'],
        });
      }
      return res.json(student);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async store(req, res) {
    try {
      const student = _Aluno2.default.create(req.body);
      return res.json(student);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      const condition = { where: { id: Number(id) } };

      if (!id) {
        return res.status(422).json({
          errors: ['Falta de parametros na requisição'],
        });
      }

      const student = await _Aluno2.default.findByPk(id);

      if (!student) {
        return res.status(401).json({
          errors: ['Aluno não encontrado'],
        });
      }

      const deleted = await _Aluno2.default.destroy(condition);

      return res.json(deleted);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const condition = { where: { id: Number(id) } };

      if (!id) {
        return res.status(422).json({
          errors: ['Falta de parametros na requisição'],
        });
      }

      const student = await _Aluno2.default.findByPk(id);

      if (!student) {
        return res.status(401).json({
          errors: ['Aluno não encontrado'],
        });
      }

      const newData = await _Aluno2.default.update(req.body, condition, { multi: true });

      return res.json(newData);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }
}

exports. default = new StudentController();
