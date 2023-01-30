import React from 'react';
import { Switch } from 'react-router-dom';

import MyRoute from './MyRoute';
import Cadastrar from '../pages/Cadastrar';
import Cadastro from '../pages/Cadastro';
import Cadastros from '../pages/Cadastros';

import Page404 from '../pages/Page404';

export default function Routes() {
  return (
    <Switch>
      <MyRoute exact path="/" component={Cadastros} />
      <MyRoute exact path="/cadastro/:id/edit" component={Cadastro} />
      <MyRoute exact path="/cadastrar" component={Cadastrar} />
      <MyRoute path="*" component={Page404} />
    </Switch>
  );
}
