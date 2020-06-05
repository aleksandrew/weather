// outsource dependencies
import React from 'react';
import PropTypes from 'prop-types';

// material ui
import Container from '@material-ui/core/Container';

// local dependencies
import Header from '../components/Header';


const Layout = ({ children }) => {

    return <>
        <Header />
        <Container>
            {children}
        </Container>
    </>;
};

Layout.propTypes = {
    children: PropTypes.object.isRequired,
};

export default Layout;
