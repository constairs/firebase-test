import React from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { userCreateRequest } from '../../redux/user/actions';

import { AuthForm } from '../../components/AuthForm';
import { UserNotification } from '../UserNotification';

class Auth extends React.Component {
  handleCreateUser = (createUserData) => {
    this.props.userCreateRequest(createUserData);
  }

  render() {
    return (
      <div id="root">
        <AuthForm onCreateUser={this.handleCreateUser} />
        <UserNotification />
      </div>
    );
  }
}

export const AuthPage = connect(
  state => ({
    user: state.persistedUser
  }),
  dispatch => ({
    userCreateRequest: bindActionCreators(userCreateRequest, dispatch),
  })
)(Auth);


Auth.propTypes = {
  userCreateRequest: PropTypes.func.isRequired,
};
