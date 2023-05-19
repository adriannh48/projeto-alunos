"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }/* eslint-disable import/no-extraneous-dependencies */
var _multer = require('multer'); var _multer2 = _interopRequireDefault(_multer);
var _path = require('path');

const random = () => Math.floor(Math.random() * 1000 + 1000);

exports. default = {
  fileFilter: (req, file, call) => {
    if (file.mimetype !== 'image/png' && file.mimetype !== 'image/jpeg') {
      return call(new _multer2.default.MulterError('Arquivo precisar ser uma imagem valida!'));
    }
    return call(null, true);
  },
  storage: _multer2.default.diskStorage({
    destination: (req, file, call) => {
      call(null, _path.resolve.call(void 0, __dirname, '..', '..', 'uplouds', 'images'));
    },
    filename: (req, file, call) => {
      call(null, `${Date.now()}_${random()}${_path.extname.call(void 0, file.originalname)}`);
    },
  }),
};
