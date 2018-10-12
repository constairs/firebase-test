import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { AuthPage } from './containers/AuthPage';
import { LoginPage } from './containers/LoginPage';
import { ProfilePage } from './containers/ProfilePage';
import { IssuesPage } from './containers/IssuesPage';
import { NewIssuePage } from './containers/NewIssuePage';
import { IssuePage } from './containers/IssuePage';
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
            pathname: '/login',
            state: { from: props.location },
          }}
        />
      ))
    }
  />
);

const PrivateRoute = connect(state => ({ logged: state.persistedUser.logged }))(Private);

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
        <Route exact path="/auth" component={AuthPage} />
        <Route exact path="/login" component={LoginPage} />
        <PrivateRoute component={ProfilePage} path="/profile" />
        <PrivateRoute component={IssuesPage} exact path="/issues" />
        <PrivateRoute component={NewIssuePage} exact path="/issues/new" />
        <PrivateRoute component={IssuePage} exact path="/issues/issue/:id" />
        <PrivateRoute component={IssuePage} exact path="/issues/issue/:id/edit" />
      </Switch>
    </React.Fragment>
  </ConnectedRouter>
);
