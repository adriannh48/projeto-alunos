import User from '../models/User';

class UserController {
  async index(req, res) {
    try {
      const users = await User.findAll();
      return res.json(users);
    } catch (e) {
      return res.status(400).json(null);
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;

      const users = await User.findByPk(id);
      return res.json(users);
    } catch (e) {
      return res.status(400).json(null);
    }
  }

  async store(req, res) {
    try {
      const { name: nome, password, email } = req.body;

      const user = await User.create({
        nome,
        email,
        password,
      });

      return res.json(user);
    } catch (e) {
      return res.status(400).json({
        errors: e?.errors.map((err) => err?.message),
      });
    }
  }

  async update(req, res) {
    try {
      const { userId: id } = req;
      const values = req.body;
      const condition = { where: { id: Number(id) } };

      const users = await User.findByPk(id);

      if (!users) {
        return res.status(404).json({
          errors: ['Usuario não encontrado'],
        });
      }
      const newData = await User.update(values, condition, { multi: true });

      return res.json(newData);
    } catch (e) {
      return res.status(400).json(e);
    }
  }

  async delete(req, res) {
    try {
      const { userId: id } = req;

      const condition = { where: { id: Number(id) } };

      const users = await User.findByPk(id);

      if (!users) {
        return res.status(404).json({
          errors: ['Usuario não encontrado'],
        });
      }

      const newData = await User.destroy(condition);

      return res.json(newData);
    } catch (e) {
      return res.status(400).json(e);
    }
  }
}

export default new UserController();
