import pessoaService from '../services/PessoaService.js';

class PessoaController {
  async getAllPessoas(req, res) {
    try {
      const pessoas = await pessoaService.getAllPessoas();
      res.json({ data: pessoas, status: "success" });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };
   
  async createPessoa(req, res) {
    try {
      const pessoa = await pessoaService.createPessoa(req.body);
      res.json({ data: pessoa, status: "success" });
    } catch (err) {
      res.status(400).json({
        errorsFields: err.errors ? Object.keys(err.errors).map(element=>element) : 'CPF',
        errorsName: err.errors ? Object.values(err.errors).map(element=> element.name) : 'Duplicate Key',
        errorsMessage: err.errors ? Object.values(err.errors).map(element=> element.message): 'O CPF já existe',
      })    
    }
  };
   
  async getPessoaById(req, res){
    try {
      const { id } = req.params;

      if(!id) {
        return res.status(400).json({
          errorsMessage: 'Faltando ID',
        });
      }

      const pessoa = await pessoaService.getPessoaById(id);

      if (!pessoa) {
        return res.status(400).json({
          errorsMessage: 'A Pessoa não existe',
        });
      }
      res.json({ data: pessoa, status: "success" });

    } catch (err) {
      res.status(400).json({ error: err.name == "CastError" ? 'ID inválido' : 'Erro ao procurar a pessoa' });
    }
  };
   
  async updatePessoa(req, res){
    try {

      const { id } = req.params;

      if(!id) {
        return res.status(400).json({
          errorsMessage: 'Faltando ID',
        });
      }

      const pessoa = await pessoaService.updatePessoa(req.params.id, req.body);

      if (!pessoa) {
        return res.status(400).json({
          errorsMessage: 'A Pessoa não existe',
        });
      }
      res.json({ data: pessoa, status: "success" });

    } catch (err) {
      res.status(400).json({ error: err.name == "CastError" ? 'ID inválido' : 'Erro ao procurar a pessoa' });
    }
  };
   
  async deletePessoa(req, res){
    try {
      const { id } = req.params;

      if(!id) {
        return res.status(400).json({
          errorsMessage: 'Faltando ID',
        });
      }

      const pessoa = await pessoaService.deletePessoa(id);

      if (!pessoa) {
        return res.status(400).json({
          errorsMessage: 'A Pessoa não existe',
        });
      }
      res.json({ data: pessoa, status: "success" });

    } catch (err) {
      res.status(400).json({ error: err.name == "CastError" ? 'ID inválido' : 'Erro ao procurar a pessoa' });
    }
  };
}

export default new PessoaController();
