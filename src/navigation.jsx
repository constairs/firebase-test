import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, Redirect } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import { LoginPage } from './containers/LoginPage';
import { history } from './redux/store';
import { Header } from './containers/Header';

const Private = ({ component: Component, logged, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      (logged ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: '/',
            state: { from: props.location },
          }}
        />
      ))
    }
  />
);

Private.defaultProps = {
  logged: false,
};

Private.propTypes = {
  component: PropTypes.func.isRequired,
  logged: PropTypes.bool,
  location: PropTypes.objectOf(PropTypes.any).isRequired,
};

export const Navigation = () => (
  <ConnectedRouter history={history}>
    <React.Fragment>
      <Header />
      <Switch>
        <Route exact path="/" component={LoginPage} />
      </Switch>
    </React.Fragment>
  </ConnectedRouter>
);
