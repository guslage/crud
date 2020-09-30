import React from 'react';
import { BrowserRouter, Switch, Route} from 'react-router-dom';

import StationCreate from '../pages/estacoes/create/index';
import StationIndex from '../pages/estacoes/read/index';
import StationFind from '../pages/estacoes/read/findOne';
import StationUpdate from '../pages/estacoes/update/index';

import DataUpdate from '../pages/dados/update/index';
import DataCreate from '../pages/dados/create/index';

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/estacoes/create/" component={StationCreate} />
            <Route exact path="/" component={StationIndex} />
            <Route exact path="/estacoes/find/:id" component={StationFind} />
            <Route exact path="/estacoes/update/:id" component={StationUpdate} /> 
            
            <Route exact path="/dados/create/:estacaoId" component={DataCreate} />
            <Route exact path="/dados/update/:id" component={DataUpdate} />
        </Switch>
    </BrowserRouter>
)

export default Routes;