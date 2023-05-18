import Aluno from "../models/Aluno";

class HomeController {
  async index(req, res) {
    const student = await Aluno.create({
      nome: "adrian",
      sobrenome: "henrique",
      email: "adrian@gmail.com",
      idade: 23,
      peso: 80,
      altura: 1.69,
    });

    res.json(student);
  }
}

export default new HomeController();
