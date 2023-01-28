import pessoaService from '../services/PessoaService.js';

class PessoaController {
  async getAllPessoas(req, res) {
    try {
      const pessoas = await pessoaService.getAllPessoas();
      res.json({ data: pessoas, status: "success" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
   
  async createPessoa(req, res) {
    try {
      const pessoa = await pessoaService.createPessoa(req.body);
      res.json({ data: pessoa, status: "success" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
   
  async getPessoaById(req, res){
    try {
      const pessoa = await pessoaService.getPessoaById(req.params.id);
      res.json({ data: pessoa, status: "success" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
   
  async updatePessoa(req, res){
    try {
      const pessoa = await pessoaService.updatePessoa(req.params.id, req.body);
      res.json({ data: pessoa, status: "success" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
   
  async deletePessoa(req, res){
    try {
      const pessoa = await pessoaService.deletePessoa(req.params.id);
      res.json({ data: pessoa, status: "success" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
}

export default new PessoaController();
