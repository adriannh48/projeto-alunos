"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; } function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);

class UserController {
  async index(req, res) {
    try {
      const users = await _User2.default.findAll();
      return res.json(users);
    } catch (e) {
      return res.status(400).json(null);
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;

      const users = await _User2.default.findByPk(id);
      return res.json(users);
    } catch (e) {
      return res.status(400).json(null);
    }
  }

  async store(req, res) {
    try {
      const { name: nome, password, email } = req.body;

      const user = await _User2.default.create({
        nome,
        email,
        password,
      });

      return res.json(user);
    } catch (e) {
      return res.status(400).json({
        errors: _optionalChain([e, 'optionalAccess', _ => _.errors, 'access', _2 => _2.map, 'call', _3 => _3((err) => _optionalChain([err, 'optionalAccess', _4 => _4.message]))]),
      });
    }
  }

  async update(req, res) {
    try {
      const { userId: id } = req;
      const values = req.body;
      const condition = { where: { id: Number(id) } };

      const users = await _User2.default.findByPk(id);

      if (!users) {
        return res.status(404).json({
          errors: ['Usuario não encontrado'],
        });
      }
      const newData = await _User2.default.update(values, condition, { multi: true });

      return res.json(newData);
    } catch (e) {
      return res.status(400).json(e);
    }
  }

  async delete(req, res) {
    try {
      const { userId: id } = req;

      const condition = { where: { id: Number(id) } };

      const users = await _User2.default.findByPk(id);

      if (!users) {
        return res.status(404).json({
          errors: ['Usuario não encontrado'],
        });
      }

      const newData = await _User2.default.destroy(condition);

      return res.json(newData);
    } catch (e) {
      return res.status(400).json(e);
    }
  }
}

exports. default = new UserController();
