import React from 'react';
import { BrowserRouter, Switch, Route} from 'react-router-dom';

import StationIndex from '../pages/estacoes/read/index';
import StationFind from '../pages/estacoes/read/findOne';
import CreateEstacao from '../pages/estacoes/create/index';
import StationUpdate from '../pages/estacoes/update/index';

import CreateDado from '../pages/dados/create/index';
import DataUpdate from '../pages/dados/update/index';

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={StationIndex} />
            <Route exact path="/estacoes/find/:id" component={StationFind} />
            <Route exact path="/estacoes/create/" component={CreateEstacao} />
            <Route exact path="/estacoes/update/:id" component={StationUpdate} /> 
            <Route exact path="/dados/create/:estacaoId" component={CreateDado} />
            <Route exact path="/dados/update/:id" component={DataUpdate} />
        </Switch>
    </BrowserRouter>
)

export default Routes;