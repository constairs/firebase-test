import React from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { userLoginRequest } from '../../redux/user/actions';

import { LoginForm } from '../../components/LoginForm';
import { UserProfile } from '../UserProfile';
import { UserNotification } from '../UserNotification';

class Login extends React.Component {
  handleLoginUser = (loginUserData) => {
    this.props.userLoginRequest(loginUserData);
  }

  render() {
    return (
      <div id="root">
        <UserNotification />
        <LoginForm onLoginUser={this.handleLoginUser} />
        <UserProfile />
      </div>
    );
  }
}

export const LoginPage = connect(
  state => ({
    user: state.persistedUser
  }),
  dispatch => ({
    userLoginRequest: bindActionCreators(userLoginRequest, dispatch),
  })
)(Login);


Login.propTypes = {
  userLoginRequest: PropTypes.func.isRequired,
};
