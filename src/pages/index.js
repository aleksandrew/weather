// outsource dependencies
import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

// material ui
import Container from '@material-ui/core/Container';

// local dependencies
import Home from './home';
import Search from './search';
import { ROUTES } from '../constans/routes';
import Header from '../components/Header';


export default function App () {

    return <>
        <Header/>
        <Container>
            <Switch>
                <Route path={ROUTES.HOME} component={Home}/>
                <Route path={`${ROUTES.SEARCH}/:city?`} component={Search}/>
                <Redirect exact from="/" to={ROUTES.HOME}/>
            </Switch>
        </Container>
    </>;
}
