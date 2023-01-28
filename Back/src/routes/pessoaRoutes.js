import { Router } from 'express';
import pessoaController from '../controllers/PessoaController.js';

const router = new Router();

router.get('/', pessoaController.getAllPessoas); 
router.post('/', pessoaController.createPessoa);
router.put('/:id', pessoaController.updatePessoa);
router.get('/:id', pessoaController.getPessoaById); 
router.delete('/:id', pessoaController.deletePessoa);

export default router;