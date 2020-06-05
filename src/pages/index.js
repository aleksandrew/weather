// outsource dependencies
import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

// material ui

// local dependencies
import Home from './home';
import Search from './search';
import { ROUTES } from '../constans/routes';


export default function App () {

    return <>
        <Switch>
            <Route path={ROUTES.HOME} component={Home}/>
            <Route path={`${ROUTES.SEARCH}/:city?`} component={Search}/>
            <Redirect exact from="/" to={ROUTES.HOME}/>
        </Switch>
    </>;
}
