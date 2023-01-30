import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { get } from 'lodash';
import { IMaskInput } from 'react-imask';

import { Container } from '../../styles/GlobalStyles';
import { Form } from './styled';
import axios from '../../services/axios';
import validationService from '../../services/validation';
import history from '../../services/history';

export default function Cadastrar() {
  const [nome, setNome] = useState('');
  const [CPF, setCPF] = useState('');
  const [data_nascimento, setData_nascimento] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    let formErrors = false;

    if (nome.trim().length <= 0) {
      formErrors = true;
      toast.error('Preencha o campo nome');
    }

    if (!validationService.ValidaCPF(CPF)) {
      formErrors = true;
      toast.error('CPF inválido');
    }

    if (!validationService.ValidaData(data_nascimento)) {
      formErrors = true;
      toast.error('Data de nascimento inválida');
    }

    if (formErrors) return;

    let cpfSemPonto = CPF.replace(/\D/g, '');
    let data = data_nascimento.split('/').reverse().join('/') + '';

    try {
      await axios.post('/', {
        nome,
        CPF: cpfSemPonto,
        data_nascimento: data,
      });
      toast.success('Cadastro realizado com sucesso!!');
      history.push('/');
    } catch (err) {
      if (err.code == 'ERR_NETWORK') {
        toast.error('Erro ao se conectar com o servidor');
        return;
      }
      const status = get(err, 'response.status', 0);
      if (status == 400) {
        if (err.response.data.errorsName == 'CastError') {
          toast.error('Erro ao converter o ', err.response.data.errorsMessage);
          return;
        } else {
          toast.error(err.response.data.errorsMessage);
        }
      }
    }
  }

  return (
    <Container>
      <h1>Cadastrar</h1>
      <Form onSubmit={handleSubmit}>
        <label htmlFor="nome">
          Nome:
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Seu nome"
          />
        </label>
        <label htmlFor="CPF">
          CPF:
          <IMaskInput
            value={CPF}
            onChange={(e) => setCPF(e.target.value)}
            mask="000.000.000-00"
            placeholder="000.000.000-00"
          />
        </label>
        <label htmlFor="Data de Nascimento">
          Data de Nascimento:
          <IMaskInput
            value={data_nascimento}
            onChange={(e) => setData_nascimento(e.target.value)}
            mask="00/00/0000"
            placeholder="00/00/0000"
          />
        </label>

        <button type="submit"> Cadastrar </button>
      </Form>
    </Container>
  );
}
