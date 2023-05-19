import Aluno from '../models/Aluno';
import UserPhoto from '../models/UserPhoto';

class StudentController {
  async index(req, res) {
    const students = await Aluno.findAll({
      attributes: ['id', 'nome', 'sobrenome', 'email', 'idade', 'peso', 'altura'],
      order: [['id', 'DESC'], [UserPhoto, 'id', 'DESC']],
      include: {
        model: UserPhoto,
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

      const student = await Aluno.findByPk(id, {
        attributes: ['id', 'nome', 'sobrenome', 'email', 'idade', 'peso', 'altura'],
        order: [['id', 'DESC'], [UserPhoto, 'id', 'DESC']],
        include: {
          model: UserPhoto,
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
      const student = Aluno.create(req.body);
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

      const student = await Aluno.findByPk(id);

      if (!student) {
        return res.status(401).json({
          errors: ['Aluno não encontrado'],
        });
      }

      const deleted = await Aluno.destroy(condition);

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

      const student = await Aluno.findByPk(id);

      if (!student) {
        return res.status(401).json({
          errors: ['Aluno não encontrado'],
        });
      }

      const newData = await Aluno.update(req.body, condition, { multi: true });

      return res.json(newData);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }
}

export default new StudentController();
