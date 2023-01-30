import styled from 'styled-components';

export const CadastroContainer = styled.div`
  margin-top: 20px;

  div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding: 10px 10px;
  }

  div + div {
    border-top: 1px solid gray;
  }

  p {
   padding: 5px;
  }

  span {
    padding: 5px;
  }
`;
