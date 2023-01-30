import * as types from '../types';

const initialState = {
  botaoClicado: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case types.BOTAO_CLICADO_SUCCESS: {
      console.log('SUCESUUUUU');
      const newState = { ...state };
      newState.botaoClicado = !newState.botaoClicado;
      return newState;
    }

    case types.BOTAO_CLICADO_FAILURE: {
      console.log('DEU RUIM');
      return state;
    }

    case types.BOTAO_CLICADO_REQUEST: {
      console.log('ESTOU FAZENDO A REQUISITION');
      return state;
    }

    default: {
      return state;
    }
  }
}
