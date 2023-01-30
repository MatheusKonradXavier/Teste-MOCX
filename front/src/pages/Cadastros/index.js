import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaEdit, FaWindowClose } from 'react-icons/fa';
import { toast } from 'react-toastify';

import { Container } from '../../styles/GlobalStyles';
import { CadastroContainer } from './styled';
import axios from '../../services/axios';

export default function Cadastros() {
  const [cadastros, setCadastros] = useState([]);
  const [titulo, setTitulo] = useState('Ainda não existem cadastros');

  useEffect(() => {
    async function getData() {
      const response = await axios.get('/');
      setCadastros(response.data.data);
      if (response.data.data.length > 0) {
        setTitulo('Cadastros');
      }
    }
    getData();
  }, []);

  const handleDelete = async (e, id, index) => {
    e.preventDefault();
    try {
      const response = await axios.delete(`/${id}`);
      const novosCadastros = [...cadastros];
      novosCadastros.splice(index, 1);
      setCadastros(novosCadastros);
      if (cadastros.length == 1) {
        setTitulo('Ainda não existem cadastros');
      }
      toast.success(
        'Pessoa com o nome ' +
          response.data.data.nome +
          ' excluida com sucesso ',
      );
    } catch (err) {
      toast.error(err.errorsMessage);
    }
  };

  return (
    <Container>
      <h1>{titulo}</h1>
      <CadastroContainer>
        {cadastros.map((cadastro, index) => (
          <div key={String(cadastro._id)}>
            <p> Nome : {cadastro.nome} </p>
            <p>
              {' '}
              CPF :{' '}
              {(cadastro.CPF + '').replace(
                /^([\d]{3})([\d]{3})([\d]{3})([\d]{2})$/,
                '$1.$2.$3-$4',
              )}{' '}
            </p>
            <p>
              Data de Nascimento :
              {' ' + new Date(cadastro.data_nascimento).toLocaleDateString()}
            </p>
            <span>
              <span>
                <Link to={`/cadastro/${cadastro._id}/edit`}>
                  Editar <FaEdit size={16} />
                </Link>
              </span>
              <span>
                <Link
                  onClick={(e) => handleDelete(e, cadastro._id, index)}
                  to={`/${cadastro._id}/delete`}
                >
                  Excluir <FaWindowClose size={16} />
                </Link>
              </span>
            </span>
          </div>
        ))}
      </CadastroContainer>
    </Container>
  );
}
