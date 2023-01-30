import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { get } from 'lodash';
import { IMaskInput } from 'react-imask';

import { Container } from '../../styles/GlobalStyles';
import { Form } from './styled';
import axios from '../../services/axios';
import validationService from '../../services/validation';
import PropTypes from 'prop-types';
import history from '../../services/history';

export default function Cadastro({ match }) {
  const id = get(match, 'params.id', '');
  const [nome, setNome] = useState('');
  const [CPF, setCPF] = useState('');
  const [data_nascimento, setData_nascimento] = useState('');

  useEffect(() => {
    async function getData() {
      try {
        const response = await axios.get('/' + id);
        let cpf = response.data.data.CPF + '';
        cpf = cpf.replace(
          /^([\d]{3})([\d]{3})([\d]{3})([\d]{2})$/,
          '$1.$2.$3-$4',
        );
        setCPF(cpf);
        setNome(response.data.data.nome);
        setData_nascimento(
          new Date(response.data.data.data_nascimento).toLocaleDateString(),
        );
      } catch (error) {
        toast(error.errorsMessage);
      }
    }
    getData();
  }, [id]);

  async function handleSubmit(e) {
    e.preventDefault();
    let formErrors = false;

    if (nome.trim().length <= 0) {
      formErrors = true;
      toast.error('Preencha o campo nome');
    }

    if (!validationService.ValidaData(data_nascimento)) {
      formErrors = true;
      toast.error('Data de nascimento inválida');
    }

    if (formErrors) return;

    let data = data_nascimento;
    data = data.split('/').reverse().join('/') + '';

    try {
      await axios.put('/' + id, {
        nome,
        data_nascimento: data,
      });
      toast.success('Editado com sucesso');
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
      <h1>Editar Cadastro</h1>
      <Form onSubmit={handleSubmit}>
        <span> CPF: {CPF} </span>
        <label htmlFor="nome">
          Nome:
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Seu nome"
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

Cadastro.propTypes = {
  match: PropTypes.shape({}).isRequired,
};
