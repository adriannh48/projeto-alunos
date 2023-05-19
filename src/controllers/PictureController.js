/* eslint-disable import/no-extraneous-dependencies */
import multer from 'multer';
import multerConfig from '../config/multer';
import UserPhoto from '../models/UserPhoto';

const uploud = multer(multerConfig).single('photo');

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

        const photo = await UserPhoto.create(
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

export default new PictureController();
