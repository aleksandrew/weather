// outsource dependencies
import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';

// local dependencies
import Home from './home';
import Search from './search';
import { ROUTES } from "../constans/routes";
import {selector} from "./home/reducer";
import Container from "@material-ui/core/Container";
import Header from "../components/Header";


export default function App() {
    const data = useSelector(selector);

    return (
        <>
            {/*{data.length === 0 ? (*/}
            {/*    <Loader />*/}
            {/*) : (*/}
            <Header />
            <Container>
                <Switch>
                    <Route path={ROUTES.SEARCH} component={Search} />
                    <Route path={ROUTES.HOME} component={Home} />
                    <Redirect exact from="/" to={ROUTES.HOME} />
                </Switch>
            </Container>
            {/*)}*/}
        </>
    );
}
