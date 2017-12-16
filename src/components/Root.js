import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import App from '../App';
import Compare from '../containers/Compare';
import Hub from '../containers/Hub';
import Home from '../containers/HomePage';
import PlayerPage from '../containers/PlayerPage';

const Root = ({ store }) => (
    <Provider store={ store }>
        <Router>
            <App>
                <Switch>
                    <Route exact path="/" component={ Home } />
                    <Route path="/hub" component={ Hub } />
                    <Route path="/compare" component={ Compare } /> 
                    <Route path="/player/:id" component={ PlayerPage } />
                </Switch>
            </App>
        </Router>
    </Provider>
);

Root.propTypes = {
    store: PropTypes.object.isRequired
}

export default Root;