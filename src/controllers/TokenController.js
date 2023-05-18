import User from "../models/User";
import jwt from "jsonwebtoken";

class TokenController {
  async store(req, res) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(422).json({
          errors: ["Credencias invalidas"],
        });
      }

      const user = await User.findOne({ where: { email } });

      if (!user) {
        return res.status(422).json({
          errors: ["Usuario não existe"],
        });
      }

      if (!(await User.passwordIsValid(password, user.password_hash))) {
        console.log("asd");
        return res.status(401).json({
          errors: ["Senha invalida"],
        });
      }

      const token = jwt.sign({ id: user.id, email }, process.env.TOKEN_SECRET, {
        expiresIn: process.env.TOKEN_EXPIRATION,
      });

      return res.json({ token });
    } catch (e) {
      return res.status(400).json(e);
    }
  }
}

export default new TokenController();