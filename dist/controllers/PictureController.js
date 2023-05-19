"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }/* eslint-disable import/no-extraneous-dependencies */
var _multer = require('multer'); var _multer2 = _interopRequireDefault(_multer);
var _multer3 = require('../config/multer'); var _multer4 = _interopRequireDefault(_multer3);
var _UserPhoto = require('../models/UserPhoto'); var _UserPhoto2 = _interopRequireDefault(_UserPhoto);

const uploud = _multer2.default.call(void 0, _multer4.default).single('photo');

class PictureController {
  async store(req, res) {
    return uploud(req, res, async (error) => {
      if (error) {
        return res.status(400).json({
          errors: [error.code],
        });
      }

      try {
        const { id } = req.body;
        const { originalname, filename } = req.file;

        const photo = await _UserPhoto2.default.create(
          {
            original_name: originalname,
            file_name: filename,
            student_id: id,
          },
        );

        return res.json(photo);
      } catch (e) {
        return res.status(400).json({
          errors: ['Falha ao tentar cadastrar imagem para esse aluno'],
        });
      }
    });
  }
}

exports. default = new PictureController();
