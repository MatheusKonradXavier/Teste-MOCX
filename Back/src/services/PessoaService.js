import PessoaModel from "../models/Pessoa.js"
 
class PessoaService {
  async getAllPessoas(){
    return await PessoaModel.find();
  };
  
  async createPessoa(pessoa){
    return await PessoaModel.create(pessoa);
  };
  async getPessoaById(id){
    return await PessoaModel.findById(id);
  };
  
  async updatePessoa(id, pessoa){
    return await PessoaModel.findByIdAndUpdate(id, pessoa, { runValidators: true });
  };
  
  async deletePessoa(id){
    return await PessoaModel.findByIdAndDelete(id);
  };
}

export default new PessoaService();