/* eslint-disable import/no-extraneous-dependencies */
import multer from 'multer';
import { extname, resolve } from 'path';

const random = () => Math.floor(Math.random() * 1000 + 1000);

export default {
  fileFilter: (req, file, call) => {
    if (file.mimetype !== 'image/png' && file.mimetype !== 'image/jpeg') {
      return call(new multer.MulterError('Arquivo precisar ser uma imagem valida!'));
    }
    return call(null, true);
  },
  storage: multer.diskStorage({
    destination: (req, file, call) => {
      call(null, resolve(__dirname, '..', '..', 'uplouds', 'images'));
    },
    filename: (req, file, call) => {
      call(null, `${Date.now()}_${random()}${extname(file.originalname)}`);
    },
  }),
};
